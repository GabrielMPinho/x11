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
  conferência visual), então a largura é travada diretamente.
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

## 🟡 Animações (Fase 3) — REFEITA do zero (2026-07-09)
**Situação:** a 1ª versão (variants + `whileInView`) tinha um bug estrutural
crítico — imagens presas em `opacity:0` — e não atendia ao pedido do dono de
animação sincronizada com o scroll. Foi **descartada e reescrita** a partir
de `../fazer/fase-3-refazer-animacoes-e-header.md`. **Ainda não conferido
visualmente** (mesma limitação de sempre — sem Chromium funcional neste
servidor); ver nota de metodologia de screenshot no fim.

### Regra estrutural (por que a v1 quebrou, e como a v2 evita)
**Um único elemento `motion` por unidade** (o card inteiro, ou o bloco de
texto de uma seção). Imagens e textos são **filhos DOM comuns** — nunca
`motion` aninhado com estado inicial escondido próprio. A v1 tinha `<img>`
como `motion.img` dentro de um `<div className="zoom_imagem">` comum: o
`whileInView` do avô não propagava por dentro desse `<div>` sem `variants`
próprio do jeito esperado, e a imagem ficava presa em `opacity:0` pra sempre.
Não existe mais NENHUM `motion.img`/`motion.a` no projeto (conferido por
`grep`) — hover de imagem agora é **CSS puro** (ver abaixo), não Framer.

### `src/lib/Revela.jsx` — reveal ligado ao scroll (não mais duração fixa)
- **`Revela`** — unidade com scroll próprio (seções/blocos isolados):
  `useScroll({target: ref, offset: ["start end", "end start"]})` +
  `useTransform` mapeiam o progresso da seção atravessando a viewport (0 =
  entra por baixo, 1 = sai por cima) em `opacity` (`0→1→1→0`) e `y` (entra
  ~40-56px de baixo → assenta em 0 → sai deslizando um pouco pra cima). O
  "tempo" da animação é a **distância de scroll**, não uma duração em
  segundos — por isso é mais lento/scrubado e bidirecional de graça (subir
  reverte a mesma curva).
- **`RevelaComProgresso`** — cards de um grid: recebe um `progresso`
  (MotionValue já calculada pelo container via `useProgressoSecao`, em
  `src/lib/useProgressoSecao.js`) e mapeia uma fatia atrasada dele
  (`atraso` crescente por índice) nos mesmos `opacity`/`y` — os cards
  assentam em leve sequência, mas o atraso é uma fatia do MESMO progresso de
  scroll do grid, não um delay de tempo.
- **`prefers-reduced-motion` — atenção especial (era o pior bug da v1):**
  valores de `useScroll`/`useTransform` ligados direto num `style` são um
  *bind* de scroll, não uma "animação" via `animate`/`whileHover` — o
  `<MotionConfig reducedMotion="user">` **não os desliga sozinho**. Por isso
  `Revela`/`RevelaComProgresso` (e o parallax do Hero) chamam
  `useReducedMotion()` e, se ligado, **ignoram** o valor de scroll e usam
  `opacity:1;y:0` fixo — nada some nem fica parcialmente visível.
- **Transição seção-a-seção:** como cada seção calcula seu progresso de
  forma independente e faixas de seções vizinhas se sobrepõem (uma ainda
  "saindo" enquanto a próxima já está "entrando"), o efeito é de uma tela
  dando lugar à outra — não itens isolados pipocando por cima do conteúdo.
- Aplicado nas 9 seções que não são o Hero: título de cada seção com
  `Revela`/`RevelaComProgresso` (`atraso=0`), cada card do grid com
  `RevelaComProgresso` (`atraso` crescente por índice).

### Hero — entrada por sequência de load + parallax (não scroll-reveal)
Eyebrow → título → parágrafo → botões entram em sequência **no carregamento**
(`heroStagger`/`heroItem` em `src/lib/motion.js`, `initial`/`animate` — não
`whileInView`/scroll — é a 1ª coisa vista, não há o que "revelar ao rolar").
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

### Header — 3 estados (substituiu o "encolhe ao rolar" da v1)
`Header.jsx`: `useScroll` (scroll global) + `useMotionValueEvent` compara o
valor atual com o anterior (direção) e com `window.innerHeight * 0.7` (proxy
de "ainda no Hero"). Três estados:
- **completo** — no Hero/topo: header de sempre, em fluxo normal
  (`position:static`), pixel-idêntico ao original em repouso.
- **escondido** — saiu do Hero rolando pra baixo: `translateY(-100%)` + fade.
- **compacto** — abaixo do Hero rolando pra cima: menor (`.header_compacto`,
  `64px`, logo `80px`, nav enxuta), `position:fixed` no topo
  (`.header_flutuante`).

Só vira `position:fixed` **fora** do estado completo — no repouso (scroll 0)
segue em fluxo normal, sem risco de deslocar o layout original.
`prefers-reduced-motion` força sempre "completo" (nunca esconde), além do
`<MotionConfig>` global. `z-index:40`, abaixo do overlay/drawer (`90`/`100`)
— não conflita com o `AnimatePresence` do menu mobile.

### Banner — voltou a ser 100% estático
O marquee (avaliado numa rodada anterior) foi **removido por completo** — o
dono pediu de volta o título estático original. `Banner.jsx` é só o `<h1>`
original envolvido num `Revela` (fade + leve subida ligada ao scroll, igual
às outras seções). O CSS do marquee (`#texto_banner{width:100%}`,
`.banner h1{white-space:nowrap}`, `.marquee_banner`/`.marquee_faixa`) foi
revertido/removido por completo.

## Regras gerais de animação (valem pra tudo acima)
- Biblioteca: `motion` (Framer Motion, import de `"motion/react"`).
- **Só `transform`/`opacity`** são animados (performático, sem reflow — nunca
  `width`/`height`/`top`/`left`/`margin`).
- Estado assentado de qualquer reveal = o layout atual, sem exceções (o
  Banner não tem mais exceção — voltou a ser estático).
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
