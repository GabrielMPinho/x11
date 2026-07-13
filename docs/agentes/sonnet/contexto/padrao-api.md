# API do `src/padrao/` — referência para planejar/codar sem reler o código

> Referência **exata** dos componentes, lib, tokens e estilos compartilhados.
> Serve ao **Opus** (planejar páginas novas sem abrir o código) e ao **Sonnet**
> (implementar reaproveitando o padrão). Valores conferidos no código
> (2026-07-13). Se divergir do código, o código vence — corrija aqui.

## Stack e comandos
- **React 19.2** + **Vite 8** + **motion 12** (Framer) + **lenis 1.3** + **oxlint**. CSS puro. `.jsx` (sem TypeScript de fato).
- `npm run dev` → Vite em **:5173**. `npm run lint` → oxlint. **Build: `npx vite build`** (NÃO `npm run build` — ele roda `tsc -b` antes e falha em projeto `.jsx`).
- **Alias `@` → `src/`** (em `vite.config.ts` + `tsconfig.app.json`; não há `jsconfig`). Ex.: `import Header from "@/padrao/componentes/Header"`.
- **Sem roteamento.** `App.jsx` monta `<Header/> <Home/> <Footer/>` fixo (Home hardcoded). Header/Footer/Lenis/MotionConfig vivem no shell. Reduced-motion → Lenis **não** monta (scroll nativo).

## Componentes (`src/padrao/componentes/`)

### `BotaoCortado` — botão com corte diagonal
Props: **`{ id, className, style, children }`**. Renderiza `<motion.button>` (`whileHover/whileTap="hover"`) com uma camada `.preenchimento_botao` que cresce (`scaleX 0→1`) no hover, + `<span class="texto_botao">{children}</span>`. O **corte diagonal vem do CSS** (`button { clip-path: polygon(0 0,100% 0,100% 70%,92% 100%,0 100%) }`), não do JSX. A prop `style` aceita `{opacity,y}` de reveal (o botão pode ser sua própria unidade de reveal). `className` é somada a `botao_cortado`.

### `Header` — 2 estados, sempre presente
`<header>` **completo** (sempre em fluxo, nunca `fixed`) no topo/Hero; `.header_minimalista` (barra `fixed` independente, via `AnimatePresence`) no resto. Histerese: entra em minimalista com `scrollY > 0.7×altura da janela`, volta a completo com `< 0.5×`. Logo é `<button class="logo_home_botao">` → volta ao topo (`lenis.scrollTo(0)` / fallback nativo). Drawer mobile (`#drawer_menu` slide + `.overlay_menu`) compartilhado. Consome `navegacao`. `EASE = [0.22,1,0.36,1]`.

### `Footer` — 3 colunas + rodapé
Consome `colunasFooter` (`dados/footer.js`). Usa `<Revela as="div" distancia={100/64}>` nos dois blocos. Estrutura: `#conteudo_footer` (colunas `.coluna_footer` com `.p_laranja` + links) e `#rodape_footer` (copyright + `#logo_footer`). **Reaproveitar em toda página** — não recriar.

## Lib de animação (`src/padrao/lib/`)

### `motion.js` — os ÚNICOS 4 exports
- `EASE = [0.22, 1, 0.36, 1]`
- `heroStagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.14, delayChildren:0.1 } } }`
- `heroItem = { hidden:{opacity:0,y:32}, visible:{opacity:1,y:0,transition:{duration:0.8,ease:EASE}} }`
- `transicaoHover = { duration:0.3, ease:EASE }`
> ⚠️ NÃO existem `fadeUp`, `staggerContainer`, `revealImage`. Entrada do Hero = `heroStagger`/`heroItem` (por load). Reveal por scroll = `Revela`/hooks abaixo. Blur por palavra = variantes **locais** dentro de `Banner.jsx`.

