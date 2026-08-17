import {
  api,
} from '@/lib/api';

export interface Project {
  id: string;

  name: string;

  description:
    | string
    | null;

  createdAt: string;

  updatedAt: string;

  _count?: {
    tasks: number;
  };
}

export interface CreateProjectInput {
  name: string;

  description?: string;
}

export interface UpdateProjectInput {
  name?: string;

  description?: string;
}

export async function getProjects() {
  const response =
    await api.get<Project[]>(
      '/projects',
    );

  return response.data;
}

export async function getProject(
  id: string,
) {
  const response =
    await api.get<Project>(
      `/projects/${id}`,
    );

  return response.data;
}

export async function createProject(
  data: CreateProjectInput,
) {
  const response =
    await api.post<Project>(
      '/projects',
      data,
    );

  return response.data;
}

export async function updateProject(
  id: string,
  data: UpdateProjectInput,
) {
  const response =
    await api.patch<Project>(
      `/projects/${id}`,
      data,
    );

  return response.data;
}

export async function deleteProject(
  id: string,
) {
  await api.delete(
    `/projects/${id}`,
  );
}