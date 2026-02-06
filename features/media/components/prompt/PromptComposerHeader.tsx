"use client";
import { Button } from "@/components/ui/button";
import { MediaType } from "../../types/media";

interface PromptComposerHeaderProps {
  mediaType:MediaType;
  onSelect: (mediaType:MediaType) => void;
}
export default function PromptComposerHeader({ mediaType, onSelect }: PromptComposerHeaderProps) {
    return (
      <div className="flex items-center justify-between gap-4 backdrop-blur-3xl border-b border-black/10 px-4 py-1">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => onSelect("image")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium  ${
                  mediaType === "image"
                    ? " text-secondary shadow-sm backdrop-blur-sm"
                    : "text-white "
                }`}
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Image
              </Button>
              <Button
                type="button"
                onClick={() => onSelect("video")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium  ${
                  mediaType === "video"
                    ? "text-secondary shadow-sm backdrop-blur-sm"
                    : "text-white "
                }`}
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Video
              </Button>
            </div>

        </div>
    )
}