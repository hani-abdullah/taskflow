import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;

  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (accessToken) =>
    set({ accessToken }),

  setUser: (user) =>
    set({ user }),

  clearAuth: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));