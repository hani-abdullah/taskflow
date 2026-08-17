import { api } from '@/lib/api';
import type { AuthUser } from '@/stores/auth.store';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export async function register(
  data: RegisterInput,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    data,
  );

  return response.data;
}

export async function login(
  data: LoginInput,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    data,
  );

  return response.data;
}

export async function refresh(): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/refresh',
  );

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getMe(): Promise<AuthUser> {
  const response = await api.get<AuthUser>(
    '/auth/me',
  );

  return response.data;
}