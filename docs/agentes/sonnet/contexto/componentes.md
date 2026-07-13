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
| `Hero_Home` | `.hero` | — (estático) | imagem `hero-home.jpg` | Título grande, parágrafo e 2 botões cortados (`clip-path`). Texto posicionado com `top/left` absolutos. **Botões navegam (2026-07-13):** `VER MASCULINO`→`/homem`, `VER FEMININO`→`/mulher` (`BotaoCortado para="..."`). |
| `Favoritos` | `.favoritos` | `data/favoritos.js` | `--background_escuro` | 3 cards com imagem, nome, descrição. **Card inteiro clicável (2026-07-13)** → `/equipamento` (`as="a"`+`onClick`/`preventDefault`, mesmo padrão do Header); "COMPRAR" virou `<span class="cta_comprar">` (visual, não é mais o link — o card todo é). Hover: elevação (`outline`, não `border` — zero impacto de layout) + sombra + zoom intensificado (`scale(1.05)`) + sublinhado laranja no CTA. |
| `Lancamento_desconto` | `.lancamento_desconto` | — (estático) | `--background_claro` | Grid 7col: texto (4) + imagem (3). Único bloco de fundo claro. Botão "COMO PARTICIPAR" **continua decorativo** (sem página de destino ainda). |
| `Categorias` | `.categorias` | `data/categorias.js` | `--background_escuro` | Grid 6col × 2 linhas com 12 cards de categoria (seta ↗). **Cards navegam (2026-07-13):** `dados/categorias.js` tem `genero` (não mais `link` — rota `/categoria/…` não existia); masculino/neutro→`/homem`, feminino→`/mulher`, mesmo padrão de clique de Favoritos. Hover reforçado como as demais grades. |
| `Lancamento_especial` | `.lancamento_especial` | — (estático) | imagem `cat-aventura.jpg` + gradiente | Texto sobre imagem com overlay `::after`. **Botão navega (2026-07-13):** "EXPLORAR COLEÇÃO"→`/homem` (`BotaoCortado para="/homem"`). |
| `Territorio` | `.territorio` | `data/territorio.js` | `--background_escuro` | 4 cards "onde você pilota" (imagem + subtítulo + título). **Sem navegação** (nenhum destino definido pro dono ainda) — só hover reforçado (2026-07-13: elevação/sombra/anel laranja/zoom, mesmo padrão coeso das outras grades). |
| `Destaques` | `.destaques` | `data/destaques.js` | `--background_cinza` | **Fase 4 (2026-07-10), 3 modos em runtime (era 2):** `hijack` (desktop >1280px + ponteiro fino) → `<CarrosselDestaques/>` — **Horizontal Scroll Carousel** (única exceção do projeto à regra "desktop >1280px intocado"). `arrastavel` (touch/tablet/ponteiro grosso, sem reduced-motion) → `<CarrosselArrastavel/>` (novo). `estatico` (reduced-motion) → fallback acessível com cabeçalho + setas ← → (decorativas) e swipe/snap CSS puro (grid 5col só em reduced-motion desktop). **Sem navegação** (nenhum destino definido) — `.card_produto` (compartilhado pelos 3 modos) ganhou o mesmo hover reforçado das outras grades (2026-07-13). Ver `estilos.md`. |
| `CarrosselDestaques` | `.destaques_carrossel` | `data/destaques.js` | `--background_cinza` | Sub-componente de `Destaques` pro modo `hijack` (não é uma seção própria da página). Seção com altura **proporcional ao deslocamento medido** (`calc(100vh + deslocamento×1.35px)`, não mais `300vh` fixo) + `.destaques_pin` (`sticky`) + `.trilho_carrossel` (`x` suavizado por `useSpring`, ligado a `useScroll`). Isolado num componente à parte de propósito: precisa que o `<section ref>` já exista no 1º render pro `useScroll` vincular certo. |
| `CarrosselArrastavel` | `.destaques_arrastavel` | `data/destaques.js` | `--background_cinza` | **Novo (2026-07-10), sub-componente de `Destaques` pro modo `arrastavel`** (touch/tablet/ponteiro grosso, sem reduced-motion — substitui o antigo fallback de swipe nativo, que o Lenis, Fase 5, quebrava no mobile). Trilho `motion.div` com **`drag="x"`** de verdade (não ligado a scroll), `dragConstraints` medido, `dragElastic`+`dragMomentum`. `data-lenis-prevent` no container pra não brigar com o Lenis; `touch-action:pan-y` no trilho pra separar o gesto horizontal (drag) do vertical (scroll da página). Ver `estilos.md`. |
| `Historias` | `.historias` | `data/historias.js` | `--background_escuro` | 3 cards de histórias (imagem + título + texto + "LEIA MAIS"). "LEIA MAIS" **continua decorativo** (`href="#"`, sem página de blog ainda) — ganhou sublinhado animado no hover (2026-07-13), mesmo tratamento do `.cta_comprar` de Favoritos. |
| `Banner` | `.banner` | — (estático) | `--background_cinza` | Frase única gigante centralizada, bordas superior/inferior. |
| `Footer` | `.footer` | `data/footer.js` | `--background_escuro` | 3 colunas de links + rodapé (copyright + logo). |

