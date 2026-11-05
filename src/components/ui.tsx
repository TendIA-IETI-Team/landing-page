/**
 * Primitives ported from apps/portal/src/components/ui.tsx in the main repo, styled with the td-
 * classes of docs/design-system/components/bundle.css.
 */

type Variant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ondark';

/** Link styled as a button. Accent = orange with indigo900 text (never white on orange). */
export function ButtonLink({
  href,
  variant = 'primary',
  size,
  className = '',
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: 'lg';
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`td-btn td-btn--${variant} ${size === 'lg' ? 'td-btn--lg' : ''} ${className}`}
      {...(external ? { rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

type Tono = 'info' | 'neutral' | 'success' | 'warning' | 'danger' | 'accent';

export function Badge({
  tono = 'neutral',
  className = '',
  children,
}: {
  tono?: Tono | Banda;
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={`td-badge td-badge--${tono} ${className}`}>{children}</span>;
}

export function Card({ className = '', children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`td-card ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function Alerta({
  tono = 'info',
  children,
}: {
  tono?: 'danger' | 'warning' | 'success' | 'info';
  children: React.ReactNode;
}) {
  return (
    <div role={tono === 'danger' ? 'alert' : 'status'} className={`td-alert td-alert--${tono}`}>
      {children}
    </div>
  );
}

export type Banda = 'bajo' | 'medio' | 'bueno';

const BANDAS: { id: Banda; nombre: string; min: number; ancho: string }[] = [
  { id: 'bajo', nombre: 'Bajo', min: 0, ancho: '49.9%' },
  { id: 'medio', nombre: 'Medio', min: 500, ancho: '15%' },
  { id: 'bueno', nombre: 'Bueno', min: 650, ancho: '35.1%' },
];

export const bandaDe = (puntaje: number): Banda =>
  puntaje >= 650 ? 'bueno' : puntaje >= 500 ? 'medio' : 'bajo';

/** Puntaje as hero number + three-band bar; each band carries its name (color is never alone). */
export function ScoreHero({ puntaje }: { puntaje: number }) {
  const franja = bandaDe(puntaje);
  const nombre = BANDAS.find((b) => b.id === franja)!.nombre;
  return (
    <div>
      <div className="td-score__row">
        <span className="td-score__num">{puntaje}</span>
        <span className="td-score__of">de 1000</span>
        <Badge tono={franja}>Franja {nombre.toLowerCase()}</Badge>
      </div>
      <div className="td-score__bar" aria-hidden="true">
        {BANDAS.map((b) => (
          <div
            key={b.id}
            className={`td-score__seg td-score__seg--${b.id} ${b.id === franja ? 'is-on' : ''}`}
          />
        ))}
        <div className="td-score__pin" style={{ left: `calc(${puntaje / 10}% - 2px)` }} />
      </div>
      <div className="td-score__legend" aria-hidden="true">
        {BANDAS.map((b) => (
          <span key={b.id} style={{ width: b.ancho }}>
            {b.nombre} · {b.min}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <div>
      <p className="td-eyebrow">{eyebrow}</p>
      <h2 className="td-h2" id={id}>
        {title}
      </h2>
      {lead && <p className="td-lead">{lead}</p>}
    </div>
  );
}
