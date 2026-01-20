import React from "react";

interface StatCardProps {
  title: string;
  value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg backdrop-blur-sm">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  );
};
