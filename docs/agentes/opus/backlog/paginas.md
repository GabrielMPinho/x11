# Backlog — Páginas do X11

> **Backlog do próximo frente de trabalho: as PÁGINAS.** O projeto foi
> reestruturado (2026-07-10) para `src/paginas/<pagina>/` + `src/padrao/`
> (comum). A Home está pronta; as demais são **scaffolds** (stub) aguardando
> planejamento e implementação. Este arquivo lista o que falta, em ordem, com as
> **decisões abertas** que o dono precisa fechar antes de cada item.
>
> Fluxo: o Opus planeja cada item e escreve **uma instrução por vez** em
> `sonnet/fazer/`; o Sonnet executa. As fases de UX/animação (1–6) estão
> concluídas — ver `planejamento-completo.md`.

## Páginas previstas (definidas pelo dono)
As da **navegação** (Header) + a de **equipamento** (detalhe do produto, ao
clicar num produto):
`equipamento` · `homem` · `mulher` · `guia-de-equipamento` · `onde-encontrar` ·
`institucional`. (A `home` já existe.)

---

## 0. Roteamento (INFRA — habilita tudo) ✅ CONCLUÍDO (2026-07-13, não commitado)
**React Router** (`^7.18.1`) no shell: Home (`/`) + Institucional (`/institucional`)
+ scaffolds navegáveis; `RolarAoTopoNaRota` reseta o scroll na troca de rota;
Header com `<Link>`/`useNavigate`; toggle removido. `vite build`/`lint` ok.
**Débito:** em produção o `BrowserRouter` precisa de *fallback SPA* no vhost.
- **Onde encaixa:** no **shell** (`src/App.jsx`) — troca o `<Home/>` central pela
  página da rota, mantendo Header/Footer/Lenis em volta.
- **Decisões abertas (dono):**
  - Biblioteca de rotas? Recomendação do Opus: **React Router** (padrão, leve o
    suficiente) — é **dependência nova**, precisa do aval do dono.
  - Os links do Header (`data/navegacao.js`) e o clique num produto (→
    `equipamento`) passam a navegar de verdade (hoje são `href` placeholder /
    decorativos).
  - O logo → Home já existe (rola ao topo); com rotas, deve **navegar** pra Home
    também.
- **Cuidados:** o Lenis e o reveal ligados ao scroll precisam reinicializar/
  resetar a cada troca de rota (scroll ao topo na navegação). Preservar o visual
  da Home 100%.

## 1. Página de EQUIPAMENTO / PRODUTO (detalhe) ✅ CONCLUÍDA (2026-07-14) — 2 rodadas de correção
Fechada após conferência do Opus (build/lint verdes + 5 correções confirmadas no
código) e validação visual do dono a cada rodada. Sub-componentes em
`src/paginas/equipamento/`. Pendências de asset/conteúdo (packshots reais,
valores da tabela) seguem em [`produto.md`](./produto.md), não bloqueiam.
"Quando clica em um produto." A **última página** do site. Levantamento visual
(PDF conferido em imagem, não só `.txt`) em [`produto.md`](./produto.md).
- **Escopo decidido (Opus, 2026-07-14):** vitrine (**sem carrinho/CTA de
  compra**). Hero split (galeria de thumbnails + packshot em fundo claro | info:
  título/rating/preço/descrição/COR/TAMANHO/garantia) → faixa de 4 specs →
  ENGINEERED FEATURES (4) → banner "TESTADO MINAS GERAIS" → tabela DIFERENCIAIS/
  ESSENCIAIS → carrossel DESTAQUES → 23 RESPOSTAS (reviews) → COMBINE SEU SETUP
  (cross-sell) → Footer. Produto unificado como **JAQUETA EXPEDITION**.
- **Dados:** modelo de produto data-driven em `src/paginas/equipamento/dados/`
  (arquivo por ora; API/CMS depois). Packshots reais o dono fornece depois.
- **Reaproveita** do `padrao/`: Header, Footer, tokens, `BotaoCortado`, o
  hover-zoom `.zoom_imagem`, o reveal, o padrão de card da PLP e o mecanismo de
  carrossel de Destaques. Estética de moto mantida.

## Homem / Mulher (PRODUTOS — listagem) ⏳ ATIVA — `sonnet/fazer/produtos-listagem.md`
Página de listagem (PLP) reutilizável (`src/paginas/produtos/`), **iguais
inicialmente**. Levantamento (visual + textos + dados) em
[`produtos.md`](./produtos.md). Filtros visuais nesta passada; imagens placeholder.
Depois vem **produto** (detalhe, `produto.pdf`).

## 2–6. Páginas da navegação ⬜ pendentes
Cada uma na sua pasta (`src/paginas/<nome>/`). Precisam de **conteúdo e design
definidos pelo dono** — hoje só há o stub.
- **`homem` / `mulher`** — provavelmente vitrines/listagens por gênero (grades de
  produtos/categorias). Definir: é listagem de produtos? Filtra por quê?
- **`guia-de-equipamento`** — conteúdo editorial/guia (como escolher equipamento).
  Definir estrutura (seções, imagens, texto).
- **`onde-encontrar`** — lojas/revendedores. Definir: lista, busca por região,
  mapa? Tem dados de lojas?
- **`institucional`** — sobre a marca (quem somos, história). Há imagens
  `institucional-*.jpg` nos assets — possível ponto de partida.

---

## Ordem sugerida (Opus)
1. **Roteamento** (infra) — destrava tudo.
2. **Equipamento** — a página que o dono destacou; valida o padrão de "página
   nova reaproveitando `padrao/`".
3. Demais páginas da navegação, conforme o dono priorizar e fornecer conteúdo.

## Débito técnico anotado (não bloqueia)
- **CSS único gigante** (`base.css`, 2211 linhas) — o dono não gosta (2026-07-14).
  Plano de split por página (CSS puro, refatoração mecânica pixel-idêntica) em
  [`refatoracao-css.md`](./refatoracao-css.md). ✅ Aprovado — **executar logo
  após a página Produto** (dono, 2026-07-14).
- `npm run build` falha no `tsc -b` (projeto é `.jsx`, sem inputs `.ts`) — usar
  `npx vite build`. Corrigir o `tsconfig`/script um dia (ex.: `allowJs` ou tirar
  o `tsc -b`).
- Tokens de **espaçamento** ainda não existem (valores diretos no CSS) —
  padronizar em `tokens.css` numa passada futura, sem mudar o visual.

## Decisões que o dono precisa tomar antes de começar
1. **Biblioteca de rotas** (React Router?) — libera a Fase 0.
2. **Escopo da página de equipamento** (o que exibe; vitrine ou com compra).
3. **Fonte/modelo de dados dos produtos** (arquivo por enquanto? estrutura?).
4. **Conteúdo/design de cada página da navegação** (o Opus planeja quando houver).
