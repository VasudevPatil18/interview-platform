import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";
import { PencilIcon } from "lucide-react";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isCustom = id === "custom" || !PROBLEMS[id];

  const [currentProblemId, setCurrentProblemId] = useState(isCustom ? null : (id || "two-sum"));
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    isCustom ? "" : PROBLEMS[id || "two-sum"].starterCode.javascript
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = currentProblemId ? PROBLEMS[currentProblemId] : null;

  // update problem when URL param changes
  useEffect(() => {
    if (id === "custom" || !PROBLEMS[id]) {
      setCurrentProblemId(null);
      setCode("");
      setOutput(null);
    } else if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    if (currentProblem) {
      setCode(currentProblem.starterCode[newLang]);
    }
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (output) => {
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line.trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    return normalizeOutput(actualOutput) == normalizeOutput(expectedOutput);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      if (isCustom) {
        // custom mode — just show success, no expected output check
        toast.success("Code executed successfully!");
      } else {
        const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
        if (testsPassed) {
          triggerConfetti();
          toast.success("All tests passed! Great job!");
        } else {
          toast.error("Tests failed. Check your output!");
        }
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel */}
          <Panel defaultSize={40} minSize={30}>
            {isCustom ? (
              // Custom blank editor — show a simple info panel
              <div className="h-full overflow-y-auto bg-base-200 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PencilIcon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Custom Problem</h1>
                    <p className="text-base-content/60 text-sm">Free-form sandbox</p>
                  </div>
                </div>
                <div className="bg-base-100 rounded-xl p-5 border border-base-300 text-base-content/70 text-sm space-y-2">
                  <p>Write any code you like in the editor. There's no predefined problem or expected output.</p>
                  <p>Use the language selector and run your code to see the output.</p>
                </div>
                {/* Problem switcher to jump to a real problem */}
                <div className="bg-base-100 rounded-xl p-5 border border-base-300 space-y-3">
                  <p className="text-sm font-semibold">Switch to a problem</p>
                  <select
                    className="select select-bordered w-full"
                    defaultValue=""
                    onChange={(e) => e.target.value && navigate(`/problem/${e.target.value}`)}
                  >
                    <option value="" disabled>Choose a problem...</option>
                    {Object.values(PROBLEMS).map((p) => (
                      <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            )}
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right panel- code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={30} minSize={30}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
