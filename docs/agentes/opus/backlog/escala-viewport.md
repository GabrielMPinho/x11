# Backlog — Escala proporcional do desktop (1024 → 1440)

> **Frente ativa (2026-07-14).** O dono redefiniu a régua: *"o padrão de desktop
> deve ser o que está em **1440px**. O **1024px** deve ser esse **mesmo modelo,
> porém com as devidas proporções**."* Ou seja: **1024 = o 1440 encolhido**
> (0,7111×), não outro layout.
>
> Instrução ativa: `sonnet/fazer/escala-desktop-1024-1440.md`.

## O diagnóstico (medido no navegador pelo Opus, 2026-07-14)
Comparei cada elemento em 1024 com o que uma escala proporcional produziria
(1024 ÷ 1440 = **0,7111×**). **Nenhum** bate — o 1024 hoje é o design responsivo
da Fase 2, que é outro layout.

| # | Problema | Causa raiz |
|---|---|---|
| 1 | 1024 é outro layout, não o desktop reduzido | `@media (max-width:1280px)` reescreve a Home inteira |
| 2 | Grades trocam de estrutura | Categorias 6→3 col · Território 4→2 col · Destaques carrossel→swipe |
| 3 | Cabeçalho de seção troca de identidade | ≤1280 vira "esquerda + barra laranja"; no 1440 é centralizado |
| 4 | Tipografia não encolhe (nav 16px, H2 41,6px iguais nos dois) | Fontes fixas; os `clamp()` já estão no **máximo** em 1024 |
| 5 | Logo desaba 308px → 110px | Regra de tablet, não proporção |
| 6 | Botão do hero quebra a palavra ("VER / MASCULINO") | `width:14vw` encolhe, a fonte não |
| 7 | **O "desktop do 1440" não é uma coisa só** | Alturas em `vh`: `.card img` = 374×**855** em 1440×900 e 374×**1026** em 1440×1080 |
| 8 | Em exatamente 1280px já é tablet | O `@media` é `max-width:1280` — o "desktop >1280" é ≥1281 |

## O modelo (decidido — dono + Opus)
- **Referência: 1440 × 900.** Em 1440 nada pode mudar.
- **Escala contínua 1024 → 1440.** Em 1024, tudo a **0,7111×**.
- **≥1440:** inalterado. **≤1023:** o responsivo de hoje, **intocado**.
- **Proporções travadas na LARGURA** (`aspect-ratio` tirado do render 1440×900) —
  ⚠️ **exceção autorizada à regra de ouro**: em janelas mais altas que 900px o
  desktop deixa de esticar as imagens. Em troca, "o desktop" vira **uma coisa
  só**. *(Escolha do dono.)*
- **Texto com piso de 12px.** O layout escala fiel; a fonte não desce de 12px
  (senão a nav cairia a 11,4px). O piso só morde as fontes pequenas. *(Escolha
  do dono.)*
- **Faixas de tela continuam em `vh`** (`.hero`, `.favoritos`, `.banner`… são
  telas, não caixas de conteúdo). Só as **caixas** travam na largura.

## O mecanismo: a unidade `--u`
Uma custom property = **"1px do desenho de 1440"**:

| Largura | `--u` | Por quê |
|---|---|---|
| ≥1440 | `1px` | desktop de hoje intacto |
| 1024→1440 | linear (0,7111px → 1px) | a escala |
| ≤1023 | **volta a `1px`** | ⚠️ **crítico** — as regras base são herdadas pelo mobile; se `--u` ficasse em 0,711 lá, todo valor herdado encolheria 29% e o **mobile mudaria** |

**Lei de conversão:** `px`/`rem` → `calc(N * var(--u))` · `font-size` →
`max(12px, calc(N * var(--u)))` · `vw` → **fica** · `vh` em caixa de conteúdo →
`aspect-ratio` · `vh` em faixa de tela → **fica**.

## Ordem de execução (1 instrução por vez)
1. ✅ **CONCLUÍDA e commitada** (`fd458ce "Viewport Laptop"`) — Fundação + chrome
   + Home: `--u` nos tokens (com o override `≤1023 → 1px`, que é o que mantém o
   mobile intacto) · `header/footer/botao/animacoes` · `home.css` · recuo do
   breakpoint da Home (1280→1023) · gate do carrossel de Destaques (≥1024).
   > ⚠️ **Deixou 2 regressões/defeitos**, achados pelo dono na validação em
   > laptop e diagnosticados pelo Opus — o **botão VER FEMININO do hero sumindo**
   > em janela baixa e o **ritmo vertical de Histórias**. Ambos têm a MESMA raiz:
   > layout preso à **altura da janela** (`vh`), que esta passada não cobriu no
   > hero nem no ritmo das seções. Correção em [`mobile.md`](./mobile.md).
2. ⬜ **Institucional** — converter `institucional.css` + tirar suas regras do
   bloco ≤1280.
3. ⬜ **Produtos (PLP)** — idem `produtos.css`.
4. ⬜ **Equipamento (PDP)** — idem `equipamento.css` (já nasceu com o mobile
   co-locado, deve ser a mais simples).
5. ⬜ **Os "outros viewports"** que o dono mencionou ter ajustes — aguardando ele
   dizer quais.

> **Estado intermediário esperado:** entre os passos 1 e 4, as páginas ainda não
> convertidas mostram o **chrome desktop escalado** (header/footer, que são
> compartilhados) com o **corpo** ainda em layout tablet na faixa 1024–1280.
> É intencional — não "consertar".

## Débito descoberto (2026-07-16): fronteira dos carrosséis do Equipamento
Ao conferir "os carrosséis no laptop" (pedido do dono), o Opus mediu ao vivo: a
Home ("OS MAIS VENDIDOS") já vira **desktop em ≥1024** (o `useModoCarrossel` foi
recuado no passo 1), mas os **2 carrosséis do Equipamento** (DESTAQUES + COMBINE
SEU SETUP) ficaram com a fronteira **antiga, 1281px** — no `useCarrosselComSetas.js`
e em 2 `@media` do `equipamento.css`. Efeito: em laptop **1024–1280px** eles rodam
em **modo mobile** (autoplay andando sozinho + arraste, setas escondidas), enquanto
a Home já está em desktop — inconsistente com a régua (desktop ≥1024).
**Correção pontual** (o dono mandou resolver só isto agora, sem converter a página
inteira): fronteira **1281 → 1024** nos 3 pontos. Seguro porque os cards já têm
largura desktop (320/260px) em 1024–1280 (só viram mobile em ≤768px) — muda só o
controle (autoplay→setas), não o layout. Instrução:
`sonnet/fazer/carrossel-equipamento-fronteira-1024.md`. **O corpo** da página
Equipamento (reflow `@media max-width:1280`) continua como frente futura (passo 4).

## Conferência (Opus)
Screenshots em **390 / 768 / 1023 / 1024 / 1280 / 1440** + **1440×1080** (pra
provar que o desktop parou de depender da altura da janela). Alvos em 1024:
logo 219px · nav 12px · H2 de seção 29,6px · Categorias **6 colunas** ·
Território **4 colunas**. Em 1440: **tudo idêntico a hoje**.
