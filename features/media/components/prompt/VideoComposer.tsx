import { forwardRef, useState, useImperativeHandle } from "react";
import {
  VideoResolution,
  VIDEO_RESOLUTIONS,
  VIDEO_ASPECT_RATIOS,
  MediaTypeEnum,
  IMAGE_RESOLUTIONS,
  ImageResolution,
  VIDEO_DURATION_SECONDS,
  VideoDuration,
} from "../../types/media";
import { AspectRatioSelector } from "./selectors/AspectRatioSelector";
import { ResolutionSelector } from "./selectors/ResolutionSelector";
import PromptComposerFooter from "./PromptComposerFooter";
import {
  useGenerationCostQuery,
  useVideoGenerationMutation,
} from "@/features/generation/hooks/generation";
import { Textarea } from "@/components/ui/textarea";
import { useVideoGenerationStore } from "@/stores/useVideoGenerationStore";
import ImageSlots from "./ImageSlots";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Menu, MenuItem } from "@/components/menu";
import DurationSelector from "@/features/generation/components/selectors/DurationSelector";
interface VideoComposerProps {
  isFocused: boolean;
}
export default function VideoComposer({ isFocused }: VideoComposerProps) {
  const router = useRouter();
  const {
    resolution,
    aspectRatio,
    prompt,
    durationSeconds,
    projectId,
    setResolution,
    setAspectRatio,
    setPrompt,
    referenceImages,
    setDurationSeconds,
    setReferenceImages,
  } = useVideoGenerationStore();
  const { data: generation } = useGenerationCostQuery(
    resolution,
    MediaTypeEnum.VIDEO,
  );
  const videoGeneration = useVideoGenerationMutation();
  const isDurationForced =
    resolution === "1080p" ||
    resolution === "4k" ||
    referenceImages.some((img) => img !== null);
  if(isDurationForced && durationSeconds !== 8){
    setDurationSeconds(8);
  }
  const handleGeneration = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }
    if (!projectId) {
      toast.error("Please select a project");
      return;
    }

    try {
      await videoGeneration.mutateAsync({
        prompt,
        aspectRatio,
        resolution,
        durationSeconds,
        referenceImages: referenceImages.filter(
          (img) => img !== null,
        ) as File[],
        // type: "video", // Function signature says GenerateVideoRequest, verify if type is needed.
        // Previous code had type: "video". GenerateVideoRequest doesn't seem to have type field based on step 354 diff?
        // Step 354: GenerateVideoRequest { prompt, projectId, referenceImages, durationSeconds, resolution, aspectRatio }. No type.
        projectId: projectId,
      });
      router.push(`/create/create-video`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div style={{ zIndex: 1 }} className=" flex flex-row  gap-4">
        <ImageSlots
          imageSlots={referenceImages}
          onChange={setReferenceImages}
        />

        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Describe what Video you want to create...`}
          className="flex-1 min-h-[100px] text-lg text-white  bg-transparent border-none focus:ring-0 resize-none outline-none pt-2"
        />
      </div>
      <PromptComposerFooter
        isGenerating={false}
        creditsCost={generation?.creditsCost ?? 0}
        isFocused={isFocused}
        disabled={!prompt.trim()}
        onGeneration={handleGeneration}
      >
        <ResolutionSelector
          options={VIDEO_RESOLUTIONS}
          value={resolution}
          onChange={(value) => {
            setResolution(value as VideoResolution);
          }}
        />
        <AspectRatioSelector
          options={VIDEO_ASPECT_RATIOS}
          value={aspectRatio}
          onChange={setAspectRatio}
        />
        <Menu
          direction="up"
          trigger={
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm bg-white/10 border border-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>

              {durationSeconds}
            </div>
          }
          align="left"
        >
          <MenuItem className="p-0  m-0 sm:w-100 w-[200px]">
            <DurationSelector
              options={VIDEO_DURATION_SECONDS}
              value={durationSeconds}
              onChange={(v) => setDurationSeconds(v as VideoDuration)}
              disabled={isDurationForced}
            />
          </MenuItem>
        </Menu>
      </PromptComposerFooter>
    </>
  );
}
