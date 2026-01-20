"use client";

import React from "react";
import { motion } from "framer-motion";

interface SubscriptionPercentageProps {
  percentage: number;
}

export const SubscriptionPercentage: React.FC<SubscriptionPercentageProps> = ({
  percentage,
}) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg backdrop-blur-sm">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">
        Subscription Rate
      </h3>
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            stroke="rgba(255, 255, 255, 0.1)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};
