'use client';

import { useRef } from 'react';

/**
 * The phone menu: a native <details> (works without JavaScript) that also closes itself when a
 * link inside is tapped, so the panel never stays open over the section you jumped to.
 */
export function MobileMenu({
  items,
  portal,
}: {
  items: { href: string; label: string }[];
  portal: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute('open');
  return (
    <details ref={ref} className="td-menu td-nav__menu">
      <summary className="td-btn td-btn--secondary" aria-label="Abrir el menú">
        Menú
      </summary>
      <nav className="td-menu__panel" aria-label="Menú">
        {items.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        <a href={portal} rel="noopener noreferrer" onClick={close}>
          Portal del aliado
        </a>
      </nav>
    </details>
  );
}
