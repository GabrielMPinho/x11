# Levantamento — Páginas de PRODUTOS (listagem Homem/Mulher)

> Fonte: `docs/layout/produtos.pdf` (**visual renderizado** + `produtos.txt`).
> **Homem e Mulher = a MESMA página** (listagem/PLP) — iguais inicialmente (só o
> rótulo do breadcrumb muda). Estética dark + laranja + fontes novas. Rotas
> `/homem` e `/mulher` já existem. Reaproveitar Header/Footer/tokens.

## Arquitetura
- Página de listagem **reutilizável** em `src/paginas/produtos/` (componente
  `Produtos` + sub-componentes + `dados/`). `Homem.jsx` e `Mulher.jsx` renderizam
  `<Produtos genero="Homem" />` / `"Mulher"` — **iguais por ora** (o `genero` só
  muda o breadcrumb "HOMEM / JAQUETAS"). Casa com a ideia de padronizar.

## Estrutura visual (topo → base)
1. **Hero-faixa da coleção** (~40–50vh, **NÃO** tela cheia): imagem de fundo
   (piloto) + overlay escuro; kicker laranja **COLEÇÃO LAB CRAFTED** + título
   **COLEÇÃO SPORADIC** (Chakra Petch, branco, 2 linhas).
2. **Barra de categorias** (fundo escuro): breadcrumb **HOMEM / JAQUETAS**
   (esquerda) + abas **TUDO · ADVENTURE · TOURING · SPORT · URBAN · CLÁSSICO**
   (direita, botões com borda; ADVENTURE aparece ativo).
3. **Corpo split — sidebar (esquerda) + grade (direita):**
   - **Sidebar de filtros:** `TAMANHOS` (grade P/M/G/GG/3G/4G) · `PREÇOS` (range
     slider R$ 200–R$ 2.200, trilho laranja) · `ESTAÇÃO` (4 Estações / Verão /
     Inverno) · `COR` (swatches laranja/cinza/bege) · `ESPECIFICAÇÕES` (CE Nível
     1, CE Nível 2, Classe AAA).
   - **Topo da grade:** contador "12 DE 24 PRODUTOS" (esquerda) + dropdown "EM
     DESTAQUE" (direita, botão com borda).
   - **Grade 3 col × 4 linhas = 12 cards.** Card: **imagem packshot em FUNDO
     CLARO** + tag laranja "ADVENTURE · 4-SEASONS" + **nome** (bold) + **R$ 599,00**
     + linha de swatches de cor + "+N".
4. **Bloco editorial** (card escuro): kicker COLEÇÃO LAB CRAFTED + "Como escolher
   sua jaqueta?" + texto + botão "EM DESTAQUE".
5. **Footer** (compartilhado — não recriar).

## Dados (data-driven)
- **Produtos (12):** `{ tag:"ADVENTURE · 4-SEASONS", nome, preco:599.00, imagem, cores:[...] }`.
  Nomes na ordem: EXPEDITION CERRADO · TRAVEL 3 · VELER · IRON 3 · STRECH · ONE
  SPORT · STREET HOODY · PUFFER · RAIN CASUAL · GUARD 3 · SUPER AIR · NEO CITY.
- **Filtros:** categorias, tamanhos, estações, cores, especificações (arrays).

## Decisões (Opus)
- **Filtros / slider / abas / dropdown = VISUAIS (decorativos)** nesta passada —
  sem lógica de filtro real (padrão do projeto: decorativos só recebem hover).
- **Cards de produto na COR DO FUNDO (escuro)** — o dono corrigiu (2026-07-13):
  card claro destoa e vira "figurinha"; integrar ao dark (`--background_escuro`,
  separação sutil se preciso). (No PDF aparecem claros, mas o dono prefere escuro.)
- **Sidebar de filtros STICKY** (dono, 2026-07-13): acompanha o scroll no desktop.
- **Imagens:** não há 12 jaquetas distintas nos assets → usar os disponíveis
  (`product-jacket`, `jaqueta_fav`, `conjunto1_fav`, `conjunto2_fav`) **alternados**
  como placeholder; o dono fornece as 12 reais depois.
- **Typos do layout** ("TAMNHOS", "INVERSO"→Inverno, "ESPECIFICAÇÃOES") — usar a
  **grafia correta** (é conteúdo novo).

## Pendências pro dono
1. 12 imagens de produto reais (packshots em fundo claro).
2. Os filtros devem **funcionar** (fase futura) ou seguem visuais?
3. Clicar num card → página de **produto** (detalhe, `produto.pdf`) — próxima página.
