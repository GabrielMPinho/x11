# Changelog — X11

> Registro de todas as alterações do projeto. **Entradas mais novas no topo.**
> Formato de cada entrada: `## AAAA-MM-DD HH:MM — TÍTULO` seguido do que foi feito e **por quê**.

---

## 2026-07-13 13:58 — Fix: clique dos botões do Hero bloqueado pelo `<main>` (z-index)

**O que foi feito e por quê** (instrução
`docs/agentes/sonnet/fazer/home-hero-clique-fix.md` — diagnóstico do Opus via
teste Playwright real: `document.elementFromPoint` no botão retornava
`MAIN`, `page.click`/`hover` davam timeout com "`<main>…</main> intercepts
pointer events"`):

- **Causa raiz:** `.hero{position:relative;z-index:-1}` — sem um ancestral
  que isolasse esse contexto de empilhamento, o hero **inteiro** (título,
  parágrafo, botões) afundava atrás do próprio `<main>`, que capturava
  clique e hover. Passou despercebido até agora porque os botões eram
  decorativos (sem `onClick`) antes da rodada "Home: botões navegando" —
  não havia nada pra notar a interceptação.
- **`.hero`:** `z-index:-1` → **`z-index:0`**. Ainda cria o contexto de
  empilhamento local que `.hero_bg` (parallax) precisa pra ficar atrás do
  conteúdo (`position:relative` + `z-index` **não-auto**, qualquer valor,
  já basta) — só deixa de ser **negativo**, então o hero não "escapa" pra
  trás do próprio pai. Internamente nada muda: `.hero_bg` (`z-index:-1`)
  continua atrás de `#escrito`/`#botoes` (`z-index:auto`), exatamente como
  antes — **repouso visual idêntico**, só o stacking.
- **`.hero_institucional`:** mesmo fix (`-1`→`0`), verificação "de
  passagem" pedida na instrução — lá não há botões/links hoje, então não
  bloqueava nada, mas alinha o padrão pra não repetir o problema se algo
  clicável entrar ali depois.
- **Confirmado no código** (pedido da instrução): `.lancamento_especial`,
  `.favoritos`, `.categorias` (as outras seções com botões/cards ligados)
  **não têm** `z-index` negativo — sem o mesmo problema.

**Achado extra (fora do escopo, só reportando pro Opus):** `.missao_secao`
(Institucional) e `.colecao_hero` (Produtos) têm o **mesmo padrão**
(`position:relative;z-index:-1`) — bug latente idêntico, mas sem
consequência hoje (nenhuma tem conteúdo clicável dentro). Não toquei —
instrução escopou só a Home + verificação pontual da Institucional.

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos.
Checagem no código: `.hero`/`.hero_institucional` sem `z-index` negativo;
`.hero_bg`/`.hero_institucional_bg` (camadas internas) continuam
`z-index:-1`, corretamente contidas agora. **Não testei o clique nem tirei
prints** — a instrução pediu explicitamente pra deixar essa reconferência
pro Opus (que já tem o Playwright rodando pro diagnóstico original).

**Não commitado.** O Opus re-testa o clique.

---

## 2026-07-13 13:41 — Fix: hover não movia o card inteiro (só a imagem) + ajustes de borda

**O que foi feito e por quê** (sequência de pedidos diretos do dono, fora do
fluxo Opus → Sonnet — todos sobre o mesmo problema/área):

### Achado: elevação do hover não funcionava (bug sistêmico)
Investigando "o card inteiro não fica interativo, só a imagem reage",
encontrei a causa: `.card`, `.card_categoria`, `.card_territorio`,
`.card_historia`, `.card_produto` (Home) e `.card_produto_plp` (Produtos)
são todos `RevelaComProgresso` (`motion.div`) — o reveal por scroll aplica
`y` via `style` inline (Framer Motion escreve `element.style.transform`
direto no DOM pra performance). Um `style` inline **sempre** vence uma
regra `:hover` de stylesheet externo, mesmo já "assentado" em `y:0` — por
isso a `translateY(-6px)` do hover (adicionado nas 2 rodadas anteriores)
nunca aparecia de verdade, só o zoom da imagem (`.zoom_imagem img`, elemento
à parte sem esse conflito) reagia. **Fix:** `!important` só na
`translateY` do hover (seguro aqui — o Framer só reescreve esse inline
style em resposta a scroll, não a `:hover`, então nada compete com a regra
enquanto o mouse está parado sobre o card).

### Borda/anel do hover — só em Categorias Populares
Pedido do dono: a borda/anel laranja do hover deve aparecer **só** em
`.card_categoria` (Categorias Populares). Removida de `.card` (Favoritos),
`.card_territorio`, `.card_historia`, `.card_produto` (Destaques) e
`.card_produto_plp` (Produtos) — esses 5 ficam só com elevação+sombra+zoom.
Limpeza: os `outline:1px solid transparent`/`outline-offset` (órfãos, sem
mais uso) removidos das regras base desses 5 seletores.

### Confirmado (sem mudança): botões do Hero já navegam
Checagem pedida pelo dono — `Hero_Home.jsx` já tinha `para="/homem"`/
`para="/mulher"` nos 2 botões (`BotaoCortado`), implementado na rodada
"Home: botões navegando". Código confere, sem necessidade de alteração.

### ⚠️ Incidente: `src/App.jsx` sumiu do disco durante esta sessão
No meio do trabalho, `npx vite build` começou a falhar com
`Could not resolve './App' in src/index.jsx` — `src/App.jsx` tinha sido
**apagado** (`git status` mostrou `D src/App.jsx`, deleção não commitada,
provavelmente um imprevisto no editor do dono, que estava com o arquivo
aberto). O último commit no git (`b9e1d7f`) é de **antes** do roteamento
desta sessão — restaurar via `git checkout` teria revertido todo o
`BrowserRouter`/`<Routes>`/`RolarAoTopoNaRota`. Comecei a reconstruir o
arquivo a partir do conteúdo exato escrito na rodada de roteamento
(confirmado sem mudanças em todo `git diff --stat` das rodadas seguintes),
mas o próprio dono restaurou o arquivo (provável desfazer no editor) antes
da minha escrita ser concluída — o conteúdo final bate exatamente com o
esperado. **Nada foi perdido**, mas fica registrado — se `App.jsx` sumir de
novo, o conteúdo correto está neste CHANGELOG (rodada "Roteamento (React
Router)", 2026-07-13 10:37) pra reconstrução rápida.

**Verificação:** `npx vite build` ✅ (496 módulos) · `npm run lint` ✅ sem
avisos, depois de cada mudança (incluindo depois da recuperação do
`App.jsx`). **Não tirei nem analisei screenshots.**

**Não commitado.**

---

## 2026-07-13 13:13 — Produtos: hover nos cards + sidebar de filtros compactada

**O que foi feito e por quê** (pedido direto do dono, fora do fluxo Opus →
Sonnet — "coloque um hover nos cards e compacte os filtros na esquerda".
"Filtros" só existe na página de Produtos, então card = `.card_produto_plp`
e filtros = `SidebarFiltros`):

- **Hover nos cards de produto (`.card_produto_plp`):** não tinha nenhum
  tratamento de hover ainda. Mesma técnica já usada na Home (elevação/
  sombra/anel/zoom): `outline` (não `border` — zero impacto de layout) +
  `box-shadow` + zoom da imagem (`scale(1.05)`, via `.zoom_imagem`, já
  presente no wrapper) no hover; elevação (`translateY(-6px)`) isolada numa
  media query com guarda `prefers-reduced-motion:no-preference`. **Sem**
  `cursor:pointer` — o card ainda não navega pra lugar nenhum (pendência:
  página de produto/detalhe).
- **Sidebar de filtros compactada:**
  - Coluna da sidebar: `240px`→`200px` (`.produtos_corpo`, agora igual ao
    breakpoint de tablet — ganhou espaço a mais pra grade de produtos).
  - Espaço entre os 5 blocos: `2.5rem`→`1.75rem`; dentro de cada bloco:
    `0.9rem`→`0.6rem`.
  - Kicker de cada bloco (`.p_laranja`, 1.3rem no resto do site) reduzido
    pra `1rem` **só dentro de `.filtro_bloco`** (escopado — não mexe no
    utilitário compartilhado).
  - Botões de tamanho: padding/fonte reduzidos; grade de tamanhos com gap
    menor (`8px`→`6px`).
  - Checkboxes (Estação/Especificações): gap e fonte reduzidos; quadrado
    decorativo `16px`→`14px`.
  - Swatches de cor: `22px`→`18px`, gap `10px`→`8px`.
  - Labels de preço (R$ 200/R$ 2.200): fonte reduzida.

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos. Só
`src/padrao/estilos/base.css` tocado nesta rodada — Home/Institucional/App.jsx
não mudaram. **Não tirei nem analisei screenshots.**

**Não commitado.**

---

## 2026-07-13 13:08 — Home: botões navegando + mais interatividade nos cards

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/home-interacao.md`
— **reverte a regra antiga "botões decorativos"**: agora os listados abaixo
navegam de verdade). Só a Home (e o `BotaoCortado` compartilhado, sem
quebrar usos existentes) — outras páginas não tocadas.

### Parte 1 — Botões ligados
- **`BotaoCortado.jsx`:** ganhou prop opcional `para` — com ela, o clique
  navega via `useNavigate()`; sem ela, o botão é **idêntico** a antes
  (Lançamento desconto continua sem `para`, decorativo). Continua
  renderizando `<button>` (não `<a>`/`<Link>`) de propósito — precisa bater
  com o seletor global `button{clip-path:...}`.
- **Hero:** `VER MASCULINO`→`/homem` · `VER FEMININO`→`/mulher`.
- **Lançamento especial:** `EXPLORAR COLEÇÃO`→`/homem`.
- **Favoritos:** o **card inteiro** virou o link (`COMPRAR`→`/equipamento`)
  — `RevelaComProgresso as="a"` com `href` real + `onClick`/
  `preventDefault` (mesmo padrão do logo/link "INSTITUCIONAL" no Header,
  não `react-router-dom`'s `<Link>`, que exigiria "motion-ificar" um
  componente customizado dentro de `Revela.jsx` — mais risco pra um shared
  primitive usado em ~9 lugares). "COMPRAR" virou `<span class="cta_comprar">`
  (não mais `<a>` — dois `<a>` aninhados seria HTML inválido).
- **Categorias:** `dados/categorias.js` trocou `link:"/categoria/…"` (rota
  inexistente) por `genero:"masculino"|"feminino"|"neutro"` (atributo real
  do conteúdo); `Categorias.jsx` mapeia gênero→rota
  (masculino/neutro→`/homem`, feminino→`/mulher`, pedido explícito do
  dono) e navega via `onClick`/`preventDefault`, mesmo padrão de Favoritos.
- **Mantidos decorativos** (sem página de destino ainda, dono define
  depois): Histórias `LEIA MAIS`, Lançamento desconto `COMO PARTICIPAR`.
- **Território e Destaques:** sem destino definido na instrução — **não**
  ganharam navegação (só o hover da Parte 2, abaixo).

### Parte 2 — Hover mais rico, coeso em Favoritos/Categorias/Território/Histórias/Destaques
- **Elevação leve** (`translateY(-6px)`) + **sombra sutil**
  (`box-shadow`) + **anel laranja** que aparece no hover — em `.card`,
  `.card_categoria`, `.card_territorio`, `.card_historia`, `.card_produto`.
  ⚠️ **`outline`, não `border`** nos 4 primeiros (Categorias já tinha
  `border` real, mantido) — `outline` nunca participa do box model, então o
  anel transparente em repouso tem **zero impacto de layout** mesmo com
  `box-sizing:border-box` (a regra de ouro pede repouso pixel-idêntico;
  `border` mudaria a largura de conteúdo em ~2px).
  - **Zoom da imagem intensificado** (`.zoom_imagem img`): `scale(1.03)` →
    `scale(1.05)`.
  - **CTA em destaque:** `.cta_comprar` (Favoritos) e `LEIA MAIS`
    (Histórias) ganharam sublinhado animado (`text-decoration-color`
    transparente→laranja, transição lisa — `text-decoration-line` não é
    animável) somado ao slide (`translateX`) que já existia.
- **`prefers-reduced-motion`:** a **elevação** (`translateY`, é `transform`)
  fica numa `@media` **separada**, só ativa com
  `prefers-reduced-motion:no-preference` (pedido explícito da instrução).
  Zoom/slide/sublinhado/sombra **não** ganharam essa guarda — já existiam
  (zoom/slide) ou não são "movimento" no mesmo sentido (sombra/sublinhado),
  mantidos como sempre estiveram.
- Transições ~0.3s com o `cubic-bezier(0.22,1,0.36,1)` já usado no resto do
  projeto (equivalente ao `EASE` do `motion.js`).

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos. Checagem
no código: `para=` presente nos 3 botões certos; `Lancamento_desconto.jsx`
sem `para` (idêntico); `Historias.jsx` com `LEIA MAIS` ainda `href="#"`;
Favoritos/Categorias com `as="a"`+`onClick`; Território/Destaques **sem**
`useNavigate`/`onClick` (só hover); `git diff --stat` confirma **zero
mudanças** em Institucional, Produtos, `App.jsx`, `Header.jsx`, `Footer.jsx`.
**Não tirei nem analisei screenshots** — a conferência visual é do
Opus/dono.

**Não commitado.**

---

## 2026-07-13 12:50 — Produtos: 3 correções (cards escuros, hero, sidebar sticky)

**O que foi feito e por quê** (instrução
`docs/agentes/sonnet/fazer/produtos-correcao.md` — conferência do Opus vs
PDF + feedback do dono; **só a página Produtos**, resto inalterado):

1. **Cards de produto — fundo escuro:** `.card_produto_plp` era
   `--background_claro` (branco destoava do dark, imagens pareciam
   "coladas/figurinhas" — queixa do dono). Trocado por `--background_cinza`
   (tom sutilmente diferente do `--background_escuro` do `.produtos_corpo`,
   separação leve sem voltar pro branco). Como o texto era escuro (pensado
   pro fundo claro), também troquei: `.card_produto_plp_nome`
   (`--background_escuro`→`--branco`), `.card_produto_plp_preco`
   (`#333`→`rgba(255,255,255,.85)`), `.card_produto_plp_mais`
   (`#666`→`rgba(255,255,255,.5)`), `.swatch_cor_pequeno` (borda
   `rgba(0,0,0,.15)`→`rgba(255,255,255,.25)`, senão ficava invisível no
   fundo escuro).
2. **Hero-faixa — imagem e overlay:** `colecao-hero.jpg` (clara, verde/
   vermelha) destoava do clima urbano-escuro do PDF → trocada por
   **`jaqueta_fav.jpg`** (piloto de jaqueta em fundo grafite, ainda
   placeholder — comentado no código que a imagem definitiva da coleção o
   dono pode fornecer depois). Overlay reforçado: 2 camadas (gradiente
   forte partindo da esquerda, onde o texto assenta, + leve escurecimento de
   base), mesma técnica do hero da Institucional. Altura da faixa (~45vh)
   mantida.
3. **Sidebar de filtros — sticky:** `.sidebar_filtros` ganhou
   `position:sticky;top:80px` (60px da barra `.header_minimalista` fixa +
   respiro) — acompanha o scroll enquanto a grade de produtos rola ao lado.
   Precisou de `.produtos_corpo{align-items:start}` também (sem isso o grid
   esticava a sidebar pra altura da grade inteira, e o sticky não tinha
   espaço pra "andar"). **Cancelado no mobile** (`≤768px`,
   `.sidebar_filtros{position:static}`) — lá a sidebar já colapsa num bloco
   no topo, comportamento inalterado.

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos. Checagem
no código: card sem `--background_claro`; hero com `jaqueta_fav.jpg` +
overlay reforçado; `.sidebar_filtros{position:sticky}` presente (e
`position:static` no bloco `≤768px`). `git diff --stat` confirma **zero
mudanças** em Home/Institucional/Header/Footer/App.jsx — só
`src/padrao/estilos/base.css` e `src/paginas/produtos/HeroColecao.jsx`
(comentário) tocados. **Não tirei nem analisei screenshots** — a
reconferência contra o PDF é do Opus/dono.

**Não commitado.**

---

## 2026-07-13 12:30 — Páginas de PRODUTOS (PLP): listagem Homem/Mulher

**O que foi feito e por quê** (instrução
`docs/agentes/sonnet/fazer/produtos-listagem.md`, estrutura/textos de
`docs/agentes/opus/backlog/produtos.md`): `/homem` e `/mulher` deixam de ser
scaffold — ambas renderizam a mesma página de listagem (PLP), reutilizável,
só o breadcrumb muda entre os dois gêneros.

- **`src/paginas/produtos/`** (novo): `Produtos.jsx` (orquestrador, prop
  `genero`) + 5 sub-componentes + `dados/`:
  - **`HeroColecao.jsx`** — faixa curta (~45vh, **não** tela cheia, diferente
    dos heroes da Home/Institucional) com `colecao-hero.jpg` + overlay +
    kicker "COLEÇÃO LAB CRAFTED" + título "COLEÇÃO SPORADIC". Entrada em
    stagger no load, sem parallax.
  - **`BarraCategorias.jsx`** — breadcrumb `{genero} / JAQUETAS` + 6 abas
    decorativas (TUDO/ADVENTURE/TOURING/SPORT/URBAN/CLÁSSICO,
    data-driven, ADVENTURE ativa por padrão, fiel ao PDF).
  - **`SidebarFiltros.jsx`** — 5 blocos decorativos (TAMANHOS, PREÇOS —
    slider falso com trilho+alça, ESTAÇÃO, COR — swatches, ESPECIFICAÇÕES),
    **sem lógica de filtro real** (padrão do projeto). No mobile (≤768px)
    vira bloco colapsável (botão "FILTROS", `useState` local).
  - **`GradeProdutos.jsx`** — contador "12 DE 24 PRODUTOS" + dropdown "EM
    DESTAQUE" (decorativos) + grade 3×4 de 12 cards em **fundo claro**
    (`--background_claro`, único bloco claro da página — packshot precisa de
    contraste, fiel ao PDF). Reveal por card (`atrasoCard`/
    `LARGURA_ENTRADA_CARD`, mesmo padrão de Favoritos/Categorias/Território).
  - **`BlocoEditorial.jsx`** — card escuro com kicker + "Como escolher sua
    jaqueta?" + texto + `BotaoCortado` "EM DESTAQUE".
  - **`dados/produtos.js`** — 12 produtos (nomes/tag/preço reais do PDF,
    `docs/agentes/opus/backlog/produtos.md`); **imagens placeholder**
    (não há 12 packshots reais ainda — alternando entre os assets
    disponíveis, ver achado abaixo).
  - **`dados/filtros.js`** — categorias/tamanhos/estações/cores/
    especificações. Typos do PDF corrigidos (conteúdo novo, autorizado pelo
    backlog): "TAMNHOS"→"TAMANHOS", "INVERSO"→"INVERNO",
    "ESPECIFICAÇÃOES"→"ESPECIFICAÇÕES".
- **`Homem.jsx`/`Mulher.jsx`:** deixam de ser scaffold — cada um vira
  `return <Produtos genero="Homem|Mulher" />` (2 linhas). Roteamento
  (`/homem`, `/mulher`) já existia, não foi tocado.
- **`base.css`:** bloco novo "PRODUTOS — PLP" (classes próprias) + adaptações
  nos 3 `@media` existentes (grade 3→2→1 col; sidebar sai da lateral e vira
  colapsável só ≤768px, conforme pedido). ⚠️ Nota técnica: `.aba_categoria`,
  `.botao_tamanho`, `.dropdown_ordenar` e `.botao_filtros_mobile` são
  `<button>` — a regra base global `button{width:14vw;height:7.3vh;
  clip-path:...}` (pensada pro Hero da Home) alcançaria qualquer `<button>`
  do site, então cada uma reseta `width`/`height`/`margin`/`clip-path`
  explicitamente (só o `botao_cortado` do Bloco Editorial herda o corte
  diagonal de propósito, como em Lançamento desconto/especial).

### 🔎 Achado: `conjunto1_fav.jpg` é BYTE A BYTE IDÊNTICO a `colecao-hero.jpg`
Ao investigar por que uma das 4 imagens placeholder de Produtos não aparecia
no `dist/` do build de produção, encontrei a causa: `conjunto1_fav.jpg` e
`colecao-hero.jpg` (`src/padrao/assets/images/`) têm o **mesmo MD5**
(mesmo arquivo, nomes diferentes) — bug de asset **pré-existente**, de antes
desta tarefa (mesma data de criação dos 2 arquivos, `Jul 3`), não algo que eu
quebrei. O Vite deduplica assets por hash de conteúdo (comportamento correto
dele), então as duas importações sempre resolveram pro mesmo arquivo final.

**Efeito colateral real, na Home:** o card "CALÇA RIDE FIT 2" da seção
**Favoritos** (`src/paginas/home/dados/favoritos.js`, `conj1`) mostra a foto
do **hero da coleção** por engano, silenciosamente, em produção — não é um
`<img>` quebrado (por isso passou despercebido: a imagem carrega normal,
só é a **errada**). **Não toquei em `Favoritos.jsx`/`favoritos.js`** (fora do
escopo desta tarefa, que é só Produtos) — só **removi `conjunto1_fav.jpg`
do ciclo de placeholders de `dados/produtos.js`** (ficou com 3 imagens
distintas em vez de 4), pra não repetir a mesma foto do `HeroColecao` dentro
da própria grade de produtos.

**Pendência pro dono:** decidir se `conjunto1_fav.jpg` deve virar um asset
de verdade (Favoritos, Home, perderia a imagem "extra" que hoje é só uma
cópia disfarçada do hero) — fora do escopo desta tarefa, só reportando o
achado.

**Verificação:** `npx vite build` ✅ (496 módulos, todos os assets únicos no
bundle — reconfirmado após o achado acima) · `npm run lint` ✅ sem avisos.
Checagem no código: `/homem` e `/mulher` renderizam `<Produtos/>`; `git diff
--stat` confirma **zero mudanças** em `src/paginas/home/`,
`src/paginas/institucional/`, `src/padrao/componentes/` e `src/App.jsx`;
todos os imports de `src/paginas/produtos/` usam o alias `@`. **Não tirei
nem analisei screenshots** — a comparação com o PDF é do Opus/dono.

**Pendências pro dono** (herdadas do backlog): 12 packshots reais (hoje 3
placeholders alternados); filtros devem funcionar de verdade numa fase
futura, ou seguem visuais?; clique no card deve levar pra uma página de
produto (detalhe) — próxima página, ainda não existe. **Não commitado.**

---

## 2026-07-13 11:50 — Header: link "INSTITUCIONAL" sempre rola ao topo

**O que foi feito e por quê** (pedido direto do dono, fora do fluxo Opus →
Sonnet — mesmo padrão das entradas de 09:32/11:27): clicar em "INSTITUCIONAL"
no nav devia levar ao **topo** da página Institucional, estando em **qualquer
página, inclusive já na própria Institucional** rolada pra baixo.

- **`src/padrao/componentes/Header.jsx`:** novo `irParaInstitucional`
  (mesmo raciocínio do `irParaHome` da logo) — `navegar("/institucional")` +
  `lenis.scrollTo(0)` (fallback `window.scrollTo` sem Lenis). **Por quê o
  scroll explícito:** o reset de rota (`RolarAoTopoNaRota`, `App.jsx`) só
  dispara quando o `pathname` **muda** — clicar no link estando já em
  `/institucional` faz do `navigate` um no-op (mesma rota), então sem essa
  chamada explícita o clique pareceria não fazer nada com a página rolada.
  Conectado nos **3** pontos onde o nav é renderizado (nav completo, nav
  minimalista, drawer mobile — este último compõe com o `onClick` que já
  fechava o drawer). Só o item cujo `link === "/institucional"` recebe o
  handler; os demais links do nav continuam `<Link>` simples (fora do escopo
  pedido).

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos. Checagem
no código: os 3 pontos de renderização do nav (`grep irParaInstitucional`)
usam o handler.

**Não commitado.**

---

## 2026-07-13 11:38 — Institucional: 3 correções vs PDF (QS#2, Missão)

**O que foi feito e por quê** (instrução
`docs/agentes/sonnet/fazer/institucional-correcao.md` — conferência do Opus
comparando `/institucional` com o PDF renderizado achou 3 divergências;
**Hero e demais seções não foram tocados**, confirmado por `git diff --stat`):

1. **Quem Somos #2 — imagem trocada:** `QuemSomos2.jsx` importava
   `institucional-quemsomos.jpg` (na verdade uma foto de **grupo**, 3 pessoas
   + moto — não batia com o PDF, que mostra um **detalhe de jaqueta**).
   Trocado por **`jaqueta_fav.jpg`** (mesmo diretório de assets); alt text
   ajustado (`"Detalhe de jaqueta X11"`). Nada mais da seção mudou.
2. **Missão — fundo com foto de grupo:** a foto de grupo que saiu do QS#2
   (`institucional-quemsomos.jpg`) virou o **fundo da Missão**, que antes era
   cor lisa. Mesma técnica em camadas do Hero — `.missao_bg` (imagem `cover`,
   referenciada em CSS via `url()`, não por import no JSX, igual ao
   `.hero_institucional_bg`) atrás + `.missao_secao::after` (gradiente
   escuro) na frente — com **classes próprias** (`.missao_bg`/
   `.missao_conteudo`), não reaproveitando os seletores do Hero.
   `Missao.jsx` ganhou um wrapper `.missao_conteudo` (kicker+frase+assinatura)
   com `z-index:1` pra ficar acima do overlay; `.missao_secao` virou o
   container de camadas (`position:relative;z-index:-1;overflow:hidden`,
   mesmo truque de empilhamento do `.hero_institucional`). Sem parallax — só
   a estrutura em 2 camadas pedida.
3. **Missão — itálico removido:** `.missao_frase` perdia `font-style:italic`;
   frase agora reta, como no PDF.

**Verificação:** `npx vite build` ✅ (487 módulos) · `npm run lint` ✅ sem
avisos. Checagem no código: `QuemSomos2.jsx` importa `jaqueta_fav.jpg`;
`.missao_bg`+`::after` presentes; `grep "font-style"` no `base.css` não
retorna nada (itálico removido do arquivo inteiro, não só da Missão — não
havia outro uso). **Não tirei nem analisei screenshots** — a comparação
visual com o PDF é do Opus/dono.

**Não commitado.**

---

## 2026-07-13 11:27 — Institucional: textos pequenos maiores (legibilidade)

**O que foi feito e por quê** (pedido direto do dono, fora do fluxo Opus →
Sonnet — mesmo padrão da entrada de 09:32: tweak pontual de tamanho de fonte,
sem replanejar layout/estrutura. Escopo confirmado com o dono: **página
Institucional inteira**, não o site todo):

- **`base.css`, corpo/legendas das 6 seções da Institucional** (títulos —
  `h2`/`h3` de seção, `marco_ano`, `valor_numero` — **não** foram tocados,
  só o texto secundário):
  - `.hero_institucional_subtitulo` — `1.1rem` → `1.25rem`.
  - `.quemsomos1_texto p` (parágrafos do topo) — `1rem` → `1.1rem`.
  - `.feature_card h3` — `1rem` → `1.1rem`; `.feature_card p` — `0.9rem` → `1rem`.
  - `.quemsomos_split_texto p` (parágrafos de Quem Somos #2/#3) — `1rem` → `1.1rem`.
  - `.marco_titulo` — `0.95rem` → `1.05rem`; `.marco_texto` — `0.9rem` → `1rem`.
  - `.missao_assinatura` — `0.95rem` → `1.05rem`.
  - `.valor_card h3` — `1rem` → `1.1rem`; `.valor_texto` — `0.9rem` → `1rem`.
- Nenhuma mudança de layout/cor/peso — só `font-size`. Home **não** foi
  tocada (fora do escopo confirmado).

**Nota:** ao conferir o arquivo, vi que o Hero da Institucional já tinha sido
ajustado manualmente por você desde a última rodada (alinhamento voltou pra
`start`/esquerda, `max-width:840px`, subtítulo em branco em vez de laranja)
— mantive essas mudanças como estão, só ajustei o `font-size` do subtítulo
por cima.

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos.

**Não commitado.**

---

## 2026-07-13 10:57 — Institucional COMPLETA: hero centralizado + 6 seções novas

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/institucional-completa.md`,
textos/estrutura de `docs/agentes/opus/backlog/institucional.md`): a Institucional
tinha só o Hero; esta rodada completa a página inteira e corrige o Hero
(texto centralizado, pedido do dono).

- **Hero centralizado (correção):** `.hero_institucional` passou de
  `align-items:flex-end` (texto à esquerda-embaixo) para `align-items:center;
  justify-content:center`; `.hero_institucional_escrito` ganhou
  `text-align:center`+`align-items:center`+`max-width:640px` (era `width:42vw`
  alinhado à esquerda). Overlay trocado de gradiente lateral (`to right`) para
  **radial centrado** (`radial-gradient(ellipse... at center)`) + leve base —
  escurecimento uniforme em volta do texto centralizado, onde quer que ele
  caia. Imagem (`testado-minas.jpg`), parallax e stagger de entrada
  **mantidos**. As 3 media queries do hero foram revistas (removido o
  `width`/padding assimétrico, ajustado pra `max-width` fluido).
- **6 seções novas** em `src/paginas/institucional/` (todas com
  `useProgressoSecao`+`RevelaComProgresso`, padrão de reveal da Home,
  fallback reduced-motion herdado):
  - **`QuemSomos1.jsx`** — kicker+título+3 parágrafos (split 2 colunas) +
    grade de **4 features** (data-driven, `dados/features.js`), cada uma com
    ícone SVG inline minimalista laranja (`IconesFeatures.jsx`, 4 ícones
    novos — escudo/raio/camadas/capacete — sem dependência nova) + filete
    superior. Responsivo 4→2→1 colunas.
  - **`QuemSomos2.jsx`** — split imagem (`institucional-quemsomos.jpg`,
    esquerda) + kicker/título/texto (direita). Empilha em mobile (imagem em
    cima, ordem natural do JSX).
  - **`Timeline.jsx`** — 4 marcos (`dados/timeline.js`: 2007/2009/2015/2021),
    números grandes em Chakra Petch laranja + filete superior. Responsivo
    4→2→1. Sem kicker/título próprio — o material de layout não tem
    cabeçalho pra esta seção.
  - **`QuemSomos3.jsx`** — split invertido: texto (esquerda) +
    `institucional-detalhe.jpg` (direita). Empilha em mobile.
  - **`Missao.jsx`** — faixa-citação "no espírito do Banner" da Home (frase
    grande centralizada + bordas superior/inferior), mas com o reveal padrão
    da página. **Sem imagem** (asset de grupo ainda não entregue) — fundo
    escuro com leve tingimento laranja; comentário no código marcando onde a
    foto entra depois.
  - **`Valores.jsx`** — kicker+título centralizados + 3 colunas numeradas
    (`dados/valores.js`, 01/02/03). Responsivo 3→1 (pedido explícito da
    instrução).
  - **`QuemSomos2.jsx`**/**`QuemSomos3.jsx`** compartilham a classe de layout
    `.quemsomos_split` (grid 2 colunas) — a inversão de lado vem só da ordem
    no JSX, sem CSS de `order`.
- **Dados novos:** `src/paginas/institucional/dados/{features,timeline,valores,textosQuemSomos}.js`.
  `textosQuemSomos.js` centraliza os 3 parágrafos **repetidos** entre Quem
  Somos #1 e #2 (o PDF traz o texto idêntico nas duas seções — mantido assim,
  pendência de confirmar variação já registrada no backlog).
- **`Institucional.jsx`:** monta Hero + as 6 seções na ordem do layout;
  Footer vem do shell (não recriado).
- **`base.css`:** ~350 linhas novas (bloco base por seção + adaptações nos 3
  `@media` já existentes) — só **classes próprias** da institucional,
  reaproveitando apenas os utilitários genéricos já autorizados (`.p_laranja`,
  `.zoom_imagem`) e os tokens de cor/fonte. Fundos alternam
  `--background_escuro`/`--background_cinza` seção a seção, como a Home.

**Correções de fonte aplicadas ao digitar os textos** (comparado ao
`institucional.txt`, extração crua do PDF que tem ruído de OCR): "Minas
Gerias" → "Minas Gerais" (typo óbvio de extração, não uma grafia da marca);
espaços/quebras de palavra colados (`AX11`, `juntodo`) corrigidos pro texto
corrido normal. **Pendências herdadas do backlog, não resolvidas aqui**
(fora do meu escopo decidir sozinho): texto duplicado em Quem Somos #1/#2,
título "02" de Valores repetindo o nome de uma feature.

**Regra de ouro:** nenhum seletor/arquivo de `src/paginas/home/` foi tocado
(confirmado por `git diff --stat` — diff vazio nesse caminho).

**Verificação:** `npx vite build` ✅ (488 módulos, as 2 imagens novas no
bundle) · `npm run lint` (oxlint) ✅ sem avisos, inclusive nos arquivos que só
exportam um objeto com JSX (`IconesFeatures.jsx` — `allowConstantExport` no
`.oxlintrc.json` cobre esse caso). Checagem no código: títulos/textos
conferidos contra o backlog um a um; `font-family` só via `var(--fonte-*)`
(grep confirmado); as 2 imagens novas via `import`. **Não tirei nem analisei
screenshots** — a comparação visual com o PDF/PNG nos 5 viewports é do
Opus/dono.

**Pendências pro dono (herdadas do backlog):** foto em alta-res da Missão
(grupo de motociclistas); confirmar se o texto de Quem Somos #1/#2 deve
variar; confirmar o título "02" de Valores; os 4 ícones das features são um
primeiro corte minimalista — o Opus/dono pode querer refinar o traço na
conferência visual. **Não commitado.**

---

## 2026-07-13 10:37 — Roteamento (React Router): Home + Institucional + scaffolds navegáveis

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/roteamento.md`,
decisão do dono de 2026-07-13: fim do toggle temporário, páginas navegáveis
por URL real):

- **Instalada `react-router-dom`** (nova dependência, `^7.18.1`).
- **`src/App.jsx`:** shell agora envolve tudo num `<BrowserRouter>` (wrapper
  mais externo — o Header usa `<Link>`/`useNavigate` e precisa estar dentro
  do Router). O miolo, que antes era o toggle `<Home/>`/`<Institucional/>`,
  virou `<Routes>`: `/`→`Home`, `/institucional`→`Institucional`,
  `/homem`→`Homem`, `/mulher`→`Mulher`,
  `/guia-de-equipamento`→`GuiaDeEquipamento`,
  `/onde-encontrar`→`OndeEncontrar`, `/equipamento`→`Equipamento`. **Toggle
  removido** (import comentado da Home some, `<Institucional/>` fixo some).
  Resto do shell (MotionConfig, ReactLenis/reduced-motion, Header, Footer)
  **intocado**.
- **`RolarAoTopoNaRota` (novo, em `App.jsx`):** observa `useLocation().pathname`
  e, na troca, rola ao topo — `lenis.scrollTo(0,{immediate:true})` se o Lenis
  estiver montado, `window.scrollTo(0,0)` senão (ramo reduced-motion, onde o
  Lenis nem existe). Vive dentro do Router e do provider do Lenis, junto do
  `SincroniaLenisFramer`, e também é renderizado no ramo reduced-motion.
- **`src/padrao/componentes/Header.jsx`:** os `<a href={item.link}>` viraram
  `<Link to={item.link}>` nos **3** pontos (nav completo, nav minimalista,
  drawer mobile — fecha o drawer via `onClick` ao navegar, mantido). O CSS
  (`header nav a` etc.) continua valendo sem mudança nenhuma, porque `<Link>`
  renderiza um `<a>` de verdade. **Logo (`irParaHome`):** ganhou
  `navegar("/")` (via `useNavigate`) antes do `lenis.scrollTo(0)`/
  `window.scrollTo` já existente — navega pra Home e rola ao topo; se já
  estiver em `/`, o `navigate` é um no-op e só o scroll acontece (mesmo
  comportamento de sempre).
- **`src/padrao/dados/navegacao.js`:** os 5 `link` (antes `""`) preenchidos
  com as rotas reais (`/homem`, `/mulher`, `/guia-de-equipamento`,
  `/onde-encontrar`, `/institucional`).

**Regra de ouro:** nenhum seletor/arquivo de `src/paginas/home/` ou de
`src/padrao/estilos/base.css` foi tocado (confirmado por `git diff --stat` —
zero mudanças nesses caminhos); a Home em `/` é a mesma árvore de componentes
de antes, só que agora montada pelo `<Routes>` em vez do toggle fixo.

**Verificação:** `npx vite build` ✅ (475 módulos, todas as páginas no bundle)
· `npm run lint` (oxlint) ✅ sem avisos. Checagem no código: `/` renderiza
`Home`, `/institucional` renderiza a Institucional, os 3 pontos de nav usam
`Link` e a navegação não recarrega a página (garantia do próprio React
Router). **Não tirei nem analisei screenshots** — conferência visual é do
Opus/dono.

**Nota operacional (fora do código):** a instalação do `react-router-dom`
esbarrou na **cota de disco do servidor** (`quota -s` acusou 6144M/6144M, o
`Bash` chegou a parar de responder por completo). O dono limpou espaço
(`~/.npm/_cacache`) manualmente pelo terminal; a instalação foi concluída
depois disso. Cota segue **acima do soft limit** (5120M) com grace period de
3 dias rodando — vale um cuidado geral do dono com o espaço em `~/.npm`/
`~/.cache`/`~/.vscode-server` antes do grace period expirar.

**Débito a anotar:** em produção estática, `BrowserRouter` exige *fallback
SPA* no servidor (todas as rotas → `index.html`) — pedir ao admin ao publicar
o vhost. No `vite dev` já funciona nativamente.

**Não commitado.** O Opus confere; depois vem a institucional completa
(todas as seções + hero com texto centralizado).

---

## 2026-07-13 09:55 — Institucional: casca da página + Hero (1ª etapa)

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/institucional-hero.md`,
1ª de várias etapas da página Institucional — Quem Somos, Timeline, Missão e
Valores virão em instruções seguintes):

- **`src/paginas/institucional/Institucional.jsx`:** deixou de ser scaffold
  (`<h1>Institucional</h1>`) e virou `<main className="institucional">`
  renderizando `<HeroInstitucional/>`, com comentário marcando onde as
  próximas seções entram.
- **`src/paginas/institucional/HeroInstitucional.jsx` (novo):** espelha a
  arquitetura do `Hero_Home.jsx` — entrada em stagger no load (`heroStagger`/
  `heroItem` de `@/padrao/lib/motion`), camada de fundo própria
  (`.hero_institucional_bg`) com parallax leve ligado ao scroll (`useScroll`+
  `useTransform`, com fallback `useReducedMotion` → sem parallax). Kicker
  laranja (`.p_laranja`, "INSTITUCIONAL") → título `h1` branco ("Movidos pela
  mesma paixão.", `--fonte-titulo`, caixa mista) → subtítulo laranja ("A
  liberdade sobre duas rodas", `--fonte-rotulo`). Sem botões/CTA. **Imagem:
  `testado-minas.jpg`** (placeholder escolhido pelo dono pra não repetir
  `hero-home.jpg` — pode trocar por foto oficial em alta-res depois).
- **`src/padrao/estilos/base.css`:** bloco novo `INSTITUCIONAL — HERO` (classes
  próprias, `snake_case` PT, nenhum seletor do hero da Home tocado/reutilizado)
  com overlay em gradiente escuro (esquerda + base, mesma técnica `::after` já
  usada em Lançamento Especial) para legibilidade do texto sobre a imagem.
  Adaptações responsivas adicionadas dentro dos 3 `@media` já existentes
  (1280/768/480): texto sai de `42vw` (desktop) para `60vw` (tablet) e `100%`
  (mobile), paddings fluidos, título com `clamp` reduzido no mobile pequeno.
  Só **adições** (nenhuma linha existente alterada — confirmado por `git
  diff --stat`, `base.css` só ganhou inserções).
- **`src/App.jsx`:** **toggle temporário de dev** — `<Home/>` comentada,
  `<Institucional/>` renderizada em seu lugar, pra dar visibilidade à página
  em construção sem roteamento ainda. Import da Home deixado comentado
  (pronto pra reverter). Nada mais do shell (Header/Footer/Lenis/MotionConfig)
  foi tocado.

**Regra de ouro:** nenhum arquivo/seletor da Home foi alterado — reverter o
toggle em `App.jsx` (`<Home/>` no lugar de `<Institucional/>`) devolve a Home
idêntica.

**Verificação:** `npx vite build` ✅ · `npm run lint` (oxlint) ✅ sem avisos.
Checagem no código: `font-family` só via `var(--fonte-*)` no bloco novo;
imports via alias `@`; classes novas confirmadas no bundle de produção
(`dist/assets/index-*.css`). **Não tirei nem analisei screenshots** — a
conferência visual nos 5 viewports é do Opus/dono.

**Pendências:** foto oficial em alta-res do Hero (placeholder atual:
`testado-minas.jpg`); demais seções da Institucional (Quem Somos, Timeline,
Missão, Valores) em instruções seguintes; reverter o toggle de `App.jsx`
quando o roteamento real entrar. **Não commitado.**

---

## 2026-07-13 09:32 — Hero: parágrafo branco maior (legibilidade)

**O que foi feito e por quê** (pedido direto do dono, fora do fluxo Opus →
Sonnet: o parágrafo do Hero — "Equipamento desenvolvido em laboratório para
proteger dentro e fora da estrada. Onde tecnologia encontra estilo." —
ficou "muito pequeno, quase ilegível" depois da migração tipográfica de
09:27, que trocou a fonte do corpo para Open Sans Condensed peso 300 sem
tocar em tamanhos):

- **`#p_branco` (`base.css`):** ganhou `font-size: 1.2rem` (antes sem
  regra própria — herdava o tamanho padrão do navegador, ~16px, que renderiza
  pequeno/fino na fonte condensada nova). `1.2rem` casa com a escala já usada
  no kicker `.p_laranja` da mesma seção. Nada mais no Hero foi tocado (cor,
  `position`/`top`, o `h1`, os botões).
