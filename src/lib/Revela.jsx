import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// Novo modelo de reveal (Fase 3, refatoração): ligado ao SCROLL, não a uma
// duração fixa. Cada unidade (seção inteira ou card) rastreia sua própria
// posição na viewport via useScroll+useTransform e mapeia o progresso em
// opacity/y — entra por baixo, assenta (estado final exato), sai por cima
// ao continuar rolando. Bidirecional por natureza: subir reverte a mesma
// curva. Regra estrutural: cada unidade tem UM ÚNICO elemento motion; os
// filhos (imagens, texto) são DOM comum, nunca motion aninhado — evita o
// bug de imagem presa em opacity:0 por propagação de variant cortada.
//
// prefers-reduced-motion: valores vindos de useScroll/useTransform são
// binds DIRETOS de scroll, não "animações" — o <MotionConfig
// reducedMotion="user"> do App.jsx NÃO os desliga sozinho (isso só vale
// pra animate/whileHover/etc). Por isso cada componente aqui checa
// useReducedMotion() e, se ligado, ignora o valor ligado ao scroll e usa
// opacity:1/y:0 fixo — nada pode ficar sumido ou parcialmente visível.

const ENTRA = 0;
const ASSENTA_INICIO = 0.28;
const ASSENTA_FIM = 0.72;
const SAI = 1;

// Unidade com scroll próprio (seções, ou qualquer bloco isolado).
export function Revela({ as = "div", className, style, distancia = 56, children, ...props }) {
    const ref = useRef(null);
    const prefereMenosMovimento = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const opacity = useTransform(
        scrollYProgress,
        [ENTRA, ASSENTA_INICIO, ASSENTA_FIM, SAI],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        scrollYProgress,
        [ENTRA, ASSENTA_INICIO, ASSENTA_FIM, SAI],
        [distancia, 0, 0, -distancia * 0.4]
    );
    const MotionTag = motion[as];
    const estiloMovimento = prefereMenosMovimento ? { opacity: 1, y: 0 } : { opacity, y };
    return (
        <MotionTag ref={ref} className={className} style={{ ...estiloMovimento, ...style }} {...props}>
            {children}
        </MotionTag>
    );
}

// Unidade que reaproveita um progresso de scroll JÁ calculado por um
// ancestral (ver src/lib/useProgressoSecao.js) — permite às cartas de um
// grid assentarem em leve sequência, todas amarradas ao MESMO progresso de
// scroll (stagger "espacial", não por tempo).
export function RevelaComProgresso({ as = "div", className, style, progresso, atraso = 0, distancia = 40, children, ...props }) {
    const prefereMenosMovimento = useReducedMotion();
    const inicio = ENTRA + atraso;
    const assentaFim = inicio + (ASSENTA_INICIO - ENTRA) + 0.06;
    const saiInicio = 0.82;
    const saiFim = 1;
    const opacity = useTransform(progresso, [inicio, assentaFim, saiInicio, saiFim], [0, 1, 1, 0]);
    const y = useTransform(progresso, [inicio, assentaFim, saiInicio, saiFim], [distancia, 0, 0, -distancia * 0.4]);
    const MotionTag = motion[as];
    const estiloMovimento = prefereMenosMovimento ? { opacity: 1, y: 0 } : { opacity, y };
    return (
        <MotionTag className={className} style={{ ...estiloMovimento, ...style }} {...props}>
            {children}
        </MotionTag>
    );
}
