import { MediaGrid } from "@/features/media/components/MediaGrid";
import PromptComposer from "@/features/media/components/prompt/PromptComposer";
import { Media } from "@/features/media/types/media";
import { fetchWithToken } from "@/lib/fetcher";
import { redirect } from "next/navigation";
export default async function WorkspacePage() {
  const isAuthRes = await fetchWithToken("/auth/is-auth", { method: "POST" });
  if (!isAuthRes.ok) {
    redirect("/onboard");
  }

  const json = await fetchWithToken("/media").then((res) => res.json());
  const media: Media[] = json.data;
  return (
    <div  className="w-full p-5 mt-5">
      <section className="w-1/2 flex items-center justify-center fixed bottom-10 right-1/4 z-10">
        <PromptComposer />
      </section>
      <MediaGrid imagesWidth={250} media={media}></MediaGrid>
    </div>
  );
}
