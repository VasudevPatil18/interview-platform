import { useState, useEffect } from "react";
import { StarIcon, SendIcon, CheckCircle2Icon, SmileIcon, ZapIcon, BugIcon, LayoutIcon, MessageSquareIcon } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORIES = [
  { value: "general",     label: "General",          icon: <SmileIcon className="w-4 h-4" />,         color: "btn-neutral" },
  { value: "ui",          label: "UI / Design",       icon: <LayoutIcon className="w-4 h-4" />,        color: "btn-info" },
  { value: "performance", label: "Performance",       icon: <ZapIcon className="w-4 h-4" />,           color: "btn-warning" },
  { value: "feature",     label: "Feature Request",   icon: <MessageSquareIcon className="w-4 h-4" />, color: "btn-success" },
  { value: "bug",         label: "Bug Report",        icon: <BugIcon className="w-4 h-4" />,           color: "btn-error" },
];

const RATING_LABELS = ["", "Poor 😞", "Fair 😐", "Good 🙂", "Very Good 😊", "Excellent 🤩"];

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-all duration-150 hover:scale-125 focus:outline-none"
        >
          <StarIcon
            className={`w-10 h-10 transition-all duration-150 drop-shadow-sm ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "text-base-content/20 hover:text-yellow-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function SiteFeedbackPage() {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    axios.get("/site-feedback/my")
      .then((res) => {
        if (res.data.feedback) {
          setRating(res.data.feedback.rating);
          setCategory(res.data.feedback.category);
          setMessage(res.data.feedback.message);
          setSubmitted(true);
        }
      })
      .catch(() => {})
      .finally(() => setPageLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please select a rating");
    if (!message.trim()) return toast.error("Please write a message");

    setIsLoading(true);
    try {
      await axios.post("/site-feedback", { rating, category, message });
      toast.success(submitted ? "Feedback updated!" : "Thank you for your feedback! 🎉");
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary mb-5 shadow-lg shadow-primary/30">
              <span className="text-4xl">💬</span>
            </div>
            <h1 className="text-4xl font-black mb-3">
              We'd love your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                feedback
              </span>
            </h1>
            <p className="text-base-content/60 text-lg max-w-md mx-auto">
              Help us make Talent IQ better. Your honest opinion shapes what we build next.
            </p>
          </div>

          <div className="card bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8 space-y-8">

              {/* Step 1 — Rating */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-content text-sm font-bold flex items-center justify-center">1</div>
                  <h3 className="font-bold text-lg">Rate your experience</h3>
                </div>
                <div className="bg-base-200 rounded-2xl p-6 text-center space-y-3">
                  <StarRating value={rating} onChange={setRating} />
                  <div className={`text-base font-semibold transition-all duration-200 ${rating ? "opacity-100" : "opacity-0"}`}>
                    {RATING_LABELS[rating]}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="divider my-0" />

              {/* Step 2 — Category */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-content text-sm font-bold flex items-center justify-center">2</div>
                  <h3 className="font-bold text-lg">What's this about?</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={`btn btn-sm gap-2 transition-all ${
                        category === cat.value
                          ? `${cat.color} shadow-md scale-105`
                          : "btn-ghost border border-base-300 hover:border-primary/40"
                      }`}
                    >
                      {cat.icon}
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="divider my-0" />

              {/* Step 3 — Message */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-content text-sm font-bold flex items-center justify-center">3</div>
                  <h3 className="font-bold text-lg">Tell us more</h3>
                </div>
                <div className="relative">
                  <textarea
                    className="textarea textarea-bordered w-full h-36 resize-none text-base leading-relaxed pr-16 focus:textarea-primary"
                    placeholder="What did you love? What could be better? Any bugs or ideas? We read every message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    required
                  />
                  <span className={`absolute bottom-3 right-3 text-xs font-mono ${message.length > 900 ? "text-error" : "text-base-content/30"}`}>
                    {message.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="btn btn-primary w-full btn-lg gap-3 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                disabled={isLoading || !rating || !message.trim()}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : submitted ? (
                  <CheckCircle2Icon className="w-5 h-5" />
                ) : (
                  <SendIcon className="w-5 h-5" />
                )}
                {submitted ? "Update My Feedback" : "Submit Feedback"}
              </button>

              {submitted && (
                <div className="alert alert-success">
                  <CheckCircle2Icon className="w-5 h-5" />
                  <span>Your feedback is saved. Thank you for helping us improve!</span>
                </div>
              )}

            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-sm text-base-content/40 mt-6">
            Your feedback is anonymous to other users and only visible to admins.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SiteFeedbackPage;
