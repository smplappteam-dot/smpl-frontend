"use client";

import React, { useEffect, useState } from "react";
import { getStatistics } from "../../services/admin.service";
import { Statistics } from "../../types/statistics.types";
import { StatCard } from "./StatCard";
import { SubscriptionPercentage } from "./SubscriptionPercentage";
import { PlansChart } from "./PlansChart";
import { toast } from "sonner";

export const StatisticsSection = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-white/5 rounded-xl border border-white/10"
          ></div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Users" value={stats.totalUsers} />
      <StatCard title="Total Subscribed" value={stats.totalSubscribedUsers} />
      <SubscriptionPercentage percentage={stats.subscribedUsersPercentage} />
      <div className="lg:col-span-1">
        {/* Plans chart might need more space, adjusting grid if necessary. 
            For now, fitting it into one of the 4 columns or making it span?
            The user said "subscription plans with count and planname to be like a graph".
            If there are many plans, a small card might be tight.
            Let's make it span 1 column first, but if it looks cramped we can adjust.
            Actually, let's make the chart span full width or 2 cols on smaller screens if we had more items.
            But with 4 items total (Total Users, Total Subscribed, % Subscribed, Plans), 
            a 4-column grid works well if the chart is simple.
        */}
        <PlansChart data={stats.subscribedPlans} />
      </div>
    </div>
  );
};
