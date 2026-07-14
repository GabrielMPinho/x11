# Escala proporcional do desktop (1024 → 1440) — fundação + chrome + Home

> **Instrução ativa.** Leia `docs/agentes/sonnet/contexto/` antes de começar
> (`arquitetura.md`, `padrao-api.md`, `estilos.md`, `convencoes.md`).
> Ao terminar: atualize os docs indicados no fim e **NÃO commite**.

## O que o dono pediu (2026-07-14)
> "Precisamos ajustar melhor o viewport. O padrão de desktop deve ser o que está
> em **1440px**. O **1024px** deve ser **esse mesmo modelo, porém com as devidas
> proporções**."

Ou seja: **1024 tem que ser o 1440 encolhido** — a mesma página, as mesmas
grades, o mesmo desenho, só que menor. Hoje não é: em 1024 a página cai no
design responsivo da Fase 2, que é **outro layout**.

---

## TABELA DE DIAGNÓSTICO (índice — o detalhe de cada item vem abaixo)

| # | Problema | Causa raiz | Correção |
|---|---|---|---|
| 1 | Em 1024 a página é outro layout, não o desktop reduzido | O bloco `@media (max-width:1280px)` reescreve a Home inteira | Recuar o breakpoint da Home para **≤1023px**; de 1024 pra cima vale o modelo desktop |
| 2 | As grades trocam de estrutura | Categorias 6→3 col, Território 4→2 col, Destaques carrossel→swipe | Mantêm a grade do 1440; só **escalam** |
| 3 | O cabeçalho de seção troca de identidade | ≤1280 vira "esquerda + barra laranja"; no 1440 é centralizado, sem barra | A variante "esquerda + barra" recua para ≤1023 |
| 4 | A tipografia não encolhe (nav 16px, H2 41,6px iguais em 1024 e 1440) | Tamanhos fixos em `px`/`rem`; os `clamp()` existentes já estão no **máximo** em 1024 | Toda fonte passa a escalar com a largura, **com piso de 12px** |
| 5 | O logo desaba de 308px → 110px | Regra de tablet, não proporção | Logo **escala** (308px @1440 → 219px @1024) |
| 6 | O botão do hero quebra a palavra ("VER / MASCULINO") | `width:14vw` encolhe, mas a fonte fixa não | Resolve-se sozinho quando tudo escala junto |
| 7 | **O "desktop do 1440" não é uma coisa só** | Alturas em `vh`: o card de Favoritos tem 855px numa janela 1440×900 e **1026px** numa 1440×1080 | **Travar as proporções na LARGURA** (`aspect-ratio`), não na altura |
| 8 | Em exatamente 1280px a página já é tablet | O `@media` é `max-width:1280` — "desktop >1280" na prática é ≥1281 | Fronteira explícita: **desktop ≥1024**, responsivo **≤1023** |

Os itens 7 e 4 foram **decididos pelo dono** nesta rodada (ver "Decisões" abaixo).

---

## O MODELO (decisões de design — já fechadas, não reabrir)

### Referência
- **Desktop de referência = 1440 × 900.** O que está lá hoje é a verdade.
- **Faixa de escala: 1024px → 1440px.** Em **1440** o resultado é **idêntico ao
  de hoje** (nada pode mudar). Em **1024** é o mesmo desenho a **0,7111×**
  (1024 ÷ 1440). Entre os dois, contínuo.
- **Acima de 1440px:** comportamento de hoje, **inalterado**.
- **Abaixo de 1024px (≤1023):** o design responsivo atual continua valendo,
  **sem nenhuma mudança visual**. O dono vai mexer nesses viewports depois.

### Decisão do dono #1 — proporções travadas na LARGURA
Hoje as caixas de conteúdo são dimensionadas em `vh`, então elas mudam de
tamanho conforme a **altura** da janela (medido: `.card img` = 374×855 numa
janela 1440×900 e 374×**1026** numa 1440×1080). Isso torna impossível o 1024 ser
uma cópia proporcional fiel, e significa que "o desktop" hoje é vários desktops.

