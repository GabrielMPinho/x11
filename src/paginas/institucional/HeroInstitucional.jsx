import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { heroStagger, heroItem } from "@/padrao/lib/motion";

// Espelha a arquitetura do Hero_Home.jsx (entrada em stagger no load,
// camada de fundo própria com parallax ligado ao scroll), mas com classes
// e imagem próprias — não reutiliza/edita nenhum seletor do hero da Home.
export default function HeroInstitucional(){
    const heroRef = useRef(null);
    const prefereMenosMovimento = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const yFundoScroll = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const yFundo = prefereMenosMovimento ? "0%" : yFundoScroll;

    return (
        <motion.section
            className="hero_institucional"
            ref={heroRef}
            variants={heroStagger}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="hero_institucional_bg" style={{ y: yFundo }} />
            <div className="hero_institucional_escrito">
                <motion.p className="p_laranja" variants={heroItem}>INSTITUCIONAL</motion.p>
                <motion.h1 variants={heroItem}>Movidos pela mesma paixão.</motion.h1>
                <motion.p className="hero_institucional_subtitulo" variants={heroItem}>A liberdade sobre duas rodas</motion.p>
            </div>
        </motion.section>
    )
}