## Componentes ainda estáticos (sem dados externos)
`Hero_Home`, `Lancamento_desconto`, `Lancamento_especial` e `Banner` têm conteúdo
único (não repetido), então o texto vive no próprio JSX. Isso é aceitável, mas se
o conteúdo precisar variar, extrair para `src/paginas/home/dados/` (ou
`src/padrao/dados/` se for compartilhado) seguindo o padrão.

## Navegação da Home (2026-07-13 — reverte a regra antiga "tudo decorativo")
O dono pediu pra ligar parte dos botões/links da Home a rotas reais (ver
CHANGELOG, "Home: botões navegando + mais interatividade nos cards"):
- **Navegam de verdade:** Hero (`VER MASCULINO`→`/homem`,
  `VER FEMININO`→`/mulher`), Lançamento especial (`EXPLORAR COLEÇÃO`→`/homem`),
  Favoritos (card inteiro→`/equipamento`), Categorias (card inteiro→
  `/homem` ou `/mulher`, por gênero).
- **`BotaoCortado` ganhou a prop opcional `para`** — só os 2 usos acima
  (Hero, Lançamento especial) a usam; Lançamento desconto não, e continua
  idêntico a antes.

## Elementos ainda decorativos (NÃO funcionais — por decisão do dono)
- Setas ← → em `Destaques`: apenas visuais (hover), nunca viram controle
  manual do carrossel — **ocultas** no modo `hijack` (o trilho já se move
  sozinho, ligado ao scroll); **mantidas** nos modos `arrastavel` e
  `estatico` (sinalizam "isso é navegável", já que ali o trilho não se move
  sozinho).
- Botões "COMO PARTICIPAR" (Lançamento desconto) e "LEIA MAIS" (Histórias):
  sem página de blog/promoção ainda — o dono define o destino depois.
- Cards de `Territorio` e `Destaques`: sem destino definido, só ganharam
  hover reforçado (elevação/sombra/anel/zoom), não navegação.
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

## Página Produtos — PLP (`src/paginas/produtos/`) — COMPLETA (2026-07-13)
**Listagem compartilhada** entre `/homem` e `/mulher`: `Homem.jsx`/`Mulher.jsx`
só renderizam `<Produtos genero="Homem"|"Mulher" />` — 2 linhas cada, a
página real vive inteira em `src/paginas/produtos/`. `Produtos.jsx` monta as
5 seções abaixo, na ordem; Header/Footer vêm do shell. Mesma liberdade de
layout da Institucional (sem trava de desktop >1280px pixel-idêntico).
Dados em `src/paginas/produtos/dados/` (`produtos.js` — 12 itens,
`filtros.js` — categorias/tamanhos/estações/cores/especificações).

