import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useReducedMotion } from "motion/react";

// Avanço automático dos carrosséis no mobile/toque (pedido do dono,
// 2026-07-15, item 5 de correcoes-hero-historias-e-mobile.md): movimento
// CONTÍNUO e lento (~1 card a cada `msPorCard`), loop infinito SEM EMENDA —
// quem chama já renderiza a lista DUPLICADA (2 cópias) quando `ativo`; aqui
// só se avança `x` em MÓDULO da largura de UM conjunto (`trilhoRef.
// scrollWidth/2`), então o "reset" do loop nunca precisa ser feito de
// verdade (o módulo já cuida) e nunca há salto visível — a 2ª cópia cai
// exatamente sobre onde a 1ª começou.
//
// Pausa/retomada: `pausar()` (chamar em onDragStart) para o avanço na hora;
// `retomar()` (chamar em onDragEnd) espera ~1.5s e CONTINUA de onde `x`
// ficou (resincroniza o acumulador com a posição real deixada pelo drag) —
// nunca "pula" de volta pra onde estaria se o autoplay nunca tivesse parado.
//
// `prefers-reduced-motion`: autoplay nunca roda (só o arraste continua,
// tudo estático/visível por padrão) — checado aqui dentro, não precisa que
// quem chama se preocupe com isso.
export function useAutoplayCarrossel({ x, trilhoRef, qtdItens, ativo, msPorCard = 3500, msRetomada = 1500 }) {
    const prefereMenosMovimento = useReducedMotion();
    const [tocando, setTocando] = useState(true);
    const deslocamento = useRef(0);
    const larguraUmSet = useRef(0);
    const timeoutRetomar = useRef(null);
    const rodando = ativo && !prefereMenosMovimento;

    useEffect(() => {
        function medir() {
            if (!trilhoRef.current) return;
            larguraUmSet.current = trilhoRef.current.scrollWidth / 2;
        }
        medir();
        window.addEventListener("resize", medir);
        return () => window.removeEventListener("resize", medir);
    }, [trilhoRef, ativo]);

    useAnimationFrame((_t, delta) => {
        if (!rodando || !tocando || !larguraUmSet.current) return;
        const velocidade = larguraUmSet.current / (qtdItens * msPorCard); // px/ms
        deslocamento.current += velocidade * delta;
        x.set(-(deslocamento.current % larguraUmSet.current));
    });

    useEffect(() => () => { if (timeoutRetomar.current) clearTimeout(timeoutRetomar.current); }, []);

    function pausar() {
        if (!rodando) return;
        setTocando(false);
        if (timeoutRetomar.current) clearTimeout(timeoutRetomar.current);
    }

    function retomar() {
        if (!rodando) return;
        if (timeoutRetomar.current) clearTimeout(timeoutRetomar.current);
        timeoutRetomar.current = setTimeout(() => {
            const largura = larguraUmSet.current || 1;
            // Resincroniza o acumulador com onde o drag deixou `x` — sem
            // isso, o autoplay "pularia" pra posição que teria se nunca
            // tivesse pausado.
            deslocamento.current = ((-x.get() % largura) + largura) % largura;
            setTocando(true);
        }, msRetomada);
    }

    return { pausar, retomar };
}