- Ajuste pontual só neste seletor — não mexi em outros parágrafos do site
  (fora do escopo pedido); se aparecerem outros textos pequenos demais em
  outras seções, é um pedido novo.

**Verificação:** `npx vite build` ✅ · `npm run lint` ✅ sem avisos.
Conferência visual não feita nesta rodada (mudança de 1 propriedade, baixo
risco de overflow — texto já reflui livremente no container do Hero em
todos os breakpoints). **Não commitado.**

---

## 2026-07-13 09:27 — Migração tipográfica GLOBAL: 3 fontes (Chakra Petch / IBM Plex Sans Condensed / Open Sans Condensed)

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/tipografia-global.md`,
decisão do dono de 2026-07-13: nova identidade tipográfica global, as 3 fontes
do próprio layout — confirmadas por `pdffonts` em `docs/layout/*.pdf`):

> ⚠️ **Exceção explícita à regra de ouro** (autorizada pelo dono, "Global"):
> esta mudança altera a **fonte** da Home no desktop **> 1280px** — a **2ª
> exceção** documentada do projeto (a 1ª foi o carrossel de Destaques, Fase 4).
> **Layout/estrutura preservados**; só a tipografia muda.

- **`index.html`:** troca do `<link>` do Google Fonts — carrega **Chakra
  Petch (700)**, **IBM Plex Sans Condensed (500/600)** e **Open Sans
  Condensed (300/700)**, só com os pesos usados. **Removidas `Inter` e
  `Roboto`** (não usadas em nenhum seletor). Também limpos 2 `<link
  rel="preconnect">` duplicados que já existiam no arquivo.
- **`tokens.css`:** 3 novos tokens em `:root` — `--fonte-titulo`,
  `--fonte-rotulo`, `--fonte-corpo` (fallback `sans-serif` nos três).
  `body` passou a apontar pra `--fonte-corpo` (era `"Roboto"` direto).
- **`base.css`:** `font-family` aplicado por seletor, seguindo a hierarquia
  definida pelo Opus (ver `contexto/estilos.md` pra tabela completa):
  - **`--fonte-titulo` (Chakra Petch):** todo `h1`/`h2` de título de seção
    (Hero, Favoritos, Categorias/Território/Histórias via `.escrito_cat`,
    Lançamento desconto/especial, Banner) **+ os `h3` que funcionam como
    título de seção/card** (Destaques "OS MAIS VENDIDOS" nos modos hijack e
    estático, título dos cards de Território e Histórias — todos 26px/800,
    escala de headline, não de rótulo) **+ `.preco_produto_destaque`**
    (preço dos produtos, citado explicitamente na instrução como "número de
    destaque").
  - **`--fonte-rotulo` (IBM Plex Sans Condensed):** `.p_laranja` (kicker),
    nav dos 2 headers, `.texto_botao`, e labels curtos de
    card/coluna — `.nome` (Favoritos), `.card_categoria p`,
    `.titulo_produto_destaque` (Destaques), `.coluna_footer p` (títulos das
    3 colunas do rodapé) — e os CTAs em caixa-alta `.card a`
    ("COMPRAR")/`.card_historia a` ("LEIA MAIS"), mesma família de "botão"
    da diretiva.
  - **`--fonte-corpo` (Open Sans Condensed):** só via `body` — todo texto
    sem regra própria herda (`.desc`, `.card_historia p`, links do footer,
    copyright).
- **Decisão de projeto (não estava na instrução, exigiu checar a API do
  Google Fonts):** `Open Sans Condensed` **não tem peso 400** nessa família
  condensada (só 300 e 700 — confirmado direto em
  `fonts.googleapis.com/css2`, pedir `wght@400` não retorna nada). Por isso
  `body` usa `font-weight:300` como "regular" em vez de 400. Nenhum
  `font-size`/`font-weight` existente foi tocado — onde o peso declarado no
  CSS não bate com o que foi carregado (ex.: `.desc{font-weight:200}`,
  `.card_categoria p{font-weight:700}` em rótulo, `h3{font-weight:800}` em
  título), o navegador usa o peso carregado mais próximo (comportamento
  nativo, sem `font-synthesis`) — fora do escopo desta migração (só troca de
  família, "sem redesenhar").

**Verificação:** `npx vite build` ✅ (460 módulos) · `npm run lint` (oxlint) ✅
sem avisos. **Conferência visual nos 5 breakpoints (390/768/1024/1280/1440)
NÃO feita nesta rodada** — pulada a pedido direto do dono ("pode seguir sem
mexer com prints"); fica pendente pro Opus/dono conferir manualmente
(`npm run dev`) antes do commit.

**Pendente:** conferência do Opus/dono (fonte nova em toda a Home, nada
estourando/quebrando nos 5 breakpoints, nav/botões legíveis). Docs
sincronizados (`contexto/estilos.md`, `contexto/padrao-api.md`;
`contexto/convencoes.md` já registrava a exceção). **Não commitado.**

---

## 2026-07-10 13:57 — Docs sincronizados com a nova estrutura + criado o backlog de páginas

**O que foi feito** (a pedido do dono: "atualize todos os documentos; ainda não
temos um backlog"):
- **Novo backlog** `opus/backlog/paginas.md` — o próximo frente (as páginas):
  Fase 0 **roteamento** (infra; decisão de lib pendente — React Router?), depois
  **equipamento** (detalhe do produto, prioridade), depois as páginas da navegação
  (homem/mulher/guia-de-equipamento/onde-encontrar/institucional). Inclui as
  **decisões abertas do dono** e o débito técnico anotado (`npm run build`/`tsc -b`,
  tokens de espaçamento).
- **Contexto sincronizado** com a estrutura nova (`padrao/` + `paginas/`, alias
  `@`, CSS em `estilos/base.css`+`tokens.css`): `arquitetura.md` (já reescrito),
  `README.md`, `componentes.md`, `estilos.md`, `convencoes.md`.
- **`planejamento-completo.md`**: fases 1–6 marcadas concluídas/commitadas + Fase 7
  (reestruturação) registrada; aponta pro backlog de páginas.
- **`instrucoes-do-dono.md`**: registrada a decisão da estrutura multi-página, as
  páginas previstas e a exceção pontual ("Opus fez a reestruturação ele mesmo").

Sem mudança de código nesta entrada — só documentação. `git commit` + `push` na
master (autorizado pelo dono).

---

## 2026-07-10 13:47 — Reestruturação multi-página: pasta por página + pasta de padronização (feito pelo Opus, a pedido do dono)

**O que foi feito e por quê** (o dono pediu explicitamente que o **Opus** fizesse
a reestruturação — exceção pontual ao fluxo Opus-só-planeja — para o projeto
"receber novas páginas"):
- **`src/padrao/`** (padronização — tudo comum a todas as páginas): `componentes/`
  (Header, Footer, BotaoCortado), `lib/` (Revela, useProgressoSecao,
  useEstiloRevela, motion), `dados/` (navegacao, footer), `estilos/`
  (**tokens.css** = cores `:root` + fonte; **base.css** = @import tokens + reset +
  Lenis + todas as regras), `assets/images/`.
- **`src/paginas/`** (uma pasta por página): **`home/`** (a landing atual — `Home.jsx`
  com o `<main>` das 9 seções + os componentes de seção + `dados/`); **scaffolds**
  de `equipamento/` (detalhe do produto), `homem/`, `mulher/`,
  `guia-de-equipamento/`, `onde-encontrar/`, `institucional/` (stub por enquanto,
  sem conteúdo/rota).
- **`App.jsx` virou o SHELL** compartilhado (Lenis + MotionConfig + Header +
  `<Home/>` + Footer) — Header/Footer saíram pra fora da página; **DOM final
  idêntico**.
- **Alias `@` → `src/`** (`vite.config.ts` + `tsconfig.app.json` `paths`); todos os
  imports migraram pra `@/padrao/...` / `@/paginas/...`. `components/` (raiz),
  `src/lib/`, `src/data/`, `src/assets/`, `src/index.css` **deixaram de existir**
  (movidos via `git mv`, histórico preservado).

**Invariante respeitado — visual intocado:** o CSS foi apenas **relocado**
(index.css → base.css; `:root`/fonte extraídos pra tokens.css; `url()` dos assets
corrigidos) sem mudar valores. Conferido no build: **9 seções, 22 imagens 0
quebradas, token --laranja resolvendo, hero_bg ok, 0 erros de console**, e
screenshot do desktop **idêntico** ao anterior. `npx vite build` ✅ ·
`npm run lint` ✅.

**Ainda não há roteamento** — só a reestruturação de pastas (era o pedido). As
páginas novas entram cada uma na sua pasta; o roteamento entra no shell depois.

---

## 2026-07-10 12:20 — Leva de refinos fechada: dono confirmou o arraste no touch; aguardando commit

- **Dono confirmou:** o **carrossel arrastável funciona no touch** (o `dragstart`
  que o Opus pegou era do mouse do teste automatizado, que não reflete o toque
  real). O fix `draggable={false}`/`-webkit-user-drag:none` foi **dispensado pelo
  dono** — fica anotado como melhoria opcional (robustez no mouse/desktop estreito),
  **não** aplicado. Instrução `fix-drag-mobile-imagem.md` removida de `fazer/`.
- **Estado conferido:** logo inteiro (completo 308×130 / minimalista 170×72,
  `display:contents`) ✅, Lenis ativo ✅, overflow zero (900–1440) ✅, mobile
  arrastável ✅ (confirmado pelo dono).
- **Pendente:** **commit** da leva (Fase 5 Lenis + carrossel arrastável mobile +
  logo→Home + fix do logo) — 12 arquivos não commitados desde `8db519b`.
  Aguardando sinal verde do dono. `fazer/` vazio (sem tarefa ativa).

---

## 2026-07-10 12:15 — Conferência do Opus: logo/Lenis/overflow OK; carrossel arrastável tem bug (drag nativo da imagem) — fix

**Conferência (Opus, script Playwright no build atual):**
- **Logo CORRIGIDO ✓** — completo 308×130 (inteiro), minimalista 170×72; nada
  cortado (o `display:contents` resolveu).
- **Lenis ATIVO ✓** (`html.lenis`).
- **Overflow ZERO ✓** em 900/1024/1100/1280/1440.
- **Carrossel arrastável (mobile): BUG** — arrastar **não move os cards**.
  Instrumentando os eventos, dispara **`dragstart`**: o toque cai sobre a `<img>`
  e o navegador inicia o **arraste nativo da imagem**, roubando o gesto do Framer
  (`transform` fica vazio). `maxArrasto` medido = 2516 (limites OK); o problema é
  só o ghost-drag da imagem. Quebra sempre no mouse; frágil no touch.
- **Fix (instrução):** `draggable={false}` + `-webkit-user-drag:none` nas imagens
  dos cards → o gesto volta pro Framer. Instrução `sonnet/fazer/fix-drag-mobile-
  imagem.md`.

**Pendências de conferência:** feel do Lenis no scroll real (suavidade) e o
arraste pós-fix — confiro após o fix. **Nada commitado.**

---

## 2026-07-10 12:07 — Fix: logo cortado pelo wrapper "voltar ao topo"

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/fix-logo-cortada.md`,
correção cirúrgica — só o CSS do `.logo_home_botao`; carrossel, Lenis, nav,
drawer e demais seções não tocados):

- **Causa raiz (medida pelo Opus por screenshot):** o wrapper
  `.logo_home_botao` (introduzido na rodada anterior, "logo volta pra Home")
  usava `display:block;line-height:0`, pensando no mesmo padrão de
  `.zoom_imagem`. Só que ali o `img` filho **também** ganha `display:block`
  explícito — em `header img`/`.header_minimalista img` isso nunca foi
  definido (a `<img>` continua `inline`), então o `line-height:0` do
  wrapper colapsava a **caixa do botão** (medido: 66px de altura pra uma
  imagem de 130px), cortando o logo — bem visível no header completo, mais
  sutil no minimalista.
- **Fix:** `.logo_home_botao` passou a usar **`display:contents`** (removido
  o `line-height:0`) — o botão **não gera caixa própria**, então a `<img>`
  volta a se comportar como se fosse filha **direta** do header (exatamente
  o que `header img`/`.header_minimalista img` já esperavam antes do
  wrapper existir). Nada mais no CSS dessas duas regras foi tocado — logo
  volta ao tamanho/posição/sobreposição aprovados, nos dois estados.
  `cursor:pointer` continua funcionando (propriedade herdada, passa pelo
  `display:contents` até a `<img>`, que é o elemento que de fato pinta a
  caixa).
- **Nada mudou em `components/Header.jsx`** — a estrutura `<button
  className="logo_home_botao"><img/></button>` (nos 2 estados) já estava
  certa; o bug era **só** CSS. Clique → `lenis.scrollTo(0)`/fallback
  continua inalterado.

**Verificação:** `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Pendente:** conferência do Opus (logo inteiro e correto nos 2 estados,
clique volta ao topo, nada mais mudou). Não commitado.

---

## 2026-07-10 12:05 — Bug: logo CORTADO nos dois headers (wrapper do "voltar ao topo") — correção

**Contexto (Opus, medido + screenshot no build atual):** ao tornar o logo clicável
(11:55), a `<img>` foi envolvida num `<button class="logo_home_botao">` com
**`line-height: 0`**. Como a `<img>` é **inline**, isso **colapsou a caixa do
botão** — medido **botão 66px vs img 130px** — e o **logo aparece cortado** (só a
parte de baixo). Confirmado no header **completo** (bem cortado) e, menor, no
**minimalista**. O clique funciona; o defeito é só o **box do wrapper**.

**Correção (instrução):** tornar o `.logo_home_botao` **neutro no layout** —
preferência **`display: contents`** (sem gerar caixa; a img volta a se posicionar
como filha direta do header, idêntica ao aprovado) e **remover o `line-height:0`**;
se `display:contents` no `<button>` der problema de foco, trocar por `<a
href="#topo">` com `display:contents`. Alternativa: manter caixa mas com
`overflow:visible`, `height:auto` e **img `display:block`**, se ficar
pixel-idêntico.

**Encaminhamento:** instrução ativa `sonnet/fazer/fix-logo-cortada.md`. Obs.: o
**carrossel arrastável no mobile** e o **Lenis** ainda têm conferência do Opus
pendente (faço junto na próxima). **Nada commitado.**

---

## 2026-07-10 11:55 — Carrossel arrastável no mobile (3º modo) + logo do header volta pra Home

**O que foi feito e por quê** (instrução
`docs/agentes/sonnet/fazer/mobile-carrossel-arrastavel-e-logo-home.md`; o
scroll-hijack do desktop `>1280px+ponteiro fino` **não foi tocado**):

**PARTE 1 — Destaques ganhou um 3º modo: "arrastavel"**
- Causa raiz do swipe nativo não funcionar no mobile: a **Fase 5 (Lenis)**
  intercepta o gesto horizontal de containers roláveis aninhados que não
  tenham `data-lenis-prevent` — o `overflow-x:auto`+snap do fallback antigo
  virava scroll vertical suavizado em vez de mover os cards.
- **`useModoCarrossel` (em `Destaques.jsx`) agora decide entre 3 modos** (era
  um boolean `carrossel`):
  - **`hijack`** — `(pointer:fine)+(min-width:1281px)`, sem reduced-motion →
    `CarrosselDestaques` (scroll-hijack, 300vh+pin). **Inalterado.**
  - **`arrastavel`** — qualquer outro caso não-reduced-motion (touch,
    tablet, `≤1280px`, ponteiro grosso) → **novo** `CarrosselArrastavel`.
  - **`estatico`** — reduced-motion → o fallback acessível de sempre (grade
    `overflow-x:auto`+snap, sem drag/inércia) — mesmo JSX de antes,
    renomeado só o branch.
- **`components/CarrosselArrastavel.jsx` (novo):** trilho `motion.div` com
  **`drag="x"`** de verdade (Framer Motion) — **não** ligado a
  `useScroll`/scroll nenhum, só à posição do dedo/mouse.
  `dragConstraints={{left:-maxArrasto, right:0}}` com `maxArrasto`
  **medido** (`trilho.scrollWidth − container.clientWidth`, recalculado no
  `resize` — mesmo espírito da medição do hijack, não um valor chutado).
  `dragElastic:0.12` (borracha leve nas pontas) + `dragMomentum` (inércia).
  `cursor:grab`/`grabbing`. Reaproveita `.card_produto` (imagem/título/
  preço, mesmo hover-zoom) — card `38vw` (tablet/ponteiro grosso largo) →
  **`78vw`** em `≤768px` (mobile, "espia" o próximo, convida o arraste).
- **Coexistência com o Lenis (crítico):** o container do trilho ganhou
  **`data-lenis-prevent`** (o Lenis não rouba o gesto) e o trilho
  **`touch-action:pan-y`** (o navegador manda o horizontal pro drag e o
  vertical pro scroll da página — testado mentalmente via spec: arrastar na
  horizontal move os cards, rolar na vertical continua rolando a página).

**PARTE 2 — Logo clica e volta pro topo (Home), nos 2 headers**
- `components/Header.jsx`: o `<img>` do logo (header completo **e**
  minimalista) passou a ficar dentro de um `<button type="button"
  className="logo_home_botao" aria-label="Início — voltar ao topo">`. No
  clique, `lenis.scrollTo(0)` (via `useLenis()` de `lenis/react`, já
  montado pela Fase 5) — **fallback** `window.scrollTo({top:0})` quando o
  Lenis não está ativo (`useLenis()` retorna `undefined` em reduced-motion,
  já que `App.jsx` nem monta o `<ReactLenis>` nesse caso — scroll instantâneo,
  sem "smooth" que reduced-motion não pediu).
- **Aparência do logo 100% preservada:** `.logo_home_botao` é um reset total
  (sem fundo/borda/padding, `line-height:0` fecha o espaço fantasma do
  `<img>` — mesmo padrão já usado em `.zoom_imagem`). O `<img>` deixou de
  ser **filho direto** de `<header>` (agora é neto, via o botão) — o
  seletor `header > img` virou **`header img`** (descendente) nas 3
  ocorrências (base, `≤1280px`, `≤768px`); `.header_minimalista img` já era
  descendente, não precisou mudar. Tamanho/posição/`z-index`/sobreposição
  do logo (valores já aprovados pelo dono em rodadas anteriores)
  **inalterados**.
- Não conflita com o hambúrguer/drawer (botões irmãos, handlers
  independentes).

**Verificação:** `npx vite build` ✅ (459 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (mobile: arrasta com inércia, scroll
vertical da página continua funcionando; desktop `>1280px`: hijack intacto;
logo clica e volta ao topo suave nos 2 estados; reduced-motion: carrossel
acessível + logo volta ao topo sem smooth; sem overflow horizontal; desktop
em repouso idêntico). Não commitado.

---

## 2026-07-10 11:40 — Review do dono: carrossel arrastável no mobile + clicar no logo volta pra Home — instrução

**Contexto (Opus):** com o Lenis (Fase 5) no ar, o dono apontou que **o carrossel
não funciona no mobile** e pediu que o mobile seja um **carrossel arrastável**
(drag, não ligado ao scroll). Também: **clicar no logo deve voltar pra Home**.
- **Diagnóstico do mobile:** hoje o mobile usa **swipe nativo** (`#produtos_destaques`
  `overflow-x:auto` + snap). Com o Lenis interceptando o touch da página, o scroll
  horizontal de container aninhado **é engolido** (Lenis exige `data-lenis-prevent`
  em áreas roláveis internas). Por isso não funciona.
- **Solução (instrução):** 3 modos no Destaques — `hijack` (>1280 + ponteiro fino,
  intacto), **`arrastavel`** (touch/≤1280: `motion.div drag="x"` com constraints
  medidos, inércia, `data-lenis-prevent` + `touch-action:pan-y` pra não brigar com
  o Lenis e preservar o scroll vertical), `estatico` (reduced-motion, acessível).
- **Logo→Home:** envolver o `<img>` dos **dois** headers num botão acessível que
  rola ao topo via `lenis.scrollTo(0)` (fallback `window.scrollTo`), sem mudar a
  aparência do logo.

**Encaminhamento:** instrução ativa `sonnet/fazer/mobile-carrossel-arrastavel-e-
logo-home.md`. **Fase 5 (Lenis)** marcada como implementada (11:33), conferência
final do Opus pendente (junto com esta rodada). **Nada commitado.**

---

## 2026-07-10 11:33 — Fase 5: smooth scroll global com Lenis

**O que foi feito e por quê** (instrução
`docs/agentes/sonnet/fazer/fase-5-lenis-smooth-scroll.md` — dono aprovou a
dependência nova pro "feel premium" de scroll pedido):

- **Dependência instalada:** `lenis` (`^1.3.25`, único pacote novo em
  `package.json`) — mantém o **scroll nativo** (anima a posição da janela
  via rAF, não transforma um container), por isso `position:sticky`/`fixed`
  (header minimalista, drawer mobile, carrossel pinado) continuam
  funcionando sem alteração.
- **`src/App.jsx`:** a árvore inteira passou a ser envolvida por
  `<ReactLenis root options={{lerp:0.1, autoRaf:false, syncTouch:false}}>`
  (`root` = instância global no `window`, **sem** wrapper/content div extra
  — não muda a estrutura do DOM). `lerp:0.1` é o próprio default
  recomendado do Lenis (ponto de partida "suave mas responsivo", nem
  "duro" nem "mole" — mesmo meio-termo que o dono já pediu pro carrossel).
  `syncTouch:false` (já é o default) garante **toque 100% nativo**, sem
  smooth — só suaviza wheel/scrollbar.
- **Sincronizado com o frameloop do Framer Motion (crítico):** novo
  componente `SincroniaLenisFramer` (dentro do `<ReactLenis>`, usa
  `useLenis()` pra pegar a instância) chama `lenis.raf(tempo)` de dentro de
  **`useAnimationFrame`** (hook de `motion/react`) em vez de deixar o Lenis
  rodar seu próprio `requestAnimationFrame` independente (por isso
  `autoRaf:false`) — evita ~1 frame de atraso/tranco entre o smooth scroll e
  o `useScroll`/`useTransform` que o reveal (`Revela`/`useProgressoSecao`) e
  o carrossel (`CarrosselDestaques`) já usam pra ler a posição de scroll a
  cada frame. `useAnimationFrame` cuida da inscrição/cancelamento no
  frameloop sozinho — não precisou de `cancelFrame` manual (que, por sinal,
  **não é exportado** por `motion/react`, só pelo pacote interno
  `motion-dom`, que o projeto não depende diretamente).
- **`prefers-reduced-motion`:** o Lenis **nem inicializa** — `App.jsx`
  decide com `useReducedMotion()` (mesmo hook já usado em todo o projeto,
  não reage a mudança ao vivo da preferência do SO, só na carga da página —
  comportamento já existente, replicado aqui) e renderiza a página **sem**
  `<ReactLenis>` nesse caso: scroll 100% nativo, sem suavização nenhuma.
- **CSS mínimo do Lenis** copiado pra `src/index.css` (arquivo único do
  projeto — sem importar CSS de pacote externo): classes `html.lenis`,
  `.lenis-stopped`, `[data-lenis-prevent]`, `.lenis-smooth iframe`,
  `.lenis-autoToggle` — inertes em repouso, só entram em jogo enquanto o
  Lenis está de fato rolando/parado.
- **Nav decorativa mantida decorativa:** links de `data/navegacao.js` têm
  `href=""` (não são âncoras reais) — **não** foram tornados funcionais;
  Lenis também não recebeu `anchors:true`, então não intercepta cliques de
  âncora automaticamente (comportamento inalterado).

**Verificação:** `npx vite build` ✅ (458 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (scroll suave perceptível no wheel;
carrossel e reveal suaves e sincronizados, sem tranco; header troca nos
limiares certos; reduced-motion = nativo; touch = nativo; sem overflow
horizontal; desktop >1280px em repouso idêntico). Não commitado.

---

## 2026-07-10 11:15 — COMMIT das Fases 2–4 na master + Fase 5 (Lenis) ativada

- **Commit `8db519b` na master** (sinal verde do dono, commit direto na master):
  Fases 2, 3 e 4 (responsividade + drawer, animações scroll-linked + Banner blur +
  header sem pulo, carrossel do Destaques + header minimalista 2 estados). 25
  arquivos, gate lint ✅ / build ✅ antes de commitar.
- **Fase 5 ATIVADA (Lenis / smooth scroll):** dono aprovou a dependência nova e
  pediu pra seguir. Instrução `sonnet/fazer/fase-5-lenis-smooth-scroll.md`:
  Lenis global (mantém scroll nativo → sticky/fixed e `useScroll` seguem
  funcionando), **sync com o frameloop do Framer** (carrossel/reveal/header sem
  tranco), **reduced-motion e touch = scroll nativo** (sem suavizar), **nada muda
  em repouso** (desktop >1280px pixel-idêntico). **Nada commitado** nesta ativação.

---

## 2026-07-10 11:12 — Conferência final do Opus: FASE 4 CONCLUÍDA (carrossel + header) — aguardando sinal verde pro commit

**Conferência (Opus, script Playwright no build atual):**
- **Carrossel:** folga do fim = **170px** (meio card) ✓; movimento fluido
  (`useSpring`) e altura proporcional ✓.
- **Overflow:** `document.scrollWidth == clientWidth` em **900/1024/1100/1280/1440**
  ✓ (header minimalista + carrossel não introduziram overflow).
- **Imagens:** todas atingem opacity 1, **exceto o logo do footer (0.98)** — caso
  benigno conhecido (última seção sem pista de scroll; 98% imperceptível), **não
  é regressão** do carrossel.
- **reduced-motion:** menor opacity de imagem = **1.00** ✓.
- **Logo do header:** aprovado pelo dono (11:04).

**Estado do projeto:** Fases **1, 2, 3 e 4 concluídas e conferidas**. Todo o
trabalho das Fases 2/3/4 está no **working tree, não commitado** (desde `b014deb`).
`fazer/` esvaziado (sem tarefa ativa).

**Próximo passo:** (A) **commit** de tudo (aguardando sinal verde do dono; o Opus
cria branch + mensagem quando liberado); depois (B) **Fase 5 — Lenis (smooth
scroll)**, que o Opus especifica após aval do dono (dependência nova). Retoque
opcional trivial: nudge do `offset` do footer pra assentar em 1.0 (hoje 0.98).

---

## 2026-07-10 11:09 — Carrossel: folga de "meio card" no fim, agora de verdade (fix da tentativa anterior)

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/carrossel-folga-fim.md`,
correção cirúrgica — só o cálculo do deslocamento; header/logo, `useSpring`,
altura proporcional, cards, medição e fallback mantidos):

- **Diagnóstico do Opus:** a tentativa anterior (`padding-right:170px` no
  `.trilho_carrossel`) **não tinha efeito** — em container flex, o
  `scrollWidth` **não inclui o end-padding** quando o conteúdo transborda
  (quirk conhecido do navegador). Como `deslocamento = scrollWidth −
  clientWidth`, o padding nunca entrava na conta — o carrossel continuava
  terminando com o último card colado na borda (`folgaDireita=0`).
- **Fix robusto:** a folga agora é somada **direto no JS**
  (`components/CarrosselDestaques.jsx`), sem depender do `scrollWidth`
  refletir nada — `setDeslocamento(Math.max(scrollWidth − clientWidth, 0) +
  FOLGA_FIM)`, `FOLGA_FIM=170` (metade do card de 340px). `x` passa a ir de
  `0` a `-(deslocamento medido + 170)`.
- **`padding-right:170px` removido** de `.trilho_carrossel` (não fazia
  efeito, só confundia). `padding-left:4vw` (respiro do 1º card) mantido —
  esse lado o `scrollWidth` conta normalmente.
- Efeito colateral esperado e aceitável: como a altura da seção
  (`alturaSecao`) é proporcional ao `deslocamento` medido, e `FOLGA_FIM`
  agora faz parte desse valor, o pin fica ~195px mais alto (`170×
  FATOR_ALTURA_PIN`) pra acomodar a distância de rolagem extra da folga.

**Verificação:** `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Pendente:** conferência do Opus (`folgaDireita≈150–180px` no fim do pin,
não mais 0). Não commitado.

---

## 2026-07-10 11:08 — Carrossel: folga do fim não pegou (quirk do scrollWidth com padding-right) — correção via JS

**Contexto (Opus, medido no build atual):** o logo do header ficou **perfeito**
(aprovado pelo dono, ver 11:04). Mas o carrossel **ainda acaba colado no último
card**. Medição: `.trilho_carrossel` está com `padding-right: 170px`, porém
`scrollWidth` continua **3374px** (idêntico a antes do padding) → `deslocamento =
1934`, `translateX` final −1934, `folgaDireita = 0`.
- **Causa:** **quirk de container flex** — `scrollWidth` **não inclui o
  `padding-right`/end-padding** quando o conteúdo transborda. A folga pedida via
  padding nunca entrou no cálculo do deslocamento.
- **Correção (instrução):** somar a folga **direto no deslocamento em JS**
  (`deslocamento = max(scrollWidth − clientWidth,0) + ~170px`) e **remover** o
  `padding-right` inútil. (Alternativa: espaçador real como último filho, que o
  `scrollWidth` conta.)

**Encaminhamento:** instrução ativa `sonnet/fazer/carrossel-folga-fim.md` (só o
fim do carrossel; header não se toca). **Nada commitado.**

---

## 2026-07-10 11:04 — Logo do header minimalista: recuada do tamanho natural (grande demais) pra "um pouco maior que a barra" + nudge pra cima

**O que foi feito e por quê:** 2 pedidos diretos do dono em sequência, fora
do fluxo Opus → Sonnet:
1. A rodada anterior levou o logo minimalista ao tamanho **natural** do
   header completo (~308×130px, `width:auto;height:auto`) pra resolver o
   feedback de "pequena demais"; o dono achou o resultado **grande demais**
   e pediu algo só **"um pouco maior que o header pequeno"** (a barra de
   60px). `.header_minimalista img` (regra base, `>1280px`): de `width:
   auto;height:auto` (natural) para **`width:170px`** (`height:auto`, ~72px
   de altura — pouco acima dos 60px da barra).
2. Confirmado o tamanho ("o tamanho está ótimo"), pedido só pra **"arredar
   ela um pouco pra cima"** — `top` reduzido de `20px` (valor da rodada
   anterior) para **`4px`** (nudge pra cima, tamanho mantido).
- **Tiers `≤1280px` (`110px`/`18px`) e `≤768px` (`90px`/`14px`) não foram
  tocados** em nenhuma das duas rodadas — só o desktop (`>1280px`), que era
  o único usando `auto`/natural e o único mencionado pelo dono; a ordem
  descendente desktop > tablet > mobile continua (`170 > 110 > 90`).
- Mecanismo de sobreposição (`position:relative`+`top`+`z-index:1`, sem
  `overflow:hidden` na barra) inalterado.

**Verificação:** `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Pendente:** conferência visual final do dono. Não commitado.

---

## 2026-07-10 11:01 — Carrossel: folga de "meio card" no fim + logo do header minimalista do tamanho do completo

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/carrossel-folga-e-logo-cheio.md`,
2 ajustes cirúrgicos; `useSpring`, altura proporcional, header 2 estados e o
resto mantidos como estavam):

**PARTE 1 — Carrossel: folga à direita no fim do pin**
- Antes o último card parava exatamente encostado na borda direita da
  viewport (`folgaDireita=0`) — o dono pediu que passasse um pouco, "como um
  meio card invisível". Fix: `.trilho_carrossel` ganhou `padding-right:
  170px` (metade dos 340px do `.card_carrossel`). Como o deslocamento
  continua **medido do `scrollWidth`** (que já inclui esse padding), o
  trilho passa a rolar ~170px a mais automaticamente — nenhum ajuste no
  mapeamento `useTransform`/`FIM_MOVIMENTO`/`useSpring` de
  `CarrosselDestaques.jsx` foi necessário. `.destaques_pin` mantém
  `overflow:hidden`.

**PARTE 2 — Header minimalista: logo do tamanho do header completo**
- Medido pelo Opus: logo minimalista estava em 108×46px (achado pequeno
  pelo dono) contra 308×130px do logo do header completo (tamanho natural).
  Pedido: "ocupando tudo, no jeito que é no header cheio".
- **`.header_minimalista img` passou a espelhar `header > img` breakpoint a
  breakpoint:**
  - **>1280px:** `width:auto;height:auto` — tamanho **natural (~308×130)**,
    igual ao completo (antes fixo em 108px).
  - **≤1280px:** `width:110px` — mesmo valor que o completo usa nesse range
    (tablet, pra não estourar).
  - **≤768px:** `width:90px` — mesmo valor do completo no mobile (era
    88px).
- **Sobreposição mantida em todas as larguras** (diferente do completo, que
  vira `position:static` sem overlap em ≤1280px — a minimalista é um
  elemento à parte e manteve seu próprio mecanismo): `position:relative` +
  `top` positivo (`20px` no desktop, `18px` em ≤1280px, `14px` em ≤768px —
  reduzido proporcionalmente ao logo menor) + `z-index:1`, sem
  `overflow:hidden` na barra. Qualquer transbordo por CIMA da barra de 60px
  (a imagem natural é mais alta que a barra) fica invisível de graça — a
  barra é `position:fixed;top:0`, já é o próprio topo da viewport.
- Resto do header minimalista (barra 60px, fundo, sombra, nav condensada,
  hover laranja, sempre presente) **não foi tocado**.

**Verificação:** `npx vite build` ✅ (456 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (folga ≈150–180px no fim do carrossel;
logo minimalista grande e sobreposta sem recorte/overflow em nenhuma
largura; desktop >1280px fora Destaques/header pixel-idêntico;
mobile/reduced-motion ok). Não commitado.

---

## 2026-07-10 10:52 — Review do dono: folga de meio card no fim do carrossel + logo minimalista do tamanho do completo — instrução

**Contexto (Opus, medido por script no build atual):**
- **Carrossel:** no fim do pin o último card para **colado na borda direita**
  (`folgaDireita=0`; `translateX` final −1934 em 1440; trilho com `padding-right:0`,
  9 cards de 340, gap 32, padL 4vw). O dono quer que **passe um meio card** ("como
  se tivesse um meio card invisível ali"). **Fix (instrução):** `padding-right ≈
  meio card (~170px)` no trilho — como o deslocamento é medido do `scrollWidth`,
  a folga entra sozinha (último card para ~170px antes da borda).
- **Logo minimalista:** medido **108×46px** (dono achou pequeno); o **completo é
  308×130px** (natural). **Fix:** o logo minimalista passa a ter o **mesmo tamanho
  do completo em cada breakpoint** (~308px desktop, ~110px ≤1280, ~90px ≤768),
  **sobreposto/transbordando** a barra de 60px (z-index, sem `overflow:hidden`),
  como o header cheio. Sem overflow horizontal. Resto do header mantido.

**Encaminhamento:** instrução ativa `sonnet/fazer/carrossel-folga-e-logo-cheio.md`.
Docs atualizados. **Nada commitado.**

---

## 2026-07-10 10:46 — Carrossel: folga no fim do pin + rolagem mais rápida/precisa

**O que foi feito e por quê** (pedido direto do dono, fora do fluxo Opus →
Sonnet — testando com os 9 produtos adicionados na entrada anterior):

- **"Acaba bem quando o último produto é lançado" → agora sobra folga.**
  Antes o `x` do trilho ia de `[0,1] → [0,-deslocamento]` no MESMO intervalo
  do progresso do pin inteiro, então o trilho terminava de andar exatamente
  no fim do pin (sem "respiro" antes de soltar a seção). Fix: novo
  `FIM_MOVIMENTO=0.82` — o `useTransform` agora mapeia `[0, 0.82] →
  [0,-deslocamento]`; do `0.82` ao `1` do progresso o `x` fica **parado**
  em `-deslocamento` (comportamento padrão de clamp do `useTransform`) —
  sobra ~18% do pin como folga com o último card já assentado antes de a
  seção soltar o scroll.
- **Rolagem mais rápida:** `FATOR_ALTURA_PIN` (altura extra do pin,
  proporcional ao deslocamento medido) reduzido de `1.35` para **`1.15`** —
  menos distância de rolagem por pixel de movimento do trilho.
- **Mola mais "limpa"/precisa:** `useSpring` do progresso ajustado de
  `{stiffness:140, damping:28, mass:0.4}` para **`{stiffness:200,
  damping:26, mass:0.3}`** — segue a rolagem com menos atraso perceptível
  (menos "arrastado"), continuando sem ultrapassar o alvo e voltar
  (`damping` alto o bastante pra não oscilar).
- Nada mais mudou: medição real do deslocamento, cards da loja, título
  sempre visível, fallback swipe/reduced-motion.

**Verificação:** `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Pendente:** conferência visual do dono do novo timing/velocidade. Não
commitado.

---

## 2026-07-10 10:43 — Destaques: +4 produtos (5 → 9) pra testar o carrossel com mais cards

**O que foi feito e por quê:** pedido direto do dono, fora do fluxo Opus →
Sonnet (sem instrução em `fazer/`) — adicionar mais produtos ao "OS MAIS
VENDIDOS" pra analisar melhor o comportamento do carrossel (Fase 4) com uma
fila mais longa de cards.
- `src/data/destaques.js`: 4 novos itens (mesma imagem placeholder e padrão
  de preço dos 5 existentes) — CAPACETE URBAN X, MOCHILA TRAILBAG, JOELHEIRA
  PROTECT, ÓCULOS RACE VISION. Total agora **9**.
- **Zero mudança de código** em `Destaques.jsx`/`CarrosselDestaques.jsx`/CSS:
  tudo já era data-driven (`destaques.map`, `atrasoCard(index,
  destaques.length)`, medição real do trilho) — o carrossel, a
  medição/deslocamento e o fallback (grid 5 colunas em reduced-motion, que
  agora quebra em 2 linhas automaticamente; swipe/snap no tablet/mobile)
  absorvem a contagem nova sem ajuste manual.
- `arquitetura.md` atualizado (não citava mais "5 cards" fixos).

**Verificação:** `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Pendente:** conferência visual do dono/Opus do carrossel com 9 cards. Não
commitado.

---

## 2026-07-10 10:39 — Polimento: carrossel fluido (razão de scroll + mola) + logo do header minimalista maior e sobreposta

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/polir-carrossel-e-logo-header.md`,
2 polimentos pequenos apontados pelo dono; resto do header/carrossel mantido
como estava):

**PARTE 1 — Carrossel: de "travado e duro" pra fluido (`components/CarrosselDestaques.jsx`)**
- **Razão scroll↔movimento corrigida:** a seção tinha `height:300vh` fixo
  (~2700px, pin de ~1800px) contra um deslocamento real do trilho de só
  ~446px (medido em 1440px) — razão ~4:1, por isso rolar bastante para o
  card andar pouco (sensação de pesado). Fix: a altura da seção agora é
  **calculada em runtime** a partir do próprio `deslocamento` medido —
  `calc(100vh + deslocamento×FATOR_ALTURA_PIN px)`, `FATOR_ALTURA_PIN=1.35`
  (alvo do dono: pin ≈ 1.2–1.5× o deslocamento) — aplicada via `style`
  inline no `<section>` (a classe `.destaques.destaques_carrossel` no CSS
  virou só `min-height:100vh`, o piso antes da 1ª medição). O mapeamento
  `[0,1] → [0,-deslocamento]` do `x` não mudou — "sem buraco" continua
  igual.
- **Movimento suavizado:** `x` era derivado direto de `scrollYProgress`
  (1:1 com o scroll, rígido). Agora passa por **`useSpring(scrollYProgress,
  {stiffness:140, damping:28, mass:0.4})`** antes do `useTransform` — o
  trilho desliza (fluido) mas continua responsivo, sem ficar "flutuante";
  assenta em `-deslocamento` (último card sem buraco) ao fim do pin.
  `.destaques_pin` mantém `overflow:hidden` — qualquer leve overshoot da
  mola no assentamento não vaza como scroll horizontal.
- Nada mais mudou: medição real do deslocamento (`scrollWidth −
  clientWidth` + `resize`), cards da loja (`.card_carrossel` 340px), título
  sempre visível no pin, fallback swipe/reduced-motion, e a regra de só
  ativar em >1280px + ponteiro fino.

**PARTE 2 — Header minimalista: logo maior e sobreposta (`src/index.css`)**
- Pedido do dono: "quero a logo... um pouco maior e sobreposta, no mesmo
  jeito que ela é inteira (completa)". Antes: `.header_minimalista img
  {width:80px}`, contida dentro da barra de 60px, sem sobreposição.
- **Aumentada** para `width:108px` (`height:auto`, ~44px de altura —
  dentro do alvo 100–110px) e **`88px`** no mobile (`≤768px`), pra sobrar
  folga ao lado do hambúrguer.
- **Sobreposta com o mesmo mecanismo do header completo**
  (`header > img{position:relative;top:2.9vh;z-index:1}`, que já transborda
  a barra de 12vh): `.header_minimalista img` ganhou `position:relative;
  top:18px` (`14px` no mobile) `z-index:1` — empurra o logo pra baixo do
  fluxo normal, ultrapassando a borda inferior da barra de 60px e ficando
  **por cima** do conteúdo abaixo. `.header_minimalista` não tem (e
  continua sem) `overflow:hidden`, então nada recorta o logo.

**Verificação:** `npx vite build` ✅ (456 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (carrossel desliza fluido com razão de
rolagem ~1.2–1.5×, sem buraco no fim; logo minimalista maior e sobreposta,
sem recorte, sem overflow horizontal; desktop >1280px fora
Destaques/header pixel-idêntico; mobile/reduced-motion ok). Não commitado.

---

## 2026-07-10 10:34 — Review do dono: polir feel do carrossel (fluidez) + logo do header maior/sobreposta — instrução

**Contexto (Opus, review do dono após o fix):** os cards do carrossel **passaram a
andar** (fix do componente-filho OK). Dois polimentos pedidos:
1. **Carrossel "travado e duro".** Diagnóstico do Opus (valores atuais no código):
   (a) razão **scroll↔movimento ~4:1** — seção `height:300vh` (~2700px), pin
   ~1800px, mas o trilho anda só **446px** → sensação de travado; (b) `x` **cru**
   (`useTransform` 1:1, sem `useSpring`) → rígido. **Fix (instrução):** altura da
   seção **proporcional ao deslocamento real** (pin ≈ 1.2–1.5× o deslocamento, não
   ~4×) + **`useSpring`** no progresso/`x` pra deslizar. Manter overflow:hidden no
   pin (mola não vaza scroll horizontal).
2. **Logo do header minimalista** — o dono quer **maior e sobreposta**, "como no
   completo". Hoje `.header_minimalista img` é `80px`, contido. **Fix:** ~100–110px
   + **protrair/transbordar** a barra (deslocamento pra baixo + `z-index`, sem
   `overflow:hidden`), análogo ao `header > img` completo (`top:2.9vh; z-index`).
   Resto do header minimalista mantido ("de resto está muito bom").

**Encaminhamento:** instrução ativa `sonnet/fazer/polir-carrossel-e-logo-header.md`.
Docs atualizados. **Nada commitado.**

---

## 2026-07-10 10:29 — Fix: cards do carrossel andando (componente-filho) + Header novo (2 estados, sempre presente)

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/carrossel-fix-e-header-minimalista.md`,
2 ajustes independentes, ambos apontados ao vivo pelo dono):

**PARTE 1 — Carrossel: cards agora andam**
- Causa raiz confirmada pelo diagnóstico do Opus (medido por script): o pin
  (`sticky`) e a medição do deslocamento (446px em 1440px) estavam certos,
  mas o `translateX` do trilho ficava travado em `0`. Motivo: `useScroll({
  target: refCarrossel })` rodava dentro do componente `Destaques`, cujo
  **1º render sempre é o fallback** (`carrossel=false`, `refCarrossel.current
  =null`) — quando o modo carrossel vira `true` depois do mount e a `<section>`
  finalmente monta, o Framer **não re-vincula** um `useScroll` que já tinha
  inicializado (uma vez) sem alvo. `scrollYProgress` ficava preso em `0` pra
  sempre → `x = useTransform(0, [0,1], [0,-446])` nunca saía de `0`.
- **Fix:** novo componente **`components/CarrosselDestaques.jsx`**, que
  recebe TODO o mecanismo do carrossel (`<section ref>`, `useScroll`,
  `useTransform`, medição do deslocamento, o trilho). `Destaques.jsx` só
  decide o modo (`useModoCarrossel`, inalterado) e renderiza **ou**
  `<CarrosselDestaques/>` **ou** o fallback. Como `CarrosselDestaques` só é
  montado **depois** que o modo carrossel já está decidido, seu `<section
  ref>` já existe no **1º render dele** — `useScroll` inicializa vinculado
  ao alvo certo desde o início, e o progresso passa a andar 0→1 ao longo do
  pin.
- **Nada do que já funcionava mudou:** os 300vh + `sticky top:0 h:100vh`, a
  medição real do deslocamento (`scrollWidth − clientWidth` + `resize`), os
  cards da loja (`.card_carrossel` 340px), o título sempre visível no pin, e
  o fallback swipe/reduced-motion — só a localização do `useScroll` mudou
  (movida pro componente-filho).

**PARTE 2 — Header: novo design minimalista, sempre presente (substitui o modelo de 3 estados)**
- O dono achou o header de 3 estados (completo/escondido/compacto) bugado —
  pediu **2 estados**, e o header **nunca some**: **completo** no Hero/topo,
  **minimalista** (sempre visível, não some ao rolar pra baixo) no resto da
  página.
- **`components/Header.jsx` reescrito com 2 elementos físicos independentes**
  em vez de 1 elemento trocando de classe:
  1. **`<header>`** — o header completo original, **sempre renderizado, sem
     NENHUMA classe/estilo condicional** (nunca vira `fixed`). No Hero/topo é
     pixel-idêntico ao original; ao rolar, só sai de vista como qualquer
     elemento normal em fluxo — nunca é removido do fluxo depois de montado,
     então **nunca causa pulo** em `<main>` (elimina de vez a necessidade do
     espaçador/`.header_espacador` da correção anterior — removido, não é
     mais usado).
  2. **`.header_minimalista`** — barra nova, **`position:fixed`** desde
     sempre, `height:60px`, fundo preto sólido + `box-shadow` inferior sutil,
     logo pequeno (`80px`) à esquerda, nav condensada à direita (mesmos links
     de `data/navegacao`, `0.8rem`, `gap:1.5rem`, cinza claro com hover
     laranja). Monta/desmonta via `AnimatePresence` só quando fora do Hero —
     como **nunca ocupa fluxo**, esse fade (`opacity` + `y:-12→0`, `~0.3s`)
     não desloca nada. **Nunca some** enquanto montada (troca só de acordo
     com a posição de scroll, não mais com a direção).
  - **Mobile `≤768px`:** a minimalista também ganhou **seu próprio botão
    hambúrguer** (`.botao_hamburguer`, id virou classe pra suportar 2
    instâncias — completo e minimalista — abrindo o **mesmo** drawer/overlay
    compartilhado, inalterado desde a Fase 2).
  - **Histerese mantida** (`0.7×altura` pra entrar em minimalista, `0.5×altura`
    pra voltar a completo) — evita piscar perto do limiar.
  - **`prefers-reduced-motion`:** a troca de estado continua acontecendo
    (completo no Hero, minimalista no resto — **diferente** do modelo
    anterior, que forçava sempre completo); só a transição de entrada/saída
    da minimalista vira instantânea (`duration:0`).

**Verificação:** `npx vite build` ✅ (456 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (carrossel: `translateX` andando de 0 a
−446px, 1º card à esquerda, último sem buraco; header: completo no Hero,
minimalista fixo sempre visível no resto, sem pulo, sem piscar, sem
overflow; mobile hambúrguer/drawer ok nos 2 gatilhos; reduced-motion e
desktop >1280px assentado ok). Não commitado.

---

## 2026-07-10 10:25 — Conferência do Opus: carrossel pina mas cards não andam (diagnóstico) + header redesenhado (2 estados) — instrução

**Conferência do carrossel (Opus, medido por script Playwright, 1440px):**
- Modo carrossel ativa e **o pin funciona** (`pinTop=0` na faixa de 2700px); o
  **deslocamento é medido corretamente em 446px** (trilho 1886 − viewport 1440).
- **Mas o `translateX` do trilho fica travado em 0** do início ao fim do pin →
  os cards não andam. **Causa raiz:** o `useScroll({target: refCarrossel})` roda
  no `Destaques`, mas no 1º render `carrossel=false` (ref `null`); quando
  `useModoCarrossel` vira `true` depois do mount, o Framer **não re-vincula** o
  `useScroll` ao ref preenchido tarde → `scrollYProgress` preso em 0 → `x=0`.
- **Fix (instrução):** isolar o carrossel (a `<section ref>` + `useScroll`/
  `useTransform`/`x`) num **componente-filho** montado só no modo carrossel, pro
  hook inicializar com o ref já anexado. Manter pin/medição/fallback (já corretos).

**Redesign do header (decisão do dono):** de 3 estados (completo/escondido/
compacto) para **2 estados, header SEMPRE presente**: Hero → completo;
resto da página → **minimalista fixo** (~60px, logo pequeno + nav condensada,
fundo sólido, hover laranja), **nunca some**. Design minimalista **definido pelo
Opus** na instrução. Remove o estado "escondido".

**Encaminhamento:** instrução ativa `sonnet/fazer/carrossel-fix-e-header-
minimalista.md` (Parte 1 carrossel + Parte 2 header). **Fase 5 (Lenis/smooth
scroll)** registrada como candidata pós-carrossel (o dono adiou: "terminar o
carrossel e depois entramos nisso"). Docs atualizados. **Nada commitado.**

---

## 2026-07-10 10:11 — Fase 4: Destaques vira Horizontal Scroll Carousel (desktop >1280px + ponteiro fino)

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/fase-4-carrossel-destaques.md`,
mecanismo de referência do dono — hover.dev/Framer Motion — traduzido pro CSS
do projeto, sem Tailwind. **Exceção pontual e já aprovada à regra de ouro:**
só `.destaques` muda no desktop >1280px; todas as outras seções continuam
pixel-idênticas):

**`components/Destaques.jsx` reescrito com 2 modos (escolhidos em runtime, não CSS-only):**
- **`useModoCarrossel()`** (hook local ao componente) decide via
  `window.matchMedia("(pointer: fine) and (min-width: 1281px)")` +
  `useReducedMotion()`. **Só** ponteiro fino + >1280px + sem reduced-motion
  ativa o carrossel; qualquer outro caso (tablet, touch, reduced-motion, ou
  antes do JS medir no 1º paint) cai no **fallback** — nunca invisível, nunca
  scroll-hijack em toque.
- **Modo carrossel** (`<section className="destaques destaques_carrossel">`):
  - Seção com **`height:300vh`** (exceção estrutural aprovada) + `.destaques_pin`
    **`position:sticky;top:0;height:100vh`** (fica "pinada" enquanto o usuário
    rola os 300vh). Dentro, `.trilho_carrossel` é um `motion.div` com `x`
    ligado a `useScroll({target: refDaSeção})` (sem offset — progresso 0→1
    cobre a passagem inteira da seção, igual à referência) via `useTransform`.
  - **`x` calculado por medição real, não `%` chutado:** a referência do dono
    usa `["1%","-95%"]` calibrado pra 7 cards de 450px; com 5 cards e larguras
    do projeto isso deixaria buraco ou cortaria. Em vez disso: `useEffect`
    mede `trilho.scrollWidth - viewport.clientWidth` (recalculado no
    `resize`) e usa esse valor em px como deslocamento máximo — 1º card
    começa à esquerda (respiro `padding-left:4vw` no trilho), último card
    termina **exatamente** encostado na borda direita, sem buraco, qualquer
    largura de tela >1280px.
  - **Cards da loja mantidos** (não o card-placeholder da referência):
    `.card_produto` + `.card_carrossel` (largura fixa `340px`, novo) reaproveita
    `.zoom_imagem`/`.imagem_produto_destaque`/`.titulo_produto_destaque`/
    `.preco_produto_destaque` — mesmo hover-zoom de sempre, mesma
    imagem+título+preço da vitrine, só o layout de trilho é novo.
  - Título ("OS MAIS PROCURADOS/OS MAIS VENDIDOS") fica **fora** do trilho,
    numa linha própria dentro do `.destaques_pin` (`flex-direction:column`,
    não a linha única da referência) — **sempre visível durante o pin**, sem
    precisar de scroll-reveal próprio (é estático nesse modo; o movimento da
    seção agora É o carrossel). As setas `←→` foram **ocultadas** neste modo
    (decorativas demais ao lado de um trilho que já se move sozinho).
- **Modo fallback** (≤1280px, ponteiro grosso/touch, ou reduced-motion):
  estrutura de sempre (`#produtos_destaques`, `RevelaComProgresso` por card),
  **sem 300vh nem pin**. Dois ajustes:
  1. **Tablet (`@media max-width:1280px`) deixou de ser grade estática de 3
     colunas** — agora é o mesmo mecanismo de swipe/snap do mobile
     (`grid-auto-flow:column;overflow-x:auto;scroll-snap-type:x mandatory`),
     só com card mais largo (`38vw`, ponte até o `62vw`/`66vw` do mobile) —
     o dono pediu a escolha binária "carrossel OU swipe nativo", sem grade
     estática no meio. `≤768px`/`≤480px` inalterados (cascata já cobria).
  2. **Amplitude do reveal por card reforçada só no Destaques** (`distancia`
     de 84→**120**, `saida` de 80→**96**, no `RevelaComProgresso` do
     fallback) — review do dono: "os mais vendidos com pouca animação" era
     efeito colateral do ajuste de stagger da rodada anterior (entrada ficou
     sutil demais aqui). O *timing* (`atrasoCard`/`LARGURA_ENTRADA_CARD`,
     último card assentando bem antes do centro) **não mudou** — só a
     distância percorrida, pra ficar mais perceptível sem reintroduzir o bug
     do último card atrasado.
- **`prefers-reduced-motion`:** força fallback sempre (hook nunca ativa o
  carrossel) — em >1280px isso cai na grade estática de 5 colunas original
  (sem scroll nem hijack, todos os cards visíveis/acessíveis de uma vez, o
  que atende a exigência com folga); em ≤1280px cai no swipe/snap normal.

**Verificação:** `npx vite build` ✅ (455 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (rolar o carrossel: começa no 1º card,
termina no último sem buraco, título visível durante o pin, header sem pulo,
scroll solta antes/depois; tablet/touch com swipe+snap e entrada perceptível;
reduced-motion sem hijack; sem overflow horizontal 320–1280px; demais seções
desktop pixel-idênticas). Não commitado.

---

## 2026-07-10 09:45 — Fase 4 ATIVADA: carrossel horizontal no Destaques (instrução) + diagnóstico do "Destaques com pouca animação"

**Contexto (Opus, review do dono após os ajustes P1/P2):** o dono apontou (1) o
Destaques ficou **com pouca/nenhuma animação** e (2) **falta o carrossel** — e
mandou o **código de referência** (hover.dev / Framer Motion).
- **Diagnóstico do ponto (1):** efeito colateral do ajuste de stagger (09:39) — a
  compressão + a `LARGURA_ENTRADA_CARD` mais curta deixaram os cards do Destaques
  revelando sutil demais. **Resolvido pela Fase 4**: no desktop o carrossel passa
  a ser a animação da seção; no fallback (≤1280/touch) a instrução pede restaurar
  uma entrada perceptível.
- **Encaminhamento:** movida a Fase 4 para `sonnet/fazer/fase-4-carrossel-
  destaques.md` (instrução ativa). Mecanismo do carrossel segue o código de
  referência do dono (`useScroll`+`useTransform` no `x`, seção ~300vh, filho
  `sticky top:0 h:100vh overflow:hidden`), **mas adaptado às regras do projeto**:
  **sem Tailwind**, reaproveitando `src/data/destaques.js` e o `.card_produto`
  (imagem/título/preço — não o card-demo genérico), **medindo** o deslocamento
  real do trilho (5 cards, não o `-95%` fixo da referência), com **fallback swipe
  nativo** no touch e **reduced-motion** sem hijack. Exceção à regra de ouro (só
  Destaques muda no desktop) já aprovada/documentada.

**Sequência:** P1 (pulo do header) e P2 (stagger) concluídos na entrada 09:39; a
conferência visual final do Opus será feita junto com a Fase 4. **Nada commitado.**

---

## 2026-07-10 09:39 — Correção: pulo do header no scroll + stagger dos grids terminando antes do centro

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/ajustes-scroll-e-stagger.md`,
2 ajustes independentes, pós-review ao vivo do dono; **Destaques carrossel não
foi tocado** — é a próxima instrução/Fase 4):

**PONTO 1 — Fim do "pulo" do header ao cruzar o Hero**
- Causa raiz confirmada: o header de 12vh (64px no mobile) alternava entre
  fluxo normal (completo) e `position:fixed` (qualquer estado flutuante) —
  removê-lo do fluxo tirava sua altura inteira de uma vez, empurrando
  `<main>` pra cima (e de volta ao voltar ao topo).
- **Fix (`components/Header.jsx` + `src/index.css`):** o header completo
  continua **sempre em fluxo normal** (nada mudou aí); quando ele vira
  flutuante (escondido/compacto), um **espaçador** (`<div
  className="header_espacador">`, novo, renderizado condicionalmente só
  quando `flutuante`) aparece **no mesmo render** reservando exatamente a
  mesma altura que `header{height}` já definia por breakpoint (`12vh` base,
  `64px` em `≤768px` — mesma regra espelhada em `.header_espacador`). Sair
  do fluxo e a reserva aparecerem atomicamente (mesmo state update do React)
  faz o deslocamento líquido em `<main>` ser **zero**.
- **Histerese no limiar** (`ENTRA_FLUTUANTE=0.7`, `VOLTA_COMPLETO=0.5`, em
  `Header.jsx`): antes um único limiar (`0.7×altura da janela`) controlava
  entrada E saída do estado "completo", então uma micro-rolagem bem no
  limiar podia alternar/piscar. Agora só entra em flutuante ao passar de
  `0.7×altura`, mas só volta a "completo" abaixo de `0.5×altura` — zona
  morta entre os dois evita a oscilação.
- Nada mudou no comportamento visual dos 3 estados em si (completo/escondido/
  compacto), no drawer mobile, nem no desktop `>1280px` em repouso (o header
  completo em fluxo é pixel-idêntico ao original).

**PONTO 2 — Stagger das grades: todos os cards assentados antes do centro da seção**
- Causa raiz confirmada: em grades grandes (Categorias, 12 cards), o atraso
  crescia linearmente por índice (`base + index*passo`) sem normalizar pela
  contagem — o último card só assentava perto de `0.685` do progresso da
  seção, mas a seção fica centralizada em `~0.5`: no centro da tela, o
  último card (canto inferior direito) ainda aparecia esmaecido.
- **Fix combinado (`src/lib/useEstiloRevela.js`, novo helper `atrasoCard` +
  novo parâmetro `larguraEntrada`):**
  1. **Atraso normalizado pela contagem:** `atrasoCard(index, qtd) = 0.03 +
     (index/(qtd-1)) * 0.06` — o **último** card fica no máximo ~0.09 à
     frente do primeiro, **independente de a grade ter 3 ou 12 itens**
     (antes a Categorias somava 0.275 até o último). Só os 5 componentes de
     grade (Favoritos/Categorias/Território/Destaques/Histórias) usam esse
     helper; os títulos de seção e os blocos de texto de Lançamento
     continuam com o `atraso` fixo de antes.
  2. **Janela de entrada mais curta só pros cards:** novo parâmetro opcional
     `larguraEntrada` em `useEstiloRevela`/`RevelaComProgresso` (default
     continua `0.33`, o ritmo das seções/títulos — **não mudou**); os 5
     componentes de grade passam `LARGURA_ENTRADA_CARD = 0.20` nos cards.
  - Resultado no pior caso (Categorias, 12 cards): último card assenta em
    `atraso(0.09) + larguraEntrada(0.20) = 0.29` do progresso da seção — bem
    antes do centro (`~0.5`), com folga.
  - Amplitude (`distancia`/`saida`) dos cards **não mudou** — só o *timing*;
    o movimento continua visível, só termina mais cedo e mais "junto" entre
    os cards (efeito ripple rápido, não fila arrastada).
- Fail-safe mantido: um `motion` por card, imagem/texto como filhos comuns;
  `reduced-motion` estático e visível (não mexido).

**Verificação:** `npx vite build` ✅ (455 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência do Opus (rolar cruzando o Hero sem pulo/sem
piscar no limiar; Categorias centralizada com os 12 cards já assentados;
reduced-motion; desktop `>1280px` pixel-idêntico; sem overflow horizontal;
Banner blur sem regressão). Não commitado.

---

## 2026-07-10 09:25 — Review ao vivo do dono: 3 pontos → instrução de ajustes (pulo do header + stagger dos grids) e carrossel confirmado pra Fase 4

**Contexto (Opus, diagnóstico dos 3 pontos do dono):**
1. **"Os mais vendidos não estão com o carrossel"** — a Fase 4 (Destaques como
   horizontal scroll carousel) ainda não foi implementada; segue especificada e é
   a **próxima** instrução após estes ajustes.
2. **"Pulo" na rolagem perto do Hero** — **causa raiz confirmada no código:** o
   `header` (`height:12vh`) fica **no fluxo** em "completo" e vira `position:fixed`
   (`.header_flutuante`) ao sair do Hero; ao detachar, o `<main>` sobe 12vh de uma
   vez (o pulo), e volta a descer ao retornar ao topo. Perto do limiar
   (`0.7×innerHeight`) o estado oscila → "segura e solta".
3. **Categorias: último card não termina no centro** — **causa raiz:** `atraso =
   0.08 + index*0.025`; com 12 cards o último só assenta em ~0.685 do progresso,
   enquanto a seção centraliza em ~0.5.

**Encaminhamento (nada de código pelo Opus):**
- Nova instrução ativa `sonnet/fazer/ajustes-scroll-e-stagger.md` com **P1**
  (header sem pulo: header completo nunca vira `fixed` — barra compacta é `fixed`
  independente que nunca ocupa fluxo; + histerese anti-flicker) e **P2** (stagger
  dos grids normalizado pela contagem e faixa de entrada mais curta pros cards, pra
  o último assentar em ≤ ~0.4, antes do centro).
- **Fase 4 (carrossel do Destaques)** confirmada como a instrução seguinte (spec
  pronta no planejamento). Ordem escolhida: **corrigir o pulo do scroll ANTES** de
  montar uma seção pinada (sticky) por cima dele.

**Docs atualizados:** `planejamento-completo.md` (status), esta entrada. **Nada
commitado.**

---

## 2026-07-10 09:20 — Banner: entrada "blur por palavra" (estilo TextEffect/motion-primitives, sem dependência nova)

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/banner-blur-por-palavra.md`,
tarefa pequena e isolada — só a animação de entrada do Banner; nenhuma outra
seção, `src/lib/Revela.jsx`/`useEstiloRevela.js` ou `src/index.css` fora do
bloco `.banner` foram tocados):

- **`components/Banner.jsx` reescrito:** a frase deixou de ser um bloco único
  (`Revela` com `distancia={96}`, fade+subida) e passa a **quebrar em
  palavras**, cada uma seu próprio `motion.span` (`.palavra_banner`,
  `display:inline-block` — nova regra em `src/index.css`). Espaço normal
  (quebrável, não `nbsp`) entre palavras da mesma linha, pra preservar o wrap
  natural do texto em telas estreitas — nada de travar a linha inteira e
  criar overflow horizontal.
- **Efeito por palavra:** `escondido` (`opacity:0`, `filter:"blur(10px)"`,
  `y:10`) → `visivel` (`opacity:1`, `filter:"blur(0px)"`, `y:0`,
  `duration:0.45s`, `ease` do projeto), com `staggerChildren:0.06` +
  `delayChildren:0.05` no `motion.h1` pai — reproduz o preset `blur` do
  `TextEffect` (motion-primitives) só com o pacote `motion` já usado no
  projeto, **sem instalar nada novo** (motion-primitives/Tailwind/`cn()`).
- **Disparo:** `whileInView="visivel"` (`viewport={{amount:0.4}}`) no
  `motion.h1` — dispara quando o Banner entra na viewport e, sem `once`,
  **re-dispara ao sair e voltar** (mesmo espírito bidirecional do reveal
  ligado ao scroll usado nas outras seções, aqui como stagger discreto em
  vez de scroll-scrubbed contínuo).
- **`prefers-reduced-motion`:** `initial` já nasce em `"visivel"` quando
  `useReducedMotion()` está ligado — frase nítida e estática desde o
  primeiro paint, sem blur/stagger/y, nunca preso borrado.
- **Exceção consciente de propriedade animada:** aqui também se anima
  `filter:blur()` (fora do padrão "só transform/opacity" do resto do
  projeto) — autorizado pelo Opus só pro Banner, por ser entrada única (não
  loop) que sempre assenta em `blur(0)`. Documentado em `convencoes.md`
  (já atualizado pelo Opus nessa rodada).
- **Estado assentado inalterado:** duas linhas centralizadas (`<br/>`
  preservado), mesma tipografia/cor/tamanho (`.banner h1` intocado, só
  ganhou a regra `.palavra_banner{display:inline-block}`), `#texto_banner`
  virou uma `<div>` simples (só um `motion.h1` dentro, sem wrapper motion
  extra) — layout/box idêntico ao anterior.

**Verificação:** `npx vite build` ✅ (455 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência visual do Opus (blur-in palavra a palavra, estado
assentado idêntico, reduced-motion nítido de imediato, sem overflow, demais
seções inalteradas). Não commitado.

---

## 2026-07-10 09:15 — Conferência do Opus: rodada de correção APROVADA + decisões de design (Banner blur, Fase 4 carrossel)

**Conferência visual (Opus, screenshot 5 viewports, rebuild do working tree):**
- **Overflow do footer: RESOLVIDO ✅** — `document.scrollWidth == clientWidth` em
  **900 / 1024 / 1100 / 1280 / 1440** (antes 1024 dava 1050); zero elementos
  estourando. Fase 2 dada como concluída/conferida.
- **Animações reforçadas: OK ✅** — a tira de scroll mostra bem mais seções em
  transição (títulos visíveis com cards ainda esmaecidos, seções entrando/saindo),
  onde antes cada frame parado parecia já assentado.
- **Sem regressão ✅** — toda imagem de conteúdo atinge opacity **1.00** em algum
  ponto do scroll; em **reduced-motion** a menor opacity de imagem é **1.00**
  (tudo visível).
- **Observação menor (não bloqueia):** o **logo do footer** atinge no máx **0.98**
  (não 1.0) porque é a última seção e não há scroll depois pra levar o progresso
  ao ponto de assentar — visualmente imperceptível; anotado para eventual ajuste
  fino do `offset` do footer.

**Decisões de design do dono registradas:**
- **Banner "blur por palavra"** (efeito `TextEffect`/motion-primitives
  `per="word"` `preset="blur"`): a frase antes do footer passa a **entrar palavra
  por palavra num blur-in**, seguindo **estática em repouso**. **Sem instalar
  motion-primitives nem Tailwind** — reproduzir com o `motion` existente. Virou a
  **instrução ativa** `sonnet/fazer/banner-blur-por-palavra.md` (a rodada de
  correção anterior saiu de `fazer/` por estar concluída e aprovada).
- **Fase 4 — Destaques como Horizontal Scroll Carousel** (`hover.dev`): aprovada
  **exceção pontual à regra de ouro** (só essa seção muda no desktop >1280px);
  spec completa no `planejamento-completo.md`. Entra em `fazer/` **após** o Banner.

**Docs atualizados:** `convencoes.md` (exceção à regra de ouro + fronteira 1280px
+ modelo de animação scroll-linked), `instrucoes-do-dono.md`,
`planejamento-completo.md` (Fase 4 + status), `sonnet/fazer/` (Banner). **Nada
commitado.**

---

## 2026-07-10 09:10 — Correção: overflow do logo do footer + animações de entrada/saída reforçadas

**O que foi feito e por quê** (instrução `docs/agentes/sonnet/fazer/fase-3-correcao-overflow-e-mais-animacao.md`,
rodada de correção em cima do commit `b014deb` já aprovado — reveal ligado ao
scroll, header 3 estados e Banner estático foram **mantidos**, nada disso foi
regredido):

**PARTE 1 — Bug de overflow (769–1280px) corrigido**
- Causa raiz confirmada: `#logo_footer` (imagem natural 308×130px) só era
  restringido dentro de `@media (max-width: 768px)`; na faixa 769–1280px o
  footer já estava em 3 colunas mas o logo mantinha a largura natural e
  estourava a lateral. **Fix:** mesma restrição (`width:140px;height:auto` no
  `#logo_footer`, `max-width:100%` na `<img>`) estendida pro bloco
  `@media (max-width: 1280px)` existente (`src/index.css`), sem tocar na regra
  de `≤768px` nem no desktop `>1280px`.

**PARTE 2 — Animações de entrada/saída reforçadas (mantendo o mecanismo scroll-linked)**
- **`src/lib/useEstiloRevela.js` (novo arquivo):** o cálculo de opacity/y a
  partir de um progresso de scroll (antes vivia dentro de
  `RevelaComProgresso`, em `src/lib/Revela.jsx`) foi extraído pra um hook
  próprio — reaproveitado agora também fora de `Revela.jsx` (nos botões
  cortados, ver abaixo) e evita o aviso de Fast Refresh do oxlint por misturar
  hook e componentes no mesmo módulo.
- **Janela de movimento alargada:** o platô "assentado" (opacity 1 fixo)
  encolheu de `0.28→0.72` (44% da passagem de scroll) para **`0.33→0.70`**
  (37%) — entrada e saída ocupam mais da faixa de scroll, ficando bem mais
  perceptíveis em qualquer ponto da rolagem.
- **Amplitude de entrada (`distancia`) aumentada:**
  - Blocos de título/texto de seção: **~40–56px → 100–108px** (títulos das 5
    seções em grade, blocos de texto de Lançamento desconto/especial, Banner,
    colunas do footer).
  - Cards de grade: **~40px → 84px** (novo default de `RevelaComProgresso`);
    cards de Categorias (chips pequenos) **24px → 72px**.
- **Saída (`saida`) desacoplada da entrada e bem mais visível:** antes a saída
  subia só `distancia*0.4` (~16–22px). Agora é um parâmetro próprio —
  **~64–80px** — dando a sensação clara de a seção "sair de cena" antes da
  próxima assentar (reforça a transição tela-a-tela, sem regredir o
  fail-safe: o único elemento com opacity inicial <1 continua sendo o
  wrapper de reveal, nunca imagem/texto isolados).
- **Coreografia por elemento — Lançamento desconto e Lançamento especial**
  deixaram de ser **um bloco rígido** (`Revela` único envolvendo
  olho+título+parágrafo+botão) e passaram a ter **cada elemento como sua
  própria unidade de reveal** (`RevelaComProgresso`), amarradas ao mesmo
  progresso de scroll da seção com pequena defasagem entre elas (~0.05–0.15):
  olho → título → parágrafo → botão, montando em sequência na entrada e
  desmontando na saída. A imagem de Lançamento desconto ganhou defasagem
  própria (0.08) pra assentar em paralelo ao texto.
  - Sem adicionar nenhum wrapper `<div>` extra que mudasse layout: cada texto
    virou sua própria tag motion (`as="p"`/`as="h1"`) mantendo a contagem de
    filhos diretos idêntica à anterior (preserva o `gap:10px` de
    `#container_texto` e o fluxo de `#texto`). O botão (`BotaoCortado`, já um
    `motion.button`) ganhou uma prop `style` opcional pra receber o reveal
    direto, sem precisar de wrapper.
  - As duas seções passaram a usar `useProgressoSecao` (ref na `<section>`)
    em vez de `Revela` com scroll próprio — mesmo mecanismo de base
    (`useScroll`/`useTransform`), só compartilhando a fonte do progresso
    entre os elementos da seção.
- Demais seções em grade (Favoritos/Categorias/Território/Destaques/
  Histórias): título mantido como uma unidade só (já se distinguia dos
  cards), só a amplitude/janela mudou; o `atraso` inicial dos cards foi
  empurrado um pouco pra frente (ex.: `0.06→0.10`) pra continuar a sequência
  depois do título mais amplo.
- Hero: `heroItem`/`heroStagger` (`src/lib/motion.js`) tiveram leve reforço —
  `y:20→32`, `duration:0.7→0.8s`, `staggerChildren:0.12→0.14` — pra casar com
  o novo ritmo, mantendo a entrada por sequência de *load* (não scroll) e
  100% visível já no primeiro paint.
- **Nada do que já estava OK foi regredido:** nenhuma imagem virou `motion`
  aninhada, `prefers-reduced-motion` continua forçando `opacity:1;y:0` em
  toda unidade de reveal, só `transform`/`opacity` são animados, e o estado
  assentado continua sendo o layout final exato (desktop `>1280px`
  intocado).

**Verificação:** `npx vite build` ✅ (455 módulos) · `npm run lint` (oxlint) ✅
sem avisos.

**Pendente:** conferência visual do Opus (screenshot, 5 viewports —
`scrollWidth===clientWidth` em 900/1024/1100/1280, entrada/saída percebidas,
reduced-motion, desktop pixel-idêntico). Não commitado.

---

## 2026-07-10 08:52 — Conferência visual do Opus (Fase 3, 2ª rodada) + nova instrução de correção

**O que foi feito (conferência, sem alterar código):**
- Conferência por screenshot nos 5 viewports (390/768/1024/1280/1440) do estado
  commitado `b014deb`, via Docker rootless + Playwright, servindo `dist/` dentro
  do container. Passada A: layout assentado com `reducedMotion:reduce` (valida
  imagens visíveis e overflow). Passada B: 1440 com scroll (ritmo das animações).
  Passada C: mínimo de opacity por imagem ao longo do scroll. Prints apagados
  após a leitura.
- `npm run lint` (oxlint) ✅ e `npx vite build` ✅ passaram.

**Aprovado (não regredir):**
- **Todas as imagens visíveis** no estado assentado em todos os viewports — o bug
  crítico da 1ª rodada (imagens invisíveis) está resolvido.
- **Desktop 1440 completo e fiel** ao original; **sem overflow** em 390/768/1280/1440.
- Header 3 estados e Banner estático com fade: OK.

**Achados (viram a próxima instrução do Sonnet):**
1. **Overflow horizontal em 769–1280px** (medido `scrollWidth`=1050 vs
   `clientWidth`=1024 em 1024px; também ~900px e ~1100px). Causa raiz isolada por
   diagnóstico DOM: **logo do footer** (`#logo_footer img`, 308×130px natural) só
   é restringido em `@media (max-width:768px)`; na faixa 769–1280px o footer vira
   3 colunas mas o logo mantém 308px e estoura. É **só o logo do footer**.
2. **Poucas animações de entrada/saída** (feedback do dono): reveal com amplitude
   pequena (~56px) e platô assentado largo (~0.28→0.72) fazem entrada/saída mal
   se perceberem. Reforçar amplitude, janela e coreografia por elemento, mantendo
   o modelo scroll-linked e todos os invariantes.

**Fluxo:** substituída a instrução em `sonnet/fazer/`
(`fase-3-refazer-animacoes-e-header.md` → `fase-3-correcao-overflow-e-mais-
animacao.md`). Planejamento e instruções-do-dono atualizados. Aguardando o Sonnet
executar; **nada commitado** nesta conferência.

---

## 2026-07-09 13:57 — Fase 3 refeita do zero: reveal ligado ao scroll, header em 3 estados, Banner estático

**O que foi feito:**

**PARTE 1 — Bloqueadores corrigidos:**
- **Imagens invisíveis (crítico):** eliminado por completo o padrão que causava o
  bug — nenhuma `<img>` é `motion` própria em lugar nenhum do projeto agora
  (`grep motion.img` no código: zero ocorrências). Nova regra estrutural: **um
  único elemento `motion` por unidade** (o card inteiro, ou o bloco de texto da
  seção) — imagens e textos são filhos DOM comuns, aparecem/movem *junto* com o
  wrapper. Sem `motion` aninhado, sem propagação de variant pra cortar.
- **Hover virou CSS puro** (fora do Framer): `.zoom_imagem` com `overflow:hidden`
  + `img{transition:transform}` + regra `:hover` (escopada em
  `@media (hover:hover) and (pointer:fine)`, pra não travar "hover preso" em
  toque). Zoom da imagem e deslize do CTA/seta agora são independentes do
  reveal — não têm como travar conteúdo invisível.
- **Header/logo — largura corrigida de fato:** trocado o `height:36px` (que na
  conferência do Opus não reduziu a largura) por **`width` explícita** —
  `110px` no tablet (`≤1280px`), `90px` no mobile (`≤768px`), `80px` no header
  compacto — com `height:auto`. A imagem original é 308×130px; restringir só a
  altura dependia de auto-cálculo de proporção que, por algum motivo não
  identificado com certeza (sem navegador pra depurar), não estava reduzindo a
  largura como esperado. Nav também mais enxuta (`gap:1.25rem`,
  `font-size:0.85rem` no tablet) pra sobrar folga.
- **Desktop > 1280px pixel-idêntico — causa raiz do +4px corrigida:**
  `<img>` é `inline` por padrão; dentro de um `<div>` de bloco comum (o
  `.zoom_imagem`), isso deixa um espaço fantasma de alguns pixels embaixo da
  imagem (o "gap" clássico de baseline de elemento inline). Fix: `.zoom_imagem
  img{display:block}` + `.zoom_imagem{line-height:0}`. Também revertido por
  completo o CSS do marquee do Banner (`#texto_banner` voltou a `width:auto`,
  `white-space:nowrap` removido) — o Banner agora é exatamente o markup
  original.

**PARTE 2 — Novo modelo: reveal ligado ao scroll**
- Criado `src/lib/Revela.jsx` com dois componentes:
  - `Revela` — pra unidades com scroll próprio (seções/blocos isolados):
    `useScroll({target: ref, offset: ["start end", "end start"]})` +
    `useTransform` mapeiam o progresso 0→1 (a seção atravessando a viewport de
    baixo pra cima) em `opacity` (0→1→1→0) e `y` (entra ~40-56px de baixo →
    assenta em 0 → sai deslizando um pouco pra cima). **Não é mais uma
    animação de duração fixa** — o "tempo" é a distância de scroll, então é
    naturalmente mais lento, scrubado e bidirecional (subir reverte a mesma
    curva automaticamente, de graça).
  - `RevelaComProgresso` — pra cards dentro de um grid: recebe um `progresso`
    (a MotionValue de scroll já calculada pelo container, via
    `src/lib/useProgressoSecao.js`) e mapeia uma fatia ligeiramente atrasada
    dele (`atraso` por índice) nos mesmos `opacity`/`y` — os cards assentam em
    leve sequência, mas o "delay" é uma fatia do scroll, não um tempo fixo,
    reforçando o scroll-sync.
  - **`prefers-reduced-motion` tratado onde a rodada anterior falhou:** valores
    de `useScroll`/`useTransform` ligados direto num `style` são um *bind* de
    scroll, não uma "animação" — o `<MotionConfig reducedMotion="user">`
    (que cobre `animate`/`whileHover`/etc.) **não os desliga sozinho**. Por
    isso `Revela`/`RevelaComProgresso` chamam `useReducedMotion()` e, se
    ligado, ignoram o valor de scroll e usam `opacity:1;y:0` fixo — nada some
    nem fica parcialmente visível. O parallax do Hero (`useTransform` também)
    recebeu o mesmo tratamento.
  - Aplicado nas 10 seções (Hero mantém entrada por sequência de *load*, não
    scroll — é a primeira coisa vista, não faz sentido "revelar ao rolar"; as
    outras 9 usam `Revela`/`RevelaComProgresso`).
- **Transição de seção pra seção (não itens pipocando):** cada seção calcula
  seu próprio progresso de forma independente, e como faixas de scroll de
  seções vizinhas se sobrepõem (a seção de cima ainda está "saindo" enquanto a
  de baixo já está "entrando"), o efeito percebido é de uma tela dando lugar à
  outra, não de itens isolados aparecendo por cima do conteúdo anterior.

**PARTE 3 — Header em 3 estados**
- Reescrito `Header.jsx`: `useScroll` (scroll global) + `useMotionValueEvent`
  compara o valor de scroll atual com o anterior (direção) e com
  `window.innerHeight * 0.7` (proxy pra "ainda no Hero", já que o Hero mede
  ~88-100vh). Três estados: **completo** (no Hero/topo — o header de sempre,
  em fluxo normal, pixel-idêntico ao original em repouso), **escondido**
  (saiu do Hero rolando pra baixo — `translateY(-100%)` + fade), **compacto**
  (abaixo do Hero rolando pra cima — menor, logo `80px`, nav enxuta, fixo no
  topo). Só vira `position:fixed` (`.header_flutuante`) fora do estado
  completo — no repouso (scroll 0) o header continua em fluxo normal, sem
  nenhum risco de deslocar o layout original.
- `prefers-reduced-motion`: força sempre o estado "completo" (nunca esconde),
  além do `<MotionConfig>` global — dupla proteção.
- Não conflita com o `AnimatePresence` do drawer mobile: `z-index` do header é
  `40`, abaixo do overlay/drawer (`90`/`100`).

**PARTE 4 — Banner sem marquee**
- `Banner.jsx` voltou ao título estático original (2 linhas, "A MARCA MAIS
  DEMOCRÁTICA DO / MOTOCILISMO BRASILEIRO"), envolvido só num `Revela` (fade +
  leve subida ligada ao scroll, igual às outras seções). Zero loop, zero
  duplicação de texto, zero mudança de aparência de repouso.

**Por quê:**
- A rodada anterior de animações tinha um defeito estrutural (imagens presas
  em `opacity:0` por propagação de variant cortada pelo wrapper de hover) que
  quebrava o site, não atendia ao pedido de sincronismo com o scroll do dono, e
  ainda regrediu o desktop (que tinha ficado pixel-idêntico por prova de
  diff). Precisava ser refeita, não remendada — daí a instrução nova e este
  reset completo do sistema de animação.

**Verificação:**
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅, repetidos a cada leva de
  mudança (Parte 1, Parte 2, Parte 3, Parte 4).
- Conferi manualmente: nenhuma `<img>`/`<a>` é `motion` própria em nenhum
  componente (`grep` no código-fonte); nenhuma referência residual ao sistema
  de variants antigo (`fadeUp`/`staggerContainer`/marquee) sobrou em CSS ou
  JS; as ~680 linhas de CSS de desktop (antes do bloco `RESPONSIVIDADE`)
  continuam com as mesmas regras de sempre, e os únicos acréscimos fora de
  media query são aditivos (`transition` novo em seletores existentes — sem
  efeito em repouso — e classes 100% novas).
- **Segue sem ser possível testar visualmente** (mesma limitação de sempre:
  sem Chromium funcional neste servidor). A verificação foi por leitura
  cuidadosa do código, raciocínio sobre como `useScroll`/`useTransform`
  calculam o progresso, e conferência ativa de que `prefers-reduced-motion`
  cobre os valores ligados a scroll (não só os por `animate`) — foi
  justamente esse ponto que causou o pior defeito da rodada anterior, então
  dei atenção extra a ele aqui.
- **Ponto de atenção pra conferência do Opus (metodologia de screenshot):** o
  reveal agora depende da posição de scroll de cada seção em relação à
  viewport no momento da captura. Se o pipeline tira um *screenshot de página
  inteira* redimensionando a viewport pra caber o documento todo de uma vez
  (uma técnica comum de "full page screenshot"), o cálculo de progresso de
  scroll de cada seção pode não refletir o estado "assentado" pretendido
  (todas as seções veriam uma viewport artificialmente gigante). Recomendo
  conferir o estado assentado **rolando até cada seção individualmente**
  (viewport do tamanho normal) em vez de um screenshot de página inteira, pra
  não confundir esse efeito de captura com um bug real de reveal.

---

## 2026-07-09 13:10 — Conferência da Fase 3: bugs graves → refazer animações + header (instrução nova)

**O que foi feito (Opus, conferência visual + consolidação com o dono):**
- Conferência por screenshot (5 viewports, Docker+Playwright). Achados:
  1. **TODAS as imagens de conteúdo invisíveis** (opacity 0, medido): Favoritos
     3/3, Território 4/4, Destaques 5/5, Histórias 3/3 — em motion normal, no
     desktop, mesmo com a seção em cena. Causa: `<img>` viraram `motion`
     aninhadas fora da cascata de variants (wrapper `.zoom_imagem` corta o
     `whileInView`). Bug que quebra o site.
  2. **Header/logo ainda estoura** 900–1280px (logo continua ~308px de largura;
     `height:36px` não reduziu a largura). Overflow +42/+26/+17/+4px.
  3. **Desktop > 1280px não é mais pixel-idêntico** (diff no 1440: Histórias 28%,
     Footer 2,9%, Destaques 1,4%, Categorias 0,9%; Favoritos/Território +4px de
     altura pelos wrappers).
  4. **Reduced-motion pior:** blocos de card inteiros somem (Histórias em branco).
  5. Marquee do Banner enorme, muda aparência de repouso.
- **Pontos do dono** somados: (A) header reduzido fora do Hero, aparecendo só ao
  rolar para cima, e completo no Hero; (B) animações mais lentas e **totalmente
  sincronizadas com o scroll**; (C) Banner **estático**, sem carrossel, só leve
  aparição; (D) **transição de tela para tela**, não itens aparecendo por cima.
- Escrita a instrução `fase-3-refazer-animacoes-e-header.md` (substituiu
  `fase-2-fim-e-fase-3-animacoes.md`) — **só diretivas (o quê + o COMO), sem
  código**. Refatoração do reveal: **um único `motion` por unidade** (card/seção),
  imagens como filhos comuns (fim do bug de invisibilidade), hover via CSS puro;
  reveal **ligado ao scroll** (`useScroll`+`useTransform`, scrubado, bidirecional,
  mais lento) com **transição entra/assenta/sai** entre seções; **header** em 3
  estados por posição+direção do scroll; **Banner estático**; fechar o logo; e
  desktop > 1280px assentado **pixel-idêntico**.

**Por quê:**
- O modelo de animação anterior tinha defeito estrutural (imagens fora da cascata
  de variants) e não atendia ao pedido de scroll-sync — precisava ser refeito, não
  remendado. Consolidado com os pontos do dono numa só instrução.

**Verificação:** pendente da execução pelo Sonnet + reconferência do Opus (imagens
visíveis, overflow, desktop pixel-idêntico, reduced-motion, scroll-sync, header,
banner).

---

## 2026-07-09 12:54 — Fase 2 finalizada (breakpoint 1280px + header) e Fase 3 iniciada (animações)

**O que foi feito:**

**Parte A — Fase 2:**
- Subido o breakpoint superior do bloco de responsividade de `1024px` para
  `1280px` em `src/index.css` (`@media (max-width: 1024px)` →
  `@media (max-width: 1280px)`; os limites de `768px`/`480px` não mudaram).
  Acima de `1280px` o desktop segue intocado.
- Corrigido o overflow do header na faixa 769–1280px: `header > img` ganhou
  `position:static` (zera os offsets `top`/`left` de desktop) e `height:36px`
  (era ~308px em tamanho natural). A nav horizontal (ativa até `≤768px`, onde
  vira hambúrguer) já estava enxuta desde a rodada anterior — só o logo
  faltava.

**Parte B — Fase 3 (início):**
- Criado `src/lib/motion.js`: variants reutilizáveis `fadeUp` (opacity+y),
  `staggerContainer` (orquestra filhos, 0.07s entre eles), `revealImage`
  (opacity+scale), `imagemCard`/`ctaCard` (versões que juntam reveal on-scroll
  E hover no mesmo elemento, usadas nos cards com imagem), `viewportReveal`
  (config padrão do `whileInView`, sem `once`) — easing seco
  `cubic-bezier(0.22,1,0.36,1)`, ~0.5s, só `opacity`/`transform`.
- `App.jsx` envolvido em `<MotionConfig reducedMotion="user">` — desliga/
  reduz toda animação da árvore quando o SO pede `prefers-reduced-motion`,
  sem precisar repetir a checagem em cada componente.
- **B2 (reveal on-scroll bidirecional)** aplicado em todas as 10 seções
  (Hero, Favoritos, Lançamento desconto, Categorias, Lançamento especial,
  Território, Destaques, Histórias, Banner, Footer): cabeçalho de seção com
  `fadeUp`, grids com `staggerContainer` no container + `fadeUp`/`imagemCard`
  nos filhos — sempre com `whileInView` **sem** `once`, então soma ao subir
  e reaparece ao descer de novo.
- **B3 (hover nos cards)** em Favoritos/Território/Histórias/Destaques: cada
  imagem ganhou um wrapper novo `.zoom_imagem{overflow:hidden}` (não mexe em
  nenhuma regra de tamanho existente — `.card img`, `.imagem_territorio`
  etc. continuam batendo no `<img>` do mesmo jeito) e um zoom sutil
  (`scale:1.03`) no hover do card. Onde existe CTA/seta (Favoritos "COMPRAR",
  Histórias "LEIA MAIS", Categorias "↗") ele desliza (`x:6px`) junto.
- **B4 (botão cortado com preenchimento)**: criado `components/
  BotaoCortado.jsx`, reutilizado no Hero (masculino/feminino), Lançamento
  desconto e Lançamento especial — renderiza um `<button>` real (os
  seletores CSS existentes por id/descendente continuam funcionando sem
  mudança) com uma camada (`scaleX` 0→1) que cresce por trás do texto no
  hover, recortada pelo mesmo `clip-path` diagonal do botão (regra base,
  intocada). Como os 4 botões já eram sólidos (não outline), a camada usa
  uma tonalidade escura sutil (`rgba(0,0,0,0.14)`) — feedback tátil sem
  mudar a cor de repouso do botão.
- **B5 (header ao rolar)**: `header` virou `position:sticky;top:0` (novo —
  sem isso o encolhimento não teria efeito visível, já que o header rolaria
  pra fora de tela). Ao passar de 40px de scroll (`useScroll` +
  `useMotionValueEvent`), o header aplica `scale:0.96` (com
  `transform-origin:top`, sem reflow) e uma camada nova (`.header_fundo`)
  ganha `opacity:1`, dando uma sombra sutil de "header no ar". No topo, volta
  a `scale:1`/sombra some. Não conflita com o `AnimatePresence` do drawer
  (`z-index` do header é 40, abaixo do overlay/drawer em 90/100).
- **B6 (Hero)**: eyebrow → título → parágrafo → botões entram em sequência
  no load (`staggerContainer`/`fadeUp`, `initial`/`animate`, sem
  `whileInView` — já visível ao carregar). Parallax leve: o
  `background-image` que antes estava direto em `.hero` foi para uma camada
  nova `.hero_bg` (mesmo asset/`size`/`position` — resultado em repouso
  idêntico), que se desloca em `y` (`useScroll`+`useTransform`, só enquanto
  o Hero está em cena) mais devagar que o scroll.
- **B7 (marquee no Banner) — PENDENTE DE APROVAÇÃO DO DONO:** implementado
  um marquee sutil (texto duplicado rolando em loop via `translateX`,
  `animate` com `repeat:Infinity`, 26s por volta). Diferente de todas as
  outras diretivas da Parte B, **isso muda a aparência de repouso** da seção
  (era 1 título estático em 2 linhas centralizado; virou uma faixa rolando
  em 1 linha) — não é só "adicionar movimento a um estado que já existia".
  Por isso: com `prefers-reduced-motion`, `Banner.jsx` renderiza o `<h1>`
  estático original (2 linhas, sem loop) em vez de deixar o marquee
  "congelado" cortado no meio do texto pelo `overflow:hidden` da faixa. **O
  dono decide se o marquee fica ou se volta pro título estático sempre** —
  a implementação está isolada em `components/Banner.jsx`.

**Por quê:**
- Parte A: o desktop original só cabia a partir de ~1360px; entre 1025 e
  1280px ele estourava (logo em tamanho natural + nav larga). Estender a
  faixa responsiva até 1280px resolve sem tocar no desktop grande.
- Parte B: início da Fase 3 do roadmap — estética moto com movimento seco,
  reveal bidirecional e micro-interações, sem alterar o layout final em
  nenhuma tela.

**Verificação:**
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅, repetidos após cada leva
  (Parte A isolada, depois cada grupo de componentes na Parte B).
- Não foi possível testar visualmente (mesma limitação de sempre: sem
  Chromium funcional neste servidor). Fiz a verificação por leitura
  cuidadosa do código e raciocínio sobre como o Framer Motion propaga
  `variants`/`whileInView`/`whileHover` pela árvore de componentes — em
  particular, evitei um bug real que cheguei a introduzir e corrigir: dar a
  um elemento pai E a um filho o mesmo par `hidden`/`visible` causaria
  deslocamento em dobro durante o reveal (`icone_seta` de Categorias
  herdando o `fadeUp` do `<a>` pai — corrigido pra só reagir a `hover`).
- **Pontos que pedem atenção extra na conferência visual do Opus** (além do
  já pedido: overflow ≤1280px, diff de desktop >1280px, reduced-motion
  estático):
  1. Se o reveal on-scroll dos cards (Favoritos/Território/Histórias/
     Destaques) está disparando corretamente nos dois sentidos — a
     propagação de `whileInView` do grid até os filhos passa por um `<div>`
     de card intermediário sem `variants` próprio; deveria funcionar (é o
     padrão documentado do Framer Motion), mas não pude confirmar visualmente.
  2. O marquee do Banner (aprovar ou reverter).
  3. Se o `scale` do header ao rolar não deixa a logo/nav com aparência
     "borrada" ou desalinhada durante a transição.

---

## 2026-07-09 12:45 — Instrução combinada: finalizar Fase 2 (breakpoint/header) + INICIAR Fase 3 (animações)

**O que foi feito (Opus, planejamento):**
- A pedido do dono, a instrução ativa foi **combinada**: Parte A finaliza a Fase 2
  (subir breakpoint 1024→1280px + corrigir o header/logo para não estourar) e
  Parte B **inicia a Fase 3 (animações)**. Instrução em
  `fase-2-fim-e-fase-3-animacoes.md` (substituiu `fase-2-breakpoint-e-header.md`),
  **só diretivas, sem código**.
- **Fase 3 (animações, estética moto) definida em diretivas:** fundação
  `src/lib/motion.js` (variants fadeUp/staggerContainer/revealImage, só
  transform/opacity, easing seco); **reveal on-scroll bidirecional** em todas as
  seções (`whileInView` SEM `once`); hover nos cards (zoom sutil na imagem +
  CTA/seta deslizando); preenchimento animado nos botões cortados; header que
  encolhe/ganha fundo ao rolar (integrado ao drawer); Hero com entrada em
  sequência + parallax leve; Banner com marquee a aprovar. Invariantes:
  estado final = layout atual, só transform/opacity, respeitar reduced-motion,
  não quebrar a responsividade.
- Planejamento atualizado: **Fase 3 ativa** (iniciada junto com a finalização da
  Fase 2).

**Por quê:**
- O dono pediu para corrigir o breakpoint E já emendar o próximo passo do backlog
  (Fase 3) no mesmo round. As animações são só transform/opacity e não alteram o
  layout, então não desestabilizam a Fase 2.

**Verificação:** pendente da execução pelo Sonnet + reconferência do Opus
(overflow ≤1280px, diff de desktop >1280px, reveal bidirecional, reduced-motion).

---

## 2026-07-09 12:35 — Conferência de ~1050px: desktop estoura no meio → subir breakpoint p/ 1280px

**O que foi feito (Opus, conferência + decisão do dono):**
- O dono reportou quebra por volta de **1050px**. Conferido por screenshot: em
  1050px (> 1024px) aplica-se o **desktop original**, que só "cabe" a partir de
  **~1360px**; entre ~1025 e ~1280px ele **estoura horizontalmente**
  (`scrollWidth` 1251 em 1025px → 1282 em 1280 → ok só em 1360). Header (logo em
  tamanho natural ~308px + nav de espaçamentos largos) é o que estoura. **Não é
  regressão** — é o desktop original, que provei ser pixel-idêntico ao aprovado.
- Também detectado um overflow menor **dentro do tablet (≤1024)**: o **logo não
  é reduzido na faixa 769–1024px** (só ≤768px), estourando ~26px.
- **Decisão do dono:** **estender o design responsivo novo até ~1280px**;
  "desktop full intocado" passa a valer **> 1280px**.
- Escrita a instrução `fase-2-breakpoint-e-header.md` (só diretivas, sem código —
  o Opus parou de escrever CSS nas instruções, a pedido do dono): (1) subir o
  breakpoint superior de 1024→1280px; (2) reduzir o logo e neutralizar seus
  offsets na faixa responsiva para o header caber sem overflow em nenhuma largura
  ≤1280px.

**Por quê:**
- O objetivo é responsividade sem quebra em nenhuma largura. O desktop original
  não cobre a faixa 1025–1280; estender o design novo até lá resolve mantendo o
  desktop grande intacto.

**Verificação:** pendente da aplicação pelo Sonnet + reconferência do Opus
(screenshots em 390/768/1024/1100/1280/1360/1440 + teste de overflow + diff de
desktop > 1280).

---

## 2026-07-09 12:20 — Fase 2 (redesign): 2 fixes cirúrgicos do CSS

**O que foi feito:**
- Aplicados os 2 ajustes exatos de `fase-2-redesign-fix.md`, ambos dentro do
  `@media (max-width: 1024px)` de `src/index.css`, nada mais tocado:
  1. **Fix 1 (Destaques saindo da tela / overflow horizontal):**
     `.destaques{ min-height: 0; padding: 64px 0; }` → adicionado
     `display: block;` no início da regra. Antes herdava `display:flex` da
     base de desktop e a vitrine horizontal sem largura definida crescia
     livremente (~1350px), empurrando o cabeçalho "OS MAIS VENDIDOS" pra
     fora da tela e criando scroll horizontal na página.
  2. **Fix 2 (CTAs de Lançamento desconto/especial cortando texto):**
     adicionada a regra `#texto button, #container_texto button{ width:auto;
     height:48px; padding:0 30px 0 22px; white-space:nowrap; }` logo após
     `#botoes{...}` (Hero) dentro do mesmo `@media`. Esses dois botões tinham
     ficado de fora quando o bloco de responsividade foi reescrito na rodada
     do redesign — voltaram a herdar `width:14vw` da regra base e cortavam o
     texto ("COMO PARTIC…", "EXPLO COLEÇ…"). Não afeta `#botoes button`
     (Hero), que já tem regra própria.
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Por quê:**
- Os 2 bugs foram encontrados pelo Opus na conferência visual real (screenshot
  nos 5 viewports) após o redesign — omissões da spec original, não erros de
  execução do Sonnet. Correção cirúrgica, sem tocar em mais nada do CSS.

**Verificação:**
- `npx vite build` ✅ · `npm run lint` ✅.
- Conferido por grep que as duas mudanças ficam confinadas dentro do
  `@media (max-width: 1024px)` e que nada fora dele foi alterado.
- Reconferência visual (5 viewports + teste de overflow horizontal + diff de
  desktop) fica a cargo do Opus.

---

## 2026-07-09 12:10 — Conferência VISUAL do redesign (5 viewports) + 2 correções

**O que foi feito (Opus, conferência):**
- Conferido o redesign nos 5 viewports por screenshot (Docker+Playwright).
- **Regressão de desktop provada como ZERO:** renderizado o desktop original
  (git HEAD, via `git worktree`) e o novo, e feito **pixel-diff** — **0 pixels
  diferentes** em 1280px e 1440px (de ~10–11 milhões cada). Desktop intocado,
  agora empiricamente.
- **Aprovado no visual:** Hero (botões com espaçamento correto), Favoritos,
  Categorias, Território — todos com o novo cabeçalho de barra laranja e ótimo
  ritmo. O novo sistema funciona.
- **2 bugs encontrados (omissões da spec do Opus, não do Sonnet):**
  1. **Destaques:** `.destaques` é `display:flex` (base) e a vitrine horizontal
     sem largura definida cresceu a ~1350px, **jogando o cabeçalho para fora da
     tela** e criando **overflow horizontal** (scrollWidth 870 em 390px). Fix:
     `display:block` no `.destaques` (≤1024).
  2. **Botões CTA de Lançamento desconto/especial:** ao reescrever o bloco
     inteiro, o Opus incluiu só o fix dos botões do Hero e esqueceu os CTAs
     (`#texto button`, `#container_texto button`), que voltaram ao `width:14vw`
     da base e cortaram o texto. Fix: regra de tamanho por conteúdo.
- Correção escrita em `fase-2-redesign-fix.md` (substituiu `fase-2-redesign-mobile.md`).
- Prints e o worktree apagados após o uso (economia de espaço).

**Por quê:**
- Ver de verdade nos 5 viewports revelou 2 falhas que a leitura de CSS não
  pegaria. O desktop foi blindado com prova de pixels.

**Verificação:** pendente da aplicação dos 2 fixes pelo Sonnet + nova rodada de
screenshots do Opus.

---

## 2026-07-09 12:01 — Fase 2 (redesign): novo sistema de design mobile implementado

**O que foi feito:**
- Aplicada a spec fechada de `fase-2-redesign-mobile.md`: localizado o bloco
  `/* RESPONSIVIDADE (FASE 2) ... */` logo após `/* FIM FOOTER */` em
  `src/index.css` e **substituído por inteiro** (do comentário até o fim do
  arquivo) pelo CSS exato definido pelo Opus na instrução — nada foi
  decidido pelo Sonnet nesta rodada, só execução mecânica. Nada acima desse
  ponto (a base de desktop) foi tocado — conferido por `diff` linha a linha
  contra o estado anterior do arquivo antes de aplicar a troca.
- Novo sistema de design mobile/tablet (`≤1024px`, transição gradual até o
  desktop intocado `>1024px`):
  - **Ritmo consistente:** `64px` de respiro vertical por seção, gutter único
    de `20px` nas bordas.
  - **Cabeçalho de seção padronizado:** título alinhado à esquerda (era
    centralizado) com eyebrow laranja em cima e uma **barra laranja de
    assinatura** (`44×3px`, via `::after`) logo abaixo do `h2`/`h3` — aplicado
    em Favoritos, Categorias, Território, Destaques e Histórias.
  - **Cards unificados** (Favoritos, Território, Histórias): imagem em
    `aspect-ratio: 4/5` no tablet, cantos retos, espaçamento consistente.
  - **Destaques vira vitrine horizontal** com scroll+snap e card menor
    (`62vw` mobile / `66vw` telas bem pequenas / grade de 3 col no tablet) —
    resolve o quadrado vazio gigante do scroll horizontal anterior (`65vw`/
    `80vw`).
  - **Hero:** botões empilhados com respiro próprio (`gap:14px`,
    `margin-top:28px`, `margin:0` nos botões — zera o `margin:8px` herdado
    da regra base que desalinhava tudo).
  - **Tablet como ponte:** grades ganham mais colunas que o mobile mas menos
    que o desktop (Favoritos/Categorias/Histórias 3 col, Território/Destaques
    2–3 col), suavizando a transição até 1024px.
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅.

**Por quê:**
- O dono elevou o escopo depois de ver o resultado da correção anterior por
  screenshot real: queria um mobile com **linguagem de design própria**, não
  "desktop empilhado". O Opus desenhou o novo sistema (tokens de espaçamento +
  cabeçalho com barra laranja + vitrine de Destaques) e definiu o CSS exato;
  o papel do Sonnet nesta rodada foi só aplicar a spec fielmente.

**Verificação:**
- `npx vite build` ✅ · `npm run lint` ✅.
- Conferido por `diff` que as ~680 linhas de CSS de desktop (tudo antes do
  bloco `RESPONSIVIDADE`) ficaram **byte a byte idênticas** ao estado
  anterior à troca.
- Verificação visual nos 5 viewports (390/768/1024/1280/1440) fica a cargo do
  Opus via screenshot (pipeline Docker+Playwright já montado por ele) — o
  Sonnet não tem esse pipeline disponível neste ambiente.

---

## 2026-07-09 11:52 — Novo escopo: redesign do mobile (nova linguagem de design)

**O que foi feito (Opus, planejamento):**
- O dono elevou o escopo: em vez do ajuste fino de 2 pontos, quer um **design
  NOVO para o mobile** — deixar de ser "desktop empilhado" e ganhar uma
  **linguagem de design própria e coesa**, com os demais viewports
  **transicionando gradualmente** até o desktop (que segue intocado > 1024px),
  mantendo estética (moto: angular, preto/grafite + laranja) e conteúdo atuais.
- Escrita a instrução `fase-2-redesign-mobile.md` (substituiu `fase-2-ajuste-fino.md`)
  com o **sistema de design decidido pelo Opus**: tokens de espaçamento
  consistentes (gutter 20px, padding de seção 64px, header→conteúdo 28px),
  **cabeçalho de seção padronizado** (eyebrow + H2 à esquerda + **barra laranja**
  de assinatura), **sistema único de card** (aspect-ratio 4/5, cantos retos),
  Destaques como vitrine horizontal com card menor (corrige o quadrado vazio),
  Hero com espaçamento de botões corrigido, e o **tablet como ponte** (colunas
  voltam gradualmente ao desktop).
- Regras de trabalho registradas: **validar nos 5 viewports** (390/768/1024/1280/
  1440) por screenshot e **apagar os prints** depois (economia de espaço). Os
  prints da conferência anterior foram apagados.

**Por quê:**
- O dono quer um mobile que pareça **projetado**, não só "não quebrado". Com a
  conferência visual agora possível (Docker+Playwright), dá pra iterar o design
  de verdade até ficar bom.

**Verificação:** o Opus vai implementar via Sonnet, conferir por screenshot nos
5 viewports e iterar. Desktop > 1024px permanece intocado.

---

## 2026-07-09 11:42 — Conferência VISUAL da correção do mobile (screenshots reais) + ajuste fino

**O que foi feito (Opus, conferência):**
- **Destravada a verificação visual** que faltava nas rodadas anteriores: montado
  pipeline de screenshot via **Docker rootless + Playwright** (imagem
  `mcr.microsoft.com/playwright:v1.48.0-jammy`, já em cache). Como a rede rootless
  isola o host, o site é **servido dentro do próprio container** (servidor HTTP
  estático embutido no script Node) e o Chromium navega em `127.0.0.1`. Capturado
  a página inteira e **seção por seção** em 390 e 768px (`deviceScaleFactor:2`).
- **Resultado da correção anterior conferido no olho:** a maioria das seções
  ficou boa em mobile — Favoritos, Território, Histórias, Lançamento
  especial/desconto, Categorias, Banner e Footer estão proporcionais, com títulos
  respirando e botões mostrando o texto inteiro (ex.: "EXPLORAR COLEÇÃO" completo).
- **Dois problemas remanescentes identificados na tela:**
  1. **Botões do Hero:** colados entre si e no parágrafo, e herdando `margin:8px`
     da regra base `button{}` (desalinha da margem do texto).
  2. **Destaques ("OS MAIS VENDIDOS"):** os produtos não têm imagem (placeholder
     com ícone de sacola); no scroll horizontal do mobile o card em `80vw` vira
     um quadrado enorme e vazio dominando a tela.
- Aberta rodada de **ajuste fino** (instrução `fase-2-ajuste-fino.md`, substituiu
  a `fase-2-correcao-mobile.md` já removida) com o **CSS exato decidido pelo
  Opus**: Hero `#botoes{gap:14px;margin-top:28px}` + `#botoes button{margin:0;
  height:54px}`; Destaques `grid-auto-columns` 65vw→62vw (≤768) e 80vw→66vw (≤480).

**Por quê:**
- O dono continuava achando o mobile feio "principalmente com imagens". Olhando
  as telas de verdade, a causa não era geral — eram esses 2 pontos específicos.
  As demais seções, que pareciam suspeitas no escuro, na verdade ficaram bem.

**Verificação:** o Opus vai reconferir por screenshot após o Sonnet aplicar o
ajuste fino. Método de screenshot documentado para reuso.

---

## 2026-07-09 11:29 — Fase 2 (correção): acabamento de UI/UX em mobile e tablet

**O que foi feito:**
- Reescrito o bloco `RESPONSIVIDADE (FASE 2)` de `src/index.css` (mesma estrutura de 3 breakpoints — 1024/768/480px — mas com liberdade total de layout `≤1024px`, conforme a nova diretriz do dono). O esqueleto de grids/drawer/`clamp()` da rodada anterior foi mantido; o que mudou foi neutralizar os micro-posicionamentos em `vh`/`vw` herdados do desktop que vazavam pro mobile. Os 4 grupos de causa-raiz apontados na instrução:
  1. **Botões com texto cortado:** `button{width:14vw;height:7.3vh}` agora vira `width:auto;height:48px;padding:0 30px 0 22px;white-space:nowrap` em `≤1024px` (e um pouco mais enxuto em `≤480px`) — os 3 CTAs (Hero, Lançamento desconto, Lançamento especial) mostram o texto inteiro, com folga pro `clip-path` diagonal não cortar letra. O corte diagonal da marca foi mantido.
  2. **Títulos cortados/sobrepostos:** `.titulo{top:7vh}` (usado por Favoritos/Categorias/Território/Historias) e os offsets `#container_texto{top:3vh}` (Lançamento especial), `#conteiner_categorias{top:10.4vh}`, `margin-top:11vh` (Território e Historias) foram zerados em `≤1024px` — o respiro agora vem do `padding` da própria seção, não de deslocamentos visuais que não reservavam espaço.
  3. **Imagens grandes demais:** Favoritos (`.card img`) e Território (`.imagem_territorio`) trocaram alturas fixas em `vh`/`aspect-ratio` muito vertical por `aspect-ratio: 4/3` (tablet) → `16/11`/`16/10` (mobile) com `max-height` em Favoritos; a imagem de Lançamento desconto (`#container_imagem{height:50vh}`) virou `aspect-ratio:4/3`; Historias também ajustada.
  4. **Vazios enormes:** `min-height` fixo em `vh` das seções (Hero mantido cheio de propósito; Favoritos, Categorias, Lançamento especial, Território, Destaques, Historias, Banner) virou `min-height:auto`/`min-height` menor + `padding` vertical consistente (~56–64px). `#texto_banner{height:30vh}` (que inflava ainda mais o vazio do Banner) virou `height:auto`. Também corrigidos dois vazios menores fora da lista original: `.card a{padding-bottom:8vh}` (link "COMPRAR" dos Favoritos) e `#fim_footer{height:20vh}` (spacer vazio no fim do rodapé) — ambos viravam ~150–160px de espaço puramente vazio em celular.
