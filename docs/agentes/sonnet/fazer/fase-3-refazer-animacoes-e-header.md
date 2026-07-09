# INSTRUÇÃO ATUAL — Refazer a Fase 3 (animações ligadas ao scroll) + fechar Fase 2 (header/logo)

> Escrita em **diretivas**: o **quê** e o **como**. O Opus **não escreve código**;
> **você (Sonnet) escreve todo o CSS/JS**, seguindo exatamente as diretivas,
> alvos e mecanismos abaixo. É uma **refatoração** da Fase 3 — o modelo anterior
> quebrou (imagens invisíveis) e não atende ao pedido do dono (scroll-sync). Não
> tenha medo de reescrever `src/lib/motion.js` e os wrappers de animação.

## Contexto e por quê (conferência visual do Opus + pontos do dono)
Na conferência por screenshot (5 viewports), a rodada anterior deu 5 problemas:
1. **TODAS as imagens de conteúdo ficaram invisíveis** (opacity 0) — Favoritos,
   Território, Destaques, Histórias — porque as `<img>` viraram elementos
   `motion` aninhados **fora da cascata de variants** do Framer (o wrapper
   `.zoom_imagem` corta a propagação do `whileInView`), então nunca recebem o
   estado "visível". Bug que quebra o site.
2. **Header/logo ainda estoura as laterais** entre 900–1280px: o logo continua
   com ~308px de largura (o `height:36px` não reduziu a largura).
3. **Desktop > 1280px deixou de ser pixel-idêntico** — os wrappers mudaram
   alturas (+4px) e há diffs em várias seções.
4. **Reduced-motion pior:** blocos inteiros de card somem.
5. **Marquee do Banner** muda a aparência de repouso.

Pontos do dono somados a isso:
- (A) Header: fora do Hero, quer ele **reduzido** (outro design), aparecendo só
  ao **rolar para cima**; ao chegar no Hero, **completo**.
- (B) Animações **mais lentas** e **totalmente sincronizadas com o scroll**.
- (C) A frase antes do footer (Banner) deve ser **estática**, só com leve
  animação de aparecer — **tirar o carrossel/marquee por completo**.
- (D) Quer **transição de tela para tela**, não itens só "aparecendo por cima".

---

## PARTE 1 — Corrigir os bloqueadores

### 1.1 Imagens invisíveis (CRÍTICO) — nova base de reveal
- **Regra estrutural:** cada "unidade que revela" deve ter **UM único elemento
  `motion`** — o **card inteiro** (ou o grupo de conteúdo da seção). As `<img>` e
  os textos ficam como **filhos DOM comuns** desse wrapper (sem `motion` próprio
  de reveal, sem `opacity:0` próprio). Eles aparecem/movem **junto** com o
  wrapper. **Nunca** ponha estado inicial escondido numa `<img>` aninhada que
  dependa de propagação de variant por dentro de um `<div>` comum.
- **Fail-safe obrigatório:** nenhum conteúdo pode ficar preso invisível. O único
  lugar com opacity inicial < 1 é o wrapper de reveal ligado ao scroll (Parte 2),
  que **sempre** chega a opacity 1 quando a seção está em cena.
- **Hover de imagem vira CSS puro** (fora do Framer): um wrapper com
  `overflow:hidden` e, no hover do card, a `<img>` faz `transform: scale(~1.03)`
  via `:hover` + `transition`. Assim hover e reveal ficam independentes e nenhuma
  imagem some. **O wrapper de hover tem de ser neutro no layout** (não muda
  tamanho/altura da imagem — ver 1.3).

### 1.2 Header/logo — fechar o overflow (Parte A da Fase 2)
- O logo precisa **de fato encolher**: hoje `height:36px` não reduziu a largura
  (continua ~308px) e estoura o header. **Restrinja a LARGURA do logo** (ex.: uma
  largura pequena fixa/máxima coerente com a altura do header compacto, deixando
  a altura proporcional), de forma que **logo + nav caibam sem scroll horizontal
  em qualquer largura de 320 a 1280px**. Ver também a Parte 3 (comportamento).

### 1.3 Desktop > 1280px tem de voltar a ser pixel-idêntico
- Qualquer wrapper adicionado (reveal/hover/zoom) deve ser **neutro no layout**:
  não pode adicionar altura nem deslocar nada. **O estado assentado (revelado) em
  > 1280px tem de bater pixel a pixel com o original** (o Opus reconfere por diff
  de pixels no estado assentado). Se um wrapper mudar o box, ajuste para não mudar.

---

## PARTE 2 — Novo modelo de animação: ligado ao scroll (pontos B e D do dono)

### 2.1 Reveal sincronizado com o scroll (trocar `whileInView` por scroll-linked)
- **Mecanismo (o COMO):** usar **`useScroll` com `target` no ref da seção** +
  **`useTransform`** para gerar um progresso 0→1 conforme a seção sobe pela
  viewport, e mapear esse progresso em **opacity** e **translateY**. Assim a
  animação **anda junto com o scroll** (scrubada), é **bidirecional naturalmente**
  (rolar para cima reverte) e fica **mais lenta/suave** (o "tempo" é a distância
  de scroll, não uma duração curta).
