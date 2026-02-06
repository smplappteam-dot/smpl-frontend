import JSZip from "jszip";
import { toast } from "sonner";
import { saveAs } from "file-saver";
export const downloadUrlsZip = async (urls: string[], zipName: string) => {
  try {
    const zip = new JSZip();
    const toastId = toast.loading("Preparing download...");
    // Create concurrent fetches but limit concurrency if needed (using Promise.all for now)
    const downloadPromises = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        const blob = await response.blob();

        // Determine filename from URL or fallback
        const urlParts = url.split("/");
        const filename = urlParts[urlParts.length - 1] || `media-${url}`;

        zip.file(filename, blob);
      } catch (error) {
        console.error(`Failed to download media ${url}`, error);
        // Continue with other files even if one fails
      }
    });

    await Promise.all(downloadPromises);

    toast.loading("Zipping files...", { id: toastId });
    const content = await zip.generateAsync({ type: "blob" });

    saveAs(content, `${zipName}-assets.zip`);
    toast.success("Download started", { id: toastId });
  } catch (error) {
    console.error("ZIP generation failed", error);
    toast.error("Failed to generate ZIP file");
  }
};

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const toastId = toast.loading("Downloading file...");
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();
    saveAs(blob, fileName);
    toast.success("Download complete", { id: toastId });
  } catch (error) {
    console.error("Download failed", error);
    toast.error("Failed to download file");
  }
};
