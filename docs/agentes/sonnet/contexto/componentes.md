# Componentes / Seções

Cada componente representa uma seção visual da página **Home**. Os
**compartilhados** (`Header`, `Footer`, `BotaoCortado`) ficam em
`src/padrao/componentes/`; as **seções da Home** em `src/paginas/home/`. Dados
compartilhados (`navegacao`, `footer`) em `src/padrao/dados/`; dados da Home em
`src/paginas/home/dados/` (a coluna "Dados" abaixo cita o nome do arquivo).
Classes CSS relevantes ficam em `src/padrao/estilos/base.css`. (A tabela
abaixo é da **Home**; a página **Institucional**, em construção, tem sua
própria seção mais adiante.)

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

## Página Institucional (`src/paginas/institucional/`) — COMPLETA (2026-07-13)
`Institucional.jsx` é `<main className="institucional">` renderizando o Hero
+ 6 seções, na ordem do layout (`docs/agentes/opus/backlog/institucional.md`).
Acessível em **`/institucional`** (roteamento, ver `arquitetura.md`) — não
depende mais de toggle no `App.jsx`. Diferente da Home, esta página **não**
tem a trava de "desktop >1280px pixel-idêntico" — total liberdade de layout,
desde que preserve estética/conteúdo da marca e não reutilize/edite
seletores da Home. Dados repetidos em `src/paginas/institucional/dados/`
(`features.js`, `timeline.js`, `valores.js`, `textosQuemSomos.js`).

| Componente | Classe raiz | Dados | Fundo | Descrição |
|---|---|---|---|---|
| `HeroInstitucional` | `.hero_institucional` | — (estático, texto no JSX) | imagem `testado-minas.jpg` | Espelha a arquitetura do `Hero_Home.jsx` (**não** os seletores): full-bleed (~92vh) com `.hero_institucional_bg` (parallax via `useScroll`+`useTransform`, fallback `useReducedMotion`) + overlay `::after` **radial centrado** (2026-07-13: era gradiente lateral, texto foi CENTRALIZADO — correção do dono) + bloco de texto centralizado (`text-align:center`, `max-width:640px`) com entrada em stagger: kicker `.p_laranja` ("INSTITUCIONAL") → `h1` `--fonte-titulo` ("Movidos pela mesma paixão.") → subtítulo laranja ("A liberdade sobre duas rodas"). Sem botões/CTA. **Imagem é placeholder** — dono pode trocar por foto oficial em alta-res depois. |
| `QuemSomos1` | `.quemsomos1_secao` | `dados/features.js` + `dados/textosQuemSomos.js` | `--background_escuro` | Kicker+título+3 parágrafos (split 2col, topo) + grade de **4 features** (ícone SVG inline laranja via `IconesFeatures.jsx` + título + texto), filete superior. Reveal coreografado (`useProgressoSecao`+`RevelaComProgresso` por elemento, como `Lancamento_desconto`); cards de grade usam `atrasoCard`/`LARGURA_ENTRADA_CARD`. Responsivo 4→2→1 colunas nas features. |
| `QuemSomos2` | `.quemsomos_split.quemsomos2_secao` | `dados/textosQuemSomos.js` | `--background_cinza` | Split: imagem (**`jaqueta_fav.jpg`**, esquerda, `.zoom_imagem` — corrigido 2026-07-13, era `institucional-quemsomos.jpg`, uma foto de grupo que não batia com o detalhe de jaqueta do PDF) + kicker/título/texto (direita). Compartilha `.quemsomos_split` com `QuemSomos3` — a inversão de lado é só ordem no JSX. Empilha em mobile (imagem em cima, ordem natural). |
| `Timeline` | `.timeline_secao` | `dados/timeline.js` | `--background_escuro` | 4 marcos (2007/2009/2015/2021), número grande `--fonte-titulo` laranja + filete superior. **Sem kicker/título próprio** (o layout não tem cabeçalho pra esta seção). Responsivo 4→2→1. |
| `QuemSomos3` | `.quemsomos_split.quemsomos3_secao` | — (parágrafo único no JSX) | `--background_cinza` | Split invertido: texto (esquerda) + imagem (`institucional-detalhe.jpg`, direita, `.zoom_imagem`). Empilha em mobile. |
| `Missao` | `.missao_secao` | — (estático, texto no JSX) | foto `institucional-quemsomos.jpg` (grupo de motociclistas) + overlay | Faixa-citação "no espírito do `Banner`" da Home (frase grande centralizada + bordas superior/inferior), mas com o reveal padrão da página (não o blur-por-palavra do `Banner`). **Fundo com foto (corrigido 2026-07-13)** — mesma técnica em camadas do Hero: `.missao_bg` (imagem `cover` via CSS, não import) atrás + `.missao_secao::after` (gradiente escuro) na frente + `.missao_conteudo` (`z-index:1`) por cima, sem parallax. Frase sem itálico (removido na mesma correção). |
| `Valores` | `.valores_secao` | `dados/valores.js` | `--background_cinza` | Kicker+título centralizados + 3 colunas numeradas (01/02/03). Responsivo 3→1 (pedido explícito da instrução). |

**Ícones das features (`IconesFeatures.jsx`):** 4 SVGs inline minimalistas
(escudo/raio/camadas/capacete), `viewBox 24×24`, cor via `currentColor` +
`.feature_icone svg{color:var(--laranja)}` — primeiro corte, sem dependência
nova; mapeados por chave (`icone` em `dados/features.js`) pra manter a data
só com texto. Podem ser refinados numa conferência visual futura.

**Pendências herdadas do backlog** (não resolvidas — fora do escopo decidir
sozinho): texto duplicado entre Quem Somos #1/#2 (placeholder no PDF
original); título "02" de Valores repete o nome de uma feature de Quem Somos
#1. A foto da Missão usa o mesmo asset que saiu do QS#2
(`institucional-quemsomos.jpg`, grupo de motociclistas) — serve por ora, mas
pode ser trocada por uma foto oficial em alta-res dedicada à Missão depois.
Ver `docs/agentes/opus/backlog/institucional.md`.
