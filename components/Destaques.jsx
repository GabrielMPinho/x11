import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { destaques } from "../src/data/destaques";
import { RevelaComProgresso } from "../src/lib/Revela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "../src/lib/useEstiloRevela";
import CarrosselDestaques from "./CarrosselDestaques";

// Fase 4 (pedido do dono): "OS MAIS VENDIDOS" vira um Horizontal Scroll
// Carousel (mecanismo de referência: hover.dev/Framer Motion, código
// completo em docs/agentes/sonnet/fazer/fase-4-carrossel-destaques.md) —
// EXCEÇÃO PONTUAL E APROVADA à regra de ouro: só esta seção muda no
// desktop >1280px. Só ativa com ponteiro fino (mouse/trackpad) em telas
// >1280px — em qualquer outro caso (tablet, touch, reduced-motion) cai no
// fallback de swipe nativo (Parte 2/3), nunca faz scroll-hijack no toque.
function useModoCarrossel() {
    const [carrossel, setCarrossel] = useState(false);
    const prefereMenosMovimento = useReducedMotion();

    useEffect(() => {
        if (prefereMenosMovimento || typeof window === "undefined") {
            setCarrossel(false);
            return;
        }
        const consulta = window.matchMedia("(pointer: fine) and (min-width: 1281px)");
        const atualizar = () => setCarrossel(consulta.matches);
        atualizar();
        consulta.addEventListener("change", atualizar);
        return () => consulta.removeEventListener("change", atualizar);
    }, [prefereMenosMovimento]);

    return carrossel;
}

export default function Destaques(){
    const carrossel = useModoCarrossel();
    const refFallback = useRef(null);
    const progressoFallback = useProgressoSecao(refFallback);

    // Carrossel isolado num componente-filho próprio (fix 2026-07-10): só
    // monta quando `carrossel` já é `true`, então o `useScroll({target})`
    // dele inicializa com o ref JÁ anexado no 1º render — ver
    // CarrosselDestaques.jsx pro porquê (era a causa do trilho ficar
    // travado em x:0 mesmo com o pin e a medição corretos).
    if (carrossel) {
        return <CarrosselDestaques />;
    }

    // Fallback (≤1280px, ponteiro grosso/touch, ou reduced-motion): grade/
    // swipe nativo com snap (ver CSS), sem 300vh nem pin. Amplitude do
    // reveal por card reforçada (distancia/saida maiores que o padrão) —
    // review do dono: "os mais vendidos estão com pouca animação" nesta
    // seção especificamente; o atraso/largura de entrada dos cards
    // continuam vindo de atrasoCard/LARGURA_ENTRADA_CARD (não regride o
    // fix de "último card só assenta depois do centro").
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
