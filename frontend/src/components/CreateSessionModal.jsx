import { Code2Icon, LoaderIcon, MailIcon, PlusIcon, PencilIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { useState } from "react";

const CUSTOM_VALUE = "__custom__";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  if (!isOpen) return null;

  const handleProblemChange = (e) => {
    const val = e.target.value;
    if (val === CUSTOM_VALUE) {
      setIsCustom(true);
      setRoomConfig({ problem: "", difficulty: "easy" });
    } else {
      setIsCustom(false);
      const selected = problems.find((p) => p.title === val);
      setRoomConfig({ difficulty: selected.difficulty.toLowerCase(), problem: val });
    }
  };

  const handleCreate = () => {
    const finalProblem = isCustom ? (customTitle.trim() || "Custom Problem") : roomConfig.problem;
    const finalConfig = { ...roomConfig, problem: finalProblem };
    setRoomConfig(finalConfig);
    onCreateRoom(inviteEmail, finalConfig);
    setInviteEmail("");
    setCustomTitle("");
    setIsCustom(false);
  };

  const canCreate = isCustom
    ? roomConfig.difficulty
    : !!roomConfig.problem;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={isCustom ? CUSTOM_VALUE : roomConfig.problem}
              onChange={handleProblemChange}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>
              <option value={CUSTOM_VALUE}>✏️ Custom Problem (blank editor)</option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* CUSTOM PROBLEM FIELDS */}
          {isCustom && (
            <div className="space-y-4 p-4 bg-base-200 rounded-xl border border-base-300">
              <div className="flex items-center gap-2 text-sm font-semibold text-base-content/70">
                <PencilIcon className="size-4" />
                Custom Problem Details
              </div>
              <div className="space-y-2">
                <label className="label">
                  <span className="label-text">Problem Title (optional)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="e.g. My Custom Problem"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  maxLength={80}
                />
              </div>
              <div className="space-y-2">
                <label className="label">
                  <span className="label-text font-semibold">Difficulty</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <select
                  className="select w-full"
                  value={roomConfig.difficulty}
                  onChange={(e) => setRoomConfig((prev) => ({ ...prev, difficulty: e.target.value }))}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          )}

          {/* EMAIL INVITE (OPTIONAL) */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <MailIcon className="size-4" />
                Invite via Email (Optional)
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="colleague@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt">
                We'll send them an email with the meeting code
              </span>
            </label>
          </div>

          {/* ROOM SUMMARY */}
          {(roomConfig.problem || isCustom) && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">
                    {isCustom ? (customTitle.trim() || "Custom Problem") : roomConfig.problem}
                  </span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={handleCreate}
            disabled={isCreating || !canCreate}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;
