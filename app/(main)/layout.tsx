import { WorkspaceNavbar } from "@/components/navbar";
import { WorkspaceSidebar } from "@/components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[auto_1fr]">
      {/* LEFT SIDEBAR spans both rows */}
      <aside className="row-span-2 border-r">
        <WorkspaceSidebar />
      </aside>

      {/* TOP NAVBAR */}
      <header className="border-b sticky top-0 z-50">
        <WorkspaceNavbar />
      </header>

      {/* MAIN CONTENT */}
      <main className="overflow-y-auto p-6">{children}</main>
    </div>
  );
}
