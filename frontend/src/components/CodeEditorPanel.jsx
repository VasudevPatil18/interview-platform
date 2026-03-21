import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, LockIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";
import { useRef, useEffect } from "react";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  remoteCursor,       // { line, column, userName } from peer
  isEncryptionReady,  // bool — show lock icon when E2E key exchange done
  onCursorChange,     // (line, column) => void
}) {
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  // Render remote cursor as a Monaco decoration
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !remoteCursor) return;

    const { line, column, userName } = remoteCursor;

    const newDecorations = editor.deltaDecorations(decorationsRef.current, [
      {
        range: {
          startLineNumber: line,
          startColumn: column,
          endLineNumber: line,
          endColumn: column + 1,
        },
        options: {
          className: "remote-cursor-line",
          beforeContentClassName: "remote-cursor-caret",
          hoverMessage: { value: `📍 ${userName}` },
          stickiness: 1,
        },
      },
    ]);
    decorationsRef.current = newDecorations;
  }, [remoteCursor]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Track cursor position changes and report to parent
    editor.onDidChangeCursorPosition((e) => {
      if (onCursorChange) {
        onCursorChange(e.position.lineNumber, e.position.column);
      }
    });
  };

  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select className="select select-sm" value={selectedLanguage} onChange={onLanguageChange}>
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* E2E encryption status indicator */}
          <div
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
              isEncryptionReady
                ? "bg-success/20 text-success"
                : "bg-base-300 text-base-content/40"
            }`}
            title={isEncryptionReady ? "Code is end-to-end encrypted" : "Waiting for peer to establish encrypted channel"}
          >
            <LockIcon className="size-3" />
            <span>{isEncryptionReady ? "E2E Encrypted" : "Unencrypted"}</span>
          </div>

          {/* Remote cursor indicator */}
          {remoteCursor && (
            <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{remoteCursor.userName} typing…</span>
            </div>
          )}
        </div>

        <button className="btn btn-primary btn-sm gap-2" disabled={isRunning} onClick={onRunCode}>
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>

      {/* Inline CSS for remote cursor decoration */}
      <style>{`
        .remote-cursor-caret {
          border-left: 2px solid hsl(var(--s));
          margin-left: -1px;
          animation: blink 1s step-end infinite;
        }
        .remote-cursor-line {
          background: hsl(var(--s) / 0.12);
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default CodeEditorPanel;
