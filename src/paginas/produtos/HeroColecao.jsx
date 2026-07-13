import { motion } from "motion/react";
import { heroStagger, heroItem } from "@/padrao/lib/motion";

// Faixa curta (~45vh, NÃO tela cheia — diferente do Hero da Home/Institucional)
// com foto de fundo (jaqueta_fav.jpg, via CSS em .colecao_hero_bg — PLACEHOLDER,
// a imagem definitiva da coleção o dono pode fornecer depois) + overlay
// reforçado + kicker/título. Entrada em stagger no load (mesmo padrão
// heroStagger/heroItem dos outros heroes do site), sem parallax — é uma
// faixa, não uma seção de abertura full-bleed.
export default function HeroColecao(){
    return (
        <motion.section
            className="colecao_hero"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
        >
            <div className="colecao_hero_bg" />
            <div className="colecao_hero_escrito">
                <motion.p className="p_laranja" variants={heroItem}>COLEÇÃO LAB CRAFTED</motion.p>
                <motion.h1 variants={heroItem}>COLEÇÃO<br />SPORADIC</motion.h1>
            </div>
        </motion.section>
    )
}
