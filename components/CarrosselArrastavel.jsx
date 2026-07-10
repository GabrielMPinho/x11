import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { destaques } from "../src/data/destaques";

// Modo "arrastavel" do Destaques (2026-07-10) — touch/tablet/ponteiro
// grosso, sem reduced-motion. Substitui o antigo fallback de swipe nativo
// (`overflow-x:auto` + scroll-snap), que na prática não funcionava no
// mobile: a Fase 5 (Lenis) intercepta o gesto horizontal de containers
// aninhados que não tenham `data-lenis-prevent`. Aqui o trilho é um drag de
// verdade (Framer Motion `drag="x"`), independente do scroll — não lê
// `useScroll`/progresso nenhum, só a posição do dedo/mouse.
export default function CarrosselArrastavel(){
    const containerRef = useRef(null);
    const trilhoRef = useRef(null);

    // Limite do arraste medido de verdade (mesmo espírito da medição do
    // modo hijack) — não um valor chutado.
    const [maxArrasto, setMaxArrasto] = useState(0);
    useEffect(() => {
        function medir() {
            if (!trilhoRef.current || !containerRef.current) return;
            const larguraContainer = containerRef.current.clientWidth;
            const larguraTrilho = trilhoRef.current.scrollWidth;
            setMaxArrasto(Math.max(larguraTrilho - larguraContainer, 0));
        }
        medir();
        window.addEventListener("resize", medir);
        return () => window.removeEventListener("resize", medir);
    }, []);

    return (
        <section className="destaques destaques_arrastavel">
            <div id="conteudo_destaques">
                <div id="escrito_destaques">
                    <div id="titulo_destaque">
                        <p className="p_laranja">OS MAIS PROCURADOS</p>
                        <h3>OS MAIS VENDIDOS</h3>
                    </div>
                    <div id="setas_destaques">
                        <p className="seta">←</p>
                        <p className="seta">→</p>
                    </div>
                </div>
                {/* data-lenis-prevent: o Lenis (Fase 5) não pode roubar o
                    gesto horizontal desse container pro smooth scroll da
                    página — sem isso, arrastar os cards vira scroll vertical
                    suavizado em vez de mover o trilho. */}
                <div className="trilho_arrastavel_container" ref={containerRef} data-lenis-prevent>
                    <motion.div
                        className="trilho_arrastavel"
                        ref={trilhoRef}
                        drag="x"
                        dragConstraints={{ left: -maxArrasto, right: 0 }}
                        dragElastic={0.12}
                        dragMomentum
                    >
                        {destaques.map((produto, index) => (
                            <div className="card_produto card_arrastavel" key={index}>
                                <div className="zoom_imagem">
                                    <img src={produto.imagem} alt="imagem produto destaque" className="imagem_produto_destaque" />
                                </div>
                                <p className="titulo_produto_destaque">{produto.titulo}</p>
                                <p className="preco_produto_destaque">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
