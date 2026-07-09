# Planejamento Completo — X11

> **Plano mestre de todas as fases.** Cada fase traz o prompt detalhado e o
> status. Ao concluir uma fase, marcá-la como ✅ concluída aqui. A fase **ativa**
> tem sua instrução copiada para `docs/agentes/sonnet/fazer/` (1 por vez); quando
> concluída e conferida, a próxima fase pendente é ativada.

## Princípios (valem para todas as fases)
1. **Desktop = intocável.** As regras CSS atuais são a base; nada muda em telas
   grandes (> 1024px).
2. **Animação nunca altera o layout final.** Sem movimento (ou com
   `prefers-reduced-motion`), a página é idêntica à atual.
3. **Data-driven de verdade.** Conteúdo repetido vive em `src/data/`.

## Ordem de execução: 1 → 2 → 3
Responsividade (2) vem antes das animações (3): estabilizar antes de animar.

## Status geral
| Fase | Descrição | Status |
|---|---|---|
| 1 | Fundação + Data-driven | ✅ Concluída (2026-07-09) |
| 2 | Responsividade + Mobile (drawer lateral) | ⏳ Em finalização — fix de breakpoint (1024→1280px) + header, junto com o início da Fase 3 |
| 3 | Animações Framer Motion (reveal bidirecional, hover) | ⏳ Ativa — **1ª rodada reprovada** (imagens invisíveis, desktop alterado). Refazendo: reveal ligado ao scroll + header 3 estados + banner estático |

---

## Fase 1 — Fundação + Data-driven ✅ CONCLUÍDA (2026-07-09)
- Instalado `motion` (Framer Motion). Criada `src/data/` com 7 arquivos de
  conteúdo. `Header`, `Favoritos`, `Footer` e demais seções tornados data-driven.
- Corrigido bug de imagens referenciadas como string (quebrava o build).
- `<title>` ajustado para `X11`.
- Verificado: `vite build` ✅, `oxlint` ✅, sem mudança visual.

---

## Fase 2 — Responsividade + Mobile ⏳ ATIVA (rodada de correção)
> **Situação (2026-07-09):** o esqueleto responsivo foi implementado e o
> **desktop está preservado**, mas o dono conferiu no navegador e reprovou o
> **acabamento visual do mobile** (títulos cortados, botões com texto cortado,
> imagens grandes demais, espaçamento ruim). Instrução de correção ativa em
> `docs/agentes/sonnet/fazer/fase-2-correcao-mobile.md`. Causa-raiz:
> micro-posicionamentos em `vh`/`vw` do desktop que ficaram valendo no mobile.
> A fase só é dada como concluída após o dono aprovar o visual das telas
> pequenas.

### Objetivo
Página **totalmente responsiva** (do mobile ao desktop grande), **sem alterar em
nada o visual atual em desktop (> 1024px)**.

### Regra inviolável
Regras CSS atuais = base de desktop, imutáveis. Toda adaptação entra
**exclusivamente** em `@media (max-width: …)`. Exceção: trocar tamanho fixo de
fonte por `clamp(min, fluido, MÁX)` com **MÁX = valor atual**.

### Breakpoints
`≤ 1024px` (tablet) · `≤ 768px` (mobile landscape) · `≤ 480px` (mobile).

### Trabalho por seção
1. **Header:** hambúrguer + **drawer lateral** (`useState`; hambúrguer só em
   `≤ 768px`; drawer com links de `data/navegacao.js`; fecha no overlay; Framer
   Motion `AnimatePresence`).
2. **Hero:** texto sai do absoluto (`top:39vh; left:6vw`) para fluxo normal com
   padding; botões empilham, largura fluida.
3. **Favoritos:** 3 col → 1; `.card img` `95vh` → `aspect-ratio`.
4. **Lancamento_desconto:** grid 7col → empilhado (`1fr`).
5. **Categorias:** 6 → 3 → 2 col.
6. **Lancamento_especial:** largura em `vh`/`left` → padding; título → `clamp()`.
7. **Territorio:** 4 → 2 → 1 col; imagem `76vh` → `aspect-ratio`.
8. **Destaques:** 5 col → **scroll horizontal com snap** no mobile.
9. **Historias:** 3 → 1 col; imagem `29vw` → 100%.
10. **Banner:** `5rem` → `clamp()`.
11. **Footer:** 3 → 1 col; rodapé empilha e centraliza.

### Tipografia fluida
`clamp()` nos títulos grandes (Hero h1 `4rem`, Banner `5rem`, `#titulo_principal`
`4rem`, h2 de seção `2.6rem`), sempre com **máximo = valor atual**.

### Verificação
Testar em 1440/1280/1024/768/390 px; desktop idêntico ao anterior;
`npx vite build` ✅ e `npm run lint` ✅.

---

## Fase 3 — Animações (Framer Motion) ⬜ PENDENTE

### Objetivo
**Movimento moderno com estética de moto** (angular, seco) — on-scroll, hover,
micro-interações — **sem alterar o layout final**.

### Requisito central: reveal BIDIRECIONAL sincronizado com o scroll
Descer → elementos aparecem; subir → somem no caminho inverso. Usar `whileInView`
**SEM** `viewport={{ once: true }}`.

### Passos
1. Criar `src/lib/motion.js` com variants (`fadeUp`, `staggerContainer`,
   `revealImage`) — só `opacity`/`transform`, ease seco (ex.: `[0.22,1,0.36,1]`).
2. Reveal on-scroll em cada seção (títulos + grids com stagger; cards com fadeUp).
3. Hover nos cards: zoom sutil na imagem (`overflow:hidden`), CTA/seta desliza.
4. Botões cortados (`clip-path`): preenchimento animado no hover.
5. Header: encolhe/ganha fundo ao rolar; integra com o drawer da Fase 2.
6. Hero: parallax leve no fundo + entrada do texto em sequência.
7. Banner: avaliar marquee (implementar e deixar o dono aprovar).

### Restrições
- Estado `visible` = EXATAMENTE o layout atual (nunca deslocar layout final).
- Só `transform`/`opacity` (60fps).
- `@media (prefers-reduced-motion: reduce)` e/ou `useReducedMotion`.
- Não quebrar a responsividade da Fase 2.

### Verificação
Reveal bidirecional conferido; 60fps sem "pulos"; reduced-motion estático;
`npx vite build` ✅ e `npm run lint` ✅.
