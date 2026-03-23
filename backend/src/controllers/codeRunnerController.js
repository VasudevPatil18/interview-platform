import vm from "vm";
import { exec } from "child_process";
import { writeFile, unlink, mkdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomBytes } from "crypto";

// Use system PATH commands — works on Linux (Render) and Windows
const JAVA_BIN = process.env.JAVA_BIN || "";
const PYTHON_BIN = process.env.PYTHON_BIN || (process.platform === "win32" ? "python" : "python3");
const TIMEOUT_MS = 5000;

const javacCmd = JAVA_BIN ? `"${JAVA_BIN}/javac"` : "javac";
const javaCmd  = JAVA_BIN ? `"${JAVA_BIN}/java"`  : "java";

export async function runCode(req, res) {
  const { code, language = "javascript" } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ success: false, error: "No code provided" });
  }

  if (code.length > 20000) {
    return res.status(400).json({ success: false, error: "Code too long (max 20,000 chars)" });
  }

  try {
    let result;
    if (language === "javascript") {
      result = runJavaScript(code);
    } else if (language === "python") {
      result = await runPython(code);
    } else if (language === "java") {
      result = await runJava(code);
    } else {
      return res.status(400).json({ success: false, error: `Unsupported language: ${language}` });
    }
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, error: err.message });
  }
}

// JavaScript — sandboxed vm
function runJavaScript(code) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map(stringify).join(" ")),
      error: (...args) => logs.push(args.map(stringify).join(" ")),
      warn: (...args) => logs.push(args.map(stringify).join(" ")),
    },
    Math, JSON, parseInt, parseFloat, isNaN, isFinite,
    Number, String, Boolean, Array, Object, Map, Set, Date,
    setTimeout: undefined, setInterval: undefined,
    fetch: undefined, require: undefined, process: undefined,
  };
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { timeout: 5000 });
    return { success: true, output: logs.join("\n") || "No output" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Python — write temp file, run with python3
async function runPython(code) {
  const id = randomBytes(8).toString("hex");
  const filePath = join(tmpdir(), `runner_${id}.py`);
  await writeFile(filePath, code, "utf8");
  try {
    const output = await execPromise(`${PYTHON_BIN} "${filePath}"`, TIMEOUT_MS);
    return { success: true, output: output.trim() || "No output" };
  } catch (err) {
    return { success: false, error: err.stderr || err.message };
  } finally {
    unlink(filePath).catch(() => {});
  }
}

async function runJava(code) {
  const classMatch = code.match(/public\s+class\s+(\w+)/);
  const className = classMatch ? classMatch[1] : "Main";

  const id = randomBytes(8).toString("hex");
  const dir = join(tmpdir(), `java_${id}`);
  await mkdir(dir, { recursive: true });

  const filePath = join(dir, `${className}.java`);
  await writeFile(filePath, code, "utf8");

  try {
    await execPromise(`${javacCmd} "${filePath}"`, TIMEOUT_MS);
    const output = await execPromise(`${javaCmd} -cp "${dir}" ${className}`, TIMEOUT_MS);
    return { success: true, output: output.trim() || "No output" };
  } catch (err) {
    return { success: false, error: err.stderr || err.message };
  } finally {
    rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

function execPromise(cmd, timeout) {
  return new Promise((resolve, reject) => {
    exec(cmd, { timeout, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        const e = new Error(err.message);
        e.stderr = stderr || err.message;
        return reject(e);
      }
      resolve(stdout);
    });
  });
}

function stringify(val) {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (typeof val === "object") {
    try { return JSON.stringify(val); } catch { return String(val); }
  }
  return String(val);
}
