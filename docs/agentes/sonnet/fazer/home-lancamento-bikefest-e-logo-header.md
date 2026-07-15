# Home + Produtos — 3 ajustes: texto do LANÇAMENTO "Bike Fest" + logo do header + botão da PLP no mobile

> **Instrução ativa.** Leia `docs/agentes/sonnet/contexto/` antes de começar.
> Ao terminar: atualize os docs indicados no fim e **NÃO commite**.
>
> Três ajustes pequenos e independentes, todos medidos no navegador pelo Opus.
> **Só o que está descrito** — nada além.

## TABELA DE DIAGNÓSTICO (índice)

| # | Onde | Problema (medido) | Correção |
|---|---|---|---|
| 1 | Home → LANÇAMENTO ESPECIAL "Bike Fest" (`.lancamento_desconto`) | @1440: `#texto{width:100%}` ocupa os **823px** da coluna esquerda, `align-items:flex-start` → texto **esticado** e à esquerda | `#texto` **estreito** (~520·--u) e **centralizado** na coluna |
| 2 | Chrome → header (logo) | @1440: logo (308×130) empurrada por `top: calc(26*--u)` → **15px de preto acima**; ela é mais alta (130) que o header (108) | Alinhar o **topo da logo ao topo do header** (`top: calc(11*--u)`) → o laranja cobre a altura preta; largura/posição horizontal **não mudam** |
| 3 | Produtos (PLP) → bloco editorial, botão "EM DESTAQUE", **no mobile** | @390: o botão herda a regra global `button{width:14vw}` = **55px**; o texto tem **95px** e `overflow:hidden` → **corta** ("EM DESTA..."). @1440 cabe (202px, ok) | Botão **por conteúdo** no mobile (`width:auto` + `white-space:nowrap`), igual os CTAs da Home |

---

## ITEM 1 — LANÇAMENTO ESPECIAL "Bike Fest" (fundo branco): texto estreito e centralizado

> ⚠️ **SÃO DUAS SEÇÕES com o kicker "LANÇAMENTO ESPECIAL".** Esta é a de **FUNDO
> BRANCO**, título **"CONCORRA AO COMBRO DE PROTEÇÃO NO BIKE FEST"**, foto do
> **estande X11** à direita → no código é **`.lancamento_desconto`**
> (`Lancamento_desconto.jsx`). **NÃO** confundir com `.lancamento_especial` (fundo
> escuro, "VALOR PARA AVENTURA", moto na trilha), que **NÃO** muda.
>
> **Mexer APENAS no bloco de texto** (`#texto`). **NÃO** tocar na imagem
> (`#container_imagem`), no grid/fundo (`.lancamento_desconto`), no
> `#container_escrito`, nem no **conteúdo** (kicker/título/parágrafo/botão seguem
> iguais — inclusive o typo "COMBRO").

**Arquivo:** `src/paginas/home/home.css`. O `#container_escrito` (pai) **já** tem
`justify-content:center; align-items:center` — então basta o `#texto` ficar mais
estreito que ele centraliza sozinho na coluna. Mudanças **só no `#texto`**:
- **Largura:** `width: 100%` → **`width: calc(520 * var(--u))`** (mais estreito que
  os 823px da coluna → o pai o centra; o título quebra em ~4 linhas, forma
  "quadrada", como na foto do dono). *(Se ao conferir ficar largo/estreito demais,
  o Opus afina esse valor.)*
- **Texto centralizado:** `align-items: flex-start` → **`center`** e adicionar
  **`text-align: center`**.
- **Tira o offset:** remover o `left: 0.5vw` (o `top:1vh` pode ficar).
- **Mantém:** `flex-direction:column`, `justify-content:center`, `position:relative`.
- **`#texto button`** (hoje `position:relative; right:0.5vw; margin-top:4vh`):
  **remover o `right:0.5vw`** (descentraliza o botão); o resto fica.

Fundo branco + texto preto (`.p_preto`/`#titulo_principal`) → **sem problema de
legibilidade**, não precisa de overlay.

**Mobile (≤1023px):** o `responsividade.css` já sobrescreve `#texto{ width:100%;
left:0; top:0 }` — logo a largura estreita **só vale no desktop** (mobile volta a
full-width, correto). O `text-align:center` cascateia pro mobile (aceitável).
**Garanta:** sem overflow horizontal, botão centralizado.

---

## ITEM 2 — Header: logo cobrindo todo o preto (sem faixa preta acima)

**Pedido do dono:** tirar o **espaço preto acima da logo**; ela deve **cobrir toda
a parte preta do header**. **Largura e posição horizontal estão perfeitas — não
mudam.**

**Arquivo:** `src/padrao/estilos/header.css`, regra **`header img`** (o header
"completo"; **NÃO** o `.header_minimalista img`).

