import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import tokens from '../../docs/design-system/tokens.json';

export const alt = 'TendIA · Crédito basado en tu negocio, no en tu pasado bancario';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Satori needs literal colors, so they are read from the design system's tokens.json.
const c = (name: string) => tokens.color.tokens.find((t) => t.name === name)!.value;

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: c('indigo50'),
          padding: 72,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: 72,
            width: 320,
            height: 176,
            borderRadius: 16,
            background: c('orange500'),
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: 280,
            width: 320,
            height: 400,
            borderRadius: 16,
            background: c('indigo700'),
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={logoSrc} width={88} height={88} alt="" />
          <span style={{ fontSize: 48, fontWeight: 800, color: c('indigo700') }}>TendIA</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, color: c('indigo900') }}>
            Crédito basado en tu negocio, no en tu pasado bancario.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: c('neutral600') }}>
            Puntaje TendIA de 0 a 1000 para las tiendas de barrio de Colombia.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
