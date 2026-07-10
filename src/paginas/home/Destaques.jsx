import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { destaques } from "@/paginas/home/dados/destaques";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";
import CarrosselDestaques from "./CarrosselDestaques";
import CarrosselArrastavel from "./CarrosselArrastavel";

// Fase 4 (pedido do dono): "OS MAIS VENDIDOS" vira um Horizontal Scroll
// Carousel (mecanismo de referência: hover.dev/Framer Motion) — EXCEÇÃO
// PONTUAL E APROVADA à regra de ouro: só esta seção muda no desktop
// >1280px.
//
// 3 modos (2026-07-10 — antes eram 2: hijack + um fallback único de swipe
// nativo; o swipe não funcionava no mobile porque o Lenis, Fase 5,
// intercepta o gesto horizontal de containers aninhados sem
// `data-lenis-prevent`. O dono pediu um carrossel de verdade ARRASTÁVEL no
// lugar do swipe):
// - "hijack" — (pointer:fine) e (min-width:1281px), sem reduced-motion →
//   CarrosselDestaques (scroll-hijack, 300vh+pin). INALTERADO.
// - "arrastavel" — qualquer outro caso não-reduced-motion (touch, tablet,
//   ≤1280px, ponteiro grosso) → CarrosselArrastavel (drag de verdade,
//   Framer Motion, sem 300vh/pin, sem depender do scroll).
// - "estatico" — reduced-motion → fallback acessível de sempre (grade com
//   overflow-x:auto + scroll-snap, sem drag/inércia).
function useModoCarrossel() {
    const prefereMenosMovimento = useReducedMotion();
    const [modo, setModo] = useState(prefereMenosMovimento ? "estatico" : "arrastavel");

    useEffect(() => {
        if (prefereMenosMovimento || typeof window === "undefined") {
            setModo("estatico");
            return;
        }
        const consulta = window.matchMedia("(pointer: fine) and (min-width: 1281px)");
        const atualizar = () => setModo(consulta.matches ? "hijack" : "arrastavel");
        atualizar();
        consulta.addEventListener("change", atualizar);
        return () => consulta.removeEventListener("change", atualizar);
    }, [prefereMenosMovimento]);

    return modo;
}

export default function Destaques(){
    const modo = useModoCarrossel();
    const refFallback = useRef(null);
    const progressoFallback = useProgressoSecao(refFallback);

    // Carrossel de hijack isolado num componente-filho próprio (fix
    // 2026-07-10): só monta quando `modo` já é "hijack", então o
    // `useScroll({target})` dele inicializa com o ref JÁ anexado no 1º
    // render — ver CarrosselDestaques.jsx pro porquê. INALTERADO.
    if (modo === "hijack") {
        return <CarrosselDestaques />;
    }

    // Arrastável (touch/tablet/ponteiro grosso, sem reduced-motion): drag
    // de verdade, não ligado ao scroll — ver CarrosselArrastavel.jsx.
    if (modo === "arrastavel") {
        return <CarrosselArrastavel />;
    }

    // Estático (reduced-motion): grade/swipe nativo com snap (ver CSS),
    // sem 300vh nem pin, sem drag/inércia. Amplitude do reveal por card
    // reforçada (distancia/saida maiores que o padrão) — review do dono:
    // "os mais vendidos estão com pouca animação" nesta seção
    // especificamente; o atraso/largura de entrada dos cards continuam
    // vindo de atrasoCard/LARGURA_ENTRADA_CARD (não regride o fix de
    // "último card só assenta depois do centro"). `RevelaComProgresso` já
    // força `opacity:1;y:0` sozinho quando reduced-motion está ligado —
    // este branch já é 100% estático de fato.
    return(
        <section className="destaques" ref={refFallback}>
            <div id="conteudo_destaques">
                <div id="escrito_destaques">
                    <RevelaComProgresso as="div" id="titulo_destaque" progresso={progressoFallback} distancia={108}>
                        <p className="p_laranja">OS MAIS PROCURADOS</p>
                        <h3>OS MAIS VENDIDOS</h3>
                    </RevelaComProgresso>
                    <div id="setas_destaques">
                        <p className="seta">←</p>
                        <p className="seta">→</p>
                    </div>
                </div>
                <div id="produtos_destaques">
                    {
                        destaques.map((produto, index) => (
                            <RevelaComProgresso
                                as="div"
                                className="card_produto"
                                key={index}
                                progresso={progressoFallback}
                                atraso={atrasoCard(index, destaques.length)}
                                larguraEntrada={LARGURA_ENTRADA_CARD}
                                distancia={120}
                                saida={96}
                            >
                                <div className="zoom_imagem">
                                    <img src={produto.imagem} alt="imagem produto destaque" className="imagem_produto_destaque"/>
                                </div>
                                <p className="titulo_produto_destaque">{produto.titulo}</p>
                                <p className="preco_produto_destaque">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                            </RevelaComProgresso>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
