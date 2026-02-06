import React from "react";
import { Media } from "@/features/media/types/media";
import LazyImage from "@/components/LazyImage";
import LazyVideo from "@/components/LazyVideo";
import { calculateHeight } from "@/lib/utils";

export function MediaCard({
  media,
  width,
  height,
}: {
  media: Media;
  width: number;
  height: number;
}) {
  return (
    <div
      style={{  height }}
      className=" w-full group relative aspect-square  rounded-xl overflow-hidden  shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative w-full h-full">
        {media.type === "video" ? (
          <>
            <LazyVideo
              src={media.url}
              options={{
                aspectRatio: media.aspectRatio,
                width,
                height,
                autoplay: true,
                loop: true,
                muted: true,
                controls: false,
              }}
            />
          </>
        ) : (
          <LazyImage
            key={media.id}
            src={media.url}
            options={{
              aspectRatio: media.aspectRatio,
              width: width,
              height: height,
            }}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />

      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
        <div className="flex items-center justify-end text-white">
          <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
