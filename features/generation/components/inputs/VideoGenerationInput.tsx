import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageSlots from "@/features/media/components/prompt/ImageSlots";
import { useVideoGenerationStore } from "@/stores/useVideoGenerationStore";

interface VideoGenerationInputProps {
  onGeneration: () => void;
}
export default function VideoGenerationInput({
  onGeneration,
}: VideoGenerationInputProps) {
  const { prompt, setPrompt, referenceImages, setReferenceImages } =
    useVideoGenerationStore();

  return (
    <div className=" flex flex-row  gap-4">
      <ImageSlots imageSlots={referenceImages} onChange={setReferenceImages} />

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Describe what Video you want to create...`}
        className="flex-1 min-h-[100px] text-lg text-white  bg-transparent border-none focus:ring-0 resize-none outline-none pt-2"
      />
      <Button
        onClick={onGeneration}
        className="bg-gradient-to-r from-primary to-tertiary hover:from-primary/80 hover:to-tertiary/80 text-white font-bold py-2 px-4 rounded-lg transition-all"
      >
        Generate
      </Button>
    </div>
  );
}
