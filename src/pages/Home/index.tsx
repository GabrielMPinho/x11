import { useEffect, useState } from 'react';
import { buscarHome } from '../../api';
import type { HomeData } from '../../types';
import Hero from './Hero';
import FavoritosColecao from './FavoritosColecao';
import BikeFestBanner from './BikeFestBanner';
import CategoriasPopulares from './CategoriasPopulares';
import AventuraBanner from './AventuraBanner';
import SeuTerritorio from './SeuTerritorio';
import MaisVendidos from './MaisVendidos';
import DiarioDeBordo from './DiarioDeBordo';
import FraseFinal from './FraseFinal';

export default function Home() {
  const [dados, setDados] = useState<HomeData | null>(null);

  useEffect(() => {
    document.title = 'X11 Expert Riders · Engenharia que veste o piloto';
    buscarHome().then(setDados).catch(() => {});
  }, []);

  if (!dados) return null;

  return (
    <>
      <Hero />
      <FavoritosColecao favoritos={dados.favoritos} />
      <BikeFestBanner />
      <CategoriasPopulares categorias={dados.populares} />
      <AventuraBanner />
      <SeuTerritorio territorios={dados.territorios} />
      <MaisVendidos produtos={dados.maisVendidos} />
      <DiarioDeBordo historias={dados.historias} />
      <FraseFinal />
    </>
  );
}
