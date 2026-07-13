import { useEffect } from "react";
import { MotionConfig, useAnimationFrame, useReducedMotion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/padrao/componentes/Header";
import Footer from "@/padrao/componentes/Footer";
import Home from "@/paginas/home/Home";
import Institucional from "@/paginas/institucional/Institucional";
import Homem from "@/paginas/homem/Homem";
import Mulher from "@/paginas/mulher/Mulher";
import GuiaDeEquipamento from "@/paginas/guia-de-equipamento/GuiaDeEquipamento";
import OndeEncontrar from "@/paginas/onde-encontrar/OndeEncontrar";
import Equipamento from "@/paginas/equipamento/Equipamento";

// App = SHELL compartilhado por todas as páginas (padronização): Router,
// provider do Lenis, MotionConfig, Header e Footer. O conteúdo de cada
// página vive em src/paginas/<pagina>/ e é escolhido pela rota (<Routes>
// abaixo) — Header/Footer/Lenis permanecem fixos ao redor da troca.

// Fase 5: sincroniza o rAF do Lenis com o frameloop do Framer Motion em vez
// de 2 loops de rAF independentes. O reveal (`useScroll` em Revela/
// useProgressoSecao) e o carrossel (`useScroll` em CarrosselDestaques) leem
// a posição de scroll a cada frame do Framer — sem essa sincronia, o rAF do
// Lenis e o do Framer rodam desencontrados, e dá um atraso/tranco
// perceptível de ~1 frame entre o smooth scroll e o que a tela desenha.
// `useAnimationFrame` (hook público de "motion/react") já roda dentro do
// MESMO batcher que o `useScroll`/`useTransform` do resto do projeto usam
// por baixo dos panos, e cuida da inscrição/cancelamento no frameloop
// sozinho (sem precisar de `cancelFrame`, que não é exportado por
// "motion/react" — só pelo pacote interno `motion-dom`, não uma dependência
// direta do projeto). Vive dentro do <ReactLenis> pra acessar a instância
// via useLenis() (contexto do provider).
function SincroniaLenisFramer(){
    const lenis = useLenis();

    useAnimationFrame((tempoDesdeInicio) => {
        lenis?.raf(tempoDesdeInicio);
    });

    return null;
}

// Roteamento (fase atual): reseta o scroll pro topo a cada troca de rota —
// sem isso, navegar por <Link> preservaria a posição de scroll da página
// anterior (comportamento de SPA, não o esperado ao "entrar" numa página
// nova). Usa o Lenis se estiver montado (immediate: sem smooth, é uma troca
// de tela, não um "voltar ao topo" da mesma página); cai pro scroll nativo
// no ramo reduced-motion, onde o Lenis nem existe (useLenis() -> undefined).
function RolarAoTopoNaRota(){
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    return null;
}

export default function App(){
    // prefers-reduced-motion: NÃO inicializar o Lenis — scroll nativo, sem
    // suavização (o projeto é rígido nisso, ver convencoes.md). Decidido
    // aqui em vez de só desligar via config, pra garantir que nenhuma
    // suavização rode de verdade quando o usuário pediu menos movimento.
    const prefereMenosMovimento = useReducedMotion();

    const paginas = (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/homem" element={<Homem />} />
            <Route path="/mulher" element={<Mulher />} />
            <Route path="/guia-de-equipamento" element={<GuiaDeEquipamento />} />
            <Route path="/onde-encontrar" element={<OndeEncontrar />} />
            <Route path="/equipamento" element={<Equipamento />} />
        </Routes>
    );

    const layout = (
        <>
            <Header />
            {paginas}
            <Footer />
        </>
    );

    return (
        // BrowserRouter é o wrapper mais externo: o Header (dentro do shell)
        // usa <Link>/useNavigate e precisa estar dentro do contexto do Router.
        <BrowserRouter>
            {/* reducedMotion="user" respeita o prefers-reduced-motion do SO para
                todo componente motion da árvore (reveal, hover, header, parallax)
                sem precisar repetir a checagem em cada componente. */}
            <MotionConfig reducedMotion="user">
                {prefereMenosMovimento ? (
                    <>
                        <RolarAoTopoNaRota />
                        {layout}
                    </>
                ) : (
                    // root: instância global operando no scroll nativo da janela
                    // (sem wrapper/content div extra — diferente de root:false/
                    // "asChild"), então position:sticky/fixed (header, carrossel
                    // pinado, drawer) continuam funcionando exatamente como
                    // antes. autoRaf:false porque o rAF é disparado manualmente
                    // por SincroniaLenisFramer, sincronizado com o Framer.
                    // syncTouch:false (default) mantém o toque 100% nativo — só
                    // suaviza wheel/scrollbar.
                    <ReactLenis root options={{ lerp: 0.1, autoRaf: false, syncTouch: false }}>
                        <SincroniaLenisFramer />
                        <RolarAoTopoNaRota />
                        {layout}
                    </ReactLenis>
                )}
            </MotionConfig>
        </BrowserRouter>
    )
}
