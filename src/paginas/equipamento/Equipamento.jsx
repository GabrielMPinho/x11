import HeroProduto from "@/paginas/equipamento/HeroProduto";
import FaixaSpecs from "@/paginas/equipamento/FaixaSpecs";
import EngineeredFeatures from "@/paginas/equipamento/EngineeredFeatures";
import BannerTestado from "@/paginas/equipamento/BannerTestado";
import TabelaEspecificacoes from "@/paginas/equipamento/TabelaEspecificacoes";
import CarrosselDetalhes from "@/paginas/equipamento/CarrosselDetalhes";
import Avaliacoes from "@/paginas/equipamento/Avaliacoes";
import CombineSetup from "@/paginas/equipamento/CombineSetup";

// Página de detalhe do produto (PDP) — destino dos cards de Favoritos (Home)
// e da grade da PLP. Mesma liberdade de layout da Institucional/PLP (sem a
// trava "desktop >1280px pixel-idêntico"). Header/Footer vêm do shell
// (App.jsx), não renderizados aqui. Ver docs/agentes/opus/backlog/produto.md
// pro levantamento completo e docs/agentes/sonnet/fazer/
// equipamento-pagina-produto.md pra instrução seguida.
export default function Equipamento() {
  return (
    <main className="equipamento_pdp">
      <HeroProduto />
      <FaixaSpecs />
      <EngineeredFeatures />
      <BannerTestado />
      <TabelaEspecificacoes />
      <CarrosselDetalhes />
      <Avaliacoes />
      <CombineSetup />
    </main>
  );
}
