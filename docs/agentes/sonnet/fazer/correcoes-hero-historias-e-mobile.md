# Correções (hero + histórias) + rodada de MOBILE

> **Instrução ativa.** Leia `docs/agentes/sonnet/contexto/` antes de começar.
> Ao terminar: atualize os docs indicados no fim e **NÃO commite**.
>
> Vem da validação do dono no laptop (2026-07-14), depois do commit
> `fd458ce "Viewport Laptop"`. Os itens 1 e 2 são **correções**; os itens 3, 4 e
> 5 são **pedidos novos do dono** para o mobile.

## TABELA DE DIAGNÓSTICO (índice — detalhe de cada um abaixo)

| # | Problema | Causa raiz | Correção |
|---|---|---|---|
| 1 | O botão **VER FEMININO** do hero da Home **sumiu** | `#escrito`/`#botoes` são empurrados por `top:39vh`/`top:42vh` (offsets presos à **altura da janela**) dentro de um `.hero` com `min-height:88vh` + `overflow:hidden`. A soma só cabe numa janela de ~900px de altura; **abaixo disso o 2º botão é cortado**. Medido: em 1440×900 ele termina em `bottom=898` contra `hero.bottom=900` (**2px de folga** — no fio); em **1440×768 e 1366×768 estoura 32px** e some. ⚠️ **Regressão** — o refactor estendeu o hero de desktop (frágil) até a faixa 1024–1440 | Tirar o hero do posicionamento por `vh`: fluxo normal, **imune à altura da janela** |
| 2 | **Histórias sem espaçamento embaixo** (1440 e laptop) | `#container_historias` tem `margin-top:11vh` **grande** e o `margin-bottom:7vh` está **comentado**, dentro de `.historias{min-height:88vh}` centralizada. Medido: folga topo **224px** × folga baixo **44px** em 1440×900 (torto), e **0px** em janela de 768px de altura | Ritmo vertical **simétrico** e independente da altura da janela |
| 3 | **"Faltando animações" no mobile, em todas as páginas** | O reveal é função do progresso de scroll da **SEÇÃO** (`useProgressoSecao`). No mobile as seções empilham e ficam **2–5× mais altas que a tela** (páginas de 7.000–10.400px), então um card no meio/fim da seção **já chegou em `opacity:1` antes de entrar em cena** — a animação roda fora da tela. Medido em 390×844: Produtos anima só **10 de 18** blocos em cena; 5–9 por página chegam já opacos | No mobile, cada bloco revela pelo **próprio** progresso, não pelo da seção |
| 4 | PLP (Homem/Mulher) no mobile tem **1 coluna** de produtos | `@media (max-width:768px)`: `.grade_produtos{grid-template-columns:1fr}` | **2 colunas** |
| 5 | Carrosséis no mobile têm setas e não andam sozinhos | Comportamento atual (setas + arraste) | No mobile: **sem setas**, **avanço automático**, **arraste continua** |

---

## 1. HERO DA HOME — o botão que some

**Arquivo:** `src/paginas/home/home.css` (`.hero`, `#escrito`, `#botoes`,
`button`).

**Como está hoje (medido em 1440×900):**

| | valor |
|---|---|
| `.hero` | 1440×**792** (`min-height:88vh`), `top=108`, **`bottom=900`**, `overflow:hidden` |
| `#escrito` | 576×249, `top=459` — empurrado por `position:relative; top:39vh` |
| `#botoes` | 432×163, `top=735`, **`bottom=898`** — empurrado por `top:42vh` |
| botão | 202×66 (empilhados: 2×(14vw + 8px de margem) **não cabem** nos 30vw de `#botoes`) |

Sobram **2px**. Em janela de 768px de altura (**o laptop do dono**) o 2º botão
vai a `bottom=816` contra `hero.bottom=784` → **cortado pelo `overflow:hidden`**.

**Correção — tirar o hero da dependência de altura:**
- `.hero` passa a posicionar o conteúdo em **fluxo normal** (coluna, ancorado
  verticalmente por **padding proporcional**, na escala `--u`/`vw`), em vez de
  empurrar os filhos com `top:39vh`/`top:42vh`.
- `#escrito` e `#botoes` **perdem** `position:relative` + `top` + `left`. O
  recuo lateral (`left:6vw` / `5.5vw`) vira **padding do `.hero`**.
- **Alvo obrigatório em 1440×900: pixel-idêntico ao de hoje.** Os alvos medidos,
  relativos ao topo do `.hero` (que começa em `y=108`): kicker em `y=459`, `h1`
  em `y=486`, `#p_branco` em `y=661`, 1º botão em `y=743`, fim do bloco em
  `y=898`. Use esses números para calibrar o padding.