**Decidido:** as **caixas de conteúdo** (imagens, cards, colunas de texto,
grades) passam a ter a **altura derivada da largura** (`aspect-ratio`), tomando
como referência o render de **1440×900**. Efeito colateral **aceito e
autorizado pelo dono**: numa janela mais alta que 900px o desktop deixa de
esticar as imagens — é uma **exceção explícita à regra de ouro**.

⚠️ **Não vale para as faixas de tela.** Seção cuja altura existe para "encher a
tela" (`.hero`, `.favoritos`, `.lancamento_desconto`, `.categorias`,
`.lancamento_especial`, `.territorio`, `.destaques`, `.historias`, `.banner`)
**continua com `min-height`/`height` em `vh`** — elas são faixas de viewport, não
caixas de conteúdo. Idem os offsets verticais internos do hero (`#escrito`
`top:39vh`, `#botoes` `top:42vh`), que são proporcionais à altura do próprio
hero.

### Decisão do dono #2 — layout fiel, texto com piso de legibilidade
Escala 100% fiel derrubaria o corpo de 16px para 11,4px e a nav de 16px para
11,4px — miúdo demais.

**Decidido:** o **layout** escala fiel (0,7111× em 1024, sem piso). A
**tipografia** escala junto, mas **não desce de 12px**. Na prática o piso só
morde as fontes pequenas; os títulos escalam fiéis:

| | @1440 | @1024 (alvo) |
|---|---|---|
| nav do header | 16px | **12px** (piso) |
| corpo / `.desc` | 14,4px | **12px** (piso) |
| `.p_laranja`, `.nome`, `.cta_comprar` | 20,8px | 14,8px |
| h3 de card | 26px | 18,5px |
| H2 de seção | 41,6px | 29,6px |
| H1 do hero | 64px | 45,5px |
| H1 do banner | 80px | 56,9px |

---

## O MECANISMO — a unidade de escala `--u`

Crie em `tokens.css` uma custom property **`--u`**, que representa **"1px do
desenho de 1440"**. Comportamento exigido (é a espinha de tudo):

| Largura da janela | Valor de `--u` | Por quê |
|---|---|---|
| **≥ 1440px** | **1px** (congelada) | O desktop de hoje fica intacto |
| **1024 → 1440** | varia **linearmente com a largura**: 0,7111px em 1024, 1px em 1440 | É a escala proporcional |
| **≤ 1023px** | **volta a 1px** (neutra) | ⚠️ **Crítico** — ver abaixo |

**Ancoragem:** 1px em 1440 equivale a `100 ÷ 1440 = 0,069444vw`. Use isso como
termo médio, com teto de `1px`. Derive a função você mesmo (uma função de
travamento em CSS resolve os três casos).

> ⚠️ **Por que `--u` volta a 1px abaixo de 1024** — as regras base (desktop) são
> também a base herdada pelo mobile; o bloco responsivo só sobrescreve **parte**
> delas. Se `--u` ficasse congelada em 0,7111 abaixo de 1024, **todo** valor
> herdado encolheria 29% e o **mobile mudaria** — o que está proibido. Com `--u`
> neutra (1px) em ≤1023, `calc(N * var(--u))` devolve exatamente `N px`, ou seja,
> **o valor de hoje**. O mobile fica byte a byte igual. Isso é obrigatório.

### A LEI DE CONVERSÃO (aplique mecanicamente, arquivo por arquivo)

