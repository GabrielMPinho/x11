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

A responsividade vive **agrupada no final de `src/index.css`**, no bloco
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

### `src/lib/Revela.jsx` + `src/lib/useEstiloRevela.js` — reveal ligado ao scroll (não mais duração fixa)
O cálculo de opacity/y a partir de um progresso 0→1 (janela de movimento +
amplitude) vive em **`src/lib/useEstiloRevela.js`** (arquivo à parte desde
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
  `src/lib/useProgressoSecao.js`): cards de um grid OU elementos de texto
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
(`heroStagger`/`heroItem` em `src/lib/motion.js`, `initial`/`animate` — não
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

### Botão cortado com preenchimento (`components/BotaoCortado.jsx`)
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
`src/index.css`) com espaço normal (quebrável) entre elas — preserva o wrap
natural em telas estreitas. Variants `escondido` (`opacity:0,
filter:blur(10px), y:10`) → `visivel` (`opacity:1, filter:blur(0px), y:0`)
com `staggerChildren:0.06` no `motion.h1` pai. Disparo por
`whileInView="visivel"` (não é o mecanismo scroll-scrubbed contínuo das
outras seções — é um stagger discreto, sem `once`, então **re-dispara** ao
sair/voltar da viewport). `prefers-reduced-motion`: `initial` já nasce
`"visivel"` (nítido desde o primeiro paint). `#texto_banner` virou uma
`<div>` simples (só o `motion.h1` dentro, sem wrapper motion extra).

### Destaques — Horizontal Scroll Carousel (Fase 4, 2026-07-10) — EXCEÇÃO à regra de ouro
**Única seção do projeto que muda no desktop >1280px** (exceção pontual
aprovada pelo dono — ver `convencoes.md`). `components/Destaques.jsx` tem
**2 modos**, escolhidos em runtime (não só CSS) por um hook local,
`useModoCarrossel()`: `window.matchMedia("(pointer: fine) and (min-width:
1281px)")` + `useReducedMotion()`. Estado inicial é sempre o **fallback**
(nunca invisível antes do JS medir).

**Carrossel isolado em `components/CarrosselDestaques.jsx` (fix 2026-07-10)
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

**Modo fallback** (≤1280px, ponteiro grosso/touch, ou reduced-motion) —
estrutura de sempre (`#produtos_destaques`, `RevelaComProgresso` por card),
**sem 300vh nem pin**:
- **Tablet (`≤1280px`) deixou de ser grade estática de 3 colunas** — agora é
  o mesmo swipe/snap do mobile (`grid-auto-flow:column;overflow-x:auto;
  scroll-snap-type:x mandatory`), card `38vw` (ponte até `62vw`/`66vw` do
  mobile) — o dono pediu a escolha binária "carrossel OU swipe nativo", sem
  grade estática no meio. `≤768px`/`≤480px` inalterados.
  - Em reduced-motion **>1280px**, isso cai na **grade estática de 5
    colunas original** (regra base, sem media query) — sem scroll nem
    hijack, todos os cards visíveis de uma vez, atende a exigência de
    acessibilidade com folga.
- **Amplitude do reveal por card reforçada só aqui** (`distancia` 84→**120**,
  `saida` 80→**96**, no `RevelaComProgresso`) — review do dono: "os mais
  vendidos com pouca animação" era efeito colateral do ajuste de stagger da
  rodada anterior (sutil demais nesta seção). O *timing* (`atrasoCard`/
  `LARGURA_ENTRADA_CARD`, último card assentando bem antes do centro da
  seção) **não mudou** — só a distância percorrida.

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
