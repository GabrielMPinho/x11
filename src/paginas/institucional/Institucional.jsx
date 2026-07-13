import HeroInstitucional from "@/paginas/institucional/HeroInstitucional";
import QuemSomos1 from "@/paginas/institucional/QuemSomos1";
import QuemSomos2 from "@/paginas/institucional/QuemSomos2";
import Timeline from "@/paginas/institucional/Timeline";
import QuemSomos3 from "@/paginas/institucional/QuemSomos3";
import Missao from "@/paginas/institucional/Missao";
import Valores from "@/paginas/institucional/Valores";

// Página "Institucional" (página da navegação), completa (2026-07-13):
// Hero + 6 seções, na ordem do layout. Header/Footer/tokens/lib são
// compartilhados de src/padrao/ — o Footer do shell já cobre a seção final
// do layout (docs/agentes/opus/backlog/institucional.md, item 8).
export default function Institucional(){
    return (
        <main className="institucional">
            <HeroInstitucional />
            <QuemSomos1 />
            <QuemSomos2 />
            <Timeline />
            <QuemSomos3 />
            <Missao />
            <Valores />
        </main>
    )
}
