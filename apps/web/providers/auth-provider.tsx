'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getMe,
  refresh,
} from '@/features/auth/api';

import { useAuthStore } from '@/stores/auth.store';

interface AuthContextValue {
  loading: boolean;
}

const AuthContext =
  createContext<AuthContextValue>({
    loading: true,
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] =
    useState(true);

  const setAccessToken =
    useAuthStore(
      (state) => state.setAccessToken,
    );

  const setUser =
    useAuthStore(
      (state) => state.setUser,
    );

  useEffect(() => {
    async function bootstrap() {
      try {
        const tokenResult =
          await refresh();

        setAccessToken(
          tokenResult.accessToken,
        );

        const user = await getMe();

        setUser(user);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, [setAccessToken, setUser]);

  return (
    <AuthContext.Provider value={{ loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}