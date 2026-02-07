import { forwardRef, useState, useImperativeHandle } from "react";
import {
  VideoResolution,
  VIDEO_RESOLUTIONS,
  VIDEO_ASPECT_RATIOS,
  MediaTypeEnum,
} from "../../types/media";
import { AspectRatioSelector } from "./selectors/AspectRatioSelector";
import { ResolutionSelector } from "./selectors/ResolutionSelector";
import PromptComposerFooter from "./PromptComposerFooter";
import { useGenerationCostQuery } from "@/features/generation/hooks/generation";
import { Textarea } from "@/components/ui/textarea";
import { useVideoGenerationStore } from "@/stores/useVideoGenerationStore";
import ImageSlots from "./ImageSlots";
interface VideoComposerProps {
  isFocused: boolean;
  isGenerating: boolean;
  onGeneration: () => void;
}
export default function VideoComposer({
  isFocused,
  isGenerating,
  onGeneration,
}: VideoComposerProps) {
  const {
    resolution,
    aspectRatio,
    prompt,
    setResolution,
    setAspectRatio,
    setPrompt,
    referenceImages,
    setReferenceImages,
  } = useVideoGenerationStore();
  const { data: generation } = useGenerationCostQuery(
    resolution,
    MediaTypeEnum.VIDEO,
  );

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
        onGeneration={onGeneration}
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
      </PromptComposerFooter>
    </>
  );
}