### Reveal por scroll (bidirecional) — 2 caminhos
- **`Revela`** (`Revela.jsx`): unidade isolada com scroll próprio. Props: `{ as="div", className, style, distancia=108, saida=80, children }`. Cria seu `useScroll`; mapeia opacity `[0,1,1,0]` e y `[distancia,0,0,-saida]`. Use pra blocos/seções soltas (ex.: Footer). Reduced-motion → fixa visível.
- **`RevelaComProgresso`** (`Revela.jsx`) + **`useProgressoSecao(ref)`**: pra **grids** que assentam em stagger espacial. O container chama `const progresso = useProgressoSecao(ref)` (retorna `scrollYProgress`, offset `["start end","end start"]`) e passa `progresso` + `atraso` a cada card. Props: `{ as, className, style, progresso, atraso=0, distancia=84, saida=80, larguraEntrada, children }`.
- **`useEstiloRevela(progresso,{atraso,distancia,saida,larguraEntrada})`**: retorna `{opacity,y}` ligados ao progresso (janela `ENTRA=0`/`ASSENTA_INICIO=0.33`/`ASSENTA_FIM=0.70`/`SAI=1`). **`atrasoCard(index,qtd)`** = stagger espacial curto (último card só ~0.09 à frente). Usados em Favoritos, Categorias, Territorio, Historias, Destaques, Lançamentos.
- **Regra fail-safe:** cada unidade de reveal tem **1 só** elemento `motion`; imagens/textos são filhos DOM comuns (nunca `opacity:0` numa `<img>`). Só animar `transform`/`opacity`.

## Estilos (`src/padrao/estilos/`)
- **`tokens.css`** (`:root`): `--laranja:#FF5000` · `--branco:#ffffff` · `--background_escuro:#181614` · `--background_claro:#E5E5E5` · `--background_cinza:#22211f`. **Sem tokens de espaçamento** (valores diretos no CSS).
- **Tipografia (2026-07-13, migração global — 3 fontes, Google Fonts):** `--fonte-titulo:"Chakra Petch"` (títulos `h1`/`h2`/`h3` de seção e preços) · `--fonte-rotulo:"IBM Plex Sans Condensed"` (kickers/nav/botões/labels curtos) · `--fonte-corpo:"Open Sans Condensed"` (`body`, `font-weight:300` — Open Sans Condensed não tem peso 400 no Google Fonts). Pesos carregados no `index.html`: Chakra Petch 700; IBM Plex Sans Condensed 500/600; Open Sans Condensed 300/700. `Inter`/`Roboto` removidas. Ver `estilos.md` (tabela completa de seletor→token).
- **`base.css`** (~1215 linhas): `@import tokens` + reset + Lenis + TODAS as regras, em blocos comentados por seção (HEADER, HERO, FAVORITOS, … , FASE 3 ANIMAÇÕES, RESPONSIVIDADE). Um arquivo só — **não** criar CSS Modules/styled-components/Tailwind. Linkado no `index.html`.
- **Responsividade:** desktop **> 1280px = base intocável**; adaptação só em `@media (max-width: …)`. **Breakpoints: `1280` / `768` / `480`** (+ `@media (hover:hover) and (pointer:fine)` p/ hover). Ao criar página nova, seguir esse esquema.
- **Nomenclatura CSS:** `#id` para elementos únicos de uma seção, `.classe` para repetidos; nomes em `snake_case` português. Não renomear classes existentes.

## Dados compartilhados (`src/padrao/dados/`)
- **`navegacao.js`** → `navegacao = [{nome,link}]`: HOMEM · MULHER · GUIA DE EQUIPAMENTO · ONDE ENCONTRAR · INSTITUCIONAL (todos `link:""` — sem rota ainda).
- **`footer.js`** → `colunasFooter = [{titulo,links[]}]`: ATENDIMENTO · X11 · NOVIDADES.

## Padrão de PÁGINA nova (o que replicar)
1. Pasta `src/paginas/<pagina>/<Pagina>.jsx` (+ `dados/` se tiver conteúdo repetido). **Data-driven**: arrays em `dados/`, imagens via `import` (nunca string de caminho).
2. Reutilizar Header/Footer (shell) e `BotaoCortado`; reveal via `Revela`/`RevelaComProgresso`+`useProgressoSecao`; tokens de cor; kicker padrão `.p_laranja`.
3. Adicionar as regras CSS da página em `base.css` (bloco comentado novo), respeitando os 3 breakpoints.
4. **Ver a página** (sem router): trocar temporariamente `<Home/>` por `<Pagina/>` no `App.jsx` durante o dev (reverter/rotear depois). Roteamento real é fase própria.

## Convenções gerais
Português em nomes (componentes PascalCase; alguns `Snake_Case` como `Hero_Home`, `Lancamento_desconto`; pastas de página em kebab-case). `key={index}` é aceito (listas estáticas). Typos de conteúdo **existentes** (`MOTOCILISMO`, `COMBRO`) não se corrigem sem aval.
