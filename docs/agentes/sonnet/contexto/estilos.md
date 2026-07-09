# Estilos (CSS)

Todo o CSS vive em **`src/index.css`** (arquivo único, ~680 linhas), organizado
por seção com comentários `/* HEADER */`, `/* HERO */`, etc.

## Reset e fontes
- Reset global: `* { margin:0; padding:0; box-sizing:border-box; }`
- Fonte: `Roboto` (via Google Fonts no `index.html`). `Inter` também é carregada.

## Variáveis CSS (`:root`)
```css
--laranja:            #FF5000;   /* cor de destaque da marca */
--branco:             #ffffff;
--background_escuro:  #181614;   /* fundo escuro padrão das seções */
--background_claro:   #E5E5E5;   /* usado só no Lancamento_desconto */
--background_cinza:   #22211f;   /* Destaques e Banner */
```
Classe utilitária recorrente: `.p_laranja` (texto laranja, 1.2rem) — usada como
"olho"/eyebrow acima dos títulos em quase todas as seções.

## ⚠️ Estado atual do layout — LER ANTES DE MEXER
O layout é **desktop-only** e construído com unidades de viewport (`vh`/`vw`)
para praticamente tudo — inclusive **posicionamento** (`position: relative` +
`top`/`left`) e **alturas fixas** de imagens (ex.: `.card img { height:95vh }`,
`.imagem_territorio { height:76vh }`).

Consequências:
- **Não há responsividade.** Nenhuma `@media query` existe (até a Fase 2).
- O layout é frágil: muda de proporção conforme a altura da janela.
- Em telas pequenas, quebra bastante.

## Estratégia de responsividade (Fase 2) — regra crítica
Para **preservar 100% do visual em desktop**, as regras atuais permanecem como
**base/padrão**. Todo ajuste responsivo entra via `@media (max-width: …)`, que só
afeta telas menores. Assim, desktop fica pixel-idêntico.

Breakpoints acordados:
- `≤ 1024px` — tablet
- `≤ 768px`  — mobile landscape
- `≤ 480px`  — mobile

Diretrizes por tipo de elemento em telas pequenas:
- Grids colapsam: Categorias 6→3→2 · Destaques 5→scroll horizontal · Território
  4→2→1 · Histórias 3→1 · Footer 3→1.
- Alturas fixas em `vh` viram `aspect-ratio` + `height:auto`.
- Texto posicionado com `top/left` absolutos (Hero) volta ao fluxo normal.
- Títulos gigantes (`5rem`, `4rem`) usam `clamp()` com **máximo = valor atual**
  (para não mudar o desktop) e mínimo menor para caber no mobile.
- Header vira menu hambúrguer → **drawer lateral** (com estado React + Framer
  Motion `AnimatePresence`).

## Animações (Fase 3) — estética moto
- Biblioteca: `motion` (Framer Motion).
- Reveal on-scroll **bidirecional**: ao descer, elementos aparecem; ao subir,
  somem fazendo o caminho inverso. Implementado com `whileInView` **sem**
  `viewport={{ once: true }}`.
- Efeitos: fade + slide-up com **stagger** nos filhos; zoom sutil em imagens no
  hover; preenchimento animado nos botões cortados; parallax leve no Hero.
- **Só `transform`/`opacity`** (performático, sem reflow — não altera layout).
- Estado inicial das animações nunca desloca o layout final: sem movimento, a
  página é idêntica à atual. Respeitar `@media (prefers-reduced-motion: reduce)`.