- Hero e Lançamento especial passaram a sair do posicionamento absoluto/offset já em `≤1024px` (antes só em `≤768px`) — o dono liberou essa antecipação explicitamente na instrução, e evita depender de `vh` de altura de janela também na faixa tablet.
- Header: nav horizontal (ativa até `≤768px`, quando vira hambúrguer) ganhou `margin-left`/`gap`/`font-size` mais enxutos em `≤1024px` pra não ficar apertada antes do hambúrguer assumir.
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅, repetidos após cada leva de ajuste.

**Por quê:**
- O dono reprovou o acabamento visual do mobile mesmo com build/lint passando: títulos cortados, botões com texto cortado, imagens dominando a tela e espaçamento com vazios grandes. A causa raiz (documentada em `fase-2-correcao-mobile.md`) era estrutural — dezenas de valores em `vh`/`vw` pensados só pra desktop continuavam valendo em telas menores por não terem sido neutralizados. A nova diretriz do dono (liberdade total `≤1024px`, só desktop `>1024px` intocável) permitiu resolver isso de forma mais limpa em vez de patch por patch.

**Verificação:**
- `npx vite build` ✅ · `npm run lint` ✅. Conferi manualmente (grep de todos os `vh`/`vw` que sobraram na base de desktop) se cada um ou (a) está coberto por um override em algum breakpoint, ou (b) é um valor pequeno o suficiente (~1–3vh/vw) pra não causar problema visual real — os dois achados na categoria "não tão pequeno assim" (`.card a` e `#fim_footer`) foram corrigidos.
- **Segue sem ser possível testar visualmente no navegador** neste servidor (mesma limitação já registrada: falta Chromium funcional / sem `sudo` pra instalar libs de sistema). A verificação foi por leitura cuidadosa do CSS + raciocínio manual sobre cada offset/altura por breakpoint. **Recomendo fortemente que o dono confira visualmente nas larguras 1440/1280/1024/768/390 antes de aprovar** — esta é justamente a rodada que corrige o que só apareceu ao olhar no navegador.
- Não usei o `Workflow`/agentes paralelos nesta rodada (a pedido do dono, pra reduzir consumo de tokens) — revisão feita solo, com grep sistemático de `vh`/`vw` residuais no CSS de base como checagem de cobertura.