| O que a regra tem hoje | Vira | Observação |
|---|---|---|
| Comprimento fixo em **`px`** ou **`rem`** (gap, padding, margin, width, height, border, offset) | `calc(N * var(--u))`, com **N = o valor em px medido no 1440** | `1rem = 16px`. Ex.: `gap:6rem` → N=96 |
| **`font-size`** (qualquer um) | `max(12px, calc(N * var(--u)))` | O `max()` é inofensivo nas fontes grandes — só morde abaixo de 12px |
| **`vw`** | **fica como está** | Já é proporcional à largura ✅ |
| **`vh`** numa **caixa de conteúdo** | altura derivada da largura (`aspect-ratio`), razão tirada do render **1440×900** | Ver a tabela de alvos abaixo |
| **`vh`** numa **faixa de tela** (`min-height` de seção) | **fica como está** | São telas, não caixas |
| **`clamp()`** de fonte já existente | vira `max(12px, calc(N * var(--u)))`, com N = o **máximo** do clamp | ⚠️ **mas** o clamp original tem que ser **recriado no bloco ≤1023** — ver "Fontes fluidas" |

---

## O TRABALHO, ARQUIVO POR ARQUIVO

### A. `src/padrao/estilos/tokens.css` — a fundação
Criar `--u` conforme a tabela acima (os três regimes). Documente no comentário
**por que** ela volta a 1px em ≤1023.

### B. Chrome compartilhado — vale para TODAS as páginas
Aplicar a lei de conversão em `header.css` e `footer.css`. Alvos medidos:

| Arquivo | Seletor / prop | Hoje | Alvo @1440 | Vira |
|---|---|---|---|---|
| `header.css` | `header` `height` | `12vh` | 108px | escala (`--u`) — é caixa, não faixa de tela |
| | `header img` `width` | `auto` (natural 308px) | **308px** | escala → 219px @1024 |
| | `header img` `top` | `2.9vh` | 26px | escala (preserva o logo "pendurado" sobre o hero) |
| | `header img` `left` | `4vw` | — | **fica** (já é vw) |
| | `header > nav` `gap` | `6rem` | 96px | escala |
| | `header > nav` `margin-left` | `10vw` | — | **fica** |
| | `header > nav > a` `font-size` | `medium` | 16px | `max(12px, …)` → **12px** @1024 |
| | `.header_minimalista` `height` | `60px` | 60px | escala → 43px @1024 |
| | `.header_minimalista img` `width`/`top` | `170px`/`4px` | 170/4px | escalam |
| | `.header_minimalista nav` `gap`/`a font-size` | `1.5rem`/`0.8rem` | 24px/12,8px | escalam (fonte com piso) |
| `footer.css` | todos os `px`/`rem`/`font-size` | — | medir | lei de conversão |
| `botao.css` / `animacoes.css` | idem | — | medir | lei de conversão |

⚠️ **Consequência intencional:** de 1024 a 1280, o header/footer das páginas
**Institucional / Produtos / Equipamento** passam a mostrar o **chrome desktop
escalado** (não mais a versão tablet), enquanto o **corpo** dessas páginas segue
no layout tablet até chegar a vez delas. Isso é **esperado e aprovado** — é o
alvo final de qualquer forma. Não tente "consertar" isso.

### C. `src/paginas/home/home.css` — o corpo da Home
Aplicar a lei de conversão em **todo** o arquivo. Os pontos que **não** são
mecânicos (medidos por mim no 1440×900) estão aqui — use estes alvos:

