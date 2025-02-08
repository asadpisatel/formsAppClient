import { create } from "zustand";

interface AuthState {
  user: { email: string; role: string; status: string } | null;
  isAuthenticated: boolean;
  login: (user: { email: string; role: string; status: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
