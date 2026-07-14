# Material de Referência de Layout — Páginas Novas

Esta pasta guarda o **layout de referência das páginas novas** do X11 (as da
navegação + equipamento). É a **fonte da verdade do visual** dessas páginas —
para a **Home**, a fonte continua sendo o site rodando em desktop (ver
`docs/agentes/sonnet/contexto/`).

## Arquivos
| Arquivo | O que é |
|---|---|
| `institucional.pdf` | Layout da página **Institucional** (1 página longa). |
| `produto.pdf` | Layout da página de **Equipamento** (detalhe do produto). |
| `produtos.pdf` | Layout de **listagem de produtos** (homem/mulher/vitrine). |
| `*.txt` | Texto extraído de cada PDF (gerado por nós, ver abaixo). Fonte do **conteúdo real** — o PNG borra o corpo de texto. |

O dono também envia, quando preciso, um **PNG por página** (referência visual
fiel — o corpo de texto no PDF/PNG às vezes fica pequeno, mas a estrutura e os
títulos são legíveis).

## Origem (importa pra entender as limitações)
O dono recebeu **um único PDF** com todas as páginas → passou pro **Figma** via
extensão *PDF-to-Figma* (ficou "duro": sem camadas/componentes/auto-layout, só
vetor chapado) → reorganizou no **Canva** → exportou **1 PDF por página** (estes
arquivos). Consequências práticas:

- ⚠️ **Espaçamento problemático.** O dono avisou que o espaçamento no PDF está
  irregular. **NÃO copie métricas do PDF** (paddings, gaps, margens) ao pé da
  letra — use o **ritmo/tokens do design system** e o hero da Home como régua. O
  PDF vale por **estrutura, hierarquia e proporção**, não por valores exatos.
- ⚠️ **SVG do Canva é inútil.** O "SVG" exportado é um **PNG embrulhado** num
  `<image>` base64 (sem `<text>`/`<path>`/cor/fonte), em ~288px. Não use SVG.
- ⚠️ **Imagens embutidas são baixa-res.** As fotos dentro do PDF vão de ~200px a
  ~491px de largura — servem só de **referência de qual foto usar**, nunca como
  asset final. Heros/banners precisam das imagens em **alta resolução** (dos
  assets em `src/padrao/assets/images/` ou fornecidas pelo dono).

## ⭐ CONFERIR O PDF **VISUALMENTE** (regra do dono, obrigatória)
**Sempre conferir o PDF de layout VISUALMENTE — não só o `.txt`.** O texto
extraído perde tudo que importa de layout: posição, hierarquia, elementos sem
texto (estrelas de rating, swatches, setas de carrossel), splits de coluna,
imagens. (Ex.: a conferência visual da `produto.pdf` revelou o rating
"4.9 · 312 avaliações", a galeria de thumbnails, os 2 carrosséis e a ausência de
CTA de compra — nada disso aparecia no `produto.txt`.)

O leitor de PDF nativo do Claude precisa de `pdftoppm` (poppler), que **não**
está instalado (sem sudo) → ele sozinho **não** renderiza. Solução: renderizar o
PDF em **PNG via Docker rootless** (poppler) e então **ler os PNGs** com o leitor
de imagem nativo. Fluxo:

```bash
cd docs/layout
SHOTS="$SCRATCHPAD/produto-pdf"; mkdir -p "$SHOTS"   # pasta temporária (apagar depois)

# Nº de páginas / dimensões (páginas destes PDFs são 1 página LONGA e estreita):
docker run --rm -v "$PWD":/data -w /data minidocks/poppler \
  pdfinfo produto.pdf | grep -iE '^Pages|Page size'

# Render em PNG (visão geral, 150 dpi):
docker run --rm -v "$PWD":/data -v "$SHOTS":/out -w /data minidocks/poppler \
  pdftoppm -png -r 150 produto.pdf /out/produto      # → /out/produto-1.png

# Página muito alta? Renderize em alta (600 dpi) e FATIE em tiras verticais
# legíveis com o recorte do pdftoppm (-x -y -W -H, em pixels no -r dado):
for i in 0 1 2 3 4 5; do Y=$(( i * 950 )); \
  docker run --rm -v "$PWD":/data -v "$SHOTS":/out -w /data minidocks/poppler \
    pdftoppm -png -r 600 -x 0 -y $Y -W 1200 -H 1050 produto.pdf /out/strip_$i; done
# → leia /out/strip_*.png com o Read (imagem) para ler os detalhes.
```

Depois **apague os PNGs** (economia de espaço — mesma regra dos prints de
viewport). O PNG que o dono às vezes envia é um atalho, **não** substitui esta
conferência.

## Extrair TEXTO e listar imagens (Docker rootless)
Para o conteúdo real (o `.txt` é a fonte dos textos; o corpo no PNG às vezes fica
pequeno):

```bash
cd docs/layout
# Texto (layout preservado) de cada PDF:
docker run --rm -v "$PWD":/data -w /data minidocks/poppler \
  sh -c 'for f in institucional produto produtos; do pdftotext -layout "$f.pdf" "$f.txt"; done'

# Listar imagens embutidas (e resolução) de um PDF:
docker run --rm -v "$PWD":/data -w /data minidocks/poppler \
  pdfimages -list institucional.pdf
```

## Levantamentos por página
- **Institucional:** `docs/agentes/opus/backlog/institucional.md` (estrutura das
  seções + textos reais + assets existentes/faltando).
- Equipamento / listagens: a fazer quando entrarem no backlog.
