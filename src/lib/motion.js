// Fundação de animação (Fase 3) — estética moto: seca, angular, sem exagero.
// Regra de ouro: só `opacity`/`transform` (sem reflow).

export const EASE = [0.22, 1, 0.36, 1];

// Entrada em sequência do Hero (load, não scroll — é a 1ª coisa que a
// pessoa vê, não faz sentido "revelar" ao rolar algo que já está na tela).
export const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
export const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Transição do preenchimento do BotaoCortado no hover — não faz parte do
// reveal ligado ao scroll, é uma micro-interação local independente.
export const transicaoHover = { duration: 0.3, ease: EASE };
