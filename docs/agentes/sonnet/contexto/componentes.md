# Componentes / Seções

Cada componente representa uma seção visual da página. Todos estão em
`components/` (raiz). Classes CSS relevantes ficam em `src/index.css`.

| Componente | Classe raiz | Dados | Fundo | Descrição |
|---|---|---|---|---|
| `Header` | `header` | `data/navegacao.js` | preto | **2 estados (2026-07-10), 2 elementos físicos independentes:** `<header>` completo (logo + `nav` com 5 links + hambúrguer mobile), sempre em fluxo, visível no Hero/topo; `.header_minimalista` — barra `fixed` separada (logo pequeno + nav condensada + hambúrguer próprio), monta/some via fade só fora do Hero, **sempre visível** enquanto montada (nunca some ao rolar). Ver `estilos.md`. |
| `Hero_Home` | `.hero` | — (estático) | imagem `hero-home.jpg` | Título grande, parágrafo e 2 botões cortados (`clip-path`). Texto posicionado com `top/left` absolutos. |
| `Favoritos` | `.favoritos` | `data/favoritos.js` | `--background_escuro` | 3 cards com imagem, nome, descrição e link "COMPRAR". |
| `Lancamento_desconto` | `.lancamento_desconto` | — (estático) | `--background_claro` | Grid 7col: texto (4) + imagem (3). Único bloco de fundo claro. |
| `Categorias` | `.categorias` | `data/categorias.js` | `--background_escuro` | Grid 6col × 2 linhas com 12 cards de categoria (seta ↗). |
| `Lancamento_especial` | `.lancamento_especial` | — (estático) | imagem `cat-aventura.jpg` + gradiente | Texto sobre imagem com overlay `::after`. |
| `Territorio` | `.territorio` | `data/territorio.js` | `--background_escuro` | 4 cards "onde você pilota" (imagem + subtítulo + título). |
| `Destaques` | `.destaques` | `data/destaques.js` | `--background_cinza` | **Fase 4 (2026-07-10):** 2 modos em runtime. Desktop >1280px + ponteiro fino → renderiza `<CarrosselDestaques/>` (componente-filho próprio, ver linha abaixo) — **Horizontal Scroll Carousel** (única exceção do projeto à regra "desktop >1280px intocado"). Qualquer outro caso (tablet/touch/reduced-motion) → fallback com cabeçalho + setas ← → (decorativas) e swipe/snap (grid 5col só em reduced-motion desktop). Ver `estilos.md`. |
| `CarrosselDestaques` | `.destaques_carrossel` | `data/destaques.js` | `--background_cinza` | **Novo (2026-07-10), sub-componente de `Destaques`** (não é uma seção própria da página — só existe montado pelo pai quando o modo carrossel está ativo). Seção com altura **proporcional ao deslocamento medido** (`calc(100vh + deslocamento×1.35px)`, não mais `300vh` fixo — polimento 2026-07-10) + `.destaques_pin` (`sticky`) + `.trilho_carrossel` (`x` suavizado por `useSpring`, ligado a `useScroll`). Isolado num componente à parte de propósito: precisa que o `<section ref>` já exista no 1º render pro `useScroll` vincular certo (bug corrigido em rodada anterior — ver `estilos.md`/CHANGELOG). |
| `Historias` | `.historias` | `data/historias.js` | `--background_escuro` | 3 cards de histórias (imagem + título + texto + "LEIA MAIS"). |
| `Banner` | `.banner` | — (estático) | `--background_cinza` | Frase única gigante centralizada, bordas superior/inferior. |
| `Footer` | `.footer` | `data/footer.js` | `--background_escuro` | 3 colunas de links + rodapé (copyright + logo). |

## Componentes ainda estáticos (sem dados externos)
`Hero_Home`, `Lancamento_desconto`, `Lancamento_especial` e `Banner` têm conteúdo
único (não repetido), então o texto vive no próprio JSX. Isso é aceitável, mas se
o conteúdo precisar variar, extrair para `src/data/` seguindo o padrão.

## Elementos decorativos (NÃO funcionais — por decisão do dono)
- Setas ← → em `Destaques`: apenas visuais (hover), nunca viram controle
  manual do carrossel — no modo carrossel (Fase 4) ficam **ocultas** (o
  trilho já se move sozinho, ligado ao scroll).
- Botões "VER MASCULINO/FEMININO" no Hero, "COMO PARTICIPAR", "EXPLORAR COLEÇÃO":
  sem ação/rota.
- Links de categoria e do footer: `href` placeholder.
> Esses elementos recebem apenas **micro-interações de hover/animação**, nunca
> lógica funcional (a menos que o dono peça em fase futura).

## Erros de conteúdo conhecidos (NÃO corrigir sem pedir)
Existem typos no texto original (`MOTOCILISMO` no Banner, `COMBRO` em
Lancamento_desconto, título cortado em Historias). O dono ainda não autorizou
correção — manter como está até haver pedido explícito.
