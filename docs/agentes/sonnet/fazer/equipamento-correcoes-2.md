# Instrução — Página Produto (Equipamento): correções da 2ª conferência

> **Contexto:** após a 1ª rodada de correções, o dono reconferiu (desktop +
> mobile) e apontou 5 ajustes — 4 nos dois carrosséis (`CarrosselDetalhes` =
> "DESTAQUES" e `CombineSetup`) + 1 no **Footer compartilhado**. Diagnóstico do
> Opus lendo o código + os prints do dono. **Só correção pontual.** Mantém a
> liberdade de layout da PDP e os seletores próprios da página.

## 1. 1º carrossel (DESTAQUES) "cortado na metade" — CORRIGIR
**Causa (confirmada):** o `.trilho_destaques_pdp_container` usa
`padding: 0 6vw` + `overflow: hidden`. Em container com `overflow`, o `padding`
**não** insere margem do lado que transborda: os cards sangram até a **borda da
tela** (corte rente/feio à direita). O `CombineSetup` (que o dono aprovou) faz
diferente — o inset de 6vw vem do **`padding` da SEÇÃO** (`.combine_setup_secao`)
e o container **não** tem padding, então o trilho fica inset dos **dois** lados e
corta com margem limpa.

**Correção:** fazer o inset horizontal do DESTAQUES se comportar **igual ao
COMBINE** — os cards devem ser cortados com a **mesma margem lateral limpa (6vw)
dos dois lados**, não rente à borda. Caminho recomendado: inserir o 6vw como
**`margin: 0 6vw`** no `.trilho_destaques_pdp_container` (removendo o
`padding: 0 6vw`), mantendo `overflow: hidden`. Assim o container fica estreitado
6vw de cada lado e o clip acontece com margem simétrica. O cabeçalho centralizado
(`.destaques_pdp_cabecalho`, já com seu próprio `padding: 0 6vw`) **não muda**.

## 2. Movimentação das setas pouco suave (nos DOIS carrosséis) — CORRIGIR
**Causa:** em `useCarrosselComSetas.js`, o `mover()` anima com
`{ type: "spring", stiffness: 300, damping: 32 }` — mola rígida, "seca".

**Correção:** deixar o deslize **mais suave**, no tom do resto do site. Trocar por
um **tween com a curva EASE do projeto** (`EASE` de `@/padrao/lib/motion`,
`[0.22,1,0.36,1]`) e duração ~**0.6s** (ex.: `{ duration: 0.6, ease: EASE }`).
(Alternativa aceitável: mola bem mais macia — `stiffness ~120`, `damping ~26` —,
mas prefira o tween com EASE, que é a linguagem de movimento já usada no projeto.)
Vale para os dois carrosséis (é o mesmo hook).

## 3. Footer "cortando" no mobile — CORRIGIR (raiz: `<body>` sem fundo escuro)
**Causa (confirmada, é a MESMA raiz da "faixa branca" da 1ª rodada):** o
`#rodape_footer` é embrulhado em `<Revela distancia={64}>` (transform). O
**`<body>` não tem `background`** (só existe `html.lenis body` e
`body{overflow-x:hidden}` no responsivo), então o deslocamento do reveal
**expõe o fundo claro padrão do navegador** — a faixa clara que "corta" embaixo
do footer no mobile. O fundo escuro que pusemos no `.equipamento_pdp` (1ª rodada)
**não** cobre o footer, porque o `Footer` fica no shell (`App.jsx`), **fora** do
`<main>`.

**Correção (fix de RAIZ, resolve em todas as páginas):** dar ao **`<body>`** o
fundo escuro — `background-color: var(--background_escuro)` na regra base do
`body` (em `base.css`, no reset/topo, **não** dentro de `@media`). Como todas as
seções de todas as páginas cobrem o `body` no repouso, isso é **zero mudança
visual** em desktop >1280px (regra de ouro preservada) — só faz os vãos de reveal
mostrarem escuro em vez de branco, corrigindo o footer (mobile) e qualquer outro
reveal do site.
- Com o `body` escuro, o `background` que pusemos no `.equipamento_pdp` fica
  redundante, mas **pode continuar** (inofensivo) — não precisa remover.

## 4. Mobile: TIRAR as setas dos carrosséis (pedido do dono) — CORRIGIR
No mobile/toque o controle é o **arraste** (ver #5), então as setas ← → são
redundantes. **Esconder as setas** dos dois carrosséis fora do desktop.
- Fazer isso **espelhando o critério do drag**: as setas aparecem **só** no
  desktop `(pointer: fine) and (min-width: 1281px)`; escondidas
  (`display: none`) no restante. (Assim setas e arraste nunca coexistem: desktop
  = só setas; toque/mobile = só arraste — coerente com a decisão do dono.)
  Aplicar a `.destaques_pdp_setas` e `.combine_setup_setas`.

## 5. 2º carrossel (COMBINE) não arrasta no mobile — CORRIGIR
**Causa (confirmada):** os cards do COMBINE são **`<a>` (links)**, que o navegador
torna **arrastáveis nativamente** (drag-and-drop de link) — esse gesto nativo
**sequestra** o drag do Framer, então o trilho não anda no toque. O DESTAQUES usa
`<div>` (não arrastável nativo) e por isso funciona.

**Correção:** desabilitar o drag nativo do link nos cards do COMBINE — adicionar
**`draggable={false}`** no `<a className="card_combine">` **e/ou** a regra CSS
`.card_combine{ -webkit-user-drag: none; user-drag: none; user-select: none; }`
(mesmo espírito do `-webkit-user-drag:none` já aplicado nas `<img>`). Assim o
gesto de arraste fica com o Framer, como no DESTAQUES. Manter a navegação por
clique (tap curto continua indo pra `/equipamento`; o Framer já distingue
drag de tap).

## Verificação (o que É seu — Sonnet)
- `npx vite build` ✅ · `npm run lint` ✅.
- Checagem no código: DESTAQUES com inset simétrico (margem dos 2 lados como o
  COMBINE); `mover()` com tween EASE ~0.6s; `body` com fundo escuro no reset;
  setas só no desktop `(pointer:fine) and (min-width:1281px)`; `.card_combine`
  com drag nativo desabilitado; nenhum outro seletor de página tocado.
- ⚠️ **NÃO tire prints** — a conferência visual (5 viewports) e o comportamento
  (arraste no mobile, setas só no desktop, footer no mobile, suavidade) são do
  **Opus**/dono.

## Documentar (sem commitar)
- **CHANGELOG** (entrada NO TOPO): as 5 correções da 2ª rodada da PDP; destacar o
  **fix de raiz do `body` sem fundo escuro** (que também elimina de vez a "faixa
  branca"/vão de reveal em todo o site).
- **`contexto/estilos.md`:** registrar o `body{background:var(--background_escuro)}`
  (fundação nova) e, se útil, o padrão de carrossel PDP (desktop=setas / mobile=
  arraste, cards `<a>` com `user-drag:none`).
- **Não commitar.** Resuma; o Opus reconfere.
