import { useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import logo from "../src/assets/images/logo.png";
import { navegacao } from "../src/data/navegacao";

const EASE = [0.22, 1, 0.36, 1];

// 3 estados (diretiva do dono):
// - "completo": no Hero/topo — header cheio, como o design original.
// - "escondido": saiu do Hero rolando pra BAIXO — some (desliza pra cima).
// - "compacto": abaixo do Hero, rolando pra CIMA — versão reduzida, fixa.
export default function Header(){
    const [menuAberto, setMenuAberto] = useState(false);
    const [estado, setEstado] = useState("completo");
    const prefereMenosMovimento = useReducedMotion();
    const { scrollY } = useScroll();
    const ultimoY = useRef(0);

    useMotionValueEvent(scrollY, "change", (y) => {
        const limiteHero = typeof window !== "undefined" ? window.innerHeight * 0.7 : 600;
        const indoParaBaixo = y > ultimoY.current;
        ultimoY.current = y;

        if (y < limiteHero) {
            setEstado("completo");
        } else if (indoParaBaixo) {
            setEstado("escondido");
        } else {
            setEstado("compacto");
        }
    });

    // reduced-motion: nada pode sumir — header sempre completo e estático.
    const estadoEfetivo = prefereMenosMovimento ? "completo" : estado;
    const flutuante = estadoEfetivo !== "completo";

    return(
        <motion.header
            className={[
                flutuante ? "header_flutuante" : null,
                estadoEfetivo === "compacto" ? "header_compacto" : null,
            ].filter(Boolean).join(" ") || undefined}
            animate={{
                y: estadoEfetivo === "escondido" ? "-100%" : "0%",
                opacity: estadoEfetivo === "escondido" ? 0 : 1,
            }}
            transition={{ duration: prefereMenosMovimento ? 0 : 0.4, ease: EASE }}
        >
            <img src={logo} alt="logo laranja"/>
            <nav>
                {navegacao.map((item, index) => (
                    <a href={item.link} key={index}>{item.nome}</a>
                ))}
            </nav>
            <button
                id="botao_hamburguer"
                aria-label="Abrir menu"
                aria-expanded={menuAberto}
                aria-controls="drawer_menu"
                onClick={() => setMenuAberto(true)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <AnimatePresence>
                {menuAberto && (
                    <>
                        <motion.div
                            className="overlay_menu"
                            onClick={() => setMenuAberto(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: prefereMenosMovimento ? 0 : 0.25 }}
                        />
                        <motion.nav
                            id="drawer_menu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: prefereMenosMovimento ? 0 : 0.3, ease: "easeInOut" }}
                        >
                            {navegacao.map((item, index) => (
                                <a
                                    href={item.link}
                                    key={index}
                                    onClick={() => setMenuAberto(false)}
                                >
                                    {item.nome}
                                </a>
                            ))}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