- **Alvos:** `offset` cobrindo de "a seção entra por baixo" (`"start end"`) até
  "a seção assenta perto do topo/centro" (algo como `"start center"` ou
  `"center center"`); translateY **~48–64px → 0**; opacity **0 → 1**; curva
  suave. Nada de `transition` de duração curta (~0.5s) como antes — o dono achou
  rápido; aqui o ritmo é o próprio scroll, ao longo de uma faixa **generosa**.

### 2.2 Transição de tela para tela (ponto D)
- O dono **não** quer itens pipocando isolados por cima da seção anterior; quer
  **uma seção dando lugar à outra**. **Como:** cada seção tem uma faixa de scroll
  com três momentos ligados ao mesmo progresso — **entrando** (vem de baixo,
  esmaecida) → **assentada** (estado final exato) → **saindo** (ao continuar
  rolando, desliza levemente para cima e esmaece). Ou seja, enquanto a seção
  atual **sai** por cima, a próxima **entra** por baixo, ambas movidas pelo
  scroll — sensação de transição contínua entre telas. Movimento sutil, só
  `transform`/`opacity`, e o **estado assentado é sempre o layout final exato**.

### 2.3 Stagger dentro das grades (leve, opcional)
- Nas grades (Favoritos/Categorias/Território/Destaques/Histórias) os cards podem
  assentar em leve sequência **mapeando faixas ligeiramente deslocadas do mesmo
  progresso de scroll** (não delays de tempo fixos), reforçando o scroll-sync.
  Manter sutil e a regra 1.1 (um motion por card, imagem como filho comum).

---

## PARTE 3 — Header: comportamento novo (ponto A do dono)
Três estados, só `transform`/`opacity`:
- **No Hero / topo da página:** header **completo** (o design cheio atual),
  visível.
- **Rolando para baixo, já fora do Hero:** o header **some** (desliza para cima,
  `translateY -100%`).
- **Rolando para cima, em qualquer ponto abaixo do Hero:** aparece um header
  **compacto** (outro design: **menor** em altura, logo pequeno, nav/essencial
  enxuto), fixo no topo (`translateY 0`).
- **Voltou ao Hero/topo:** volta o header **completo**.
- **Como:** detectar (a) se está no Hero/topo e (b) a **direção do scroll** —
  `useScroll` + comparar o valor anterior/atual (`useMotionValueEvent` ou
  `useVelocity`). Decidir o estado a partir de posição + direção.
- O header **compacto não pode estourar as laterais** em nenhuma largura (usar o
  logo já reduzido da 1.2). Isto **substitui** o "encolher ao rolar" da rodada
  anterior. Não conflitar com o `AnimatePresence` do drawer (mobile).

---

## PARTE 4 — Banner (frase antes do footer) (ponto C do dono)
- **Remover completamente o marquee/carrossel.** O Banner volta ao **título
  estático original** ("A MARCA MAIS DEMOCRÁTICA DO MOTOCILISMO BRASILEIRO", 2
  linhas centralizadas), **só** com uma **leve animação de aparecer** (fade +
  leve subida, ligada ao scroll como as demais seções). Sem loop, sem deslizar,
  sem duplicar o texto.

---

## Invariantes (valem para TUDO)
- **Só `transform` e `opacity`.** Estado assentado = **layout final exato** (nada
  fica deslocado no fim).
- **Nenhuma imagem/texto pode ficar invisível** no estado assentado (fail-safe da
  1.1). Se a animação não rodar, o conteúdo tem de estar visível.
- **`prefers-reduced-motion`:** tudo **estático no estado final**, com **todas as
  imagens/cards visíveis** — sem sumiço (foi o pior defeito da rodada anterior).
- **Desktop > 1280px assentado = pixel-idêntico** ao original.
- **Sem scroll horizontal** de 320 a 1280px.
- Não quebrar a responsividade (Fase 2) nem o drawer mobile.

## Verificação
- `npx vite build` ✅ · `npm run lint` (oxlint) ✅.
- O Opus reconfere por screenshot: (a) **todas as imagens com opacity 1** em todas
  as seções/larguras; (b) **sem overflow horizontal** 320–1280px; (c) **desktop
  > 1280px assentado pixel-idêntico**; (d) **reduced-motion tudo visível**; (e)
  reveal **sincronizado ao scroll**, mais lento e bidirecional, com sensação de
  transição de tela para tela; (f) **header**: completo no Hero, some ao descer,
  compacto ao subir; (g) **Banner estático** sem marquee.

## Ao terminar
Atualizar `docs/agentes/alterações/CHANGELOG.md` (entrada nova no topo) e
`docs/agentes/sonnet/contexto/estilos.md`. Resumir. **Não commitar.**