- Os botões **continuam empilhados** (é o desenho aprovado) — mas torne isso
  **explícito** (coluna), não um efeito colateral de quebra de linha.
- `.hero` **mantém** `min-height:88vh` (é faixa de tela) e **mantém**
  `overflow:hidden` (o parallax do `.hero_bg` depende dele).
- **Nada pode ser cortado em nenhuma altura de janela.** Confira por leitura que
  a altura do conteúdo do hero não depende mais de `vh`.

---

## 2. HISTÓRIAS — sem respiro embaixo

**Arquivo:** `src/paginas/home/home.css` (`.historias`, `#container_historias`).

Hoje: `#container_historias{ margin-top: 11vh; /* margin-bottom: 7vh; */ }` — a
margem de baixo está **comentada** (já estava antes do refactor; não é regressão,
é um defeito antigo que o dono só enxergou agora).

**Medido:**

| janela | folga topo | folga baixo |
|---|---|---|
| 1440×900 | 224px | **44px** (torto) |
| 1440×768 | 165px | **0px** |
| 1366×768 | 172px | **11px** |

**Correção:** dar à seção um **ritmo vertical simétrico** que **não dependa da
altura da janela** — trocar o `margin-top:11vh` do container por **padding
vertical simétrico na `.historias`**, escalado com `--u` (mesma lei de conversão
de sempre). Alvo: em 1440×900 o respiro **de cima** fica como está hoje (~224px)
e o **de baixo passa a ser igual**.

⚠️ **Isso muda o 1440** — está **autorizado**: foi o próprio dono que apontou o
defeito.

📋 **Conferir e RELATAR (não corrigir sem meu ok):** as seções irmãs usam o mesmo
padrão (`#imagens` tem `padding-top:11vh`, `#container_cards` tem
`margin-top:11vh` + `margin-bottom:7vh`). Meça a folga de cima × a de baixo de
cada seção da Home em 1440×900 e **liste no resumo** quais estão assimétricas. O
dono decide se corrige as outras.

---

## 3. MOBILE — as animações precisam acontecer EM CENA

**Causa raiz (medida, 390×844):** `useProgressoSecao` (`src/padrao/lib/`) usa
`useScroll({ target: refDaSecao, offset:["start end","end start"] })` — a
opacidade/`y` de cada bloco é função do progresso da **seção inteira**. No
desktop a seção tem ~1 tela de altura, então isso funciona. No **mobile** as
seções empilham em 1 coluna e ficam **2–5× mais altas que a viewport** (as
páginas têm 7.031–10.379px). Consequência: um card no meio da seção **já
completou a janela de entrada (progresso ≥0,33) antes de aparecer na tela** — ele
entra **já opaco** e o movimento se perde.

| página (390×844) | blocos | animaram em cena | chegaram já opacos |
|---|---|---|---|
| Home | 53 | 35 | 9 |
| Institucional | 35 | 27 | 5 |
| **Produtos** | 18 | **10** | 6 |
| Equipamento | 21 | 15 | 5 |

**Correção:** em **≤1023px**, cada bloco/card revela pelo **próprio** progresso,
não pelo da seção:
- Fonte de progresso = `useScroll` com **`target` no próprio elemento**, offset
  **`["start end", "start 70%"]`** — começa quando o topo do elemento entra pela
  base da viewport e **assenta quando ele cruza 70% da altura da tela**. Assim a
  animação sempre acontece **em cena**.
- **Bidirecional preservado** (subir reverte a mesma curva) — invariante do
  projeto, não regredir.
- **Amplitude maior no mobile** (o dono já pediu movimento "mais perceptível"):
  distância de entrada ~**96px** (hoje 84) no mobile.
- **Desktop (≥1024px) fica como está** — continua no modelo por seção. Não
  regredir.
- Implemente escolhendo a **fonte de progresso** conforme `matchMedia`
  (≤1023 → próprio elemento; ≥1024 → seção), **dentro** de
  `Revela`/`useEstiloRevela`/`useProgressoSecao`. **Não** duplique componentes
  nem crie um segundo caminho de reveal.
- `prefers-reduced-motion` continua desligando tudo (estático e visível).

---

## 4. PLP (Homem / Mulher) no mobile — 2 colunas

**Pedido do dono:** *"No mobile na página de produtos (Homem e mulher) faça ter
**2 colunas** de produtos invés de 1 só."*

