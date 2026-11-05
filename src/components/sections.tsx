/**
 * Landing sections, one per component in docs/design-system/components/ (NavBar, Hero,
 * HowItWorks, AudienceSplit, PhoneShowcase, DataStats, TrustList, CtaBand, Footer).
 */
import Image from 'next/image';
import { contactEmail, legal, links } from '@/config/links';
import { ButtonLink, Badge, Card, SectionHead } from './ui';

function Brand() {
  return (
    <a className="td-brand" href="/" aria-label="TendIA, inicio">
      <Image src="/logo.png" alt="" width={40} height={40} priority />
      <span className="td-brand__word">TendIA</span>
    </a>
  );
}

const NAV = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#tenderos', label: 'Para tenderos' },
  { href: '#aliados', label: 'Para entidades' },
  { href: '#seguridad', label: 'Seguridad' },
];

export function NavBar() {
  return (
    <header className="td-nav">
      <div className="td-container td-nav__inner">
        <Brand />
        <nav className="td-nav__links" aria-label="Principal">
          {NAV.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="td-nav__ctas">
          <ButtonLink href={links.portal} variant="secondary" className="td-nav__portal">
            Portal del aliado
          </ButtonLink>
          {/* Primary, not accent: the hero's "Ver mi puntaje" is the one accent of the first screen. */}
          <ButtonLink href={links.app} variant="primary">
            Abrir la app
          </ButtonLink>
          <details className="td-menu td-nav__menu">
            <summary className="td-btn td-btn--secondary" aria-label="Abrir el menú">
              Menú
            </summary>
            <nav className="td-menu__panel" aria-label="Menú">
              {NAV.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
              <a href={links.portal} rel="noopener noreferrer">
                Portal del aliado
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Phone({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="td-phone">
        <Image src={src} alt={alt} width={390} height={844} sizes="240px" priority={priority} />
      </div>
      <figcaption className="td-caption">{caption}</figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section className="td-hero" aria-labelledby="titulo">
      <div className="td-container td-hero__grid">
        <div>
          <p className="td-eyebrow">Para las tiendas de barrio de Colombia</p>
          <h1 className="td-display" id="titulo">
            Crédito basado en <em>tu negocio</em>, no en tu pasado bancario.
          </h1>
          <p className="td-lead">
            TendIA convierte tus ventas con datáfono, tus pagos al distribuidor y tu cuaderno en un
            Puntaje TendIA de 0 a 1000, explicado en palabras sencillas.
          </p>
          <div className="td-hero__ctas">
            <ButtonLink href={links.app} variant="accent" size="lg">
              Ver mi puntaje
            </ButtonLink>
            <ButtonLink href="#aliados" variant="primary" size="lg">
              Soy una entidad
            </ButtonLink>
          </div>
          <p className="td-hero__note">
            TendIA no presta dinero. Tú decides con qué entidad compartir tu puntaje.
          </p>
        </div>
        <div className="flex justify-center">
          <Phone
            src="/screens/app-puntaje.png"
            alt="Pantalla de la app: Tu Puntaje TendIA, 618 de 1000, franja medio"
            caption="La app del tendero"
            priority
          />
        </div>
      </div>
    </section>
  );
}

const PASOS = [
  {
    t: 'Autorizas',
    d: 'Eliges qué fuentes compartir, con palabras sencillas. Lo revocas cuando quieras.',
  },
  { t: 'Anotas', d: 'Ventas y fiados con Tendi o con una foto de tu cuaderno.' },
  { t: 'Ves tu puntaje', d: 'De 0 a 1000, con lo que te suma y lo que te resta.' },
  {
    t: 'Decides',
    d: 'Compartes tu puntaje con la entidad que elijas y te avisamos su respuesta.',
  },
];

export function HowItWorks() {
  return (
    <section className="td-section td-section--tint" id="como-funciona">
      <div className="td-container">
        <SectionHead eyebrow="Cómo funciona" title="De tu cuaderno a un puntaje que entiendes" />
        <ol className="td-steps">
          {PASOS.map((p) => (
            <li key={p.t} className="td-step">
              <h3 className="td-h3">{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AudienceSplit() {
  return (
    <section className="td-section td-section--white">
      <div className="td-container">
        <SectionHead
          eyebrow="Una evaluación, dos lados"
          title="Para el tendero y para la entidad"
        />
        <div className="td-split">
          <Card className="td-split__col" id="tenderos">
            <Badge tono="accent" className="self-start">
              App del tendero
            </Badge>
            <h3 className="td-h3">Para el tendero</h3>
            <ul className="td-checks td-checks--lg">
              <li>Entras con tu celular y un código por SMS.</li>
              <li>Ves tu puntaje sobre 1000, qué te suma y qué te resta.</li>
              <li>Justificas un mes malo con una foto y el puntaje se recalcula.</li>
              <li>Anotas ventas y fiados hablando con Tendi, en la app o por WhatsApp.</li>
            </ul>
            <ButtonLink href={links.app} variant="accent" className="self-start">
              Abrir la app
            </ButtonLink>
          </Card>
          <Card className="td-split__col" id="aliados">
            <Badge tono="info" className="self-start">
              Portal del aliado
            </Badge>
            <h3 className="td-h3">Para bancos, fintechs y distribuidores</h3>
            <ul className="td-checks">
              <li>Bandeja con puntaje, franja y sugerencia según tu política de riesgo.</li>
              <li>Explicación variable por variable (SARC) y tasa real del mercado.</li>
              <li>API pública con llaves, consumo por mes y bitácora de accesos.</li>
              <li>Portal con MFA obligatorio, roles y equipo.</li>
            </ul>
            <ButtonLink href={links.portal} variant="primary" className="self-start">
              Ver el portal del aliado
            </ButtonLink>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function PhoneShowcase() {
  return (
    <section className="td-section td-section--tint">
      <div className="td-container">
        <SectionHead
          eyebrow="Producto real"
          title="Así se ve"
          lead="Tendi usa IA para anotar lo que le cuentas. El puntaje lo calcula un modelo que se explica, no la IA."
        />
        <div className="mt-8 flex flex-wrap items-start justify-center gap-8 lg:flex-nowrap">
          <Phone
            src="/screens/app-tendi.png"
            alt="Tendi, el asistente, anotando una venta"
            caption="Tendi anota ventas y fiados"
          />
          <Phone
            src="/screens/app-cuaderno.png"
            alt="Mi cuaderno: foto de una hoja del cuaderno leída por la app"
            caption="Mi cuaderno, con una foto"
          />
          <figure className="m-0 w-full lg:min-w-0 lg:flex-1">
            <div className="td-browser">
              <div className="td-browser__bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Image
                src="/screens/portal-bandeja.png"
                alt="Portal del aliado: bandeja de solicitudes con puntaje y franja"
                width={1280}
                height={800}
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
            <figcaption className="td-caption">El portal del aliado</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const DATOS = [
  {
    n: '9,6 %',
    t: 'de las tiendas de Bogotá que pidieron crédito acudió al gota a gota, que cobra entre 382 % y 666 % al año.',
    s: 'DANE · EMICRON 2024',
  },
  {
    n: '20.488',
    t: 'micronegocios de comercio usados para segmentar las tiendas.',
    s: 'DANE · EMICRON 2024',
  },
  {
    n: '0,741',
    t: 'AUC del modelo en datos que no vio al entrenar: un scorecard que se explica variable por variable.',
    s: 'UCI #350 · 30.000 créditos reales',
  },
];

export function DataStats() {
  return (
    <section className="td-section td-section--dark">
      <div className="td-container">
        <SectionHead eyebrow="Datos reales" title="Hecho con datos de Colombia" />
        <div className="td-stats">
          {DATOS.map((d) => (
            <div key={d.n} className="td-stat">
              <div className="td-stat__num">{d.n}</div>
              <p className="td-stat__text">{d.t}</p>
              <p className="td-stat__src">{d.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONFIANZA = [
  {
    k: 'Consentimiento',
    t: 'Autorizas cada fuente',
    d: 'Con fecha y finalidad. Si lo revocas, borramos los datos de esa fuente.',
  },
  { k: 'Cifrado', t: 'Celular y cédula cifrados', d: 'AES-256-GCM, y búsqueda sin descifrar.' },
  {
    k: 'Bitácora',
    t: 'Sabes quién te consultó',
    d: 'Cada lectura guarda quién, cuándo y para qué. Nadie puede editarla.',
  },
];

export function TrustList() {
  return (
    <section className="td-section" id="seguridad">
      <div className="td-container">
        <SectionHead eyebrow="Seguridad y Ley 1581" title="Tus datos son tuyos" />
        <div className="td-trust">
          {CONFIANZA.map((c) => (
            <Card key={c.k}>
              <span className="td-tag">{c.k}</span>
              <h3 className="td-h3 mt-2">{c.t}</h3>
              <p>{c.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="td-container pb-3xl md:pb-4xl" aria-labelledby="cta-titulo">
      <div className="td-cta">
        <h2 id="cta-titulo">¿Tu entidad le presta a tiendas de barrio?</h2>
        <p>
          Prueba el portal con una cuenta de demostración o conecta tu sistema a la API pública.
        </p>
        <div className="td-cta__ctas">
          {contactEmail ? (
            <ButtonLink
              href={`mailto:${contactEmail}?subject=${encodeURIComponent('Quiero ser aliado de TendIA')}`}
              variant="accent"
              size="lg"
            >
              Quiero ser aliado
            </ButtonLink>
          ) : (
            <ButtonLink href={links.portal} variant="accent" size="lg">
              Probar el portal
            </ButtonLink>
          )}
          <ButtonLink href={links.apiDocs} variant="ondark" size="lg">
            Ver la API
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="td-footer">
      <div className="td-container">
        <div className="td-footer__grid">
          <div>
            <Brand />
            <p className="mt-3 max-w-xs">
              Crédito basado en tu negocio, no en tu pasado bancario. TendIA no presta dinero.
            </p>
          </div>
          <nav aria-labelledby="f-producto">
            <h2 id="f-producto" className="td-footer__h">
              Producto
            </h2>
            <ul>
              <li>
                <a href={links.app}>App del tendero</a>
              </li>
              <li>
                <a href={links.portal}>Portal del aliado</a>
              </li>
              <li>
                <a href={links.apiDocs}>API</a>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="f-legal">
            <h2 id="f-legal" className="td-footer__h">
              Legal
            </h2>
            <ul>
              <li>
                <a href={legal.privacidad}>Aviso de privacidad</a>
              </li>
              <li>
                <a href={legal.tratamiento}>Tratamiento de datos</a>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="f-proyecto">
            <h2 id="f-proyecto" className="td-footer__h">
              Proyecto
            </h2>
            <ul>
              <li>
                <a href={links.repo}>GitHub</a>
              </li>
              <li>
                <a href={legal.equipo}>Equipo</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="td-footer__legal">
          Proyecto de IETI · Escuela Colombiana de Ingeniería Julio Garavito · 2026
        </div>
      </div>
    </footer>
  );
}
