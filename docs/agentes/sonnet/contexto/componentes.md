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
| `Footer` | `.footer` | `data/footer.js` | `--background_escuro` | 3 colunas de links **+ logo** na mesma linha (4ª trilha `1fr` do grid, empurrada à direita) + **rodapé só com o copyright**, barra centralizada (`#rodape_footer`). Reestruturado ao vivo pelo dono (2026-07-16, `5b0b017`): logo saiu do rodapé pra linha dos links; `#fim_footer` removido; `aspect-ratio` de escala do footer comentados (footer flui por conteúdo — desvio pontual da escala-1440, autorizado). |

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
  sozinho, ligado ao scroll); nos modos `arrastavel`/`estatico` seguem
  presentes **≥1024px**, mas **ocultas em ≤1023px** desde 2026-07-15 (pedido
  do dono) — `#setas_destaques{display:none}` em `responsividade.css`. Essa
  regra de CSS **não foi revertida** na rodada 2 (ver seção de autoplay
  abaixo) — só o autoplay do carrossel da Home voltou atrás.
- Botões "COMO PARTICIPAR" (Lançamento desconto) e "LEIA MAIS" (Histórias):
  sem página de blog/promoção ainda — o dono define o destino depois.
- Cards de `Territorio` e `Destaques`: sem destino definido, só ganharam
  hover reforçado (elevação/sombra/anel/zoom), não navegação.
- Links de categoria e do footer: `href` placeholder.
> Esses elementos recebem apenas **micro-interações de hover/animação**, nunca
> lógica funcional (a menos que o dono peça em fase futura).

## Autoplay mobile — só nos 2 carrosséis do Equipamento (2026-07-15, revertido na Home em 2026-07-16)
Pedido original do dono: *"no mobile tire todas as setas de todos os
carrosséis e faça eles passarem automaticamente, mas ainda podendo
arrastar"* — aplicado nos **3 carrosséis** do site na rodada 1
(`CarrosselArrastavel` da Home + `CarrosselDetalhes`/`CombineSetup` do
Equipamento). **O carrossel da Home ativa em qualquer ponteiro
grosso/toque em QUALQUER largura** (é o critério do modo `arrastavel` de
`useModoCarrossel`/`Destaques.jsx` — só o modo `hijack`, ponteiro fino
**e** `≥1024px`, escapa disso) — então num laptop com tela de toque (ou o
device-mode do DevTools, que força ponteiro grosso), a Home caía no modo
`arrastavel` e passou a **andar sozinha também no laptop**. O dono: *"o
carrossel da home deve se manter intacto, como era antes."*

**Fix (rodada 2, `correcao-hero-historias-mobile-carrossel.md` item 4):**
`src/paginas/home/CarrosselArrastavel.jsx` foi revertido **byte a byte** ao
estado do commit `fd458ce` — sem autoplay, sem lista duplicada, sem
`useMotionValue`/`onDragStart`/`onDragEnd`. A Home volta a ser: **desktop
≥1024 (ponteiro fino)** → `hijack` ligado ao scroll (`CarrosselDestaques`,
intacto); **toque/qualquer largura** → `CarrosselArrastavel`, **arraste
puro, sem autoplay**, como sempre foi. **O autoplay permanece só nos 2
carrosséis do Equipamento** (`CarrosselDetalhes`/`CombineSetup`) — o dono
não reclamou deles; se quiser autoplay na Home só no mobile real (não em
qualquer ponteiro grosso), é pedido/rodada à parte.

Mecanismo, `src/padrao/lib/useAutoplayCarrossel.js` (usado só por
`CarrosselDetalhes`/`CombineSetup` agora — `CarrosselArrastavel` da Home
não o importa mais, revertido):
- Recebe `{x, trilhoRef, qtdItens, ativo}` — `x` é o **mesmo** `MotionValue`
  que o drag já escreve e o autoplay lê/escreve, nunca dessincronizados
  (por isso o Equipamento usa `useMotionValue` + `style={{x}}` no
  `useCarrosselComSetas.js` — o drag do Framer não geria a posição sozinho
  ali, precisa do valor explícito compartilhado com o autoplay).
- **Loop sem emenda:** quem chama renderiza a lista de itens **duplicada**
  (`[...itens, ...itens]`) quando `ativo`; o hook avança `x` em **módulo**
  da largura de UM conjunto (`trilhoRef.scrollWidth/2`) — o "reset" nunca
  precisa saltar, a 2ª cópia cai exatamente onde a 1ª começou.
- **Velocidade:** ~1 card a cada 3,5s (`msPorCard`, contínuo via
  `useAnimationFrame`, não passo a passo).
- **Pausa/retomada:** `onDragStart={pausar}` / `onDragEnd={retomar}` no
  `motion.div` do trilho — `retomar` espera ~1,5s e resincroniza o
  acumulador com a posição real deixada pelo drag (nunca "pula" de volta).
