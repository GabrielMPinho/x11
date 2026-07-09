# INSTRUÇÃO ATUAL — Fase 2: Responsividade e Mobile

> Esta é a **única** tarefa ativa. Ao concluí-la, aguarde o Opus conferir e
> substituir este arquivo pela próxima instrução (Fase 3 — Animações).

## Contexto obrigatório
Antes de começar, leia `../contexto/README.md`, `arquitetura.md`, `estilos.md` e
`convencoes.md`. Projeto: landing page React 19 + Vite, CSS único em
`src/index.css`, conteúdo data-driven em `src/data/`.

## Objetivo
Tornar a página **totalmente responsiva** (funciona sem quebrar em qualquer
tamanho de tela, do mobile ao desktop grande), **sem alterar em nada o visual
atual em desktop (> 1024px)**.

## Regra inviolável
As regras CSS atuais são a **base de desktop e não podem mudar**. Toda adaptação
responsiva entra **exclusivamente** dentro de `@media (max-width: …)`, que só
afeta telas menores. Se você editar uma regra fora de media query e isso mudar o
desktop, está errado. Exceção permitida: trocar tamanhos fixos de fonte por
`clamp(min, fluido, MÁX)` onde **MÁX = valor atual** (desktop continua idêntico,
só encolhe no mobile).

## Breakpoints
- `@media (max-width: 1024px)` — tablet
- `@media (max-width: 768px)`  — mobile landscape
- `@media (max-width: 480px)`  — mobile

## Trabalho por seção (CSS agrupado no fim de `src/index.css`)
1. **Header** (`components/Header.jsx` + CSS): menu hambúrguer com **drawer
   lateral**. Adicionar estado (`useState`) no `Header`; botão hambúrguer visível
   só em `≤ 768px` (esconder a `nav` horizontal); drawer desliza da direita com
   os links de `data/navegacao.js`; fecha ao clicar em link ou no overlay. Usar
   Framer Motion `AnimatePresence` (a lib já está instalada) para casar com a
   Fase 3. Ajustar o logo posicionado com `top/left` para o header menor.
2. **Hero** (`.hero`, `#escrito`, `#botoes`): tirar o texto do posicionamento
   absoluto (`top:39vh; left:6vw`) e colocá-lo em **fluxo normal** com padding em
   telas pequenas. Botões empilham e usam largura fluida (evitar `width:14vw`).
3. **Favoritos** (`#imagens`, `.card`): 3 colunas → 1 coluna em mobile.
   `.card img { height:95vh }` → `aspect-ratio` + `height:auto`. Remover o
   `left:6.6vw` posicional no mobile.
4. **Lancamento_desconto** (grid 7col): empilhar texto e imagem
   (`grid-template-columns: 1fr`), imagem com altura controlada.
5. **Categorias** (`#conteiner_categorias`): 6 col → 3 (tablet) → 2 (mobile).
   Ajustar `height:50vh`/`top:10.4vh` para não sobrepor.
6. **Lancamento_especial** (`#container_texto`): largura em `vh` e `left:7vw`
   viram padding responsivo; título `4rem` → `clamp()`.
7. **Territorio** (`#container_cards`): 4 col → 2 (tablet) → 1 (mobile).
   `.imagem_territorio { height:76vh }` → `aspect-ratio`.
8. **Destaques** (`#produtos_destaques`): 5 col. Em mobile, converter para
   **scroll horizontal com snap** (`overflow-x:auto; scroll-snap-type:x`) para
   manter o formato de vitrine.
9. **Historias** (`#container_historias`): 3 col → 1 col. `.card_historia img`
   usa `width:29vw` fixo → 100%.
10. **Banner** (`.banner h1`): `font-size:5rem` → `clamp()`.
11. **Footer** (`#conteudo_footer`): 3 col → 1 col; `#rodape_footer` empilha e
    centraliza; ajustar margens em `vw`.

## Tipografia fluida
Aplicar `clamp()` nos títulos grandes (Hero h1 `4rem`, Banner `5rem`,
`#titulo_principal` `4rem`, h2 de seção `2.6rem`). Padrão:
`font-size: clamp(<mobile>, <vw fluido>, <valor-desktop-atual>);` — o terceiro
valor **deve** ser o tamanho atual para não mexer no desktop.

## Verificação obrigatória
- Testar em larguras: **1440, 1280, 1024, 768, 390 px**. Nada pode sair da tela,
  sobrepor ou quebrar o padrão.
- Confirmar que em **> 1024px o visual é idêntico ao anterior**.
- `npx vite build` deve passar. `npm run lint` limpo.

## Ao terminar
Atualizar `docs/agentes/alterações/CHANGELOG.md` (nova entrada no topo) e
`docs/agentes/sonnet/contexto/estilos.md` (marcar responsividade implementada).
Resumir o que foi feito e aguardar a conferência do Opus. **Não commitar.**
