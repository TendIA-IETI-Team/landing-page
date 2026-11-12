/**
 * Sections added after v1, all from the final main repo (README, docs/model-card.md,
 * docs/usabilidad.md, docs/planificacion.md, services/scoring): Problema, PuntajeExplicado,
 * Cuaderno, Precios, Usabilidad, Pruebalo, Preguntas, Equipo.
 */
import Image from 'next/image';
import { contactEmail, links } from '@/config/links';
import { PUNTAJE_EJEMPLO, RateChart, ScoreBreakdown } from './charts';
import { Alerta, Badge, ButtonLink, Card, ScoreHero, SectionHead } from './ui';

export function Problema() {
  return (
    <section className="td-section td-section--white" id="problema">
      <div className="td-container td-two">
        <div>
          <SectionHead
            eyebrow="El problema"
            title="Vender todos los días no basta para que el banco te vea"
            lead="Sin historial bancario ni estados financieros, muchas tiendas terminan pidiéndole al gota a gota."
          />
          <div className="mt-8">
            <div className="td-big">9,6 %</div>
            <p className="mt-1 max-w-md">
              de las tiendas de Bogotá que pidieron crédito acudió al gota a gota.
            </p>
            <p className="td-source">DANE · Encuesta de Micronegocios (EMICRON 2024)</p>
          </div>
        </div>
        <Card>
          <RateChart />
        </Card>
      </div>
    </section>
  );
}

export function PuntajeExplicado() {
  return (
    <section className="td-section td-section--white" id="puntaje">
      <div className="td-container">
        <SectionHead
          eyebrow="Tu puntaje, explicado"
          title="Cada punto tiene una razón que puedes leer"
          lead="Un negocio promedio parte de 615 puntos. Cada factor de tu negocio suma o resta, y la suma es exacta: sabes qué mejorar."
        />
        <div className="td-two">
          <div className="grid gap-6">
            <Card>
              <ScoreHero puntaje={PUNTAJE_EJEMPLO} />
            </Card>
            <Alerta tono="info">
              La IA no calcula tu puntaje. Lo calcula un modelo que se explica variable por
              variable; Claude solo lo pone en palabras sencillas, y si no está disponible se usa
              una plantilla.
            </Alerta>
            <p className="td-note">
              Ejemplo real del modelo tendia-v2 con una tienda tradicional simulada. Aquí, pagarle a
              tiempo al proveedor es lo que más resta: es lo primero que conviene mejorar.
            </p>
          </div>
          <Card>
            <ScoreBreakdown />
          </Card>
        </div>
      </div>
    </section>
  );
}

const LEIDO = [
  { fecha: '20 oct', ventas: '$285.000', fiado: '—' },
  { fecha: '21 oct', ventas: '$310.000', fiado: 'doña Rosa $15.000' },
  { fecha: '22 oct', ventas: '$198.000', fiado: '—' },
  { fecha: '23 oct', ventas: '$342.000', fiado: 'don Pedro $20.000' },
  { fecha: '24 oct', ventas: '$401.000', fiado: '—' },
];

