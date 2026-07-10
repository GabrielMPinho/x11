import { useTransform, useReducedMotion } from "motion/react";

// Janela de movimento do reveal ligado ao scroll (ver src/lib/Revela.jsx
// pro contexto completo): entrada nos primeiros ~33% da passagem de
// scroll, plateau assentado estreito no miolo, saída nos últimos ~30%.
// Ritmo padrão — usado por seções/blocos de texto/título (mais lento, de
// propósito). Cards de grade usam LARGURA_ENTRADA_CARD (bem mais curta,
// ver abaixo) pra sempre terminar de assentar antes do centro da seção.
const ENTRA = 0;
const ASSENTA_INICIO = 0.33;
const ASSENTA_FIM = 0.70;
const SAI = 1;

// Ajuste 2026-07-10 (review ao vivo do dono): com o atraso por índice do
// stagger padrão + a largura de entrada de 0.33 herdada dos títulos, o
// ÚLTIMO card de uma grade grande (Categorias, 12 itens) só assentava perto
// de 0.685 do progresso da seção — mas a seção fica centralizada em ~0.5,
// então o canto inferior direito ainda aparecia esmaecido no meio da tela.
// Fix combinado (ver RevelaComProgresso em Revela.jsx e os componentes de
// grade): (1) o atraso do último card passa a ser pequeno e independente da
// contagem (`BASE_ATRASO_CARD + spread`, não mais `base + index*passo`); (2)
// a largura de entrada dos cards encolhe pra LARGURA_ENTRADA_CARD — só pros
// cards, a janela de seções/títulos continua em 0.33 (mais lenta, de
// propósito, não deve mudar).
const BASE_ATRASO_CARD = 0.03;
const SPREAD_ATRASO_CARD = 0.06;
const LARGURA_ENTRADA_CARD = 0.20;

// Calcula opacity/y ligados a um MotionValue de progresso (0→1) já
// existente, com atraso opcional (desloca a janela inteira — stagger
// espacial), amplitude independente de entrada (distancia) e saída (saida),
// e largura de entrada opcional (`larguraEntrada` — default é o ritmo
// padrão das seções/títulos; cards de grade passam LARGURA_ENTRADA_CARD).
// Extraído em arquivo próprio (não exporta componente) pra não disparar o
// aviso de Fast Refresh do oxlint em Revela.jsx, e pra ser reaproveitado
// por componentes que precisam aplicar o estilo direto num motion-component
// já existente (ex.: BotaoCortado), sem introduzir um wrapper div extra que
// mudaria layout.
export function useEstiloRevela(progresso, { atraso = 0, distancia = 84, saida = 80, larguraEntrada = ASSENTA_INICIO - ENTRA } = {}) {
    const prefereMenosMovimento = useReducedMotion();
    const larguraPlato = ASSENTA_FIM - ASSENTA_INICIO;
    const larguraSaida = SAI - ASSENTA_FIM;
    const inicio = ENTRA + atraso;
    const assentaInicio = inicio + larguraEntrada;
    const assentaFim = assentaInicio + larguraPlato;
    const saiFim = assentaFim + larguraSaida;
    const opacity = useTransform(progresso, [inicio, assentaInicio, assentaFim, saiFim], [0, 1, 1, 0]);
    const y = useTransform(progresso, [inicio, assentaInicio, assentaFim, saiFim], [distancia, 0, 0, -saida]);
    return prefereMenosMovimento ? { opacity: 1, y: 0 } : { opacity, y };
}

// Calcula o `atraso` de um card dentro de uma grade de `qtd` itens, pelo
// índice — o último card fica só BASE+SPREAD à frente do primeiro,
// independente de a grade ter 3 ou 12 cards (antes era `base + index*passo`,
// que crescia sem limite com a contagem).
export function atrasoCard(index, qtd) {
    const passos = Math.max(qtd - 1, 1);
    return BASE_ATRASO_CARD + (index / passos) * SPREAD_ATRASO_CARD;
}

export { ENTRA, ASSENTA_INICIO, ASSENTA_FIM, SAI, LARGURA_ENTRADA_CARD };
