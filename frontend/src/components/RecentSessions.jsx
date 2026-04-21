import { Code2, Clock, Users, Trophy, Loader, Trash2, Star } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function RecentSessions({ sessions, isLoading, onDelete, deletingId, receivedFeedbacks = {} }) {
  return (
    <div className="card bg-base-100 border-2 border-accent/20 hover:border-accent/30 mt-8">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-accent to-secondary rounded-xl">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black">Your Past Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div key={session._id}
                className={`card relative ${
                  session.status === "active"
                    ? "bg-success/10 border-success/30 hover:border-success/60"
                    : "bg-base-200 border-base-300 hover:border-primary/30"
                }`}
              >
                {session.status === "active" && (
                  <div className="absolute top-3 right-3">
                    <div className="badge badge-success gap-1">
                      <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                )}

                <div className="card-body p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        session.status === "active"
                          ? "bg-gradient-to-br from-success to-success/70"
                          : "bg-gradient-to-br from-primary to-secondary"
                      }`}
                    >
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 truncate">{session.problem}</h3>
                      <span
                        className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm opacity-80 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Feedback received from partner */}
                  {(() => {
                    const fb = receivedFeedbacks[session._id];
                    if (!fb) return null;
                    return (
                      <div className="bg-primary/10 border border-primary/20 rounded-xl px-3 py-2 mb-3 space-y-1">
                        <p className="text-xs font-semibold text-primary/70 uppercase tracking-wide">
                          Feedback from {fb.givenBy?.name}
                        </p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= fb.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-base-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs ml-1 opacity-70">{STAR_LABELS[fb.rating]}</span>
                        </div>
                        {fb.review && (
                          <p className="text-xs text-base-content/70 italic line-clamp-2">
                            "{fb.review}"
                          </p>
                        )}
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between pt-3 border-t border-base-300">
                    <span className="text-xs font-semibold opacity-80 uppercase">Completed</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-40">
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => onDelete && onDelete(session._id)}
                        disabled={deletingId === session._id}
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                        title="Remove session"
                      >
                        {deletingId === session._id ? (
                          <Loader className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-accent/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">No sessions yet</p>
              <p className="text-sm opacity-50">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;
