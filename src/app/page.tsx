import {
  AudienceSplit,
  CtaBand,
  DataStats,
  Footer,
  Hero,
  HowItWorks,
  NavBar,
  TrustList,
} from '@/components/sections';
import {
  Cuaderno,
  Equipo,
  Precios,
  Preguntas,
  Problema,
  Pruebalo,
  PuntajeExplicado,
  Usabilidad,
} from '@/components/story';

export default function Home() {
  return (
    <>
      <a className="td-btn td-btn--primary td-skip" href="#contenido">
        Saltar al contenido
      </a>
      <NavBar />
      <main id="contenido">
        <Hero />
        <Problema />
        <HowItWorks />
        <PuntajeExplicado />
        <AudienceSplit />
        <Cuaderno />
        <DataStats />
        <Precios />
        <Usabilidad />
        <TrustList />
        <Pruebalo />
        <Preguntas />
        <Equipo />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
