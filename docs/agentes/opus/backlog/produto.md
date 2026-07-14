# Levantamento — Página PRODUTO (detalhe do equipamento)

> **Fonte:** `docs/layout/produto.pdf` — **conferido VISUALMENTE** (render via
> Docker rootless + poppler `pdftoppm` → PNG; ver `docs/layout/README.md`), não
> só o `produto.txt`. A conferência visual revelou coisas que o texto sozinho
> não traz: o **rating "4.9 · 312 avaliações"** sob o título, a **galeria com
> coluna de 4 thumbnails + packshot em fundo claro**, os **dois carrosséis com
> setas**, e a **ausência de CTA de compra** no hero.
>
> **Página =** `src/paginas/equipamento/` (rota `/equipamento` já existe no
> `App.jsx`; hoje é scaffold `<h1>Equipamento</h1>`). É o destino dos cards de
> Favoritos (Home) e da grade da PLP. Mesma **liberdade de layout** da
> Institucional/PLP: **sem** a trava "desktop >1280px pixel-idêntico" — só
> preservar estética/conteúdo da marca e **não** reutilizar/editar seletores da
> Home. Reaproveitar de `src/padrao/`: Header, Footer, `BotaoCortado`, `Revela`/
> `RevelaComProgresso`, tokens, kicker `.p_laranja`, `.zoom_imagem`, o padrão de
> card da PLP (`.card_produto_plp`) e o mecanismo de carrossel de `Destaques`.

## Decisões do Opus (design — o dono pode vetar)
1. **Identidade do produto = JAQUETA EXPEDITION** (adventure). O layout mistura
   jaqueta/calça (Figma mesclou dois produtos): breadcrumb "PANTS / DUNE PRO",
   título "JAQUETA EXPEDITION", corpo cita "calça". Unifico como **jaqueta** —
   bate com o único packshot de jaqueta (`product-jacket.jpg`) e com a PLP
   ("HOMEM / JAQUETAS"). Onde o texto do PDF diz "calça"/"Dune Pro", usar
   "jaqueta"/"Expedition".
2. **Sem CTA de compra** (fiel ao layout — não há botão comprar/carrinho). COR e
   TAMANHO são **seletores decorativos** (hover + estado selecionado visual), sem
   lógica de e-commerce. Coerente com "vitrine" e com os filtros decorativos da
   PLP.
3. **Carrosséis (DESTAQUES e COMBINE SEU SETUP) — comportamento final** (refinos
   do dono em 2 conferências, 2026-07-14):
   - **Desktop** `(pointer:fine) e ≥1281px`: controle **só pelas setas** (sem
     arraste de mouse). Deslize das setas **suave** (tween EASE ~0.6s).
   - **Mobile/toque:** **só arraste** (sem setas — escondidas). Cards do COMBINE
     são `<a>` → precisam de `user-drag:none` pra o arraste do Framer funcionar.
   - Inset lateral **simétrico** (cards cortam com margem limpa dos 2 lados, não
     rente à borda).
   (Exceção pontual ao "setas decorativas" da Home, por ser página nova sem
   carrossel scroll-linked.)
4. **Fundo escuro no `<body>` (fix de raiz, 2026-07-14):** o `<body>` não tinha
   `background`, então qualquer `<Revela>` (transform) expunha o branco padrão do
   navegador nos vãos — causou a "faixa branca" (faixa de specs) e o "footer
   cortando" no mobile. Fix global: `body{background:var(--background_escuro)}`.
   Zero mudança no repouso do desktop (seções cobrem o body); só os vãos de
   reveal passam a mostrar escuro.
4. **Galeria com troca de imagem real** (clicar num thumbnail troca o packshot
   principal) — micro-interação de UI autocontida (`useState` local), como o
   toggle de filtros mobile da PLP. Não é "tornar decorativo funcional" no
   sentido proibido; é o comportamento nativo de uma galeria.

## Estrutura visual (topo → base) — conferida no PDF
Ordem exata do layout. Cada bloco vira um sub-componente em
`src/paginas/equipamento/` (espelhando `Produtos.jsx` → 5 sub-componentes).

1. **Breadcrumb** — `ADVENTURE / JAQUETAS / EXPEDITION H2O` (letter-spacing
   amplo, tom cinza/apagado, caixa-alta). Acima do hero.
2. **Hero do produto (split 2 colunas):**
   - **Esquerda — galeria:** coluna de **4 thumbnails** verticais (à esquerda) +
     **packshot principal grande em FUNDO CLARO** (`--background_claro`). Clicar
     no thumbnail troca a imagem principal; principal com `.zoom_imagem` no hover.
   - **Direita — info:** kicker laranja `COLEÇÃO LAB CRAFTED` → título
     `JAQUETA EXPEDITION` (2 linhas, Chakra Petch, cinza-claro) → **rating** (5
     estrelas laranja + `4.9 · 312 avaliações`, fonte-rótulo pequena) → **preço**
     `R$ 1.099` (grande, branco, Chakra Petch) → parágrafo descritivo → **COR**
     (label + 3 swatches quadrados; 1 selecionado com borda laranja) → **TAMANHO**
     (label + 6 chips quadrados com borda: P M G GG 3G 4G; 1 selecionável) →
     **GARANTIA** (ícone medalha laranja + `GARANTIA 6 MESES` / `fabricação`).
     Entrada em stagger no load (`heroStagger`/`heroItem`), **não** full-bleed.
