import { api } from '@/lib/api';

export interface Subscription {
  id: string;
  status: string;
  priceId: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export async function createCheckoutSession() {
  const response = await api.post<{ url: string }>('/stripe/checkout');
  return response.data;
}

export async function createPortalSession() {
  const response = await api.post<{ url: string }>('/stripe/portal');
  return response.data;
}

export async function cancelSubscription() {
  const response = await api.post<{
    success: boolean;
    cancelAtPeriodEnd: boolean;
  }>('/stripe/cancel');
  return response.data;
}

export async function getSubscription() {
  const response = await api.get<Subscription | null>('/stripe/subscription');
  return response.data;
}
