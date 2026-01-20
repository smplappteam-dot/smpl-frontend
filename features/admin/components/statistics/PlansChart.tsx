"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { SubscriptionPlanStats } from "../../types/statistics.types";

interface PlansChartProps {
  data: SubscriptionPlanStats[];
}

export const PlansChart: React.FC<PlansChartProps> = ({ data }) => {
  // Define colors for bars if needed, or use a single color/gradient
  const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm min-h-[300px] flex flex-col">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6">
        Subscription Plans
      </h3>
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="planName"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#374151",
                borderRadius: "8px",
                color: "#f3f4f6",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
