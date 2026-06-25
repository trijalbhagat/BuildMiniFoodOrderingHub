import { AlertTriangle, TrendingUp, Users } from "lucide-react";
import { UrgencyType } from "../data/menuItems";

interface UrgencyBadgeProps {
  urgency: UrgencyType;
  stockLeft?: number;
  ordersRecent?: number;
}

export default function UrgencyBadge({ urgency, stockLeft, ordersRecent }: UrgencyBadgeProps) {
  if (!urgency) return null;

  if (urgency === "low-stock") {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/25 border border-red-200 dark:border-red-800/50"
        style={{ animation: "urgencyPulse 1.8s ease-in-out infinite" }}
      >
        <AlertTriangle size={11} className="shrink-0" />
        Only {stockLeft} left!
      </div>
    );
  }

  if (urgency === "trending") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/25 border border-orange-200 dark:border-orange-800/50">
        <TrendingUp size={11} className="shrink-0" />
        Trending now
      </div>
    );
  }

  if (urgency === "popular-now") {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/25 border border-violet-200 dark:border-violet-800/50">
        <Users size={11} className="shrink-0" />
        <span>{ordersRecent} people ordered in the last 5 min</span>
      </div>
    );
  }

  return null;
}
