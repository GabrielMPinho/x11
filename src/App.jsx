import { MotionConfig, useAnimationFrame, useReducedMotion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import Header from "@/padrao/componentes/Header";
import Footer from "@/padrao/componentes/Footer";
import Home from "@/paginas/home/Home";

// App = SHELL compartilhado por todas as páginas (padronização): provider do
// Lenis, MotionConfig, Header e Footer. O conteúdo da página vive em
// src/paginas/<pagina>/ — por enquanto só a Home. Ao adicionar novas páginas
// (as da header + a de equipamento), o roteamento entra aqui, trocando só o
// <Home /> pelo componente da página, mantendo Header/Footer/Lenis em volta.

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

export default function App(){
    // prefers-reduced-motion: NÃO inicializar o Lenis — scroll nativo, sem
    // suavização (o projeto é rígido nisso, ver convencoes.md). Decidido
    // aqui em vez de só desligar via config, pra garantir que nenhuma
    // suavização rode de verdade quando o usuário pediu menos movimento.
    const prefereMenosMovimento = useReducedMotion();

    const layout = (
        <>
            <Header />
            <Home />
            <Footer />
        </>
    );

    return (
        // reducedMotion="user" respeita o prefers-reduced-motion do SO para
        // todo componente motion da árvore (reveal, hover, header, parallax)
        // sem precisar repetir a checagem em cada componente.
        <MotionConfig reducedMotion="user">
            {prefereMenosMovimento ? (
                layout
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
                    {layout}
                </ReactLenis>
            )}
        </MotionConfig>
    )
}
