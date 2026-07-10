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

## Ordem de execução: 1 → 2 → 3 → 4
Responsividade (2) vem antes das animações (3): estabilizar antes de animar. A
Fase 4 (carrossel do Destaques) vem **depois** da rodada de correção da Fase 3
(fecha o overflow e o reforço de animação antes de reestruturar uma seção).

## Status geral
| Fase | Descrição | Status |
|---|---|---|
| 1 | Fundação + Data-driven | ✅ Concluída (2026-07-09) |
| 2 | Responsividade + Mobile (drawer lateral) | ✅ **Concluída e conferida** — desktop preservado; overflow do logo do footer (769–1280px) **corrigido e verificado** pelo Opus (`docScrollW==clientW` em 900/1024/1100/1280/1440) |
| 3 | Animações Framer Motion (reveal ligado ao scroll; header agora 2 estados) | ✅ **Concluída e conferida** — Banner blur ✅ (09:20); pulo do header + stagger dos grids ✅ (09:39); conferência final do Opus junto com a Fase 4 ✅ |
| 4 | **Destaques como Horizontal Scroll Carousel** (exceção aprovada à regra de ouro) | ✅ **CONCLUÍDA e CONFERIDA (2026-07-10)** — carrossel fluido (`useSpring` + altura proporcional), **folga de meio card no fim = 170px** ✓, header minimalista 2 estados + logo aprovado ✓, overflow zero nos 5 breakpoints ✓, imagens ok (só footer 0.98, benigno). **Aguardando sinal verde do dono pro commit.** |
| 5 | **Smooth scroll (Lenis)** — feel de scroll suave | 🕓 Candidata (pós-commit da Fase 4) — Lenis + sync `useScroll`, fallback reduced-motion/touch. **Requer aval do dono** (dependência nova). Opus especifica quando liberado |

---

## Fase 1 — Fundação + Data-driven ✅ CONCLUÍDA (2026-07-09)
- Instalado `motion` (Framer Motion). Criada `src/data/` com 7 arquivos de
  conteúdo. `Header`, `Favoritos`, `Footer` e demais seções tornados data-driven.
- Corrigido bug de imagens referenciadas como string (quebrava o build).
- `<title>` ajustado para `X11`.
- Verificado: `vite build` ✅, `oxlint` ✅, sem mudança visual.

---

## Fase 2 — Responsividade + Mobile ✅ IMPLEMENTADA (1 pendência de overflow)
> **Situação (2026-07-10):** o design responsivo foi implementado, o **desktop
> está preservado** e a conferência visual do Opus (5 viewports) confirmou o
> acabamento do mobile/tablet OK (sem títulos/botões cortados, imagens em escala
> correta). **Única pendência:** overflow horizontal na faixa **769–1280px**
> causado pelo **logo do footer** (308px) não restrito nesse intervalo — corrigido
> junto da rodada de correção da Fase 3 (ver `sonnet/fazer/`). Sem scroll
> horizontal já confirmado em 390/768/1280/1440.

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

## Fase 3 — Animações (Framer Motion) ⏳ ATIVA (rodada de correção)
> **Situação (2026-07-10):** a 2ª rodada (reveal ligado ao scroll, header 3
> estados, banner estático, hover em CSS) foi executada e commitada (`b014deb`) e
> **conferida pelo Opus por screenshot**. Aprovado: imagens visíveis em todos os
> viewports, desktop fiel, reduced-motion OK. **Ajustes pedidos:** (1) fechar o
> overflow do logo do footer (≤1280px); (2) o dono achou "poucas animações de
> entrada e saída" → **reforçar amplitude/janela/coreografia** do reveal mantendo
> o modelo scroll-linked e todos os invariantes. Instrução ativa:
> `sonnet/fazer/fase-3-correcao-overflow-e-mais-animacao.md`.

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

---

## Fase 4 — Destaques ("OS MAIS VENDIDOS") como Horizontal Scroll Carousel ⬜ PENDENTE (especificada)

> **Decisão do dono (2026-07-10):** inspirado no *horizontal scroll carousel* de
> `hover.dev`. **Exceção pontual e aprovada** à regra de ouro: **SÓ a seção
> Destaques** pode mudar no desktop > 1280px; **todas as outras** seguem
> pixel-idênticas. Só entra em `sonnet/fazer/` **depois** de aprovada a rodada de
> correção da Fase 3.

