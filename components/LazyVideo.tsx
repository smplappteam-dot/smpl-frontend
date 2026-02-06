"use client";
import { AspectRatio } from "@/features/media/types/media";
import { useState } from "react";

const aspectMap: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "3:4": "aspect-[3/4]",
  "9:16": "aspect-[9/16]",
  "5:4": "aspect-[5/4]",
};

export default function LazyVideo({
  src,
  options: {
    aspectRatio = "16:9",
    width,
    height,
    autoplay = false,
    loop = false,
    muted = false,
    controls = true,
  },
}: {
  src: string;
  options: {
    aspectRatio?: AspectRatio;
    width?: number;
    height?: number;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  };
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        
        height,
      }}
      className={`relative w-full ${aspectMap[aspectRatio]} rounded-xl overflow-hidden bg-gray-200`}
    >
      {/* Skeleton UNDER the video */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      {/* Video OVER the skeleton */}
      <video
        src={src}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300`}
        onLoadedData={() => setLoaded(true)}
      />
    </div>
  );
}