- **`prefers-reduced-motion`:** autoplay nunca roda (checado dentro do
  próprio hook, via `useReducedMotion`) — só o arraste continua, tudo
  visível.

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
alternados); filtros funcionais numa fase futura, ou seguem visuais? Clique
no card → página de produto (detalhe): **resolvido (2026-07-14)** — o card
inteiro de `GradeProdutos` navega pra `/equipamento` (mesmo padrão de
Favoritos/CombineSetup), ver CHANGELOG. Ver `docs/agentes/opus/backlog/produtos.md`.

## Página Equipamento (PDP — detalhe do produto) — COMPLETA (2026-07-14)
`Equipamento.jsx` é `<main className="equipamento_pdp">` compondo 8
sub-componentes, na ordem, em `src/paginas/equipamento/`. Acessível em
**`/equipamento`** — destino dos cards de Favoritos (Home; PLP ainda não
liga, ver pendência acima). Mesma liberdade de layout da Institucional/PLP
(sem a trava "desktop >1280px pixel-idêntico"). Dados em
`src/paginas/equipamento/dados/produto.js`; ícones próprios em
`IconesEquipamento.jsx` (não reaproveita os da Institucional, pra manter a
página autocontida). Identidade do produto unificada como **JAQUETA
EXPEDITION** (decisão do Opus — o PDF original mesclava jaqueta/calça; ver
`docs/agentes/opus/backlog/produto.md`). **Sem CTA de compra** (vitrine,
decisão do Opus); COR/TAMANHO são seletores decorativos (estado visual
local, sem lógica de e-commerce).

| Componente | Classe raiz | Dados | Fundo | Descrição |
|---|---|---|---|---|
| `HeroProduto` | `.hero_produto` | `dados/produto.js` (`produto`, `galeriaProduto`) | `--background_escuro` | Breadcrumb + split galeria/info, entrada em stagger no load (`heroStagger`/`heroItem`, **não** full-bleed/scroll). Galeria: 4 thumbnails (`useState` local troca o packshot principal) + packshot grande em **`--background_claro`** — **o único bloco claro da página**. Info: kicker → título 2 linhas → rating (5 estrelas + "4.9 · 312 avaliações") → preço grande (`R$ 1.099`, sem centavos) → descrição → COR (3 swatches, 1º selecionado) → TAMANHO (6 chips) → GARANTIA (ícone medalha + texto). |
| `FaixaSpecs` | `.faixa_specs_secao` | `dados/produto.js` (`specsFaixa`) | `--background_cinza` | 4 números com divisórias verticais (`600D`/`CE 2`/`20K`/`4`). Reveal em **bloco** (`Revela`, não por item). |
| `EngineeredFeatures` | `.engineered_features_secao` | `dados/produto.js` (`featuresProduto`) | `--background_escuro` | Split topo (kicker+título / parágrafo) + 4 features com divisórias, mesmo mecanismo de reveal coreografado de `QuemSomos1` (Institucional) — classes próprias (`feature_pdp_*`), não reaproveita as da Institucional. |
| `BannerTestado` | `.banner_testado_secao` | — (estático, texto no JSX) | foto `testado-minas.jpg` (mesmo asset do Hero da Institucional — arquivo reaproveitado, não seletor) | Full-bleed, técnica em camadas idêntica a `.hero_institucional`/`.missao_secao` (bg via CSS + overlay `::after` + conteúdo por cima). `z-index:0` (nunca `-1`, mesmo cuidado do fix de clique do Hero da Home). |
| `TabelaEspecificacoes` | `.especificacoes_secao` | `dados/produto.js` (`especificacoesTabela`) | `--background_escuro` | Split: kicker + "DIFERENCIAIS"/"ESSENCIAIS" empilhados + parágrafo (esquerda) · tabela label/valor com linha divisória, 9 linhas (direita). Typos do PDF corrigidos: MENBRANA→MEMBRANA, ASJUTES→AJUSTES (conteúdo novo). Valores são placeholder repetido — dono fornece os reais depois. |
| `CarrosselDetalhes` | `.destaques_pdp_secao` | `dados/produto.js` (`destaquesMacro`, 8 itens) | `--background_cinza` | "SINTA COM OS OLHOS / DESTAQUES" — 8 cards de imagem macro (ciclando os 3 packshots disponíveis, 8 legendas distintas). **Setas ← → FUNCIONAIS** (exceção ao padrão decorativo da Home), **uma em cada extremo do carrossel** (fix 2026-07-14 — `position:absolute` dentro de `.destaques_pdp_carrossel_wrap`, centralizadas no respiro de `margin:0 6vw` do trilho, sem sobrepor cards; **diferente do CombineSetup**, que mantém as 2 setas agrupadas no topo-direita); **arraste SÓ no toque/tablet** (no desktop o trilho anda só pelas setas, sem drag de mouse), via hook `useCarrosselComSetas.js`. |
| `Avaliacoes` | `.avaliacoes_secao` | `dados/produto.js` (`avaliacoes`) | `--background_escuro` | "23 RESPOSTAS" — 3 cards de review (5 estrelas + texto plausível, sem lorem ipsum + linha divisória + nome + localização). Reveal por card. |
| `CombineSetup` | `.combine_setup_secao` | `dados/produto.js` (`comboSetup`, 8 itens) | `--background_escuro` | "COMBINE SEU SETUP" — cross-sell, mesmo mecanismo de setas+arraste (desktop/mobile) de `CarrosselDetalhes`. 8 cards navegam pra `/equipamento` (mesma vitrine, padrão de clique de Favoritos/PLP). **Cards em fundo escuro** (`--background_cinza`, igual ao `.card_produto_plp` atual) — ver achado/decisão no CHANGELOG (2026-07-14): a instrução pedia "fundo claro" citando um padrão da PLP que já foi corrigido pro escuro; resolvi a contradição priorizando "único bloco claro = Hero" + o padrão já corrigido. Dono conferiu e não pediu mudança. |

