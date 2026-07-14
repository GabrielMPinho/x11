# Estilos (CSS)

## Escala proporcional do desktop — 1024→1440 (2026-07-14)
**Referência do desktop agora é 1440px** (não mais "acima de 1280 = intocado
sem mais detalhe"). Pedido do dono: "1024 deve ser o 1440 encolhido, com as
devidas proporções" — antes, 1024 caía direto no design responsivo (OUTRO
layout). Hoje (Home + chrome já convertidos; Institucional/Produtos/
Equipamento ainda não, cada uma terá sua instrução):
- **≥1440px:** idêntico a hoje, travado (regra de ouro).
- **1024→1440px:** escala proporcional contínua (0,7111× em 1024).
- **≤1023px:** design responsivo de sempre, sem nenhuma mudança visual —
  breakpoint recuado de 1280→1023 (só pra Home+chrome; Institucional/
  Produtos continuam entrando em modo tablet em ≤1280, efeito colateral
  intencional até serem convertidas).

**O mecanismo — `--u` (`tokens.css`):** `--u: min(1px, 0.069444vw)` + override
`@media(max-width:1023px){:root{--u:1px}}`. É "1px do desenho de referência
1440×900", com 3 regimes (ver comentário em `tokens.css` pro racional
completo — por que precisa voltar a 1px em ≤1023, não só ficar decrescendo:
as regras "desktop" são a base HERDADA pelo bloco responsivo, que só
sobrescreve parte delas).

**Lei de conversão (aplicar em qualquer arquivo convertido pra escala):**
| Tinha | Vira | Nota |
|---|---|---|
| comprimento fixo `px`/`rem` (gap/padding/margin/width/height/border/offset) | `calc(N * var(--u))`, N = valor em px medido em 1440 | `1rem=16px` |
| `font-size` (qualquer) | `max(12px, calc(N * var(--u)))` | piso de legibilidade — só morde abaixo de 12px |
| `vw` | fica como está | já é proporcional |
| `vh` numa **caixa de conteúdo** | `aspect-ratio` derivado da LARGURA, razão medida no render 1440×900 | decisão do dono: proporções travadas na largura, não na altura (evita variar com a altura da janela) |
| `vh` numa **faixa de tela** (seção que existe pra "encher a tela") | fica como está | `.hero`, `.favoritos`, `.categorias`, etc. — 9 seções da Home |
| `clamp()` de fonte existente | `max(12px, calc(N * var(--u)))`, N = o máximo do clamp | o clamp ORIGINAL precisa ser recriado no bloco `≤1023` (`responsividade.css`), senão o mobile para de encolher em telas pequenas |

**vh de espaçamento não cobertos pela lei acima** (padding/margin/top que não
são "altura de caixa de conteúdo" nem faixa de tela nomeada — ex.:
`.card .cta_comprar{padding-bottom:8vh}`) foram deixados como estão na
conversão de 2026-07-14 — a instrução não deu alvo explícito pra esses, não
inventei. Variam com a altura da janela; ajuste futuro se o dono pedir.

Ver `docs/agentes/alterações/CHANGELOG.md` (2026-07-14 13:00) pro detalhe
completo (arquivos tocados, valores-alvo @1440/@1024) e `convencoes.md`
(regra de ouro atualizada).

