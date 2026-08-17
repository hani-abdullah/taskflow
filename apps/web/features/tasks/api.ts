import {
  api,
} from '@/lib/api';

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'DONE';

export type TaskPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH';

export interface TaskAssignee {
  id: string;

  email: string;

  firstName?: string;

  lastName?: string;
}

export interface Task {
  id: string;

  title: string;

  description:
    | string
    | null;

  status: TaskStatus;

  priority: TaskPriority;

  projectId: string;

  assigneeId:
    | string
    | null;

  dueDate:
    | string
    | null;

  createdAt: string;

  updatedAt: string;

  assignee?:
    | TaskAssignee
    | null;
}

export interface CreateTaskInput {
  title: string;

  description?: string;

  projectId: string;

  priority?: TaskPriority;

  status?: TaskStatus;

  dueDate?: string;

  assigneeId?: string;
}

export interface UpdateTaskInput {
  title?: string;

  description?: string;

  priority?: TaskPriority;

  status?: TaskStatus;

  dueDate?: string;

  assigneeId?: string;
}

export async function getTasks(
  projectId: string,
) {
  const response =
    await api.get<Task[]>(
      '/tasks',
      {
        params: {
          projectId,
        },
      },
    );

  return response.data;
}

export async function getTask(
  id: string,
) {
  const response =
    await api.get<Task>(
      `/tasks/${id}`,
    );

  return response.data;
}

export async function createTask(
  data: CreateTaskInput,
) {
  const response =
    await api.post<Task>(
      '/tasks',
      data,
    );

  return response.data;
}

export async function updateTask(
  id: string,
  data: UpdateTaskInput,
) {
  const response =
    await api.patch<Task>(
      `/tasks/${id}`,
      data,
  );

  return response.data;
}

export async function deleteTask(
  id: string,
) {
  await api.delete(
    `/tasks/${id}`,
  );
}