import { TrophyIcon, UsersIcon } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  const activeCount = useCountUp(activeSessionsCount);
  const recentCount = useCountUp(recentSessionsCount);

  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/40">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <UsersIcon className="w-7 h-7 text-primary" />
            </div>
            <div className="badge badge-primary">Live</div>
          </div>
          <div className="text-4xl font-black mb-1">{activeCount}</div>
          <div className="text-sm opacity-60">Active Sessions</div>
        </div>
      </div>

      <div className="card bg-base-100 border-2 border-secondary/20 hover:border-secondary/40">
        <div className="card-body">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-secondary/10 rounded-2xl">
              <TrophyIcon className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="text-4xl font-black mb-1">{recentCount}</div>
          <div className="text-sm opacity-60">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
