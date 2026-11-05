import {
  AudienceSplit,
  CtaBand,
  DataStats,
  Footer,
  Hero,
  HowItWorks,
  NavBar,
  PhoneShowcase,
  TrustList,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <a className="td-btn td-btn--primary td-skip" href="#contenido">
        Saltar al contenido
      </a>
      <NavBar />
      <main id="contenido">
        <Hero />
        <HowItWorks />
        <AudienceSplit />
        <PhoneShowcase />
        <DataStats />
        <TrustList />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
