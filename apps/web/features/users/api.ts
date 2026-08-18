import { api } from '@/lib/api';

export interface UserOption {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function getUsers(): Promise<UserOption[]> {
  const response = await api.get<UserOption[]>('/users');

  return response.data;
}