### Objetivo
Transformar a vitrine **"OS MAIS VENDIDOS"** (seção `.destaques`) num **carrossel
horizontal dirigido pelo scroll vertical**: rolar a página pra baixo faz os cards
**andarem para o lado**. Estética de moto (seca/editorial). **Reaproveitar os
mesmos produtos** de `src/data/destaques.js` — sem inventar itens nem mudar o
card (imagem com `.zoom_imagem`, título, preço).

### Mecanismo (o COMO) — só no desktop > 1280px
- A seção `.destaques` ganha **altura alta** (alvo **~300vh**; ajustar ao nº de
  cards pra o ritmo ficar confortável — ~1 tela de scroll por avanço, sem
  arrastar nem correr).
- Um contêiner interno fica **pinado**: `position: sticky; top: 0; height: 100vh;
  overflow: hidden`.
- Dentro, o trilho `#produtos_destaques` (flex em linha) tem o `x` mapeado por
  **`useScroll({ target: ref da seção })` + `useTransform(scrollYProgress,
  [0,1], [xInicial, xFinal])`**.
- **xInicial:** 1º card à esquerda com respiro. **xFinal:** o **último card
  encosta na borda direita** da viewport — **sem buraco**. Como a largura do
  trilho depende do conteúdo/tela, **calcular xFinal a partir da largura real
  medida** (trilho vs viewport), **não** um `%` chutado.

### Título, setas e contexto
- O bloco de título ("OS MAIS PROCURADOS" / "OS MAIS VENDIDOS") **permanece
  visível durante o pin** (dentro do sticky), mantendo a hierarquia atual.
- As setas decorativas `← →` (`#setas_destaques`) seguem **decorativas** (só
  hover) ou podem ser **ocultadas** no modo carrossel — decidir mantendo a
  estética; **não** torná-las funcionais.

### Responsivo / touch (NÃO é a exceção — segue livre ≤ 1280px)
- **≤ 1280px e/ou ponteiro grosso (touch):** MANTER o comportamento atual de
  **swipe horizontal nativo com snap** (já existe: `overflow-x: auto` +
  `scroll-snap`), em **altura normal**, **sem** 300vh e **sem** pin. Scroll-hijack
  em touch trava — não usar.
- Escolher o mecanismo por **`matchMedia`/tipo de ponteiro**: fino + > 1280px →
  scroll-hijack; senão → swipe nativo.

### Acessibilidade / reduced-motion
- **`prefers-reduced-motion: reduce`:** **não** fazer hijack. Fallback = **scroll
  horizontal normal com snap**, altura normal, **todos os cards visíveis e
  acessíveis** (foco/teclado/swipe). Nada de 300vh pinado.
- Ordem de leitura e foco preservados.

### Invariantes
- **Fora do Destaques, desktop > 1280px continua pixel-idêntico.**
- Se o JS não rodar, os cards aparecem (fallback = scroll horizontal / grid) —
  **nunca invisíveis**.
- O movimento é `transform` (x); a **altura 300vh é a exceção estrutural
  aprovada**, restrita a esta seção no desktop.
- Trilho **contido** (`overflow: hidden` no sticky) — **nada de scroll horizontal
  vazando pro `body`** (`scrollWidth == clientWidth` do documento em 320–1280px).
- Não quebrar Fase 2, drawer mobile, header 3 estados nem o reveal das outras
  seções.

### Verificação (Opus reconfere por screenshot/scroll)
- Desktop > 1280: rolar a seção → cards andam da esquerda; começa no 1º e termina
  no último **sem buraco**; título mantido; header ok; a página **solta** o
  scroll antes/depois sem "prender".
- ≤ 1280 + touch: swipe nativo com snap, altura normal, tudo acessível.
- reduced-motion: scroll horizontal normal, sem hijack, tudo visível.
- Sem overflow horizontal no `body` em 320–1280px; demais seções desktop
  pixel-idênticas.
- `npx vite build` ✅ · `npm run lint` ✅.
