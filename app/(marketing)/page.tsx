"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services/auth.service";

export default function RootPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuthenticated = await authService.checkAuth();
        if (isAuthenticated) {
          router.push("/home");
        } else {
          router.push("/onboard");
        }
      } catch (error) {
        router.push("/onboard");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