**Não mexido (fora do escopo, mesmas observações da entrada anterior):** os 4 itens pré-existentes fora do escopo da Fase 2 (seletor `p, button` vazando, `object-position` sem efeito, `font-size` duplicado, `.lancamento_especial` duplicado) continuam pendentes de autorização do dono.

---

## 2026-07-09 11:20 — Conferência da Fase 2: mobile reprovado no visual (nova rodada de correção)

**O que foi feito (Opus, conferência):**
- Conferência técnica da Fase 2: `vite build` ✅, `oxlint` ✅, os 21 seletores do
  bloco responsivo batem com elementos reais, e o **desktop (> 1024px) foi
  confirmado como preservado** (os 4 `clamp()` saturam no valor de desktop
  exatamente em 1024px; todo o resto está em `@media` ou em elementos novos com
  `display:none`).
- O **dono conferiu o mobile no navegador e reprovou o acabamento visual**:
  títulos cortados/sobrepostos ("NAVEGUE", "LANÇAMENTO ESPECIAL"), botões com
  texto cortado ("COMO PARTIC…", "EXPLO COLEÇ…"), imagens grandes demais
  (Favoritos, Território), espaçamento ruim e vazios enormes (Banner, Histórias).
- **Causa-raiz identificada:** as grandes jogadas (grids, drawer, `clamp`) foram
  feitas, mas ficaram valendo no mobile dezenas de micro-posicionamentos
  herdados do desktop (`top`/`left`/`width`/`height` em `vh`/`vw`) — ex.: base
  `button { width:14vw }`, `.titulo { top:7vh }`, `#container_texto { top:3vh }`,
  `margin-top:11vh`, `min-height` em `vh`.
