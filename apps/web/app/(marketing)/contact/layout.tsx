import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to Taskflow about sales, partnerships, or the product.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
