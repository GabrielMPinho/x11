# Backlog — MOBILE (design próprio) + correções da validação do dono

> **Frente ativa (2026-07-14).** Depois que a escala de desktop (1024→1440) foi
> entregue e commitada (`fd458ce "Viewport Laptop"`), o dono validou no laptop e
> abriu esta frente: **2 correções** + **3 pedidos de mobile**.
>
> Instrução ativa: `sonnet/fazer/correcoes-hero-historias-e-mobile.md`.
> A escala de desktop tem backlog próprio em [`escala-viewport.md`](./escala-viewport.md).

## Correções (validação do dono no laptop)

| # | Problema | Causa raiz (medida pelo Opus) | Status |
|---|---|---|---|
| 1 | Botão **VER FEMININO** do hero da Home sumiu | `#escrito`/`#botoes` empurrados por `top:39vh`/`42vh` dentro de `.hero{min-height:88vh; overflow:hidden}`. Em 1440×900 sobram **2px** (`bottom=898` vs `900`); em **768px de altura estoura 32px** e o botão é cortado. **Regressão**: o refactor estendeu o hero de desktop (frágil) até a faixa 1024–1440 | ⏳ na instrução |
| 2 | Histórias sem espaçamento embaixo (1440 e laptop) | `#container_historias{margin-top:11vh}` grande + `margin-bottom:7vh` **comentado**. Folga topo **224px** × baixo **44px** em 1440×900; **0px** em janela de 768px | ⏳ na instrução |

> **Lição:** a fragilidade dos dois é a mesma — **layout preso à altura da
> janela** (`vh`). É exatamente o que a decisão "travar as proporções na
> **largura**" existe para eliminar. O hero e o ritmo das seções ficaram de fora
> daquela passada; esta instrução fecha isso.

## Pedidos de mobile (dono, 2026-07-14)

### A. Animações precisam acontecer EM CENA
**Não é que faltem** — elas rodam, mas **fora da tela**. O reveal é função do
progresso da **seção**, e no mobile as seções empilham e ficam **2–5× mais altas
que a viewport** (páginas de 7.031–10.379px), então o bloco já chegou a
`opacity:1` antes de aparecer.

| página (390×844) | blocos | animaram em cena | já opacos |
|---|---|---|---|
| Home | 53 | 35 | 9 |
| Institucional | 35 | 27 | 5 |
| **Produtos** | 18 | **10** | 6 |
| Equipamento | 21 | 15 | 5 |

**Decisão (Opus):** em ≤1023px o reveal passa a usar o progresso do **próprio
elemento** (`offset ["start end","start 70%"]`), com amplitude maior (~96px).
Desktop ≥1024 fica no modelo por seção. Bidirecional e `reduced-motion`
preservados.

### B. PLP (Homem/Mulher) no mobile: **2 colunas** de produtos (hoje 1)
O `.card_produto_plp` precisa aguentar ~metade da largura sem estourar nem gerar
scroll horizontal.

### C. Carrosséis no mobile: **sem setas**, **avanço automático**, **ainda arrastáveis**
Vale para os 3 carrosséis: Home/Destaques, Equipamento/DESTAQUES,
Equipamento/COMBINE SEU SETUP.

**Decisão (Opus) — o desenho do autoplay:**
- Movimento **contínuo e lento** (não passo a passo), ritmo de vitrine —
  **~1 card a cada 3,5s**.
- **Loop infinito sem emenda** (lista renderizada em dobro; o trilho reposiciona
  sobre um card idêntico a cada volta).
- **Arraste continua**: tocar/arrastar **pausa** o avanço; soltar **retoma em
  ~1,5s**, de onde parou.
- `prefers-reduced-motion` → **sem autoplay**, só arraste.
- **Desktop ≥1024 inalterado** (Home = carrossel ligado ao scroll; Equipamento =
  setas).

## Pendências / próximos
- ⬜ O dono disse ter **mais ajustes de outros viewports** — aguardando.
- ⬜ **Escala de desktop nas outras 3 páginas** (Institucional, Produtos,
  Equipamento) — ver [`escala-viewport.md`](./escala-viewport.md), passos 2–4.
  Hoje elas ainda caem no bloco `≤1280px` no corpo, com o chrome já escalado.
- ⬜ **Simetria vertical das demais seções da Home** — o Sonnet vai medir e
  relatar (folga topo × baixo de cada seção); o dono decide se corrige.

## Conferência (Opus)
Prints em **390 / 768 / 1024 / 1280 / 1440** + **1440×768 e 1366×768** (as
alturas de laptop, onde o botão do hero sumia) + **1440×1080**. Alvos:
- Hero: os **dois** botões visíveis em **toda** altura de janela; em 1440×900
  pixel-idêntico ao de hoje.
- Histórias: folga de baixo **igual** à de cima.
- Mobile: blocos entrando **em cena**; PLP em **2 colunas**; carrosséis **sem
  setas**, andando sozinhos e ainda arrastáveis.
