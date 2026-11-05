import { LEGAL, type LegalDoc, renderLegal } from '@/lib/legal';
import { Footer, NavBar } from './sections';

export async function LegalPage({ doc }: { doc: LegalDoc }) {
  const html = await renderLegal(doc);
  const other = Object.values(LEGAL).find((d) => d.path !== LEGAL[doc].path)!;
  return (
    <>
      <a className="td-btn td-btn--primary td-skip" href="#contenido">
        Saltar al contenido
      </a>
      <NavBar />
      <main id="contenido" className="td-section td-section--white">
        <article className="td-container">
          <div className="td-prose">
            <p className="td-eyebrow">Legal</p>
            <h1 className="td-h2">{LEGAL[doc].title}</h1>
            {/* Trusted content: our own documents from content/legal/, rendered at build time. */}
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <p className="td-prose__other">
              Consulta también: <a href={other.path}>{other.title}</a>.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
