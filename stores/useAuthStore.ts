// features/auth/store/useAuthStore.ts
import { User } from "@/features/auth/types/auth";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;

  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
