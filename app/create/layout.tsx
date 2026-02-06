"use client";
import { WorkspaceNavbar } from "@/components/navbar";
import CreateSidebar from "@/features/generation/components/sidebar";

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const user = (await fetchWithToken("/users/me")
  //     .then((res) => res.json())
  //     .then((data) => data.data)) as User;

  return (
    <div className="bg-background min-h-screen grid md:grid-cols-[100px_1fr] grid-cols-1 grid-rows-[auto_1fr]">
      {/* LEFT SIDEBAR spans both rows */}
      <aside className="md:block hidden row-span-2  ">
        <CreateSidebar />
      </aside>

      {/* TOP NAVBAR */}
      <header>
        <WorkspaceNavbar />
      </header>

      {/* MAIN CONTENT */}
      <main className="overflow-y-auto   ">{children}</main>
    </div>
  );
}