export function Cuaderno() {
  return (
    <section className="td-section td-section--white" id="cuaderno">
      <div className="td-container">
        <SectionHead
          eyebrow="Tendi y Mi cuaderno"
          title="Tu cuaderno también cuenta"
          lead="Le tomas una foto a la hoja y Claude la lee. O se lo cuentas a Tendi por chat o por WhatsApp: «hoy vendí 200 mil y le fié 15 mil a doña Rosa»."
        />
        <div className="td-cuaderno">
          <figure className="td-photo">
            <Image
              src="/media/cuaderno-ejemplo.jpg"
              alt="Hoja de cuaderno de octubre con ventas del 20 al 24 y dos fiados, a doña Rosa y a don Pedro"
              width={390}
              height={477}
              sizes="(min-width: 1024px) 360px, 100vw"
            />
            <figcaption className="td-caption">Una hoja del cuaderno</figcaption>
          </figure>
          <div>
            <Card className="!p-0 overflow-hidden">
              <table className="td-table">
                <caption className="sr-only">Lo que Claude leyó de la hoja del cuaderno</caption>
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Ventas</th>
                    <th scope="col">Fiados</th>
                  </tr>
                </thead>
                <tbody>
                  {LEIDO.map((r) => (
                    <tr key={r.fecha}>
                      <td>{r.fecha}</td>
                      <td>{r.ventas}</td>
                      <td>{r.fiado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <p className="td-caption">Así la leyó Claude</p>
            <p className="td-note">
              Nada se guarda hasta que tú lo confirmas o lo corriges. Sin IA, también puedes anotar
              a mano.
            </p>
          </div>
          <figure className="m-0 flex flex-col items-center">
            <div className="td-phone">
              <Image
                src="/media/app-tendi-cuaderno.gif"
                alt="Grabación de la app: el tendero le escribe a Tendi una venta y un fiado, y luego toma la foto del cuaderno"
                width={306}
                height={633}
                unoptimized
              />
            </div>
            <figcaption className="td-caption">Grabación de la app real</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function Precios() {
  const mailto = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent('Quiero ser aliado de TendIA')}`
    : null;
  return (
    <section className="td-section td-section--tint" id="precios">
      <div className="td-container">
        <SectionHead
          eyebrow="Para entidades"
          title="Un plan simple. El tendero nunca paga."
          lead="Para cooperativas, microfinancieras, distribuidores que fían, fintechs y bancos. Usan el portal o conectan su sistema a la API."
        />
        <div className="td-two">
          <Card className="td-price">
            <Badge tono="info" className="self-start">
              Plan mensual por entidad
            </Badge>
            <div className="td-price__amount">
              <span className="td-big">$1.800.000</span>
              <span className="td-price__per">al mes · 500 puntajes incluidos</span>
            </div>
            <div className="td-price__extra">
              <span>Cada puntaje adicional</span>
              <b>$3.500</b>
            </div>
            <ul className="td-checks">
              <li>Bandeja con puntaje, franja y sugerencia según tu política de riesgo.</li>
              <li>Explicación variable por variable, tasa real del mercado y segmento DANE.</li>
              <li>Pide garantías y recibe los documentos del tendero.</li>
              <li>API pública con llaves, consumo por mes y bitácora de accesos.</li>
              <li>Equipo con roles y verificación en dos pasos obligatoria.</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              {mailto ? (
                <ButtonLink href={mailto} variant="primary">
                  Hablemos
                </ButtonLink>
              ) : null}
              <ButtonLink href={links.portal} variant="secondary">
                Ver el portal
              </ButtonLink>
            </div>
            <p className="td-source">Precios en pesos colombianos.</p>
          </Card>
          <figure className="m-0">
            <div className="td-browser">
              <div className="td-browser__bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Image
                src="/screens/portal-bandeja.png"
                alt="Portal del aliado: bandeja de solicitudes con puntaje, franja, segmento, factores principales y sugerencia"
                width={1280}
                height={800}
                sizes="(min-width: 900px) 520px, 100vw"
              />
            </div>
            <figcaption className="td-caption">La bandeja del portal del aliado</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const CAMBIOS = [
  { antes: 'Cinco niveles de puntaje', despues: 'Tres franjas: bajo, medio y bueno' },
  { antes: '“Datos auto-reportados”', despues: '“Lo que tú nos cuentas”' },
  { antes: '“En revisión”', despues: 'Quién está revisando tu solicitud' },
];

export function Usabilidad() {
  return (
    <section className="td-section td-section--white" id="tenderos-reales">
      <div className="td-container td-two">
        <div>
          <SectionHead
            eyebrow="Diseñado con tenderos"
            title="Doña Gloria cambió la app"
            lead="La primera prueba fue con doña Gloria, en su tienda de Kennedy. Lo que no entendió, lo cambiamos."
          />
          <ul className="td-changes">
            {CAMBIOS.map((c) => (
              <li key={c.despues}>
                <span className="td-changes__from">
                  <span className="sr-only">Antes: </span>
                  {c.antes}
                </span>
                <span className="td-changes__to">
                  <span className="sr-only">Ahora: </span>
                  {c.despues}
                </span>
              </li>
            ))}
          </ul>
          <div className="td-figures">
            <div>
              <div className="td-figure__num">9 de 9</div>
              <p className="td-figure__text">tareas completadas en la app real</p>
            </div>
            <div>
              <div className="td-figure__num">≈ 3:40</div>
              <p className="td-figure__text">minutos para hacerlas todas, como alguien nuevo</p>
            </div>
            <div>
              <div className="td-figure__num">11</div>
              <p className="td-figure__text">problemas encontrados y corregidos</p>
            </div>
          </div>
          <p className="td-note">
            Cifras de una evaluación sin usuarios sobre la app real: modelo KLM, heurísticas de
            Nielsen y revisión de accesibilidad. Las sesiones con más tenderos siguen el mismo
            guion.
          </p>
        </div>
        <div>
          <div className="td-beforeafter">
            <figure>
              <Image
                src="/media/antes-garantia.png"
                alt="Antes: la app pedía el respaldo del Fondo Nacional de Garantías sin explicar qué es"
                width={300}
                height={649}
                sizes="(min-width: 900px) 240px, 45vw"
              />
              <figcaption className="td-caption">Antes</figcaption>
            </figure>
            <figure>
              <Image
                src="/media/despues-garantia.png"
                alt="Después: «Es como un fiador, pero del Estado: si no pudieras pagar, el Fondo le responde a la entidad por una parte de la deuda»"
                width={300}
                height={649}
                sizes="(min-width: 900px) 240px, 45vw"
              />
              <figcaption className="td-caption">Ahora</figcaption>
            </figure>
          </div>
          <p className="td-note text-center">
            El respaldo del Fondo Nacional de Garantías, explicado como un fiador.
          </p>
        </div>
      </div>
    </section>
  );
}

const CELULARES = [
  { n: '300 000 0001', perfil: 'Buen negocio', ves: 'Puntaje alto y aprobación' },
  {
    n: '300 000 0002',
    perfil: 'Caída fuerte en enero',
    ves: 'Justificar un mes malo con una foto',
  },
  { n: '300 000 0003', perfil: 'Negocio riesgoso', ves: 'Rechazo con consejos para mejorar' },
  { n: '300 000 0004', perfil: 'Negocio nuevo', ves: 'Completar a mano los datos que faltan' },
];

export function Pruebalo() {
  return (
    <section className="td-section td-section--white" id="pruebalo">
      <div className="td-container td-two">
        <div>
          <SectionHead
            eyebrow="Pruébalo tú mismo"
            title="Entra a la app con un celular de demostración"
            lead="Son tiendas simuladas: no necesitas tus datos ni recibir un SMS."
          />
          <ol className="td-numbered">
            <li>Abre la app desde tu celular o tu computador.</li>
            <li>Escribe uno de estos números.</li>
            <li>El código de ingreso aparece en la pantalla.</li>
          </ol>
          <div className="mt-6">
            <ButtonLink href={links.app} variant="primary" size="lg">
              Abrir la app
            </ButtonLink>
          </div>
        </div>
        <div>
          <ul className="td-phones" aria-label="Celulares de demostración">
            {CELULARES.map((c) => (
              <li key={c.n}>
                <span className="td-phones__num">{c.n}</span>
                <b className="mt-1 block">{c.perfil}</b>
                <span className="td-phones__what">{c.ves}</span>
              </li>
            ))}
          </ul>
          <p className="td-note">
            ¿Eres de una entidad? El portal tiene cuentas de demostración de un banco y de una
            microfinanciera:{' '}
            {contactEmail ? (
              <a
                className="underline"
                href={`mailto:${contactEmail}?subject=${encodeURIComponent('Cuenta de demostración del portal TendIA')}`}
              >
                pídenos una
              </a>
            ) : (
              <a className="underline" href={links.repo}>
                están en el README
              </a>
            )}
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export const PREGUNTAS = [
  {
    q: '¿TendIA me presta la plata?',
    a: 'No. TendIA no presta dinero ni es una central de riesgo. Calcula tu puntaje y tú decides con qué entidad compartirlo; la entidad decide si te presta y en qué condiciones.',
  },
  {
    q: '¿Cuánto me cuesta?',
    a: 'Nada. El tendero nunca paga: pagan las entidades que usan el puntaje para decidir.',
  },
  {
    q: '¿Quién ve mi puntaje?',
    a: 'Solo la entidad que tú elijas en la app, junto con su explicación y los datos que autorizaste. Cada consulta queda en una bitácora que nadie puede editar.',
  },
  {
    q: '¿Qué pasa si tuve un mes malo?',
    a: 'Lo justificas con una foto o una explicación y el puntaje se recalcula sin ese mes. La entidad ve los dos puntajes y el motivo.',
  },
  {
    q: '¿Necesito datáfono?',
    a: 'No. Puedes anotar tus ventas a mano, con Tendi o con una foto de tu cuaderno. Si no tienes historia con un distribuidor, el puntaje se basa en tu negocio.',
  },
  {
    q: '¿Puedo quitar un permiso?',
    a: 'Sí, cuando quieras, en «Mis autorizaciones». Al quitarlo borramos los datos de esa fuente y dejamos de consultarla.',
  },
  {
    q: '¿La IA decide mi puntaje?',
    a: 'No. Lo calcula un modelo que se explica variable por variable. La IA (Claude) solo lo pone en palabras sencillas, te ayuda a anotar con Tendi y lee la foto del cuaderno.',
  },
  {
    q: '¿En qué estado está TendIA?',
    a: 'Es un proyecto de IETI de la Escuela Colombiana de Ingeniería, en línea como demostración. Las conexiones con datáfonos, distribuidores y bancos están simuladas con datos del DANE; lo siguiente es un piloto con 10 entidades y convenios con proveedores de datos.',
  },
];

export function Preguntas() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PREGUNTAS.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };
  return (
    <section className="td-section td-section--tint" id="preguntas">
      <div className="td-container">
        <SectionHead eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan" />
        <div className="td-faq">
          {PREGUNTAS.map((p) => (
            <details key={p.q}>
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </section>
  );
}

const EQUIPO = [
  { n: 'Andersson David Sánchez Méndez', r: 'QA & Data/ML Lead', gh: 'AnderssonProgramming' },
  { n: 'Cristian Santiago Pedraza Rodríguez', r: 'Backend Developer', gh: 'cris-eci' },
  { n: 'David Santiago Villadiego Médicis', r: 'Data Scientist', gh: 'Krayangel' },
  { n: 'David Stiven Sarria Arcila', r: 'Product & Business Strategy', gh: 'DASarria' },
  { n: 'Juan Esteban Lozano Cárdenas', r: 'UX/UI & Wireframes', gh: 'juanLozano-2004' },
  { n: 'Raquel Iveth Selma Ayala', r: 'Documentation & QA', gh: 'RaquelSAyala' },
];

const iniciales = (n: string) =>
  n
    .split(' ')
    .filter((_, i, a) => i === 0 || i === Math.ceil(a.length / 2))
    .map((w) => w[0])
    .join('');

export function Equipo() {
  return (
    <section className="td-section" id="equipo">
      <div className="td-container">
        <SectionHead
          eyebrow="Equipo"
          title="Quiénes hacemos TendIA"
          lead="Proyecto de IETI en la Escuela Colombiana de Ingeniería Julio Garavito, 2026."
        />
        <ul className="td-team" role="list">
          {EQUIPO.map((p) => (
            <li key={p.gh}>
              <Card className="td-person">
                <span className="td-person__initials" aria-hidden="true">
                  {iniciales(p.n)}
                </span>
                <div>
                  <p className="td-person__name">{p.n}</p>
                  <p className="td-person__role">{p.r}</p>
                  <a className="td-person__gh" href={`https://github.com/${p.gh}`}>
                    @{p.gh}
                  </a>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
