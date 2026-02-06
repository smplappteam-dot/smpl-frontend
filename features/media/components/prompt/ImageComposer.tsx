
import {
  ImageResolution,
  ImageAspectRatio,
  IMAGE_RESOLUTIONS,
  IMAGE_ASPECT_RATIOS,
  MediaTypeEnum,
} from "../../types/media";
import { AspectRatioSelector } from "./selectors/AspectRatioSelector";
import { ResolutionSelector } from "./selectors/ResolutionSelector";
import PromptComposerFooter from "./PromptComposerFooter";
import { useGenerationCostQuery } from "../../queries/media";
import { Textarea } from "@/components/ui/textarea";
import ImageSlots from "./ImageSlots";
import { useImageGenerationStore } from "@/stores/useImageGenerationStore";
interface ImageComposerProps {
  isFocused: boolean;
  isGenerating: boolean;
  onGeneration: () => void;
}
export default function ImageComposer({isFocused,isGenerating,onGeneration}:ImageComposerProps){
  const {
    resolution,
    aspectRatio,
    prompt,
    projectId,
    setResolution,
    setAspectRatio,
    setPrompt,
    referenceImages,
    setReferenceImages,
  } = useImageGenerationStore();
  const { data: generation } = useGenerationCostQuery(resolution,MediaTypeEnum.IMAGE);

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
          placeholder={`Describe what Photo you want to create...`}
          className="flex-1 min-h-[100px] text-lg text-white  bg-transparent border-none focus:ring-0 resize-none outline-none pt-2"
        />
      </div>
      <PromptComposerFooter
        isGenerating={isGenerating}
        creditsCost={generation?.creditsCost ?? 0}
        isFocused={isFocused}
        disabled={!prompt.trim()}
        onGeneration={onGeneration}
      >
        <ResolutionSelector
          options={IMAGE_RESOLUTIONS}
          value={resolution}
          onChange={(value) => {
            setResolution(value as ImageResolution);
          }}
        />
        <AspectRatioSelector
          options={IMAGE_ASPECT_RATIOS}
          value={aspectRatio}
          onChange={setAspectRatio}
        />
      </PromptComposerFooter>
    </>
  );
};
