// features/auth/hooks/useAuthGuard.ts

import { useAuthStore } from "@/stores/useAuthStore";

export function useAuthGuard() {
  const { isAuthenticated, openLoginModal } = useAuthStore();

  return function guard(action: () => void) {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    action();
  };
}
