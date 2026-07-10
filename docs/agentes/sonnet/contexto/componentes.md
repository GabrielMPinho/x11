# Componentes / Seções

Cada componente representa uma seção visual da página **Home**. Os
**compartilhados** (`Header`, `Footer`, `BotaoCortado`) ficam em
`src/padrao/componentes/`; as **seções da Home** em `src/paginas/home/`. Dados
compartilhados (`navegacao`, `footer`) em `src/padrao/dados/`; dados da Home em
`src/paginas/home/dados/` (a coluna "Dados" abaixo cita o nome do arquivo).
Classes CSS relevantes ficam em `src/padrao/estilos/base.css`.

| Componente | Classe raiz | Dados | Fundo | Descrição |
|---|---|---|---|---|
| `Header` | `header` | `data/navegacao.js` | preto | **2 estados (2026-07-10), 2 elementos físicos independentes:** `<header>` completo (logo + `nav` com 5 links + hambúrguer mobile), sempre em fluxo, visível no Hero/topo; `.header_minimalista` — barra `fixed` separada (logo pequeno + nav condensada + hambúrguer próprio), monta/some via fade só fora do Hero, **sempre visível** enquanto montada (nunca some ao rolar). **Logo clicável (2026-07-10):** nos 2 estados, `<img>` envolvido num `<button>` que rola pro topo via Lenis (`lenis.scrollTo(0)`, fallback nativo). Ver `estilos.md`. |
| `Hero_Home` | `.hero` | — (estático) | imagem `hero-home.jpg` | Título grande, parágrafo e 2 botões cortados (`clip-path`). Texto posicionado com `top/left` absolutos. |
| `Favoritos` | `.favoritos` | `data/favoritos.js` | `--background_escuro` | 3 cards com imagem, nome, descrição e link "COMPRAR". |
| `Lancamento_desconto` | `.lancamento_desconto` | — (estático) | `--background_claro` | Grid 7col: texto (4) + imagem (3). Único bloco de fundo claro. |
| `Categorias` | `.categorias` | `data/categorias.js` | `--background_escuro` | Grid 6col × 2 linhas com 12 cards de categoria (seta ↗). |
| `Lancamento_especial` | `.lancamento_especial` | — (estático) | imagem `cat-aventura.jpg` + gradiente | Texto sobre imagem com overlay `::after`. |
| `Territorio` | `.territorio` | `data/territorio.js` | `--background_escuro` | 4 cards "onde você pilota" (imagem + subtítulo + título). |
| `Destaques` | `.destaques` | `data/destaques.js` | `--background_cinza` | **Fase 4 (2026-07-10), 3 modos em runtime (era 2):** `hijack` (desktop >1280px + ponteiro fino) → `<CarrosselDestaques/>` — **Horizontal Scroll Carousel** (única exceção do projeto à regra "desktop >1280px intocado"). `arrastavel` (touch/tablet/ponteiro grosso, sem reduced-motion) → `<CarrosselArrastavel/>` (novo). `estatico` (reduced-motion) → fallback acessível com cabeçalho + setas ← → (decorativas) e swipe/snap CSS puro (grid 5col só em reduced-motion desktop). Ver `estilos.md`. |
| `CarrosselDestaques` | `.destaques_carrossel` | `data/destaques.js` | `--background_cinza` | Sub-componente de `Destaques` pro modo `hijack` (não é uma seção própria da página). Seção com altura **proporcional ao deslocamento medido** (`calc(100vh + deslocamento×1.35px)`, não mais `300vh` fixo) + `.destaques_pin` (`sticky`) + `.trilho_carrossel` (`x` suavizado por `useSpring`, ligado a `useScroll`). Isolado num componente à parte de propósito: precisa que o `<section ref>` já exista no 1º render pro `useScroll` vincular certo. |
| `CarrosselArrastavel` | `.destaques_arrastavel` | `data/destaques.js` | `--background_cinza` | **Novo (2026-07-10), sub-componente de `Destaques` pro modo `arrastavel`** (touch/tablet/ponteiro grosso, sem reduced-motion — substitui o antigo fallback de swipe nativo, que o Lenis, Fase 5, quebrava no mobile). Trilho `motion.div` com **`drag="x"`** de verdade (não ligado a scroll), `dragConstraints` medido, `dragElastic`+`dragMomentum`. `data-lenis-prevent` no container pra não brigar com o Lenis; `touch-action:pan-y` no trilho pra separar o gesto horizontal (drag) do vertical (scroll da página). Ver `estilos.md`. |
| `Historias` | `.historias` | `data/historias.js` | `--background_escuro` | 3 cards de histórias (imagem + título + texto + "LEIA MAIS"). |
| `Banner` | `.banner` | — (estático) | `--background_cinza` | Frase única gigante centralizada, bordas superior/inferior. |
| `Footer` | `.footer` | `data/footer.js` | `--background_escuro` | 3 colunas de links + rodapé (copyright + logo). |

## Componentes ainda estáticos (sem dados externos)
`Hero_Home`, `Lancamento_desconto`, `Lancamento_especial` e `Banner` têm conteúdo
único (não repetido), então o texto vive no próprio JSX. Isso é aceitável, mas se
o conteúdo precisar variar, extrair para `src/paginas/home/dados/` (ou
`src/padrao/dados/` se for compartilhado) seguindo o padrão.

## Elementos decorativos (NÃO funcionais — por decisão do dono)
- Setas ← → em `Destaques`: apenas visuais (hover), nunca viram controle
  manual do carrossel — **ocultas** no modo `hijack` (o trilho já se move
  sozinho, ligado ao scroll); **mantidas** nos modos `arrastavel` e
  `estatico` (sinalizam "isso é navegável", já que ali o trilho não se move
  sozinho).
- Botões "VER MASCULINO/FEMININO" no Hero, "COMO PARTICIPAR", "EXPLORAR COLEÇÃO":
  sem ação/rota.
- Links de categoria e do footer: `href` placeholder.
> Esses elementos recebem apenas **micro-interações de hover/animação**, nunca
> lógica funcional (a menos que o dono peça em fase futura).

## Erros de conteúdo conhecidos (NÃO corrigir sem pedir)
Existem typos no texto original (`MOTOCILISMO` no Banner, `COMBRO` em
Lancamento_desconto, título cortado em Historias). O dono ainda não autorizou
correção — manter como está até haver pedido explícito.
