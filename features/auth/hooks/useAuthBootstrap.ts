// features/auth/hooks/useAuthBootstrap.ts
"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

export function useAuthBootstrap() {
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not logged in");
          const json = await res.json();
        const user = json.data;
        console.log("user", user)
        setUser(user);
      })
      .catch(() => {
        logout();
      });
  }, []);
}
