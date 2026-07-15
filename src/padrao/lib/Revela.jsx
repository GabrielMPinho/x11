import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEstiloRevela, ENTRA, ASSENTA_INICIO, ASSENTA_FIM, SAI } from "./useEstiloRevela";
import { useEhMobile } from "./useEhMobile";

// Amplitude mínima de entrada no mobile (correção 2026-07-15) — mais
// perceptível que o default de seções/desktop (84), ver useEstiloRevela.js.
const DISTANCIA_MINIMA_MOBILE = 96;

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
//
// A janela de movimento (ENTRA/ASSENTA_INICIO/ASSENTA_FIM/SAI) e o cálculo
// de opacity/y ligados a um progresso já existente vivem em
// src/lib/useEstiloRevela.js (arquivo à parte pra não misturar hook com
// componente no mesmo módulo — ver comentário lá).

// Unidade com scroll próprio (seções, ou qualquer bloco isolado).
export function Revela({ as = "div", className, style, distancia = 108, saida = 80, children, ...props }) {
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
        [distancia, 0, 0, -saida]
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
// grid (ou aos elementos de um bloco de texto) assentarem em leve
// sequência, todas amarradas ao MESMO progresso de scroll (stagger
// "espacial": cada unidade recebe uma fatia da janela de movimento
// deslocada por `atraso`, não um delay de tempo).
//
// Fix 2026-07-15 (mobile ≤1023px anima fora de cena): no mobile as seções
// empilham e ficam 2–5× mais altas que a viewport, então o progresso da
// SEÇÃO inteira (o `progresso` recebido do ancestral) já passa de 0,33 antes
// de um card no meio/fim da seção sequer entrar na tela — ele chega opaco.
// Correção original: cada unidade também mede o PRÓPRIO progresso (useScroll
// no seu próprio ref) e, só em ≤1023px, usa esse progresso próprio (sem
// `atraso`, que é um conceito de stagger espacial da seção, sem sentido por
// elemento) no lugar do progresso da seção. Desktop ≥1024px continua
// exatamente como antes (usa o `progresso` recebido, com `atraso`). Não
// duplica componente: é a MESMA `RevelaComProgresso` usada por todos os call
// sites (grids + textos de Lançamento), só troca a fonte internamente.
//
// RODADA 2 (2026-07-16, correção da correção): a janela do progresso
// próprio era `["start end","start 70%"]` — CURTA, cobre só a ENTRADA do
// elemento. Só que essa janela alimenta `useEstiloRevela`, cuja curva é
// entra→assenta→**SAI** (`opacity [0,1,1,0]`). Com a janela curta, o
// progresso chegava a 1 com o elemento ainda BEM visível na tela (topo do
// elemento a 70% da altura da viewport = ainda em cena) — a rampa de saída
// disparava no meio da tela: o bloco ia a opacity 0 estando visível e,
// como o progresso satura em 1, ficava assim (medido: 42 de 47 blocos
// invisíveis com o centro na tela). Fix: a janela agora cobre a PASSAGEM
// INTEIRA do elemento pela viewport — `["start end","end start"]`, a
// MESMA fórmula que `Revela` usa por seção (acima) — do topo entrando pela
// base até o fundo saindo pelo topo. Assim a curva mapeia certo: o bloco
// fica opaco enquanto está no miolo da própria passagem (em cena de
// verdade) e só esmaece ao entrar/sair de fato.
export function RevelaComProgresso({ as = "div", className, style, progresso, atraso = 0, distancia = 84, saida = 80, larguraEntrada, children, ...props }) {
    const ref = useRef(null);
    const ehMobile = useEhMobile();
    const { scrollYProgress: progressoProprio } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const progressoEfetivo = ehMobile ? progressoProprio : progresso;
    const atrasoEfetivo = ehMobile ? 0 : atraso;
    const distanciaEfetiva = ehMobile ? Math.max(distancia, DISTANCIA_MINIMA_MOBILE) : distancia;
    const estiloMovimento = useEstiloRevela(progressoEfetivo, {
        atraso: atrasoEfetivo,
        distancia: distanciaEfetiva,
        saida,
        ...(larguraEntrada != null ? { larguraEntrada } : {}),
    });
    const MotionTag = motion[as];
    return (
        <MotionTag ref={ref} className={className} style={{ ...estiloMovimento, ...style }} {...props}>
            {children}
        </MotionTag>
    );
}
