import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Start free. Upgrade as your team grows. Cancel anytime.',
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
