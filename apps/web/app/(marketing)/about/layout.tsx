import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Taskflow is a considered workspace for teams who want clarity, ownership, and a calmer week.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
