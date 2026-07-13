import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { heroStagger, heroItem } from "@/padrao/lib/motion";
import BotaoCortado from "@/padrao/componentes/BotaoCortado";

export default function Hero_Home(){
    const heroRef = useRef(null);
    const prefereMenosMovimento = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const yFundoScroll = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const yFundo = prefereMenosMovimento ? "0%" : yFundoScroll;

    return(
        <motion.section
            className="hero"
            ref={heroRef}
            variants={heroStagger}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="hero_bg" style={{ y: yFundo }} />
            <div id="escrito">
                <motion.p className="p_laranja" variants={heroItem}>COLEÇÃO LAB CRAFTED</motion.p>
                <motion.h1 variants={heroItem}>ENGENHARIA QUE VESTE O PILOTO</motion.h1>
                <motion.p id="p_branco" variants={heroItem}>Equipamento desenvolvido em laboratório para proteger dentro e
                fora da estrada. Onde tecnologia encontra estilo.</motion.p>
            </div>
            <motion.div id="botoes" variants={heroItem}>
                <BotaoCortado id="botao_masculino" para="/homem">VER MASCULINO</BotaoCortado>
                <BotaoCortado id="botao_feminino" para="/mulher">VER FEMININO</BotaoCortado>
            </motion.div>
        </motion.section>
    )
}
