// features/auth/components/GlobalLoginModal.tsx
"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { LoginModal } from "@/features/auth/components/LoginModal";

export function GlobalLoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useAuthStore();

  return (
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={() => closeLoginModal()}
    />
  );
}