- Aberta **nova rodada de correção** da Fase 2: instrução detalhada gravada em
  `docs/agentes/sonnet/fazer/fase-2-correcao-mobile.md` (substituiu a instrução
  original `fase-2-responsividade.md`, já removida).
- Registrada a **nova diretriz do dono**: só o desktop full (> 1024px) precisa
  ficar intacto; nos demais viewports há liberdade total, preservando
  estética/conteúdo e priorizando UI/UX. Docs de `agentes/` atualizados.

**Por quê:**
- O objetivo do dono é responsividade **com boa aparência**, não só "não
  quebrar". O build/lint passavam, mas o visual mobile não atende — daí a
  rodada de correção antes de aprovar/commitar.

**Verificação:** pendente — depende da execução da correção pelo Sonnet e da
conferência visual do dono nas larguras 1440/1280/1024/768/390.

---

## 2026-07-09 11:05 — Fase 2: Responsividade e mobile

**O que foi feito:**
- Adicionado menu mobile ao `Header` (`components/Header.jsx`): botão hambúrguer + drawer lateral com `AnimatePresence`/`motion` (`motion/react`), estado via `useState`, fecha ao clicar em link do menu ou no overlay, respeita `prefers-reduced-motion` via `useReducedMotion`.
- Adicionado bloco `RESPONSIVIDADE (FASE 2)` ao final de `src/index.css` com 3 breakpoints (`@media (max-width: 1024px)`, `768px`, `480px`), cobrindo as 11 seções da página: Header (hambúrguer), Hero (texto sai do posicionamento absoluto), Favoritos (3→1 col, altura em `vh`→`aspect-ratio`), Lançamento_desconto (empilha texto+imagem), Categorias (6→3→2 col), Lançamento_especial (largura/offset em `vh`/`vw` → padding responsivo), Território (4→2→1 col, `aspect-ratio`), Destaques (5→3 col → scroll horizontal com snap em mobile), Historias (3→1 col, imagem `29vw`→100%), Banner (só tipografia) e Footer (3→1 col, rodapé empilha e centraliza).
- Títulos grandes (Hero `h1`, Banner `h1`, `#titulo_principal`, `h2` de seção) trocados de `font-size` fixo para `clamp(mínimo, fluido, MÁXIMO-ATUAL)` diretamente nas regras originais — o terceiro valor é sempre igual ao tamanho de desktop atual, então nada muda em telas grandes.
- Todas as regras novas/alteradas ficam dentro de `@media (max-width: …)` ou são a exceção combinada do `clamp()`; nenhuma regra de base fora de media query teve seu valor alterado além do `font-size`.
- Correção adicional encontrada durante a revisão: `#drawer_menu`/`.overlay_menu` agora têm `display: none` por padrão e só voltam a `display: flex`/`block` dentro de `@media (max-width: 768px)` — sem isso, se o usuário abrisse o drawer em mobile e a janela fosse redimensionada/rotacionada para desktop sem reload, o painel continuaria cobrindo o layout (o botão que o fecharia já teria sumido em `>768px`).
- Ajuste em Historias: a imagem do card usa `width: 29vw` fixo (independente da largura da coluna do grid); no tablet (3 colunas dividindo `90vw` com `gap: 20px`) isso ultrapassa o espaço disponível a partir de ~1333px de viewport. Convertida para `width: 100%` já a partir de `@media (max-width: 1024px)` (a spec só pedia a partir do mobile), evitando overflow na faixa tablet.
- Ajuste em Lançamento_especial: no breakpoint tablet, o offset posicional `left: 7vw` agora vira `padding-left` (antes só tinha o valor reduzido para `left: 6vw`, mantendo a técnica antiga) — alinhado ao texto da instrução ("largura em vh e left:7vw viram padding responsivo").

