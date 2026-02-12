import { usePathname, useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  Video,
  LayoutTemplate,
  Shuffle,
  PlusSquare,
  Pencil,
  Combine,
  Mic,
  Volume2,
} from "lucide-react";
import clsx from "clsx";
import { JSX } from "react";
const items: { id: string; label: string; href: string; icon: JSX.Element }[] =
  [
    {
      id: "image",
      label: "Image",
      href: "/create/create-image",
      icon: <ImageIcon className="size-6" />,
    },
    {
      id: "video",
      label: "Video",
      href: "/create/create-video",
      icon: <Video className="size-6" />,
    },
  ];

export default function CreateSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className=" w-24 h-screen px-2 py-10  border-r border-neutral-800">
      <div className="flex flex-col items-center gap-4 overflow-y-auto scrollbar-hide">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={clsx(
                "group w-full py-3 rounded-md flex flex-col items-center gap-1 transition",
                active
                  ? "bg-background-light text-foreground-primary"
                  : "text-muted-foreground hover:text-primary-foreground hover:bg-background-light",
              )}
            >
              {Icon}
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
