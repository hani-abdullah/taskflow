import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
  description: 'A focused workspace for planning projects, assigning ownership, and keeping momentum visible.',
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
