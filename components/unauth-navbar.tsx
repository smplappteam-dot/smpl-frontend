"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "./ui/button";

export function UnAuthNavbar() {
  const router = useRouter();
  const { openLoginModal } = useAuthStore();
  return (
    <header
      style={{ zIndex: 100 }}
      className="h-16 backdrop-blur-sm  flex items-center justify-between px-8 "
    >
      <span className="text-2xl font-bold text-foreground">SMPL</span>

      <div className="flex items-center gap-6">

          <div className="flex items-center gap-4">
            <Button
              onClick={() => openLoginModal()}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {" "}
              Log In
            </Button>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        
      </div>
    </header>
  );
}
