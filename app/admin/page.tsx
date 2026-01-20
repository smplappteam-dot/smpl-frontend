import { StatisticsSection } from "@/features/admin/components/statistics/StatisticsSection";

export default function AdminPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-400">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <StatisticsSection />
    </div>
  );
}
