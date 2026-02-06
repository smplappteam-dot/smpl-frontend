import { Sparkles } from "lucide-react";

export default function GeneratingMediaCardSkeleton({
  status,
}: {
  status?: string;
}) {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 animate-pulse ring-1 ring-inset ring-black/5 dark:ring-white/5">
      {/* Overlay placeholder */}
      <div className="absolute inset-0 bg-gray-200/40 dark:bg-gray-700/40" />

      {/* Center Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 text-center">
        <div className="relative flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <Sparkles
              className="w-10 h-10 text-purple-600 dark:text-purple-400 animate-spin-slow"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <span className="text-xs font-medium text-purple-600/80 dark:text-purple-400/80 animate-pulse font-mono tracking-wide uppercase">
            {status || "GENERATING"}
          </span>
          
        </div>
      </div>

      {/* Button placeholder */}
      <div className="absolute bottom-4 left-4 right-4 opacity-100 transform translate-y-0">
        <div className="flex items-center justify-end">
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
