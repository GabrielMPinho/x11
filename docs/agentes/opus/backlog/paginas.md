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

## 1. Página de EQUIPAMENTO (detalhe do produto) ⬜ pendente — **prioridade**
"Quando clica em um produto." É a página mais concreta e a que o dono destacou.
- **Escopo a definir (dono):** o que a página mostra? (galeria de imagens do
  produto, nome, preço, descrição, tamanhos, tabela de medidas, CTA de compra/
  onde encontrar, produtos relacionados…). É vitrine (sem carrinho) ou vai ter
  ação de compra?
- **Dados:** de onde vêm os produtos? (hoje `home/dados/destaques.js` tem alguns
  com imagem/título/preço). Precisa de um modelo de "produto" e uma fonte
  (arquivo de dados agora; API/CMS depois?).
- **Reaproveitar** do `padrao/`: Header, Footer, tokens, `BotaoCortado`, o
  hover-zoom de imagem, o reveal. Estética de moto mantida.

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
