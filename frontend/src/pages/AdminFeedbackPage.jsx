import { useEffect, useState } from "react";
import axios from "../lib/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { StarIcon, TrashIcon, MessageSquareHeartIcon } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`w-4 h-4 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-base-content/20"}`}
        />
      ))}
    </div>
  );
}

const CATEGORY_BADGE = {
  general: "badge-neutral",
  ui: "badge-info",
  performance: "badge-warning",
  feature: "badge-success",
  bug: "badge-error",
};

function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(0);
  const animatedAvg = useCountUp(parseFloat(avgRating) * 10) / 10;
  const animatedTotal = useCountUp(feedbacks.length);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/site-feedback/all");
      setFeedbacks(res.data.feedbacks);
      setAvgRating(res.data.avgRating);
    } catch {
      toast.error("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/site-feedback/${id}`);
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
      toast.success("Feedback deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center gap-3">
          <MessageSquareHeartIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Site Feedback
            </h1>
            <p className="text-base-content/60">What users think about Talent IQ</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Total Feedback</div>
              <div className="stat-value text-primary">{animatedTotal}</div>
            </div>
          </div>
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Avg Rating</div>
              <div className="stat-value text-yellow-400">{avgRating} ⭐</div>
            </div>
          </div>
          {["bug", "feature"].map((cat) => (
            <div key={cat} className="stats shadow bg-base-100">
              <div className="stat">
                <div className="stat-title capitalize">{cat} Reports</div>
                <div className="stat-value text-secondary">
                  {feedbacks.filter((f) => f.category === cat).length}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback List */}
        {feedbacks.length === 0 ? (
          <div className="card bg-base-100 shadow p-12 text-center">
            <MessageSquareHeartIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base-content/60">No feedback submitted yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbacks.map((fb) => (
              <div key={fb._id} className="card bg-base-100 shadow border border-base-300">
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                          {fb.user?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{fb.user?.name}</p>
                        <p className="text-xs text-base-content/50">{fb.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(fb._id)}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <Stars rating={fb.rating} />
                    <span className={`badge badge-sm ${CATEGORY_BADGE[fb.category]}`}>
                      {fb.category}
                    </span>
                  </div>

                  <p className="text-sm text-base-content/70 mt-2 leading-relaxed">
                    {fb.message}
                  </p>

                  <p className="text-xs text-base-content/40 mt-2">
                    {new Date(fb.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AdminFeedbackPage;
