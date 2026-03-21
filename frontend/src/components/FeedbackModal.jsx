import { useState } from "react";
import { StarIcon, XIcon, Loader2Icon } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function FeedbackModal({ session, isHost, onDone }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [summary, setSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receivedFeedback, setReceivedFeedback] = useState(null);

  const recipientName = isHost
    ? (session?.participant?.name ?? "Candidate")
    : (session?.host?.name ?? "Interviewer");

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select a star rating");

    setSubmitting(true);
    try {
      await axios.post("/feedback", {
        sessionId: session._id,
        rating,
        review: summary.trim(),
      });

      // After submitting, try to fetch feedback we received
      try {
        const { data } = await axios.get(`/feedback/received/${session._id}`);
        setReceivedFeedback(data.feedback);
      } catch {
        // no feedback received yet — that's fine
      }

      setSubmitted(true);
      toast.success("Feedback submitted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const activeRating = hovered || rating;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-base-100 rounded-2xl w-full max-w-md shadow-2xl border border-base-300 overflow-hidden">

        {/* Header */}
        <div className="bg-base-200 px-6 py-4 flex items-center justify-between border-b border-base-300">
          <h2 className="text-lg font-bold">
            {submitted ? "Session Complete" : "Rate Your Session"}
          </h2>
          {submitted && (
            <button onClick={onDone} className="btn btn-ghost btn-sm btn-circle">
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {!submitted ? (
            <>
              {/* Who you're rating */}
              <p className="text-center text-base-content/70 text-sm">
                You're giving feedback to{" "}
                <span className="font-semibold text-base-content">
                  {recipientName || "your partner"}
                </span>
              </p>

              {/* Star rating */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                      aria-label={`Rate ${star} stars`}
                    >
                      <StarIcon
                        className={`size-10 transition-colors ${
                          star <= activeRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-base-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-medium text-base-content/60 h-5">
                  {activeRating > 0 ? STAR_LABELS[activeRating] : "Select a rating"}
                </span>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-base-content/80">
                  Summary <span className="text-base-content/40">(optional)</span>
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="textarea textarea-bordered w-full resize-none"
                  rows={4}
                  maxLength={500}
                  placeholder={
                    isHost
                      ? "How did the candidate perform? Any strengths or areas to improve?"
                      : "How was the interview experience? Was the interviewer helpful?"
                  }
                />
                <p className="text-xs text-right text-base-content/40">
                  {summary.length}/500
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onDone}
                  className="btn btn-ghost flex-1"
                  disabled={submitting}
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !rating}
                  className="btn btn-primary flex-1 gap-2"
                >
                  {submitting && <Loader2Icon className="size-4 animate-spin" />}
                  Submit Feedback
                </button>
              </div>
            </>
          ) : (
            /* Post-submit: show what you gave + any feedback you received */
            <div className="space-y-5">
              {/* What you submitted */}
              <div className="bg-base-200 rounded-xl p-4 space-y-2">
                <p className="text-xs text-base-content/50 uppercase tracking-wide font-semibold">
                  Your feedback for {recipientName}
                </p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon
                      key={s}
                      className={`size-5 ${
                        s <= rating ? "fill-yellow-400 text-yellow-400" : "text-base-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{STAR_LABELS[rating]}</span>
                </div>
                {summary && (
                  <p className="text-sm text-base-content/80 italic">"{summary}"</p>
                )}
              </div>

              {/* Feedback received */}
              {receivedFeedback ? (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-primary/70 uppercase tracking-wide font-semibold">
                    Feedback from {receivedFeedback.givenBy?.name}
                  </p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon
                        key={s}
                        className={`size-5 ${
                          s <= receivedFeedback.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-base-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">
                      {STAR_LABELS[receivedFeedback.rating]}
                    </span>
                  </div>
                  {receivedFeedback.review && (
                    <p className="text-sm text-base-content/80 italic">
                      "{receivedFeedback.review}"
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-center text-sm text-base-content/50">
                  Your partner hasn't submitted their feedback yet.
                </p>
              )}

              <button onClick={onDone} className="btn btn-primary w-full">
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
