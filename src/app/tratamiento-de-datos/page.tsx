import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL } from '@/lib/legal';

const doc = LEGAL.tratamiento;

export const metadata: Metadata = {
  title: `${doc.title} · TendIA`,
  description: doc.description,
  alternates: { canonical: doc.path },
};

export default function Page() {
  return <LegalPage doc="tratamiento" />;
}
