import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { siteUrl } from '@/config/links';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const title = 'TendIA · Crédito basado en tu negocio';
const description =
  'Un Puntaje TendIA de 0 a 1000, explicado en lenguaje sencillo, para las tiendas de barrio de Colombia. TendIA no presta dinero.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'es_CO', siteName: 'TendIA', title, description, url: '/' },
  twitter: { card: 'summary_large_image', title, description },
  icons: { icon: '/logo.png', apple: '/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={nunito.variable}>
      <body className="td">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