| Componente | Classe raiz | Dados | Fundo | Descrição |
|---|---|---|---|---|
| `HeroColecao` | `.colecao_hero` | — (estático, texto no JSX) | imagem `jaqueta_fav.jpg` | Faixa curta (~45vh, **não** tela cheia — diferente dos heroes full-bleed da Home/Institucional) + overlay `::after` reforçado (2 camadas: gradiente forte da esquerda + leve base) + kicker "COLEÇÃO LAB CRAFTED" + título "COLEÇÃO SPORADIC". Entrada em stagger no load, **sem parallax**. **Imagem é placeholder** (corrigida 2026-07-13, era `colecao-hero.jpg` — clara/verde, destoava do clima urbano-escuro do PDF) — dono pode trocar pela definitiva depois. |
| `BarraCategorias` | `.barra_categorias` | `dados/filtros.js` (`categorias`) | `--background_escuro` | Breadcrumb `{genero} / JAQUETAS` (prop `genero`) + 6 abas decorativas (`ativo:true` em ADVENTURE, fiel ao PDF). Abas roláveis (`overflow-x:auto`) se faltar espaço. |
| `SidebarFiltros` | `.sidebar_filtros` | `dados/filtros.js` (`tamanhos`/`estacoes`/`cores`/`especificacoes`) | — | 5 blocos **decorativos** (TAMANHOS, PREÇOS — slider falso, ESTAÇÃO, COR — swatches, ESPECIFICAÇÕES — checkbox-like), **sem lógica de filtro real** (padrão do projeto: só hover). **`position:sticky;top:80px`** (2026-07-13, correção 3) — acompanha o scroll ao lado da grade; precisa de `.produtos_corpo{align-items:start}` pra ter espaço de "andar" (senão o grid estica a sidebar pra altura da grade). **Sticky cancelado no mobile** (`≤768px`, vira bloco colapsável no topo — `useState` local `aberto`, botão "FILTROS"). |
| `GradeProdutos` | `.grade_produtos_container` | `dados/produtos.js` | `--background_cinza` nos cards (2026-07-13, era `--background_claro`/branco — destoava do dark, corrigido) | Contador "12 DE 24 PRODUTOS" + dropdown "EM DESTAQUE" (decorativos) + grade 3×4 (`.card_produto_plp`: imagem + tag + nome + preço + swatches + "+N", texto em tons claros pro fundo escuro). Reveal por card (`atrasoCard`/`LARGURA_ENTRADA_CARD`, mesmo padrão de Favoritos/Categorias/Território). Responsivo 3→2→1 colunas. |
| `BlocoEditorial` | `.bloco_editorial_secao` | — (estático, texto no JSX) | `--background_cinza` (seção) + `--background_escuro` (card) | Kicker + "Como escolher sua jaqueta?" + texto (lorem ipsum, placeholder de layout) + `BotaoCortado` "EM DESTAQUE". `Revela` (bloco único, como Lançamento). |

**Nota técnica — botões decorativos vs. `button{}` global:** `.aba_categoria`,
`.botao_tamanho`, `.dropdown_ordenar` e `.botao_filtros_mobile` são
`<button>` e por isso herdariam a regra base `button{width:14vw;height:7.3vh;
clip-path:...}` (pensada pro Hero da Home) se não resetassem
`width`/`height`/`margin`/`clip-path` explicitamente — só o `botao_cortado`
do Bloco Editorial herda esse corte de propósito (mesmo padrão de Lançamento
desconto/especial).

**⚠️ Achado (2026-07-13, não corrigido — fora do escopo):**
`src/padrao/assets/images/conjunto1_fav.jpg` é **byte a byte idêntico** a
`colecao-hero.jpg` (mesmo MD5) — bug de asset pré-existente. Efeito real na
**Home**: o card "CALÇA RIDE FIT 2" de `Favoritos` mostra a foto do hero da
coleção por engano (não visível como erro óbvio — a imagem carrega normal,
só é a errada). `dados/produtos.js` **exclui** esse arquivo do ciclo de
placeholders de propósito (ficou com 3 imagens distintas, não 4) pra não
repetir a mesma foto do `HeroColecao` dentro da própria grade. Ver
CHANGELOG (2026-07-13 12:30) para o racional completo.

**Pendências herdadas do backlog:** 12 packshots reais (hoje 3 placeholders
alternados); filtros funcionais numa fase futura, ou seguem visuais?; clique
no card → página de produto (detalhe) — ainda não existe. Ver
`docs/agentes/opus/backlog/produtos.md`.
