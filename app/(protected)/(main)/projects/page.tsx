import { ProjectsGrid } from "@/features/projects/components/projects-grid";
import ProjectsPageHeader from "@/features/projects/components/ProjectsPageHeader";
import { fetchWithToken } from "@/lib/fetcher";

export default async function ProjectsPage() {
  const json = await fetchWithToken("/projects/me?include=stats").then((res) => res.json());
  const projects = json.data;
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ProjectsPageHeader/>

      <ProjectsGrid projects={projects} />
    </div>
  );
}