**Mecanismo de carrossel com setas (`useCarrosselComSetas.js`):** hook
próprio da página (não vive em `padrao/`, só usado aqui) — mede o
deslocamento real (`scrollWidth - clientWidth`) e anima um único
`motionValue x` tanto no clique das setas quanto no drag do usuário, nunca
dessincronizados. Setas usam **tween com `EASE` do projeto (`duration:0.6`)**
(fix 2026-07-14, 2ª rodada — era mola rígida `{stiffness:300,damping:32}`,
"seca"; tween é a linguagem de movimento do resto do site).

**Desktop = só setas, mobile = só arraste (fix 2026-07-14, coerência entre
1ª e 2ª rodada):** hook expõe `arrastavel` (mesmo critério de `matchMedia`
do `useModoCarrossel` de `Destaques.jsx`/Home — `(pointer:fine) and
(min-width:1024px)` → desktop sem arraste; fronteira alinhada em 2026-07-16
à régua "desktop ≥1024", era mais alta e destoava da Home) — no desktop o
trilho só se move
pelas setas (`drag={false}`, cursor padrão), sem drag de mouse; no
toque/tablet, arraste normal (`drag="x"`, cursor `grab`/`grabbing` via
classe `.trilho_pdp_arrastavel`). **As próprias setas** (`.destaques_pdp_setas`/
`.combine_setup_setas`) ficam **escondidas fora do desktop** (`display:none`,
só `flex` em `(pointer:fine) and (min-width:1024px)`, alinhado 2026-07-16) — setas e
arraste nunca coexistem na tela. Containers usam **`data-lenis-prevent-touch`**
(não `-prevent` puro) — Lenis só é bloqueado no toque, a roda do mouse no
desktop rola a página normalmente por cima do carrossel.

**`.card_combine` (COMBINE) é `<a>`, arrastável nativamente pelo navegador**
(fix 2026-07-14, 2ª rodada) — esse drag nativo de link sequestrava o gesto
do Framer no toque, travando o arraste (`CarrosselDetalhes` usa `<div>`,
sem esse problema). Fix: `draggable={false}` no JSX + reforço CSS
(`-webkit-user-drag:none;user-drag:none;user-select:none`).

**Inset do DESTAQUES é `margin` no container, não `padding`** (fix
2026-07-14, 2ª rodada) — em container com `overflow:hidden`, `padding` não
insere margem do lado que transborda (cards sangravam até a borda da
tela); `margin:0 6vw` estreita o container e o clip fica simétrico dos 2
lados, igual ao `.trilho_combine` (que já ficava certo via padding da
seção).

**Diferente de `Destaques` (Home), não tem um modo "estático" separado pra
`prefers-reduced-motion`** — limitação conhecida, documentada no CHANGELOG,
pendente de avaliação do Opus/dono.

**Autoplay no mobile/toque (2026-07-15):** quando `arrastavel=true`, os dois
carrosséis duplicam a lista de itens e usam `useAutoplayCarrossel`
(`src/padrao/lib/`, ver `componentes.md` — seção da Home — pro mecanismo
completo: loop por módulo, ~1 card/3,5s, pausa no `onDragStart`/retoma no
`onDragEnd`, desligado em `prefers-reduced-motion`). `arrastavel` já é
exatamente o critério "mobile/toque" pedido pelo dono, então vira também o
`ativo` do autoplay — sem gating extra. `useCarrosselComSetas.js` passou a
remedir `maxArrasto` quando `arrastavel` muda (dependência nova no
`useEffect` de medição) — a duplicação da lista muda o `scrollWidth` do
trilho sem disparar `resize`.

**⚠️ Outro bug de asset duplicado (achado 2026-07-14):** `product-boot.jpg`
é byte a byte idêntico a `combine-boot.jpg` (mesmo MD5) — mesma família do
já documentado `conjunto1_fav.jpg`==`colecao-hero.jpg`. `product-boot.jpg`
não é usado em lugar nenhum do projeto por enquanto (evitar até esclarecer
com o dono se é intencional ou duplicata de upload).

**Pendências herdadas do backlog:** confirmar identidade "JAQUETA
EXPEDITION"; decidir se mantém "sem CTA de compra"; packshots reais
(galeria, 4 detalhes de DESTAQUES, 4 do combo) e capacete real; valores
reais da tabela de especificações. Ver `docs/agentes/opus/backlog/produto.md`.