3. **Faixa de 4 specs** (divisórias verticais sutis): `600D` RESISTÊNCIA À
   ABRASÃO · `CE 2` JOELHO + QUADRIL · `20K` MEMBRANA IMPERMEÁVEL · `4` ESTAÇÕES
   DO ANO. Número grande laranja (Chakra Petch) + label caixa-alta branco.
4. **ENGINEERED FEATURES:** kicker `ENGINEERED FEATURES` + título
   `Cada costura tem um propósito.` (caixa mista, 2 linhas) + parágrafo à direita
   ("Desenvolvida com pilotos de longa distância em três continentes. Testada em
   −5°C e em 42°C. A Expedition é a jaqueta que você esquece de tirar.") + **4
   colunas de feature** (ícone laranja + título bold + texto), divisórias
   verticais:
   - `PROTEÇÃO CE NÍVEL 2` — "Armaduras SAS-TEC nos joelhos e quadris, ajustáveis em altura."
   - `MEMBRANA H2O REMOVÍVEL` — "Camada interna 20.000mm impermeável, removível em segundos."
   - `VENTILAÇÃO DIRECIONAL` — "Zíperes YKK frontais e traseiros canalizam ar onde importa."
   - `4 ESTAÇÕES REAIS` — "Forro térmico zipável. De −5°C ao verão escaldante."
5. **Banner "TESTADO MINAS GERAIS"** (full-bleed): foto `testado-minas.jpg` (os
   dois motociclistas na trilha — **é exatamente a foto do PDF**, já nos assets) +
   overlay escuro + kicker laranja `COLEÇÃO LAB CRAFTED` + título `TESTADO` /
   `MINAS GERAIS` (2 linhas) + texto ("Quatro pilotos. Uma única jaqueta do início
   ao fim. Sem reparos. Sem reclamações. Apenas poeira, sal e a próxima curva.").
   Espírito do `Banner`/`Missao`.
6. **DIFERENCIAIS / ESSENCIAIS — tabela de especificações (split):**
   - **Esquerda:** kicker `COLEÇÃO LAB CRAFTED` + dois títulos empilhados
     `DIFERENCIAIS` e `ESSENCIAIS` + parágrafo curto.
   - **Direita:** tabela (label caixa-alta à esquerda / valor à direita, linha
     divisória entre linhas): TECIDO PRINCIPAL · REFORÇOS · MEMBRANA · FORRO
     TÉRMICO · PROTEÇÕES · VENTILAÇÃO · AJUSTES · CERTIFICAÇÃO · CONEXÕES.
     ⚠️ Typos do PDF corrigidos: **MENBRANA→MEMBRANA**, **ASJUTES→AJUSTES**.
     Valores são placeholder ("Abrasion-Tough 600D Nylon ripstop") — dono fornece
     os reais depois.
7. **DESTAQUES ("SINTA COM OS OLHOS") — carrossel horizontal:** kicker
   centralizado `SINTA COM OS OLHOS` + título `DESTAQUES` centralizado + **setas
   ← → funcionais** + **4 cards de imagem macro** (detalhe de costura/zíper/botão/
   logo), cada um com kicker `COLEÇÃO LAB CRAFTED` + legenda.
8. **23 RESPOSTAS — avaliações:** kicker `COLEÇÃO LAB CRAFTED` + título
   `23 RESPOSTAS` + **3 cards de review**: 5 estrelas laranja + texto + linha
   divisória + nome `MARINA OLIVEIRA` (bold) + localização `Curitiba › Ushuaia`.
9. **COMBINE SEU SETUP — cross-sell (carrossel):** kicker `SEGURANÇA DA CABEÇA
   AOS PÉS` + título `COMBINE SEU SETUP` + **setas ← → (topo-direita)** + **4
   cards de produto** (packshot fundo claro + nome + preço R$ 599,00): BOTA SIERRA
   · LUVA HAVOC · CAPACETE TURNER PRISMA 2 · CLIMATE 3. Reaproveitar o padrão
   `.card_produto_plp`; cards navegam para `/equipamento` (mesma vitrine).
10. **Footer** — compartilhado (o shell já renderiza; **não** recriar).

## Assets (o que existe vs. placeholder)
- **Banner "TESTADO MINAS GERAIS":** ✅ `testado-minas.jpg` (a própria foto do PDF).
- **Packshot / galeria da jaqueta:** ✅ `product-jacket.jpg` (principal). Não há 4
  fotos-detalhe distintas → thumbnails e cards de DESTAQUES usam as jaquetas
  disponíveis (`product-jacket`, `jaqueta_fav`, `conjunto2_fav`) alternadas como
  **placeholder**. ⚠️ **NÃO** usar `conjunto1_fav.jpg` (byte-a-byte igual a
  `colecao-hero.jpg` — bug de asset documentado no CHANGELOG/componentes.md).
- **COMBINE SEU SETUP:** bota → `product-boot.jpg`/`combine-boot.jpg`; luva →
  `luva_fav.jpg`; capacete → `placeholder-capacete.svg` (não há foto de capacete);
  CLIMATE 3 → placeholder (reusar um dos acima ou um `placeholder-*.svg`).
- Dono fornece os packshots reais depois (mesmo combinado da PLP).

## Pendências pro dono
1. Confirmar a **identidade "JAQUETA EXPEDITION"** (decisão 1) e o texto onde o
   PDF dizia "calça".
2. **Sem CTA de compra** (decisão 2) ou quer um "ONDE COMPRAR" → `/onde-encontrar`?
3. Packshots reais (galeria da jaqueta, 4 detalhes de DESTAQUES, 4 do setup) e
   capacete real.
4. Textos placeholder (lorem nas reviews, valores repetidos na tabela) — dono
   fornece os reais depois.