## Arquitetura do CSS — manifesto + parciais (split PASSE 1, 2026-07-14)
`base.css` **deixou de ser um arquivo monolítico** (chegou a 2988 linhas —
motivo do split, pedido do dono: "não estou gostando de ter um arquivo css
enorme"). Hoje `base.css` é só um **manifesto de `@import`**, na MESMA ordem
da cascata de antes (não reordenar — a ordem importa pra especificidade
igual vencer por posição). Continua sendo o arquivo linkado no
`index.html` (isso não mudou). Plano completo:
`docs/agentes/opus/backlog/refatoracao-css.md`; execução:
`docs/agentes/alterações/CHANGELOG.md` (2026-07-14 11:59, com a prova de
equivalência byte a byte do CSS compilado).

**Fundação compartilhada** (`src/padrao/estilos/`): `tokens.css` (cores
`:root` + fonte base) → `reset.css` (reset `*{}` + `body{background}` +
bloco Lenis) → `header.css` (header completo **+** minimalista, os 2 juntos
agora) → `footer.css` → `botao.css` (botão cortado) → `animacoes.css`
(zoom/moldura, elevação hover, `.hero_bg` parallax — "resto da Fase 3") →
`responsividade.css` (mobile GLOBAL de Home+Institucional+Produtos, ainda
não distribuído por página — ver "passe 2" abaixo).

**CSS por página** (dentro da própria pasta da página, ao lado do `.jsx`):
`src/paginas/home/home.css`, `src/paginas/institucional/institucional.css`,
`src/paginas/produtos/produtos.css`, `src/paginas/equipamento/
equipamento.css` (esta já nasceu com o mobile **co-locado** no próprio
arquivo — não depende de `responsividade.css`).

**Ordem exata do manifesto (`base.css`):** `tokens → reset → header → home
→ footer → botao → animacoes → institucional → produtos →
responsividade → equipamento`. Ao criar/editar CSS de uma página existente,
edite o arquivo `<pagina>.css` dela, não `base.css`. Ao criar página nova,
siga o padrão: CSS próprio em `src/paginas/<pagina>/<pagina>.css` + um novo
`@import` no manifesto, na posição correspondente (mobile pode nascer já
co-locado no próprio arquivo, como a Equipamento — não precisa entrar em
`responsividade.css`).

**⚠️ Cuidado ao mexer em `url(...)` nas páginas:** CSS de página agora mora
em `src/paginas/<pagina>/`, não mais em `src/padrao/estilos/` — caminhos
relativos de asset mudam! Pra chegar em `src/padrao/assets/images/`, o
caminho é **`../../padrao/assets/images/...`** (2 níveis acima + `padrao/`),
não mais `../assets/images/...` (que só funcionava quando o CSS morava em
`src/padrao/estilos/`). Achado real durante a prova de equivalência do
split — 5 regras quebraram silenciosamente por isso (ver CHANGELOG).

**Pendente — "passe 2" (instrução própria futura, ainda não feita):**
distribuir o mobile de Home/Institucional/Produtos (hoje 1 bloco só em
`responsividade.css`) pra dentro do CSS de cada página, co-locando
desktop+mobile como a Equipamento já faz. Mais delicado (a ordem dentro de
`@media` de mesma especificidade importa) — fazer só depois do passe 1
validado pelo dono.

## Reset e fontes
- Reset global: `* { margin:0; padding:0; box-sizing:border-box; }`
- **`body{background-color:var(--background_escuro)}`** (2026-07-14, fix de
  RAIZ) — logo após o reset, fora de qualquer `@media`. Sem isso, qualquer
  reveal que desloca uma seção/bloco via `transform` (`Revela`/
  `RevelaComProgresso`) abre um vão que expõe o branco padrão do navegador
  durante o scroll ("faixa branca" entrando/saindo) — achado na PDP
  (`FaixaSpecs`) e no Footer (que fica no shell `App.jsx`, fora do `<main>`
  de qualquer página, então nenhum fundo de página o cobria). **Zero
  mudança visual em desktop >1280px** — toda seção de toda página já cobre
  o body no repouso; só os vãos de reveal passam a mostrar escuro em vez de
  branco. Fundos de página/seção individuais (ex.: `.equipamento_pdp`)
  continuam podendo existir — redundantes com o body, mas inofensivos.

### Tipografia (migração global, 2026-07-13)
Identidade nova de **3 fontes** (Google Fonts, confirmadas por `pdffonts` nos
PDFs de `docs/layout/`), substituindo `Roboto`/`Inter`. Carregadas em
`index.html`, só com os pesos usados; tokens em `tokens.css`, aplicadas por
seletor em `base.css`. **Única exceção documentada à regra "desktop >1280px
intocado"** além do carrossel de Destaques — ver `convencoes.md`.

| Token | Fonte | Pesos carregados | Papel |
|---|---|---|---|
| `--fonte-titulo` | Chakra Petch | 700 | `h1`/`h2`/títulos de seção (`.hero>#escrito>h1`, `.titulo>.escrito_fav/escrito_cat>h2`, `#titulo_principal`, `#container_texto h1`, `.banner h1`), títulos de card/seção em `h3` (`.card_territorio h3`, `.card_historia h3`, `#escrito_destaques h3`, `.cabecalho_carrossel_destaques h3`) e **preços** (`.preco_produto_destaque`) |
| `--fonte-rotulo` | IBM Plex Sans Condensed | 500, 600 | kickers (`.p_laranja`), nav (`header>nav>a`, `.header_minimalista nav a`), botões (`.texto_botao`), labels curtos de card/coluna (`.nome`, `.card_categoria p`, `.titulo_produto_destaque`, `.coluna_footer p`) e CTAs em caixa-alta (`.card a`, `.card_historia a`) |
| `--fonte-corpo` | Open Sans Condensed | 300, 700 | `body` (padrão, `font-weight:300`) — corpo/parágrafos/descrições/links de conteúdo herdam sem regra própria (`.desc`, `.card_historia p`, `.coluna_footer a`, `#rodape_footer p`, etc.) |

**Nota de pesos:** `Open Sans Condensed` **não tem peso 400** no Google Fonts
(só 300 e 700, confirmado na API `fonts.googleapis.com/css2`) — por isso
`--fonte-corpo` usa `font-weight:300` como "regular". Declarações existentes
com peso não carregado (ex.: `.desc{font-weight:200}`, `.card_categoria
p{font-weight:700}` em rótulo) renderizam no peso carregado mais próximo —
comportamento nativo do navegador, não corrigido (fora do escopo desta
migração, que não mexeu em `font-size`/`font-weight` além da troca de família).

## Lenis — CSS mínimo (Fase 5, 2026-07-10)
Logo depois do reset/fontes, um bloco `/* LENIS */` colado do
`node_modules/lenis/dist/lenis.css` (o projeto usa **um arquivo CSS só**,
sem imports de pacote — por isso colado em vez de importado). Classes que o
próprio Lenis adiciona/remove no `<html>` (`.lenis`, `.lenis-stopped`,
`.lenis-smooth`, `.lenis-autoToggle`) e seletores de suporte
(`[data-lenis-prevent]`). **Inerte em repouso** — só reflete o estado real
de scroll/parado do Lenis, não altera nada visualmente por si só. Ver
`arquitetura.md` pro provider (`<ReactLenis root>` em `App.jsx`) e o porquê
da sincronia com o Framer Motion.

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

## ✅ Responsividade (Fase 2) — CONCLUÍDA (breakpoint superior em 1280px)
**Situação (2026-07-09):** o mobile/tablet deixou de ser "desktop empilhado"
e ganhou uma **linguagem de design própria e coesa**, definida pelo Opus em
`../fazer/fase-2-redesign-mobile.md` e aplicada pelo Sonnet como spec fechada
(sem decisão de design do executor). Numa rodada seguinte, o breakpoint
superior subiu de `1024px` para **`1280px`** (o desktop original só cabia a
partir de ~1360px; entre 1025–1280px estourava) e o header/logo foi corrigido
para não haver overflow horizontal em nenhuma largura. O **desktop
(> 1280px) segue intocado**. **Verificação visual (5 viewports, por
screenshot via Docker+Playwright) fica a cargo do Opus.**

### Estrutura
O layout base continua construído com unidades de viewport (`vh`/`vw`) para
praticamente tudo — inclusive **posicionamento** (`position: relative` +
`top`/`left`) e **alturas fixas** de imagens — mas isso agora é só a camada de
**desktop (> 1280px)**, intocada (exceto a troca pontual de `font-size` fixo
por `clamp()`, já existente e mantida como está).

A responsividade vive **agrupada no final de `src/padrao/estilos/base.css`**, no bloco
`/* RESPONSIVIDADE (FASE 2) — NOVO SISTEMA DE DESIGN MOBILE */`, logo após
`/* FIM FOOTER */`, dentro de 3 breakpoints em cascata (nessa ordem no
arquivo — importa para a especificidade/ordem de sobrescrita):
- `@media (max-width: 1280px)` — tablet: já usa a linguagem nova (cabeçalho
  com barra laranja, gutter, ritmo de `64px`), mas com grades em transição
  (mais colunas que o mobile, menos que o desktop) — é a "ponte" até o
  desktop intocado acima de 1280px. Header: nav horizontal bem enxuta
  (`gap:1.25rem`, `font-size:0.85rem`) + logo com **largura explícita**
  (`width:110px;height:auto`, `90px` em `≤768px`) — a imagem original é
  308×130px; restringir só a altura (`height:36px`) não bastou (achado na
  conferência visual), então a largura é travada diretamente. **O logo do
  footer (`#logo_footer`, mesma imagem 308×130px) tinha o mesmo problema e só
  foi corrigido numa rodada seguinte** (2026-07-10): a restrição
  (`width:140px;height:auto` + `img{max-width:100%}`) existia só em
  `≤768px` e não cobria 769–1280px, causando overflow horizontal nessa
  faixa — agora a mesma regra também vive no bloco `≤1280px`.
- `@media (max-width: 768px)`  — mobile: Header vira hambúrguer; grades
  colapsam pro final (1 coluna na maioria, Destaques vira vitrine horizontal).
- `@media (max-width: 480px)`  — mobile pequeno: ajustes finos de gap/padding.

### O que é novo neste redesign (vs. a correção anterior)
- **Cabeçalho de seção padronizado:** título deixou de ser centralizado
  (`.titulo{justify-content:flex-start}`) e ganhou uma **barra laranja de
  assinatura** de `44×3px` via `::after` logo abaixo do `h2`/`h3` — aplicado
  em `.escrito_fav h2`, `.escrito_cat h2` (Categorias/Território/Histórias
  compartilham essa classe) e `#titulo_destaque h3` (Destaques, que não usa
  `.titulo`).
- **Cards unificados** (Favoritos, Território, Histórias): imagem em
  `aspect-ratio: 4/5` no tablet (retrato contido), `16/11`/`16/10` em telas de
  Território/Histórias no mobile; espaçamento consistente (`gap`/`margin`
  como tokens, não valores ad-hoc).
- **Destaques vira vitrine horizontal de verdade:** card de `62vw` (mobile) /
  `66vw` (mobile pequeno) / grade de 3 colunas no tablet — end do "quadrado
  vazio gigante" que existia com os cards antigos de `65vw`/`80vw`.
- **Hero:** botões ganham espaçamento próprio (`gap:14px` entre eles,
  `margin-top:28px` antes deles, `margin:0` nos botões) — zera o `margin:8px`
  herdado da regra base `button{}` que fazia os botões colarem um no outro e
  desalinharem do parágrafo.
- **Tablet como ponte:** Favoritos/Categorias/Histórias com 3 colunas,
  Território/Destaques com 2–3, todas já na linguagem nova — ao passar de
  1280px a página some e vira o desktop atual, sem nenhum resquício do
  sistema mobile.
- Header: menu hambúrguer (`#botao_hamburguer`, só visível `≤768px`) → drawer
  lateral (`#drawer_menu` + `.overlay_menu`, estado `useState` em
  `Header.jsx` + Framer Motion `AnimatePresence`) — inalterado desde a
  primeira implementação da Fase 2; `display:none` por padrão, só aparece
  dentro do `@media (max-width: 768px)`.
- Títulos gigantes (Hero `h1` 4rem, Banner `h1` 5rem, `#titulo_principal`
  4rem, `h2` de seção 2.6rem) continuam usando `font-size: clamp(mínimo,
  fluido, MÁXIMO-ATUAL)` **diretamente nas regras de base** (fora de media
  query, terceiro valor = tamanho de desktop) — não fazem parte do bloco de
  responsividade e não foram tocados nesta rodada.

**Processo de verificação:** o Sonnet aplicou o CSS exato da spec (não há
decisão de design a validar por leitura de código — só fidelidade à
instrução, conferida por `diff`) e rodou `vite build`/`oxlint`. A conferência
visual real (390/768/1024/1280/1440px, por screenshot) é feita pelo Opus, que
tem um pipeline Docker+Playwright montado para isso — o Sonnet não tem esse
pipeline disponível neste ambiente (falta Chromium funcional / sem `sudo`
para instalar libs de sistema).

## 🟡 Animações (Fase 3) — REFEITA do zero (2026-07-09) + reforçada (2026-07-10)
**Situação:** a 1ª versão (variants + `whileInView`) tinha um bug estrutural
crítico — imagens presas em `opacity:0` — e não atendia ao pedido do dono de
animação sincronizada com o scroll. Foi **descartada e reescrita** a partir
de `../fazer/fase-3-refazer-animacoes-e-header.md`, commitada (`b014deb`) e
**aprovada nesse ponto** pela conferência visual do Opus (imagens ok, header/
Banner ok, desktop >1280px ok). Essa conferência apontou **dois problemas**
corrigidos numa rodada seguinte (`../fazer/fase-3-correcao-overflow-e-mais-animacao.md`,
2026-07-10): overflow do logo do footer em 769–1280px e animações de entrada/
saída pouco perceptíveis. **Ainda não reconferido visualmente** (mesma
limitação de sempre — sem Chromium funcional neste servidor); ver nota de
metodologia de screenshot no fim.

### Regra estrutural (por que a v1 quebrou, e como a v2 evita)
**Um único elemento `motion` por unidade** (o card inteiro, ou o bloco de
texto de uma seção). Imagens e textos são **filhos DOM comuns** — nunca
`motion` aninhado com estado inicial escondido próprio. A v1 tinha `<img>`
como `motion.img` dentro de um `<div className="zoom_imagem">` comum: o
`whileInView` do avô não propagava por dentro desse `<div>` sem `variants`
próprio do jeito esperado, e a imagem ficava presa em `opacity:0` pra sempre.
Não existe mais NENHUM `motion.img`/`motion.a` no projeto (conferido por
`grep`) — hover de imagem agora é **CSS puro** (ver abaixo), não Framer.

### `src/padrao/lib/Revela.jsx` + `src/padrao/lib/useEstiloRevela.js` — reveal ligado ao scroll (não mais duração fixa)
O cálculo de opacity/y a partir de um progresso 0→1 (janela de movimento +
amplitude) vive em **`src/padrao/lib/useEstiloRevela.js`** (arquivo à parte desde
2026-07-10, só pra não misturar hook com componente no mesmo módulo e evitar
o aviso de Fast Refresh do oxlint). `Revela.jsx` importa de lá.
- **Janela de movimento** (constantes em `useEstiloRevela.js`): entrada nos
  primeiros **33%** da passagem de scroll (`ASSENTA_INICIO=0.33`), plateau
  assentado (`opacity:1` fixo) até **70%** (`ASSENTA_FIM=0.70`), saída nos
  30% finais. Plateau mais estreito que a v2 original (era `0.28→0.72`) —
  entrada/saída ficam perceptíveis em mais pontos da rolagem (ajuste
  2026-07-10, pedido do dono: "poucas animações de entrada e saída").
- **`Revela`** — unidade com scroll próprio (seções/blocos isolados):
  `useScroll({target: ref, offset: ["start end", "end start"]})` fornece o
  progresso, mapeado em `opacity` (`0→1→1→0`) e `y` (entra `distancia`px de
  baixo → assenta em 0 → sai `-saida`px pra cima). O "tempo" da animação é a
  **distância de scroll**, não uma duração em segundos — por isso é mais
  lento/scrubado e bidirecional de graça (subir reverte a mesma curva).
  Default `distancia=108` (blocos de título/texto de seção — usado
  explicitamente com esse valor por Banner e as duas colunas do Footer).
- **`RevelaComProgresso`** — elementos que reaproveitam um `progresso`
  (MotionValue já calculada pelo container via `useProgressoSecao`, em
  `src/padrao/lib/useProgressoSecao.js`): cards de um grid OU elementos de texto
  individuais (eyebrow/título/parágrafo em Lançamento). Mapeia uma fatia
  deslocada do progresso (`atraso`) nos mesmos `opacity`/`y` — cada unidade
  assenta em leve sequência, mas o atraso é uma fatia do MESMO progresso de
  scroll da seção, não um delay de tempo. Default `distancia=84` (cards de
  grade — Favoritos/Território/Destaques/Histórias usam o default; títulos
  de seção e Categorias sobrescrevem explicitamente, ver abaixo).
- **Amplitude por camada** (`distancia`/`saida` em px, ajuste 2026-07-10):
  - Blocos de título/texto de seção: **100–108** (títulos das 5 seções em
    grade, olho/título de Lançamento desconto/especial, imagem de
    Lançamento desconto, Banner, colunas do footer).
  - Cards de grade (fotos): **84** (default).
  - Cards de grade pequenos (chips de Categorias): **72**.
  - Parágrafo/CTA de Lançamento: **80/72**.
  - Rodapé do footer (`#rodape_footer`): **64**.
  - **Saída (`saida`)** é um parâmetro **independente** da entrada (não é
    mais `distancia*0.4`) — default **80px**, usado em quase tudo; Lançamento
    usa **64px** no botão. Alvo do dono: saída bem mais visível que a v2
    original (que só subia ~16-22px).
- **`prefers-reduced-motion` — atenção especial (era o pior bug da v1):**
  valores de `useScroll`/`useTransform` ligados direto num `style` são um
  *bind* de scroll, não uma "animação" via `animate`/`whileHover` — o
  `<MotionConfig reducedMotion="user">` **não os desliga sozinho**. Por isso
  `useEstiloRevela` (usado por `Revela`/`RevelaComProgresso` e pelo parallax
  do Hero) chama `useReducedMotion()` e, se ligado, **ignora** o valor de
  scroll e usa `opacity:1;y:0` fixo — nada some nem fica parcialmente
  visível.
- **Transição seção-a-seção:** como cada seção calcula seu progresso de
  forma independente e faixas de seções vizinhas se sobrepõem (uma ainda
  "saindo" enquanto a próxima já está "entrando"), o efeito é de uma tela
  dando lugar à outra — não itens isolados pipocando por cima do conteúdo.
- Aplicado nas 9 seções que não são o Hero: título de cada seção com
  `Revela`/`RevelaComProgresso` (`atraso=0`, janela de entrada padrão
  `0.33`), cada card do grid com `RevelaComProgresso`.
- **Cards de grade assentam bem antes do centro da seção (correção
  2026-07-10):** achado no review ao vivo do dono — em grades grandes
  (Categorias, 12 cards) o atraso por índice (`base + index*passo`) crescia
  sem normalizar pela contagem, e o último card só assentava perto de
  `0.685` do progresso da seção — mas a seção fica centralizada em `~0.5`,
  então no meio da tela o canto inferior direito ainda aparecia esmaecido.
  Fix (só nos 5 componentes de grade — títulos/Lançamento **não** usam
  isso):
  - **`atrasoCard(index, qtd)`** (`useEstiloRevela.js`) — `0.03 +
    (index/(qtd-1)) * 0.06`. O **último** card fica no máximo **~0.09** à
    frente do primeiro, **independente da contagem** (3 ou 12 cards
    terminam praticamente juntos) — substitui o antigo `base + index*passo`,
    que crescia sem limite.
  - **`larguraEntrada`** — novo parâmetro opcional de
    `useEstiloRevela`/`RevelaComProgresso` (default `0.33`, o ritmo das
    seções/títulos, **inalterado**). Os 5 componentes de grade passam
    `LARGURA_ENTRADA_CARD = 0.20` só nos cards — janela de entrada mais
    curta, exclusiva de cards de grade.
  - Pior caso (Categorias, 12 cards): último card assenta em `0.09 + 0.20 =
    0.29` do progresso da seção — bem antes do centro, com folga. Amplitude
    (`distancia`/`saida`) dos cards não mudou, só o *timing*.
- **Coreografia por elemento — Lançamento desconto/especial** (2026-07-10):
  deixaram de ser um bloco rígido (`Revela` único envolvendo
  olho+título+parágrafo+botão) e passaram a usar `useProgressoSecao` (ref na
  `<section>`) + uma `RevelaComProgresso` **por elemento** (olho → título →
  parágrafo, `atraso` 0/0.05/0.10) — montam em sequência na entrada e
  desmontam na saída. O botão (`BotaoCortado`, já um `motion.button`) recebe
  o reveal via prop `style` (calculada com `useEstiloRevela` direto, `atraso
  0.15`) em vez de um wrapper — `BotaoCortado` aceita `style` desde então.
  Cada texto virou sua própria tag motion (`as="p"`/`as="h1"`) mantendo a
  contagem de filhos diretos idêntica à anterior (preserva `gap:10px` de
  `#container_texto` e o fluxo de `#texto` sem wrapper extra).

### Hero — entrada por sequência de load + parallax (não scroll-reveal)
Eyebrow → título → parágrafo → botões entram em sequência **no carregamento**
(`heroStagger`/`heroItem` em `src/padrao/lib/motion.js`, `initial`/`animate` — não
`whileInView`/scroll — é a 1ª coisa vista, não há o que "revelar ao rolar").
Amplitude reforçada em 2026-07-10 (`y:20→32`, `duration:0.7→0.8s`,
`staggerChildren:0.12→0.14`) pra casar com o ritmo mais perceptível do
reveal ligado ao scroll nas demais seções — continua 100% visível já no
primeiro paint (não depende de scroll).
O `background-image` que antes estava direto em `.hero` foi para uma camada
`.hero_bg` (mesmo asset/`size`/`position` — repouso idêntico ao original),
deslocada em `y` via `useScroll`+`useTransform` (parallax leve, só enquanto o
Hero está em cena) — também com fallback pra `prefers-reduced-motion`.
`.hero` ganhou `overflow:hidden` pra conter esse deslocamento.

### Hover de imagem — CSS puro (não Framer)
`.zoom_imagem{overflow:hidden;line-height:0}` + `.zoom_imagem
img{display:block;transition:transform}` + regra `:hover` escopada em
`@media (hover:hover) and (pointer:fine)` (evita "hover preso" em telas de
toque): zoom sutil (`scale(1.03)`) na imagem, deslize (`translateX(6px)`) no
CTA/seta, disparados pelo hover do **card inteiro** (`.card:hover .zoom_imagem
img`, etc.), não só da imagem. `display:block`+`line-height:0` no wrapper
também fecham o espaço fantasma que `<img>` (inline por padrão) deixa embaixo
dentro de um `<div>` comum — era a causa do desktop ter ficado uns +4px mais
alto que o original na v1 (achado na conferência de pixel-diff do Opus).

### Botão cortado com preenchimento (`src/padrao/componentes/BotaoCortado.jsx`)
Sem mudança desde a v1 — não fazia parte do bug (não é imagem, não depende de
propagação de `whileInView`). Reutilizado no Hero (masculino/feminino),
Lançamento desconto e Lançamento especial: `<button>` real com uma camada
(`.preenchimento_botao`, `scaleX` 0→1 no hover) que cresce por trás do texto,
recortada pelo `clip-path` diagonal da marca (regra base, intocada).

### Header — 2 estados, SEMPRE presente (2026-07-10 — substitui o modelo de 3 estados)
O dono achou o modelo anterior (completo/escondido/compacto) bugado — "some
ao rolar", "não fica claramente minimalista". Novo design: **2 estados**,
header **nunca some**:
- **completo** — no Hero/topo (`y < limiar`): o `<header>` original, cheio,
  pixel-idêntico ao original em repouso.
- **minimalista** — fora do Hero (`y ≥ limiar`): barra reduzida, **sempre
  visível** (não some ao rolar pra baixo — essa era a "3ª perna" removida).

**Arquitetura — 2 elementos físicos independentes**, não 1 elemento trocando
de classe (era assim no modelo anterior):
1. **`<header>`** — sempre renderizado, **sem nenhuma classe/estilo
   condicional**. Nunca vira `fixed`; no Hero/topo é pixel-idêntico ao
   original, e ao rolar só sai de vista como qualquer elemento normal em
   fluxo (nunca é removido do fluxo depois de montado). Isso elimina de vez
   a causa do "pulo" que o modelo anterior tinha (e a necessidade do
   espaçador/`.header_espacador` que aquela correção introduzira — **removido
   nesta rodada**, não é mais usado): não existe mais nenhuma transição
   estático↔fixed no próprio `<header>` pra causar deslocamento.
2. **`.header_minimalista`** — elemento **separado**, `position:fixed` desde
   sempre (nunca ocupa fluxo, então seu mount/unmount não desloca nada).
   `height:60px`, fundo preto sólido + `box-shadow:0 2px 12px rgba(0,0,0,.35)`
   (legibilidade sobre qualquer seção), logo pequeno (`80px`, `height:auto`)
   à esquerda, nav condensada à direita (mesmos links de `data/navegacao`,
   `font-size:0.8rem`, `gap:1.5rem`, cinza claro `#afb3ae` com hover
   `var(--laranja)`). Monta/desmonta via `AnimatePresence`
   (`initial/animate/exit`: `opacity 0→1`, `y -12→0`, `~0.3s`) só quando
   `estado==="minimalista"`.
   - **Mobile `≤768px`:** nav vira hambúrguer (`.header_minimalista nav{
     display:none}`, `.botao_hamburguer{display:flex}`) — a minimalista tem
     **seu próprio botão** (compartilha o mesmo drawer/overlay do header
     completo, ver abaixo).

`Header.jsx`: `useScroll` (scroll global) + `useMotionValueEvent` decide o
`estado` só pela **posição** (`y`), não mais pela direção do scroll (o
modelo de 3 estados usava direção pra escolher entre "escondido"/"compacto";
sem essa 3ª opção, não precisa mais rastrear direção). **Histerese no
limiar** (mantida): `ENTRA_MINIMALISTA=0.7×innerHeight` (só entra em
minimalista acima disso) e `VOLTA_COMPLETO=0.5×innerHeight` (só volta a
completo abaixo disso) — zona morta entre os dois evita piscar numa
micro-rolagem perto do limiar.

**`prefers-reduced-motion`:** a troca de estado **continua acontecendo**
(completo no Hero, minimalista no resto) — **diferente** do modelo anterior,
que forçava sempre "completo" e nunca trocava. Só a transição de
entrada/saída da minimalista vira instantânea (`duration:0`); o `<MotionConfig
reducedMotion="user">` global cobre isso.

**Hambúrguer virou classe, não mais id** (`.botao_hamburguer`, era
`#botao_hamburguer`) — precisa suportar **2 instâncias** (completo e
minimalista) que abrem o **mesmo** `#drawer_menu`/`.overlay_menu`
compartilhado (`AnimatePresence`, inalterado desde a Fase 2, controlado por
um único `menuAberto` no componente pai). `.header_minimalista` usa
`z-index:40`, abaixo do overlay/drawer (`90`/`100`).

**Logo clicável → volta ao topo (2026-07-10):** o `<img>` do logo, **nos 2
estados**, ficou dentro de um `<button class="logo_home_botao" aria-label=
"Início — voltar ao topo">`. Clique → `lenis.scrollTo(0)` (`useLenis()` de
`lenis/react`, Fase 5) com fallback `window.scrollTo({top:0})` quando o
Lenis não está ativo (`useLenis()` retorna `undefined` — reduced-motion,
`App.jsx` nem monta `<ReactLenis>` nesse caso). **Efeito colateral no CSS:**
o `<img>` deixou de ser filho **direto** de `<header>` — o seletor
`header > img` virou **`header img`** (descendente) nas 3 declarações
(base, `≤1280px`, `≤768px`); `.header_minimalista img` já era descendente,
sem mudança.

**Fix do logo cortado (mesmo dia, rodada seguinte):** a 1ª versão do
`.logo_home_botao` usava `display:block;line-height:0` (pensando no padrão
de `.zoom_imagem`) — mas ali o `img` filho **também** ganha `display:block`
explícito; em `header img`/`.header_minimalista img` isso nunca foi
definido (a `<img>` continua `inline`), então o `line-height:0` do wrapper
**colapsava a caixa do botão** (medido: 66px de altura pra uma imagem de
130px) e cortava o logo — visível no completo, mais sutil no minimalista.
**Fix:** `.logo_home_botao{display:contents}` (sem `line-height`) — o botão
**não gera caixa própria**, a `<img>` volta a se comportar como filha
**direta** do header (exatamente o que `header img`/`.header_minimalista
img` já esperavam antes do wrapper existir), sem nada colapsando/recortando.
`cursor:pointer` (propriedade herdada) continua chegando na `<img>` — que é
quem de fato pinta a caixa e recebe o cursor visualmente.

**Logo maior que a barra, sem ser o tamanho natural (2026-07-10 — 3 rodadas
de ajuste fino):** trajetória do feedback do dono — `80px` (pequena) →
`108px` (ainda pequena) → tamanho **natural** do completo, `width:auto`,
~308×130px (**grande demais**) → tamanho final: **"um pouco maior que o
header pequeno"** (a barra de 60px), sem chegar ao natural. Valores atuais
de `.header_minimalista img`:
- **`>1280px`:** `width:170px` (`height:auto`, ~72px de altura — pouco
  acima dos 60px da barra), `top:4px` (reduzido de `20px`/`12px` das
  rodadas anteriores — pedido final do dono: "arredar ela um pouco pra
  cima", tamanho mantido).
- **`≤1280px`:** `width:110px`, `top:18px` — não tocado desde que foi
  criado (mesmo valor que o completo usa nesse range; o completo vira
  `position:static` sem overlap aqui, mas a minimalista **mantém** o
  próprio mecanismo de sobreposição em qualquer largura).
- **`≤768px`:** `width:90px`, `top:14px` — idem, não tocado.
- Ordem descendente mantida: desktop (`170`) > tablet (`110`) > mobile
  (`90`).

**Mecanismo de sobreposição** (igual ao logo do header completo,
`header > img{position:relative;top:2.9vh;z-index:1}`, que já transborda a
barra de 12vh mesmo a imagem sendo mais alta que ela): `position:relative` +
`top` + `z-index:1` empurra o logo pra baixo do fluxo normal, ultrapassando
a borda inferior da barra de 60px e ficando por cima do conteúdo abaixo —
`.header_minimalista` não tem `overflow:hidden`, então nada recorta.
Qualquer transbordo por CIMA da barra fica invisível de graça — a barra é
`position:fixed;top:0`, já é o próprio topo da viewport, não há como vazar
acima disso.

### Banner — estático em repouso, entrada "blur por palavra" (2026-07-10)
O marquee (avaliado numa rodada anterior) foi **removido por completo** — o
dono pediu de volta o título estático original, e o estado **assentado
continua sendo exatamente esse** (2 linhas centralizadas via `<br/>`, mesma
tipografia). O que mudou (2026-07-10, pedido do dono: reproduzir o preset
`blur` do `TextEffect` de motion-primitives, **sem instalar a lib**) foi
**só a entrada**: `Banner.jsx` não usa mais `Revela` (fade+subida em bloco);
a frase quebra em palavras (`LINHA_1`/`LINHA_2`, array de strings no próprio
componente — texto não mudou, só a forma de renderizar), cada palavra um
`motion.span.palavra_banner` (`display:inline-block`, nova regra em
`src/padrao/estilos/base.css`) com espaço normal (quebrável) entre elas — preserva o wrap
natural em telas estreitas. Variants `escondido` (`opacity:0,
filter:blur(10px), y:10`) → `visivel` (`opacity:1, filter:blur(0px), y:0`)
com `staggerChildren:0.06` no `motion.h1` pai. Disparo por
`whileInView="visivel"` (não é o mecanismo scroll-scrubbed contínuo das
outras seções — é um stagger discreto, sem `once`, então **re-dispara** ao
sair/voltar da viewport). `prefers-reduced-motion`: `initial` já nasce
`"visivel"` (nítido desde o primeiro paint). `#texto_banner` virou uma
`<div>` simples (só o `motion.h1` dentro, sem wrapper motion extra).

### Destaques — Horizontal Scroll Carousel (Fase 4) + carrossel arrastável (mobile) — EXCEÇÃO à regra de ouro
**Única seção do projeto que muda no desktop >1280px** (exceção pontual
aprovada pelo dono — ver `convencoes.md`). `src/paginas/home/Destaques.jsx` tem
**3 modos** (`hijack`/`arrastavel`/`estatico`, ver abaixo — eram 2 antes de
2026-07-10), escolhidos em runtime (não só CSS) por um hook local,
`useModoCarrossel()`: `window.matchMedia("(pointer: fine) and (min-width:
1281px)")` + `useReducedMotion()`. Estado inicial (antes do `matchMedia`
resolver) já nasce correto pro caso reduced-motion (síncrono) e cai em
`"arrastavel"` nos demais — nunca invisível antes do JS medir.

**Carrossel isolado em `src/paginas/home/CarrosselDestaques.jsx` (fix 2026-07-10)
— por quê:** na 1ª versão, o `useScroll({target: refCarrossel})` rodava
dentro do próprio `Destaques` — mas o **1º render de `Destaques` é sempre o
fallback** (`refCarrossel.current=null`); quando o modo virava carrossel
depois do mount, o Framer **não re-vinculava** aquele `useScroll` a um alvo
que só passou a existir depois. Resultado: pin e medição do deslocamento
certos, mas `scrollYProgress` travado em `0` pra sempre → trilho nunca
andava. Fix: `CarrosselDestaques` só é **montado** quando `Destaques` já
decidiu `carrossel=true` — como componente novo, seu `<section ref>` **já
existe no 1º render dele**, então `useScroll` inicializa vinculado ao alvo
certo desde o início. `Destaques.jsx` ficou só com a decisão de modo
(`useModoCarrossel`) e o fallback; todo o mecanismo do carrossel (ref,
`useScroll`, `useTransform`, medição, trilho) mora em `CarrosselDestaques.jsx`.

**Modo carrossel** (`pointer:fine` + `>1280px` + sem reduced-motion) —
mecanismo de referência do dono (hover.dev/Framer Motion), traduzido pro CSS
do projeto (sem Tailwind):
- `<section className="destaques destaques_carrossel">` → `.destaques_pin`
  (`position:sticky;top:0;height:100vh;overflow:hidden`, fica pinada
  enquanto o usuário rola a seção) → `.trilho_carrossel` (`motion.div`,
  `display:flex`), `x` ligado a `useScroll({target: refDaSeção})` **sem
  offset** (progresso 0→1 cobre a seção inteira) via `useTransform`.
- **Altura da seção proporcional ao deslocamento (polimento 2026-07-10, tira
  o "travado/duro"):** era `height:300vh` fixo — com um deslocamento real de
  só ~446px (1440px), a razão rolagem↔movimento ficava ~4:1 (rolava muito,
  o trilho andava pouco). Agora a altura é **calculada em runtime**:
  `calc(100vh + deslocamento×FATOR_ALTURA_PIN px)`, **`FATOR_ALTURA_PIN=1.15`**
  (reduzido de `1.35` numa rodada seguinte — feedback do dono: "mais
  rápido"), aplicada via `style` inline no `<section>`
  (`CarrosselDestaques.jsx`) — a classe CSS `.destaques.destaques_carrossel`
  virou só `min-height:100vh` (piso antes da 1ª medição).
- **Movimento suavizado:** o `x` era derivado direto de `scrollYProgress`
  (1:1, rígido). Agora passa por `useSpring(scrollYProgress,
  {stiffness:200, damping:26, mass:0.3})` (ajustado de `{140,28,0.4}` —
  feedback do dono: "mais limpo/mais rápido", segue a rolagem com menos
  atraso perceptível) antes do `useTransform` — desliza fluido mas
  responsivo, sem oscilar (damping alto o bastante pra nunca passar do alvo
  e voltar). `.destaques_pin` mantém `overflow:hidden` pra qualquer
  overshoot da mola no assentamento não vazar como scroll horizontal.
- **Folga no fim do pin (o trilho não termina exatamente junto com o fim da
  seção):** achado do dono — "o carrossel acaba bem quando o último produto
  é lançado". Causa: o `x` mapeava `[0,1] → [0,-deslocamento]` no MESMO
  intervalo do progresso do pin inteiro, então o trilho sempre terminava de
  andar exatamente no fim do pin. Fix: `FIM_MOVIMENTO=0.82` — o
  `useTransform` mapeia `[0, FIM_MOVIMENTO] → [0,-deslocamento]`; do
  `FIM_MOVIMENTO` até `1` do progresso o `x` fica **parado** em
  `-deslocamento` (clamp padrão do `useTransform` além do último
  breakpoint) — sobra ~18% do pin como folga com o último card já
  assentado antes de soltar o scroll.
- **`x` por medição real** (não `%` fixo — a referência do dono usa
  `["1%","-95%"]`, calibrado pra 7 cards de 450px, que deixaria buraco ou
  cortaria com 5 cards de outra largura): `useEffect` mede `trilho.
  scrollWidth - viewport.clientWidth` (recalcula no `resize`) e usa isso em
  px como deslocamento máximo (mesmo valor usado no cálculo da altura
  acima). Trilho tem `padding-left:4vw` (respiro do 1º card — esse lado o
  `scrollWidth` conta normalmente).
- **Folga de "meio card" no fim (2026-07-10 — 2 tentativas):** o último card
  parava exatamente encostado na borda direita (`folgaDireita=0`), o dono
  achou "colado demais". **1ª tentativa (não funcionou):**
  `padding-right:170px` no `.trilho_carrossel` — **quirk de container flex**:
  `scrollWidth` **não inclui o end-padding** quando o conteúdo transborda,
  então o padding nunca entrava na conta do `deslocamento` (medido). **Fix
  robusto (atual):** a folga é somada **direto no JS**, sem depender do CSS
  refletir nada — `setDeslocamento(Math.max(scrollWidth − clientWidth, 0) +
  FOLGA_FIM)`, `FOLGA_FIM=170` (metade dos `340px` do `.card_carrossel`,
  constante em `CarrosselDestaques.jsx`). `x` vai de `0` a
  `-(deslocamento medido + 170)` — o `padding-right` foi **removido** do
  CSS (não fazia efeito). Como a altura da seção é proporcional a esse
  mesmo `deslocamento`, o pin fica levemente mais alto (`170×
  FATOR_ALTURA_PIN`) pra acomodar a folga — efeito colateral esperado.
- **Cards são os da loja** (`.card_produto` + `.card_carrossel`, largura fixa
  `340px`, novo) — reaproveita `.zoom_imagem`/`.imagem_produto_destaque`/
  `.titulo_produto_destaque`/`.preco_produto_destaque` (mesmo hover-zoom,
  mesma imagem+título+preço); **não** é o card-placeholder (imagem de fundo +
  backdrop-blur) da referência, que era só demo.
  - Título ("OS MAIS PROCURADOS/OS MAIS VENDIDOS") fica **fora** do trilho,
    numa linha própria dentro do `.destaques_pin` (`flex-direction:column`,
    diferente da referência que é uma única linha — adaptação necessária pra
    caber o título) — sempre visível durante o pin, sem reveal próprio (o
    movimento da seção agora é o carrossel em si). Setas `←→`
    (`#setas_destaques`) **ocultadas** neste modo.
- `will-change:transform` no trilho (`.trilho_carrossel`) — só `transform`
  é animado, igual ao resto do projeto.

**3 modos, não mais 2 (2026-07-10):** `useModoCarrossel` (`Destaques.jsx`)
passou a devolver `"hijack" | "arrastavel" | "estatico"` em vez de um
boolean. Causa: o antigo fallback único de swipe nativo (`overflow-x:auto`+
snap) **parou de funcionar no mobile** depois da Fase 5 — o **Lenis**
intercepta o gesto horizontal de containers roláveis aninhados que não
tenham `data-lenis-prevent`, então arrastar virava scroll vertical
suavizado em vez de mover os cards. Agora:

**Modo `arrastavel`** (touch/tablet/ponteiro grosso, `≤1280px` OU pointer
grosso em qualquer largura, **sem** reduced-motion) —
**`src/paginas/home/CarrosselArrastavel.jsx`** (novo), sem 300vh/pin, **não**
ligado a scroll nenhum:
- Trilho `motion.div` com **`drag="x"`** (Framer Motion) —
  `dragConstraints={{left:-maxArrasto, right:0}}`, `maxArrasto` **medido**
  (`trilho.scrollWidth − container.clientWidth`, recalcula no `resize` —
  mesmo espírito da medição do hijack, não chutado). `dragElastic:0.12`
  (borracha leve nas pontas) + `dragMomentum` (inércia de verdade).
  `.trilho_arrastavel{cursor:grab}` / `:active{cursor:grabbing}`.
- **Coexistência com o Lenis (crítico):** `.trilho_arrastavel_container`
  tem `data-lenis-prevent` (o Lenis não rouba o gesto) e
  `.trilho_arrastavel` tem **`touch-action:pan-y`** — o navegador manda o
  gesto horizontal pro drag e o vertical pro scroll normal da página.
- **Sem competir com gestos nativos (fix 2026-07-14):** dono relatou arraste
  "travado" no mobile. Causa: começar o drag em cima de texto
  (`.titulo_produto_destaque`/`.preco_produto_destaque`) podia disparar
  seleção nativa/long-press, e em cima da `<img>` o "fantasma" nativo de
  arrastar imagem — competindo com o `drag="x"` do Framer no meio do gesto.
  Fix: `.trilho_arrastavel{user-select:none;-webkit-user-select:none;
  -webkit-touch-callout:none}` + `.trilho_arrastavel img{-webkit-user-drag:
  none;user-select:none}` (escopado ali, não em `.imagem_produto_destaque`,
  pra não afetar `hijack`/`estatico`).
- Reaproveita `.card_produto`/`.zoom_imagem`/`.imagem_produto_destaque`/
  `.titulo_produto_destaque`/`.preco_produto_destaque` (mesmo hover-zoom).
  `.card_arrastavel{width:38vw}` (base, cobre tablet/ponteiro grosso largo)
  → **`78vw`** em `≤768px` (mobile — "espia" o próximo card, convida o
  arraste). Setas `←→` mantidas (decorativas, ajudam a sinalizar "isso é
  arrastável" — diferente do hijack, que as oculta porque ali o trilho já
  se move sozinho).
- `.destaques.destaques_arrastavel{display:block;...}` é regra
  **incondicional** (fora de media query) — o modo pode ativar em qualquer
  largura (ponteiro grosso numa janela larga também cai aqui), então não dá
  pra depender só do `≤1280px` pra sair do layout flex/vh do desktop.

**Modo `estatico`** (reduced-motion, em qualquer largura) — o fallback
acessível original: `#produtos_destaques` + `RevelaComProgresso` por card
(mesmo JSX de antes da Fase 6, só o branch renomeado), **sem drag,
sem inércia**:
- **`≤1280px`:** grid vira swipe/snap CSS puro (`grid-auto-flow:column;
  overflow-x:auto;scroll-snap-type:x mandatory`), card `38vw` → `62vw`
  (`≤768px`) → `66vw` (`≤480px`) — 100% CSS, sem JS de gesto, sempre
  navegável por teclado/touch nativo mesmo com `data-lenis-prevent`
  nenhum (não precisa, é scroll vertical de página vs. scroll horizontal
  de grid, sem conflito de gesto).
- **`>1280px`** (reduced-motion no desktop, caso raro): grade estática de 5
  colunas original (regra base, sem media query) — sem scroll nem hijack,
  todos os cards visíveis de uma vez.
- **Amplitude do reveal por card reforçada** (`distancia` 84→**120**,
  `saida` 80→**96**, no `RevelaComProgresso`) — review do dono: "os mais
  vendidos com pouca animação" (rodada anterior à Fase 6). `RevelaComProgresso`
  já força `opacity:1;y:0` fixo sozinho quando reduced-motion está ligado,
  então este branch é estático de fato independente da amplitude
  configurada.

## Regras gerais de animação (valem pra tudo acima)
- Biblioteca: `motion` (Framer Motion, import de `"motion/react"`).
- **Só `transform`/`opacity`** são animados (performático, sem reflow — nunca
  `width`/`height`/`top`/`left`/`margin`). **Única exceção: o Banner**
  (acima) também anima `filter:blur()` — autorizado pelo dono só ali, por
  ser entrada única (não loop) que sempre assenta em `blur(0)`.
- Estado assentado de qualquer reveal = o layout atual, sem exceções (o
  Banner segue estático em repouso — só a entrada ganhou o efeito de blur
  por palavra).
- `prefers-reduced-motion`: `<MotionConfig reducedMotion="user">` em
  `App.jsx` cobre `animate`/`whileHover`/etc.; **valores de
  `useScroll`/`useTransform` ligados direto em `style` (reveal, parallax)
  precisam de checagem manual própria com `useReducedMotion()`** — não são
  cobertos pelo `MotionConfig` sozinho. Todo componente que usa
  `useTransform` no projeto (`Revela.jsx`, `Hero_Home.jsx`) faz essa
  checagem; ao criar um componente novo com scroll-linked motion, replicar
  o padrão.

### ⚠️ Nota de metodologia para a conferência visual
O reveal depende da posição de scroll de cada seção em relação à viewport no
momento da captura. Se o pipeline de screenshot redimensiona a viewport pra
caber a página inteira de uma vez ("full page screenshot"), o cálculo de
progresso de cada seção pode não refletir o estado assentado pretendido.
Recomendado: conferir seção por seção, rolando até cada uma com a viewport em
tamanho normal, em vez de um screenshot de página inteira de uma vez.
