import { useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { useLenis } from "lenis/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/padrao/assets/images/logo.png";
import { navegacao } from "@/padrao/dados/navegacao";

const EASE = [0.22, 1, 0.36, 1];

// Histerese do limiar Hero (zona morta pra não "piscar" perto do ponto de
// troca): entra em minimalista ao PASSAR de 0.7×altura da janela, mas só
// volta a "completo" ao subir abaixo de 0.5×altura.
const ENTRA_MINIMALISTA = 0.7;
const VOLTA_COMPLETO = 0.5;

// Novo design (2026-07-10) — 2 estados, header SEMPRE presente (substitui o
// modelo de 3 estados/"escondido" da rodada anterior, que o dono achou
// bugado):
// - "completo": no Hero/topo — o <header> original, cheio, SEMPRE em fluxo
//   normal (nunca vira fixed — nunca causa pulo em <main>).
// - "minimalista": resto da página — uma barra FIXA independente
//   (`.header_minimalista`, elemento separado, nunca ocupa fluxo), que
//   aparece via fade/slide curto e permanece SEMPRE visível (não some ao
//   rolar pra baixo).
export default function Header(){
    const [menuAberto, setMenuAberto] = useState(false);
    const [estado, setEstado] = useState("completo");
    const prefereMenosMovimento = useReducedMotion();
    const { scrollY } = useScroll();
    const lenis = useLenis();
    const navegar = useNavigate();

    useMotionValueEvent(scrollY, "change", (y) => {
        const alturaJanela = typeof window !== "undefined" ? window.innerHeight : 800;
        setEstado((atual) => {
            if (atual === "completo") {
                return y > alturaJanela * ENTRA_MINIMALISTA ? "minimalista" : "completo";
            }
            return y < alturaJanela * VOLTA_COMPLETO ? "completo" : "minimalista";
        });
    });

    const minimalista = estado === "minimalista";

    // Logo clicável → navega pra "/" (Roteamento) e rola ao topo. Usa o
    // Lenis já montado pela Fase 5 pra rolar suave; `useLenis()` retorna
    // `undefined` quando o Lenis não está ativo (reduced-motion, App.jsx nem
    // monta o <ReactLenis> nesse caso) — cai pro `scrollTo` nativo,
    // instantâneo (sem "smooth" que o dono de reduced-motion não pediu). Se
    // já estiver em "/", o `navigate` é um no-op e só o scroll acontece
    // (mesmo efeito de "voltar ao topo" que a logo sempre teve).
    function irParaHome(evento){
        evento.preventDefault();
        navegar("/");
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0 });
        }
    }

    // Link "INSTITUCIONAL" do nav → mesmo raciocínio do logo: navega pra
    // /institucional e rola ao topo. Precisa do scroll EXPLÍCITO (não só do
    // reset automático de rota em App.jsx) porque, se já estiver em
    // /institucional, o `navigate` é um no-op — o pathname não muda, o
    // `RolarAoTopoNaRota` (que só dispara no `useEffect` quando o pathname
    // muda) nunca rodaria, e o clique pareceria não fazer nada estando
    // rolado pra baixo na própria página.
    function irParaInstitucional(evento){
        evento.preventDefault();
        navegar("/institucional");
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0 });
        }
    }

    return (
        <>
            {/* Completo — sempre em fluxo normal, sem exceção: nenhuma
                classe/estilo condicional é aplicada aqui. No Hero/topo é
                pixel-idêntico ao original; ao rolar, só sai de vista como
                qualquer header não-fixo (nunca é removido do fluxo depois
                de montado, então nunca desloca <main>). */}
            <header>
                <button
                    type="button"
                    className="logo_home_botao"
                    aria-label="Início — voltar ao topo"
                    onClick={irParaHome}
                >
                    <img src={logo} alt="logo laranja"/>
                </button>
                <nav>
                    {navegacao.map((item, index) => (
                        <Link
                            to={item.link}
                            key={index}
                            onClick={item.link === "/institucional" ? irParaInstitucional : undefined}
                        >
                            {item.nome}
                        </Link>
                    ))}
                </nav>
                <button
                    className="botao_hamburguer"
                    aria-label="Abrir menu"
                    aria-expanded={menuAberto}
                    aria-controls="drawer_menu"
                    onClick={() => setMenuAberto(true)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            {/* Minimalista — elemento fixo INDEPENDENTE do <header> acima
                (não é o mesmo nó DOM trocando de classe): monta/desmonta via
                AnimatePresence só quando fora do Hero. Como nunca ocupa
                fluxo, esse mount/unmount não desloca nada — dispensa o
                espaçador que o modelo anterior precisava. */}
            <AnimatePresence>
                {minimalista && (
                    <motion.div
                        className="header_minimalista"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: prefereMenosMovimento ? 0 : 0.3, ease: EASE }}
                    >
                        <button
                            type="button"
                            className="logo_home_botao"
                            aria-label="Início — voltar ao topo"
                            onClick={irParaHome}
                        >
                            <img src={logo} alt="logo laranja"/>
                        </button>
                        <nav>
                            {navegacao.map((item, index) => (
                                <Link
                                    to={item.link}
                                    key={index}
                                    onClick={item.link === "/institucional" ? irParaInstitucional : undefined}
                                >
                                    {item.nome}
                                </Link>
                            ))}
                        </nav>
                        <button
                            className="botao_hamburguer"
                            aria-label="Abrir menu"
                            aria-expanded={menuAberto}
                            aria-controls="drawer_menu"
                            onClick={() => setMenuAberto(true)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Drawer/overlay do menu mobile — compartilhado pelos 2
                gatilhos acima (completo e minimalista), inalterado desde a
                Fase 2. */}
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
                                <Link
                                    to={item.link}
                                    key={index}
                                    onClick={(evento) => {
                                        setMenuAberto(false);
                                        if (item.link === "/institucional") irParaInstitucional(evento);
                                    }}
                                >
                                    {item.nome}
                                </Link>
                            ))}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