| Seletor | Hoje | Alvo | Por quê |
|---|---|---|---|
| `.card img` (Favoritos) | `width:26vw; height:95vh` | manter `26vw`; altura por **`aspect-ratio` 374 / 855** | Trava a proporção na largura (decisão #1) |
| `.imagem_territorio` | `width:100%; height:76vh` | manter `100%`; **`aspect-ratio` 309 / 684** | idem |
| `.card_historia img` | `width:29vw; height:40vh; aspect-ratio:1/1` | manter `29vw`; **`aspect-ratio` 418 / 360**; **remover** o `height` e o `aspect-ratio:1/1` | O `1/1` de hoje é **letra morta** (width+height explícitos o anulam) — medido 418×360, não é quadrado |
| `#texto` (Lanç. desconto) | `width:96.5vh` | **`width:100%`** | Uma largura em `vh` é um bug: hoje calha de dar 823px, que é **exatamente** a coluna (4/7 de 1440). `100%` dá o mesmo em 1440 e acompanha a coluna em qualquer largura |
| `#container_texto` (Lanç. especial) | `width:70.5vh` | escala: N = **635px** | Mesma patologia (largura em `vh`) |
| `#conteiner_categorias` | `width:85vw; height:50vh` | manter `85vw`; **altura pelo conteúdo** (remover o `height`) | Os cards já escalam; a altura fixa em vh briga com eles |
| `#conteudo_destaques` | `width:90vw; height:65vh` | manter `90vw`; altura pelo conteúdo | idem |
| `#produtos_destaques` | `height:50vh` | altura pelo conteúdo | As imagens já são `aspect-ratio:1/1` ✅ |
| `#escrito_destaques` | `height:10vh` | altura pelo conteúdo + margens escaladas | idem |
| `#texto_banner` | `height:30vh` | altura pelo conteúdo | idem |
| `.card_categoria` | `height:130px` | escala → 92px @1024 | Lei de conversão |

**Fontes fluidas (`clamp`) da Home — atenção especial.** Estes 6 seletores usam
`clamp()` hoje. No desktop eles viram `max(12px, calc(N * var(--u)))`, **mas** o
clamp de hoje é o que faz a fonte encolher no mobile — então ele **tem que ser
recriado, com a fórmula idêntica, dentro do bloco `@media (max-width:1023px)`**,
senão o mobile quebra:

| Seletor | `clamp()` de hoje (recriar no ≤1023) | N (máx) p/ o desktop |
|---|---|---|
| `.hero > #escrito > h1` | `clamp(2rem, 5vw + 0.8rem, 4rem)` | 64 |
| `#titulo_principal` | `clamp(2rem, 5vw + 0.8rem, 4rem)` | 64 |
| `#container_texto h1` | `clamp(2rem, 5vw + 0.8rem, 4rem)` | 64 |
| `.titulo > .escrito_fav > h2` | `clamp(1.6rem, 3vw + 0.68rem, 2.6rem)` | 41,6 |
| `.titulo > .escrito_cat > h2` | `clamp(1.6rem, 3vw + 0.68rem, 2.6rem)` | 41,6 |
| `.banner h1` | `clamp(2.2rem, 6vw + 1.16rem, 5rem)` | 80 |

### D. `src/padrao/estilos/responsividade.css` — recuar o breakpoint da Home
O bloco `@media (max-width:1280px)` de hoje mistura **Home + chrome +
Institucional + Produtos**. Ele precisa ser **dividido em dois**:

- **→ `@media (max-width: 1023px)`** (o design responsivo, agora só abaixo do
  desktop): tudo que é da **Home** (`.titulo`, `.escrito_fav`, `.escrito_cat`,
  `#titulo_destaque h3::after`, `.hero`, `#escrito`, `#botoes`,
  `.lancamento_desconto`, `#container_escrito`, `#texto`, `#container_imagem`,
  `.favoritos`, `#imagens`, `.card`, `.card img`, `.card a`, `.categorias`,
  `#conteiner_categorias`, `.lancamento_especial`, `#container_texto`,
  `.territorio`, `#container_cards`, `.imagem_territorio`, `.destaques`,
  `#conteudo_destaques`, `#escrito_destaques`, `#produtos_destaques`,
  `.card_produto`, `.historias`, `#container_historias`, `.card_historia img`,
  `.banner`, `#texto_banner`, os CTAs `#texto button` / `#container_texto
  button`) **+ o chrome** (`header > nav`, `header img`,
  `.header_minimalista img`, `#conteudo_footer`, `#fim_footer`, `#logo_footer`)
  **+ os 6 `clamp()` de fonte** da tabela acima.
- **→ permanece em `@media (max-width: 1280px)`**: **só** o que é de
  **Institucional** (`.hero_institucional*`, `.quemsomos*`, `.timeline*`,
  `.missao*`, `.valores*`) e **Produtos** (`.colecao_hero`, `.barra_categorias`,
  `.produtos_corpo`, `.grade_produtos`, `.bloco_editorial`) — essas páginas ainda
  não foram convertidas; cada uma terá sua instrução.
- `body{ overflow-x:hidden }` → **mantém** em ≤1280 (inofensivo, vale pra todos).
- Os blocos **`≤768px` e `≤480px` ficam INTACTOS.** Não encoste neles.

### E. `Destaques` — o carrossel passa a valer de 1024 pra cima
O carrossel scroll-linked hoje só liga em **>1280px + ponteiro fino**
(`matchMedia` em `Destaques.jsx`). Como o modelo desktop agora começa em 1024, o
gate vira **≥1024px + ponteiro fino**. Abaixo disso (ou ponteiro grosso)
continua o modo **arrastável**, como hoje.

- `.card_carrossel` (`flex: 0 0 340px; width:340px`) → **escala** (N=340).
- `.trilho_carrossel` `gap:32px` → escala; `padding-left:4vw` → **fica**.
- ⚠️ `FOLGA_FIM = 170px` (constante em `CarrosselDestaques.jsx`) é "meio card"
  (340 ÷ 2). Como o card agora escala, essa folga **não pode continuar fixa** —
  derive-a da **largura real do card medida em runtime** (metade dela), que já é
  medida ali. Senão a folga do fim fica errada em 1024.

---

## O QUE NÃO FAZER
- ❌ **Não mexer no visual acima de 1440px** — tem que ficar idêntico.
- ❌ **Não mexer no design responsivo ≤1023px** — idêntico ao de hoje. A única
  mudança permitida lá é o **recuo do breakpoint** (1280→1023) e a **recriação
  dos 6 `clamp()`** de fonte.
- ❌ **Não converter** as páginas Institucional / Produtos / Equipamento (só o
  chrome compartilhado as toca nesta rodada). Cada uma terá sua instrução.
- ❌ **Não inventar** seção, componente ou ajuste "de melhoria" no desktop.
- ❌ **Não tirar screenshot** — conferência visual é do Opus e do dono.

## VERIFICAÇÃO (sua, antes de entregar)
1. `npx vite build` ✅ e `npm run lint` ✅.
2. **Por leitura do CSS**, confirme e relate:
   - `--u` vale **1px** em ≤1023 (o mobile não muda) e **1px** em ≥1440 (o
     desktop não muda).
   - Nenhuma regra de **Institucional/Produtos** saiu do bloco `≤1280`.
   - Os blocos `≤768` e `≤480` estão intactos (diff limpo).
   - Nenhum `height` em `vh` sobrou numa **caixa de conteúdo** da Home.
3. No resumo final, **liste os valores-alvo** que o Opus vai conferir no
   navegador — o que o CSS deve produzir em **1440** e em **1024**:
   logo do header · nav · H2 de seção · card de Favoritos · card de Categoria ·
   nº de colunas de Categorias e de Território.

## DOCS A ATUALIZAR (obrigatório)
- `docs/agentes/alterações/CHANGELOG.md` — entrada nova **no topo**.
- `docs/agentes/sonnet/contexto/estilos.md` — a unidade `--u`, a lei de
  conversão, a nova fronteira (desktop ≥1024 / responsivo ≤1023).
- `docs/agentes/sonnet/contexto/convencoes.md` — a **regra de ouro mudou**:
  a régua do desktop agora é **1440**, a escala vale de 1024 a 1440, e as
  proporções são travadas na **largura** (exceção autorizada pelo dono).
