import { useState, useEffect } from "react";
import { StarIcon, SendIcon, MessageSquareHeartIcon } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "ui", label: "UI / Design" },
  { value: "performance", label: "Performance" },
  { value: "feature", label: "Feature Request" },
  { value: "bug", label: "Bug Report" },
];

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <StarIcon
            className={`w-9 h-9 transition-colors ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-base-content/20"
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

  useEffect(() => {
    // Load existing feedback if any
    axios.get("/site-feedback/my").then((res) => {
      if (res.data.feedback) {
        setRating(res.data.feedback.rating);
        setCategory(res.data.feedback.category);
        setMessage(res.data.feedback.message);
        setSubmitted(true);
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error("Please select a rating");
    if (!message.trim()) return toast.error("Please write a message");

    setIsLoading(true);
    try {
      await axios.post("/site-feedback", { rating, category, message });
      toast.success(submitted ? "Feedback updated!" : "Thank you for your feedback!");
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <MessageSquareHeartIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black mb-2">Share Your Feedback</h1>
            <p className="text-base-content/60">Help us improve Talent IQ — your opinion matters</p>
          </div>

          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Star Rating */}
                <div className="form-control items-center">
                  <label className="label">
                    <span className="label-text font-semibold text-base">How would you rate your experience?</span>
                  </label>
                  <StarRating value={rating} onChange={setRating} />
                  {rating > 0 && (
                    <p className="text-sm text-base-content/50 mt-2">
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory(cat.value)}
                        className={`btn btn-sm ${category === cat.value ? "btn-primary" : "btn-ghost border border-base-300"}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your Message</span>
                    <span className="label-text-alt text-base-content/40">{message.length}/1000</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32 resize-none"
                    placeholder="Tell us what you think, what you'd like to see, or report any issues..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full gap-2"
                  disabled={isLoading || !rating}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <SendIcon className="w-4 h-4" />
                  )}
                  {submitted ? "Update Feedback" : "Submit Feedback"}
                </button>

                {submitted && (
                  <p className="text-center text-sm text-success">
                    ✓ Your feedback has been submitted. Thank you!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SiteFeedbackPage;
