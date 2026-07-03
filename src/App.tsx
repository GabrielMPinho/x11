import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CompareBadge from './components/CompareBadge';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Produto from './pages/Produto';
import Comparar from './pages/Comparar';
import OndeEncontrar from './pages/OndeEncontrar';
import GuiaEquipamento from './pages/GuiaEquipamento';
import Busca from './pages/Busca';
import Institucional from './pages/Institucional';
import Pagina from './pages/Pagina';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:slug" element={<Catalogo />} />
          <Route path="/produto/:slug" element={<Produto />} />
          <Route path="/comparar" element={<Comparar />} />
          <Route path="/onde-encontrar" element={<OndeEncontrar />} />
          <Route path="/guia-de-equipamento" element={<GuiaEquipamento />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/institucional" element={<Institucional />} />
          <Route path="/pagina/:slug" element={<Pagina />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CompareBadge />
    </>
  );
}
