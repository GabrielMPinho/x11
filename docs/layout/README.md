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

## Como extrair conteúdo (poppler NÃO está instalado; usar Docker rootless)
O servidor não tem `poppler-utils` e não há `sudo`. Extraímos via **Docker
rootless** (disponível, sem sudo):

```bash
cd docs/layout
# Texto (layout preservado) de cada PDF:
docker run --rm -v "$PWD":/data -w /data minidocks/poppler \
  sh -c 'for f in institucional produto produtos; do pdftotext -layout "$f.pdf" "$f.txt"; done'

# Listar imagens embutidas (e resolução) de um PDF:
docker run --rm -v "$PWD":/data -w /data minidocks/poppler \
  pdfimages -list institucional.pdf
```

> O leitor de PDF nativo do Claude também precisa de poppler (`pdftoppm`), então
> **não** renderiza aqui. Para ver o visual, use o **PNG** que o dono envia.

## Levantamentos por página
- **Institucional:** `docs/agentes/opus/backlog/institucional.md` (estrutura das
  seções + textos reais + assets existentes/faltando).
- Equipamento / listagens: a fazer quando entrarem no backlog.
