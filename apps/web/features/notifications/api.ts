import {
  api,
} from '@/lib/api';

export type NotificationType =
  | 'TASK_ASSIGNED'
  | 'TASK_COMPLETED'
  | 'PROJECT_INVITATION'
  | 'SYSTEM';

export interface Notification {
  id: string;

  type: NotificationType;

  title: string;

  message: string;

  readAt:
    | string
    | null;

  metadata?: Record<
    string,
    unknown
  >;

  createdAt: string;
}

export async function getNotifications() {
  const response =
    await api.get<Notification[]>(
      '/notifications',
    );

  return response.data;
}

export async function getUnreadNotifications() {
  const response =
    await api.get<Notification[]>(
      '/notifications/unread',
    );

  return response.data;
}

export async function getUnreadCount() {
  const response =
    await api.get<number>(
      '/notifications/unread/count',
    );

  return response.data;
}

export async function markNotificationAsRead(
  id: string,
) {
  const response =
    await api.patch<Notification>(
      `/notifications/${id}/read`,
    );

  return response.data;
}

export async function markAllNotificationsAsRead() {
  const response =
    await api.patch(
      '/notifications/read-all',
    );

  return response.data;
}