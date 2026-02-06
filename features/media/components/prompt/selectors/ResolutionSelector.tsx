"use client";

import { useState, useRef, useEffect } from "react";

interface ResolutionSelectorProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function ResolutionSelector({
  options,
  value,
  onChange,
}: ResolutionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm bg-white/10 border border-white/20"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
        {value.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-32 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/40 p-1 z-50 animate-fade-in-up">
          <div className="flex flex-col gap-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                  value === option
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
