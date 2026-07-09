# Componentes / Seções

Cada componente representa uma seção visual da página. Todos estão em
`components/` (raiz). Classes CSS relevantes ficam em `src/index.css`.

| Componente | Classe raiz | Dados | Fundo | Descrição |
|---|---|---|---|---|
| `Header` | `header` | `data/navegacao.js` | preto | Logo (posicionado com `top/left`) + `nav` com 5 links. |
| `Hero_Home` | `.hero` | — (estático) | imagem `hero-home.jpg` | Título grande, parágrafo e 2 botões cortados (`clip-path`). Texto posicionado com `top/left` absolutos. |
| `Favoritos` | `.favoritos` | `data/favoritos.js` | `--background_escuro` | 3 cards com imagem, nome, descrição e link "COMPRAR". |
| `Lancamento_desconto` | `.lancamento_desconto` | — (estático) | `--background_claro` | Grid 7col: texto (4) + imagem (3). Único bloco de fundo claro. |
| `Categorias` | `.categorias` | `data/categorias.js` | `--background_escuro` | Grid 6col × 2 linhas com 12 cards de categoria (seta ↗). |
| `Lancamento_especial` | `.lancamento_especial` | — (estático) | imagem `cat-aventura.jpg` + gradiente | Texto sobre imagem com overlay `::after`. |
| `Territorio` | `.territorio` | `data/territorio.js` | `--background_escuro` | 4 cards "onde você pilota" (imagem + subtítulo + título). |
| `Destaques` | `.destaques` | `data/destaques.js` | `--background_cinza` | Cabeçalho com setas ← → (decorativas) + grid 5col de produtos. |
| `Historias` | `.historias` | `data/historias.js` | `--background_escuro` | 3 cards de histórias (imagem + título + texto + "LEIA MAIS"). |
| `Banner` | `.banner` | — (estático) | `--background_cinza` | Frase única gigante centralizada, bordas superior/inferior. |
| `Footer` | `.footer` | `data/footer.js` | `--background_escuro` | 3 colunas de links + rodapé (copyright + logo). |

## Componentes ainda estáticos (sem dados externos)
`Hero_Home`, `Lancamento_desconto`, `Lancamento_especial` e `Banner` têm conteúdo
único (não repetido), então o texto vive no próprio JSX. Isso é aceitável, mas se
o conteúdo precisar variar, extrair para `src/data/` seguindo o padrão.

## Elementos decorativos (NÃO funcionais — por decisão do dono)
- Setas ← → em `Destaques`: apenas visuais, sem carrossel.
- Botões "VER MASCULINO/FEMININO" no Hero, "COMO PARTICIPAR", "EXPLORAR COLEÇÃO":
  sem ação/rota.
- Links de categoria e do footer: `href` placeholder.
> Esses elementos recebem apenas **micro-interações de hover/animação**, nunca
> lógica funcional (a menos que o dono peça em fase futura).

## Erros de conteúdo conhecidos (NÃO corrigir sem pedir)
Existem typos no texto original (`MOTOCILISMO` no Banner, `COMBRO` em
Lancamento_desconto, título cortado em Historias). O dono ainda não autorizou
correção — manter como está até haver pedido explícito.