**Arquivo:** `src/padrao/estilos/responsividade.css`, bloco
`@media (max-width:768px)` → `.grade_produtos{ grid-template-columns: 1fr }`
vira **2 colunas**. O bloco `@media (max-width:480px)` **também** fica em 2
colunas (só ajusta o `gap`, que já faz).

**O card tem que aguentar ~metade da largura.** `.card_produto_plp` (nome, preço,
tag laranja, linha de swatches, "+N") foi desenhado para 1 coluna no mobile —
reduza `padding`/`font-size`/`gap` do card **o necessário** para nada estourar,
quebrar feio ou gerar **scroll horizontal**. Mantenha a estética (packshot, tag
laranja, tipografia). Vale para `/homem` e `/mulher` (é a mesma página
`src/paginas/produtos/`).

---

## 5. CARROSSÉIS NO MOBILE — sem setas, andando sozinhos, e ainda arrastáveis

**Pedido do dono:** *"No mobile tire todas as setas de todos os carrosseis e faça
eles passarem automaticamente, mas ainda podendo arrastar."*

**Alcance — os 3 carrosséis do site:**
1. Home → **Destaques** ("OS MAIS VENDIDOS") — `#setas_destaques`.
2. Equipamento → **DESTAQUES** ("SINTA COM OS OLHOS").
3. Equipamento → **COMBINE SEU SETUP**.

**5.1 Setas:** em **≤1023px**, **nenhum** dos três mostra setas. Confira os três
(os do Equipamento já deveriam esconder no toque — **verifique**, não presuma) e
garanta que o **espaço** que a seta ocupava não deixe buraco no cabeçalho.

**5.2 Avanço automático (design definido por mim — não improvisar):**
- **Movimento contínuo e lento**, não passo a passo — o trilho desliza sozinho,
  em ritmo de vitrine. **Velocidade-alvo: ~1 card a cada 3,5s.**
- **Loop infinito, sem emenda:** ao chegar ao fim, recomeça **sem salto visível**
  (o padrão é renderizar a lista **duplicada** e reposicionar o trilho a cada
  volta completa — o reposicionamento cai exatamente sobre um card idêntico, então
  não se vê).
- **O arraste continua funcionando** (é o que já existe hoje no modo
  arrastável). Ao **tocar/arrastar**, o avanço automático **pausa**; ao **soltar**,
  **retoma depois de ~1,5s**, continuando de onde parou (sem "pular" de volta).
- **`prefers-reduced-motion`: sem avanço automático** — fica só o arraste, com
  tudo visível e acessível.
- **Só no mobile/toque (≤1023px ou ponteiro grosso).** No **desktop (≥1024px)
  nada muda**: a Home segue com o carrossel ligado ao scroll e o Equipamento com
  as setas.

---

## O QUE NÃO FAZER
- ❌ Mudar o desktop ≥1024px, **exceto** onde esta instrução manda (o hero, item
  1, tem que ficar **idêntico** em 1440×900; Histórias, item 2, muda por ordem do
  dono).
- ❌ Regredir o reveal **bidirecional** nem o fallback de `reduced-motion`.
- ❌ Tornar decorativo em funcional fora do que está aqui.
- ❌ **Não tirar screenshot** — a conferência visual é do Opus e do dono.

## VERIFICAÇÃO (sua, antes de entregar)
1. `npx vite build` ✅ · `npm run lint` ✅.
2. **Por leitura**, confirme e relate:
   - O hero **não tem mais nenhum `vh`** posicionando `#escrito`/`#botoes`.
   - `.grade_produtos` está em 2 colunas em ≤768 **e** em ≤480.
   - Nenhum dos 3 carrosséis renderiza setas em ≤1023.
   - O desktop ≥1024 do reveal continua usando o progresso **da seção**.
3. **Relate a tabela** de folga topo × folga baixo de cada seção da Home em
   1440×900 (pedida no item 2).

## DOCS A ATUALIZAR (obrigatório)
- `docs/agentes/alterações/CHANGELOG.md` — entrada nova **no topo**.
- `docs/agentes/sonnet/contexto/componentes.md` — o novo comportamento dos
  carrosséis no mobile (autoplay + arraste, sem setas).
- `docs/agentes/sonnet/contexto/padrao-api.md` — o reveal passa a ter **duas
  fontes de progresso** (seção no desktop, próprio elemento no mobile).
- `docs/agentes/sonnet/contexto/estilos.md` — hero sem `vh`, ritmo de Histórias,
  PLP em 2 colunas no mobile.
