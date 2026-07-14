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
1. **⏳ ATIVA — Fundação + chrome + Home** (`escala-desktop-1024-1440.md`):
   `--u` nos tokens · `header.css`/`footer.css`/`botao.css`/`animacoes.css` ·
   `home.css` · recuo do breakpoint da Home (1280→1023) · gate do carrossel de
   Destaques (>1280 → ≥1024).
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

## Conferência (Opus)
Screenshots em **390 / 768 / 1023 / 1024 / 1280 / 1440** + **1440×1080** (pra
provar que o desktop parou de depender da altura da janela). Alvos em 1024:
logo 219px · nav 12px · H2 de seção 29,6px · Categorias **6 colunas** ·
Território **4 colunas**. Em 1440: **tudo idêntico a hoje**.
