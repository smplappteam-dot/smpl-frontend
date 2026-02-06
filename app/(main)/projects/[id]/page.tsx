"use client";
import { MenuItem, Menu } from "@/components/menu";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MediaExplorer from "@/features/media/components/MediaExplorer";
import { UpdateProjectNameForm } from "@/features/projects/forms/updateProjectForm";
import { ProjectWithStatsAndMedia } from "@/features/projects/types/project";
import { downloadUrlsZip } from "@/lib/handle-downloads";
import { Download, Edit, Image, Trash, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectWithStatsAndMedia | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      const res = await fetch(`/api/projects/${id}?include=stats,media`);
      const json = await res.json();
      console.log(json.data);
      setProject(json.data); // depending on your API shape
      setIsLoading(false);
    };

    fetchProject();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!project) return <div>Not found</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-foreground">
              <p>
                Last updated {new Date(project.updatedAt).toLocaleDateString()}
              </p>
              <div className="hidden h-1 w-1 rounded-full bg-neutral-700 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-800/50 px-2.5 py-0.5 text-sm font-medium text-neutral-300">
                  {project.totalImages || 0} <Image size={16} />
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-neutral-800/50 px-2.5 py-0.5 text-sm font-medium text-neutral-300">
                  {project.totalVideos || 0} <Video size={16} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Menu>
          <MenuItem
            icon={<Download size={16} />}
            onClick={() =>
              downloadUrlsZip(
                project.media.map((media) => media.url),
                project.name,
              )
            }
          >
            Download All
          </MenuItem>
          <MenuItem
            icon={<Edit size={16} />}
            onClick={() => setIsUpdateModalOpen(true)}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<Trash size={16} />}
            variant="danger"
            onClick={() => console.log("Delete")}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <Dialog
        open={isUpdateModalOpen}
        onOpenChange={(val) => !val && setIsUpdateModalOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Project</DialogTitle>
          </DialogHeader>
          <UpdateProjectNameForm
            projectId={project.id}
            initialName={project.name}
            onSuccess={() => {
              toast.success("Project name updated successfully");
              setIsUpdateModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      {/* <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>My Modal Title</ModalTitle>
    </ModalHeader>
    <div className="py-4">
           <UpdateProjectNameForm
  projectId={project.id}
  initialName={project.name}
        onSuccess={() => {
    toast.success("Project name updated successfully");
    // optional: close an edit modal, show a toast, etc.
  }}
/>
    </div>
  </ModalContent>
</Modal> */}

      <MediaExplorer defaultProjectId={id} />
    </div>
  );
}
