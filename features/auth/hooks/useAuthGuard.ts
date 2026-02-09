// features/auth/hooks/useAuthGuard.ts

import { useAuth } from "@/providers/AuthProvider";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuthGuard() {
  const { user } = useAuth();
  const {openLoginModal}=useAuthStore()
  return function guard(action: () => void) {
    if (!user) {
      openLoginModal();
      return;
    }

    action();
  };
}
