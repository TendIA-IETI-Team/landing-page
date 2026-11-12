/**
 * Two server-rendered charts (no client JS). Colors: chart-primary and chart-negative, validated
 * with the dataviz palette checker (CVD ΔE 10,8 · contrast ≥ 3:1 on white and indigo100). Every
 * value is printed as text, so color is never the only signal.
 */

const AXIS_MAX = 700;
const pct = (v: number) => `${(v / AXIS_MAX) * 100}%`;
const es = (n: number, d = 1) =>
  n.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d });

/**
 * Annual cost of credit. Formal: 5.992 productive credits to Bogotá shops (Superfinanciera,
 * datos.gov.co w9zh-vetq), p25 48,8 % · median 61,9 % · p75 65,5 % E.A. Loan sharks: 382 %–666 %
 * E.A. (docs/contexto.md in the main repo).
 */
export function RateChart() {
  const formal = { p25: 48.8, mediana: 61.9, p75: 65.5 };
  const gota = { min: 382, max: 666 };
  return (
    <figure className="td-chart" aria-labelledby="tasas-titulo">
      <figcaption>
        <p className="td-chart__title" id="tasas-titulo">
          Lo que cuesta un crédito en un año
        </p>
        <p className="td-chart__sub">Tasa efectiva anual, en la misma escala de 0 % a 700 %</p>
      </figcaption>
      <div className="td-rates">
        <div>
          <div className="td-rate__label">
            <b>Crédito formal a tiendas de Bogotá</b>
            <span className="td-rate__value">{es(formal.mediana)} %</span>
          </div>
          <div className="td-rate__track" aria-hidden="true">
            <div
              className="td-rate__bar td-rate__bar--formal"
              style={{ left: 0, width: pct(formal.mediana) }}
            />
            <div
              className="td-rate__iqr"
              style={{ left: pct(formal.p25), width: pct(formal.p75 - formal.p25) }}
            />
          </div>
          <p className="td-rate__hint">
            Mediana. La mitad de los créditos está entre {es(formal.p25)} % y {es(formal.p75)} % (el
            recuadro).
          </p>
        </div>
        <div>
          <div className="td-rate__label">
            <b>Gota a gota</b>
            <span className="td-rate__value">
              {gota.min} % a {gota.max} %
            </span>
          </div>
          <div className="td-rate__track" aria-hidden="true">
            <div
              className="td-rate__bar td-rate__bar--gota"
              style={{ left: pct(gota.min), width: pct(gota.max - gota.min) }}
            />
          </div>
          <p className="td-rate__hint">
            Entre {Math.floor(gota.min / formal.mediana)} y {Math.round(gota.max / formal.mediana)}{' '}
            veces lo que cuesta un crédito formal.
          </p>
        </div>
      </div>
      <div className="td-axis" aria-hidden="true">
        {[0, 100, 200, 300, 400, 500, 600, 700].map((t) => (
          <span key={t}>{t} %</span>
        ))}
      </div>
      <p className="td-source">
        Fuentes: <a href="https://www.datos.gov.co/d/w9zh-vetq">Superintendencia Financiera</a>,
        5.992 créditos productivos a tiendas de Bogotá; tasas del gota a gota según el análisis de
        TendIA.
      </p>
    </figure>
  );
}

/**
 * Real output of the tendia-v2 model (services/scoring in the main repo) for a simulated
 * traditional shop: base 615 − 35,0 (pagos) + 20,1 (negocio) = 600. Points have one decimal so the
 * sum is exact; the six smallest factors are grouped.
 */
const BASE = 615;
const FACTORES = [
  { t: 'Meses en que le pagaste a tiempo a tu proveedor', v: '83 %', p: -66.9 },
  { t: 'Cuánto usas del cupo que te da el proveedor', v: '36 %', p: 20.4 },
  { t: 'Qué tan estables son tus ventas', v: 'varían 12 % frente a su promedio', p: 19.4 },
  { t: 'El atraso más largo con tu proveedor', v: '1 mes', p: 18.1 },
  { t: 'Cómo vienen tus ventas en los últimos 3 meses', v: '+15 %', p: 6.8 },
  { t: 'Otros 6 factores', v: 'ventas promedio, antigüedad y más', p: -12.7 },
];
export const PUNTAJE_EJEMPLO = Math.round(BASE + FACTORES.reduce((s, f) => s + f.p, 0));

export function ScoreBreakdown() {
  const max = Math.max(...FACTORES.map((f) => Math.abs(f.p)));
  const signed = (p: number) => `${p > 0 ? '+' : '−'}${es(Math.abs(p))}`;
  return (
    <table className="td-breakdown">
      <caption>
        <span className="td-chart__title">Qué sumó y qué restó</span>
        <span className="td-chart__sub" style={{ display: 'block' }}>
          Puntos frente a un negocio promedio
        </span>
      </caption>
      <thead>
        <tr>
          <th scope="col">Factor</th>
          <th scope="col" className="td-breakdown__bar">
            <span className="sr-only">Gráfica</span>
          </th>
          <th scope="col" className="td-breakdown__pts">
            Puntos
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="td-breakdown__base">
          <th scope="row">Un negocio promedio parte de</th>
          <td className="td-breakdown__bar" aria-hidden="true" />
          <td className="td-breakdown__pts">{BASE}</td>
        </tr>
        {FACTORES.map((f) => (
          <tr key={f.t}>
            <th scope="row" style={{ fontWeight: 400 }}>
              {f.t}
              <span className="td-breakdown__val">{f.v}</span>
            </th>
            <td className="td-breakdown__bar" aria-hidden="true">
              <div className="td-breakdown__track">
                <div
                  className={`td-breakdown__fill td-breakdown__fill--${f.p > 0 ? 'pos' : 'neg'}`}
                  style={{ width: `calc(${(Math.abs(f.p) / max) * 50}% - 2px)` }}
                />
              </div>
            </td>
            <td className="td-breakdown__pts">{signed(f.p)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Puntaje TendIA</th>
          <td className="td-breakdown__bar" aria-hidden="true" />
          <td className="td-breakdown__pts">{PUNTAJE_EJEMPLO}</td>
        </tr>
      </tfoot>
    </table>
  );
}
