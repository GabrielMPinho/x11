import { useEffect } from 'react';
import Hero from './Hero';
import QuemSomosIntro from './QuemSomosIntro';
import DiferenciaisIcons from './DiferenciaisIcons';
import FeitaPorMotociclistas from './FeitaPorMotociclistas';
import Timeline from './Timeline';
import CadaDetalhe from './CadaDetalhe';
import Missao from './Missao';
import Valores from './Valores';

export default function Institucional() {
  useEffect(() => {
    document.title = 'Movidos pela mesma paixão · X11 Expert Riders';
  }, []);

  return (
    <>
      <Hero />

      <div className="container-x11 section">
        <QuemSomosIntro />
        <DiferenciaisIcons />
        <FeitaPorMotociclistas />
        <Timeline />
        <CadaDetalhe />
      </div>

      <Missao />
      <Valores />
    </>
  );
}