**Diagnóstico (medido @1440×900):** `header{ height: calc(108*--u) }` (preto,
`align-items:center`). A logo (`header img`) é **308×130** natural
(`width: calc(308*--u)`, `height:auto`). Com `align-items:center` ela cairia em
`top=-11` (centralizada, transbordando); o **`top: calc(26*--u)`** a empurra pra
`top=+15` → **15px de preto acima** e a logo passando 37px abaixo do header.

**Correção — alinhar o topo da logo ao topo do header:**
- `header img { top: calc(26 * var(--u)) }` → **`top: calc(11 * var(--u))`**.
- **Porquê 11:** o offset que leva a logo a `top=0` é exatamente
  `(altura_logo − altura_header) / 2 = (130 − 108) / 2 = 11`. Como logo e header
  **escalam ambos com `--u`**, `calc(11*var(--u))` zera o preto acima em
  **qualquer viewport** (não só 1440).
- **NÃO** mudar `width: calc(308*var(--u))` nem `left: 4vw` (largura e posição
  horizontal ficam idênticas). **NÃO** mexer no `.header_minimalista img` nem na
  altura do header (`calc(108*var(--u))` — o hero depende dela).
- **Consequência esperada (ok):** a logo sobe 15px, cobrindo os 108px do header no
  lado esquerdo (0px de preto acima) e passando ~22px pro hero (antes 37px) —
  continua sobreposta ao hero, só um pouco menos.

---

## ITEM 3 — Produtos (PLP): botão "EM DESTAQUE" cortado no mobile

**Onde:** o botão do **bloco editorial** ("Como escolher sua jaqueta?") das páginas
`/homem` e `/mulher` (`.bloco_editorial .botao_cortado`, `BlocoEditorial.jsx`).

**Diagnóstico (medido @390×844):** o `BotaoCortado` renderiza um `<button>`, então
herda a regra **global** `button{ width: 14vw }` (de `home.css`, pensada pro Hero).
No mobile `14vw = ~55px`; o texto "EM DESTAQUE" (`.texto_botao`) tem **~95px** e o
`.botao_cortado{ overflow:hidden }` **corta** o que passa → aparece "EM DESTA...".
Medido: botão 55×62, texto 95×54 (2 linhas). No desktop (@1440) o botão dá 202px e
cabe numa linha — **desktop está ok, não mexer**.

**Correção:** dar ao botão **largura por conteúdo** no mobile, **exatamente como já
foi feito para os CTAs de Lançamento da Home**. No `responsividade.css`, dentro do
bloco **`@media (max-width: 1023px)`**, já existe a regra:

```
#texto button,
#container_texto button{ width:auto; height:48px; padding:0 30px 0 22px; white-space:nowrap }
```

**Adicione `.bloco_editorial .botao_cortado` à MESMA lista de seletores** dessa
regra (não crie outra regra divergente) — assim o botão passa a `width:auto` +
`white-space:nowrap`, cabe "EM DESTAQUE" numa linha e o corte diagonal (clip-path,
em %) acompanha. **Desktop ≥1024 não muda** (a regra é só ≤1023).

---

## O QUE NÃO FAZER
- ❌ Tocar na seção `.lancamento_especial` ("VALOR PARA AVENTURA").
- ❌ Tocar na imagem/fundo do `.lancamento_desconto`, ou no conteúdo de texto.
- ❌ Mudar `width`/`left` da logo, o `.header_minimalista`, ou a altura do header.
- ❌ Escrever prints — a conferência visual é do Opus e do dono.

## VERIFICAÇÃO (sua, antes de entregar)
1. `npx vite build` ✅ · `npm run lint` ✅.
2. Por leitura:
   - `#texto` com `width: calc(520*var(--u))`, `align-items:center`,
     `text-align:center`, **sem** `left:0.5vw`; `#texto button` **sem** `right:0.5vw`.
   - `header img` com `top: calc(11 * var(--u))`; `width`/`left` intactos;
     `.header_minimalista img` intacto.
   - `.bloco_editorial .botao_cortado` incluído na regra `≤1023` de `width:auto;
     white-space:nowrap`; desktop (≥1024) do botão inalterado.
3. Confirme que nenhum **conteúdo de texto** mudou e que `.lancamento_especial`
   não foi tocada.

## DOCS A ATUALIZAR (obrigatório)
- `docs/agentes/alterações/CHANGELOG.md` — entrada nova **no topo** (os 3 ajustes
  + o porquê; cite o cálculo do `11` do logo e o corte do botão da PLP no mobile).
- `docs/agentes/sonnet/contexto/estilos.md` — novo `#texto` (estreito/centralizado),
  o novo `top` do `header img`, e o botão da PLP por conteúdo no mobile; **anotar a
  pegadinha das duas seções "LANÇAMENTO ESPECIAL"** (`.lancamento_desconto` = Bike
  Fest fundo branco; `.lancamento_especial` = Valor para Aventura fundo escuro).