**Por quê:**
- Instrução do dono (`docs/agentes/sonnet/fazer/fase-2-responsividade.md`): tornar a página totalmente responsiva sem alterar em nada o visual de desktop (> 1024px). Toda adaptação entra via `@media`, exceto a troca por `clamp()` combinada explicitamente (MÁX = valor atual).

**Verificação:**
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅.
- Revisão adicional: usei 5 agentes independentes (via `Workflow`) para auditar o diff em paralelo — preservação do visual de desktop, conformidade item a item com a spec, o componente `Header`, correção técnica do CSS e risco de overflow por breakpoint. 4 das 5 dimensões terminaram (a de risco de overflow foi interrompida antes de concluir; cobri esse ponto manualmente, inclusive achando e corrigindo o caso do Historias acima). As duas correções descritas acima (drawer vazando pro desktop e offset do Lançamento_especial) vieram dessa revisão.
- **Não foi possível testar visualmente no navegador** (larguras 1440/1280/1024/768/390 pedidas pela spec): o Playwright precisaria baixar um Chromium, mas as bibliotecas de sistema necessárias (`libatk-1.0.so.0` e outras) não estão instaladas neste servidor e a instalação exige `sudo`, que não está disponível. A verificação ficou por leitura cuidadosa do CSS/JSX e checagem manual dos cálculos de largura (vw/gap/grid) em cada breakpoint. **Recomendo que o dono confira visualmente antes de aprovar.**

