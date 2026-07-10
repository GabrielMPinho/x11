import { useScroll } from "motion/react";

// Hook para o container de uma seção/grid: mede o próprio progresso de
// scroll (0 = entra por baixo da viewport, 1 = sai por cima) pra repassar
// às cartas via RevelaComProgresso (src/lib/Revela.jsx).
export function useProgressoSecao(ref) {
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    return scrollYProgress;
}
