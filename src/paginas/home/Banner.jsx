import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/padrao/lib/motion";

// Frase estática (sem marquee) — só a ENTRADA muda: cada palavra nasce
// borrada (filter:blur) e sem opacidade, e "foca" em sequência (stagger),
// reproduzindo o preset `blur` do TextEffect (motion-primitives) com o
// pacote `motion` já existente do projeto, sem dependência nova.
// Exceção consciente à regra "só transform/opacity": aqui também anima-se
// `filter:blur()` — é uma entrada única, não um loop, e assenta em
// blur(0) (ver docs/agentes/sonnet/contexto/convencoes.md).
const LINHA_1 = ["A", "MARCA", "MAIS", "DEMOCRÁTICA", "DO"];
const LINHA_2 = ["MOTOCILISMO", "BRASILEIRO"];

const containerVariants = {
    escondido: {},
    visivel: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const palavraVariants = {
    escondido: { opacity: 0, filter: "blur(10px)", y: 10 },
    visivel: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.45, ease: EASE } },
};

// Espaço normal (quebrável) entre as palavras — preserva o wrap natural do
// texto em telas estreitas, igual ao texto plano original (nada de nbsp,
// que travaria a linha inteira e criaria overflow horizontal no mobile).
function renderLinha(palavras, prefixo) {
    const nos = [];
    palavras.forEach((palavra, i) => {
        if (i > 0) nos.push(" ");
        nos.push(
            <motion.span className="palavra_banner" variants={palavraVariants} key={`${prefixo}-${i}`}>
                {palavra}
            </motion.span>
        );
    });
    return nos;
}

export default function Banner(){
    const prefereMenosMovimento = useReducedMotion();

    return(
        <section className="banner">
            <div id="texto_banner">
                <motion.h1
                    initial={prefereMenosMovimento ? "visivel" : "escondido"}
                    whileInView="visivel"
                    viewport={{ amount: 0.4 }}
                    variants={containerVariants}
                >
                    {renderLinha(LINHA_1, "l1")}
                    <br />
                    {renderLinha(LINHA_2, "l2")}
                </motion.h1>
            </div>
        </section>
    )
}