**Observações fora do escopo desta fase (não corrigidas — pré-existentes, precisam de autorização do dono):**
- `src/index.css` linha ~371: `#container_texto h1, p, button{ color: var(--branco); }` — só o `h1` fica escopado a `#container_texto`; `p` e `button` sem o prefixo casam com QUALQUER parágrafo/botão da página (hoje mascarado por regras mais específicas, mas é um vazamento real).
- `src/index.css` linha ~334: `.lancamento_especial` usa `object-position: center` (propriedade sem efeito em elemento com `background-image`; o correto seria `background-position: center`, como em `.hero`). Provável bug de enquadramento da imagem de fundo, mas mexer nisso muda o visual atual de desktop — não fiz sem pedido explícito.
- `src/index.css` linha ~168: `.desc{}` declara `font-size` duas vezes (a primeira, `small`, é código morto).
- `src/index.css` linha ~329/338: `.lancamento_especial{}` está declarado em dois blocos separados consecutivos sem necessidade (sem conflito, só desorganização).

**Pendência conhecida (pré-existente, não introduzida aqui):** mesma do `tsc -b` já registrada na entrada anterior.

---

## 2026-07-09 09:28 — Fase 1: Fundação e conteúdo data-driven

**O que foi feito:**
- Instalada a biblioteca `motion` (Framer Motion, compatível com React 19). Ainda **não** utilizada — preparação para a Fase 3 (animações).
- Criada a pasta `src/data/` com 7 arquivos que concentram todo o conteúdo textual e as imagens de cada seção: `navegacao.js`, `favoritos.js`, `categorias.js`, `destaques.js`, `territorio.js`, `historias.js`, `footer.js`.
- Refatorados os componentes `Header`, `Favoritos` e `Footer` — que tinham JSX repetido escrito à mão — para gerar o conteúdo via `.map()` sobre os dados.
- Os componentes que já eram data-driven (`Categorias`, `Destaques`, `Territorio`, `Historias`) tiveram seus arrays de dados movidos para `src/data/`.
- **Correção de bug:** imagens de `Destaques`, `Territorio`, `Historias` e `Footer` eram referenciadas como **string literal** (`"../src/assets/..."`), o que funcionava só no dev e **quebrava no build de produção**. Migradas para `import`.
- Corrigido o `<title>` de `ReactFacts` → `X11` no `index.html`.

**Por quê:**
- Requisito do usuário de deixar a página "o mais automática possível" e "tirar o tipo estático": centralizar conteúdo em dados torna manutenção trivial (editar 1 linha de dado em vez de mexer no JSX) e elimina repetição.
- O fix de imagens era necessário para que o `vite build` gerasse os assets corretamente — sem ele, a versão de produção ficaria com imagens quebradas.

**Verificação:** `vite build` ✅ (todas as imagens empacotadas) · `oxlint` ✅ · DOM de saída idêntico ao anterior (zero mudança visual).

**Pendência conhecida (pré-existente, não introduzida aqui):** `npm run build` executa `tsc -b` antes do vite e falha porque `tsconfig.app.json` procura `.ts/.tsx` mas o projeto é todo `.jsx`. Sem impacto visual. A validar/corrigir em fase futura.
