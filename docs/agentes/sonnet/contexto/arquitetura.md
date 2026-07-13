# Arquitetura

## Estrutura de pastas (multi-página, 2026-07-10)
O projeto foi reorganizado para **receber novas páginas**: cada página tem sua
pasta em `src/paginas/`, e **tudo que é comum a todas** (padronização) vive em
`src/padrao/`.

```
x11/
├── index.html                  # entry HTML; carrega /src/index.jsx, a fonte (Google Fonts)
│                               # e o CSS base (src/padrao/estilos/base.css)
├── src/
│   ├── index.jsx               # cria o root React e renderiza <App/>
│   ├── App.jsx                 # SHELL compartilhado: Lenis + MotionConfig + Header + <página> + Footer
│   │
│   ├── padrao/                 # PADRONIZAÇÃO — comum a TODAS as páginas
│   │   ├── componentes/        # Header.jsx, Footer.jsx, BotaoCortado.jsx
│   │   ├── lib/                # Revela.jsx, useProgressoSecao.js, useEstiloRevela.js, motion.js
│   │   ├── dados/              # navegacao.js, footer.js (dados compartilhados)
│   │   ├── estilos/
│   │   │   ├── tokens.css      # CORES (:root) + tipografia base (fonte)
│   │   │   └── base.css        # @import tokens + reset + Lenis + TODAS as regras
│   │   └── assets/images/      # todas as imagens (.jpg, .png, .svg)
│   │
│   └── paginas/                # uma pasta por PÁGINA
│       ├── home/               # a landing atual (única implementada)
│       │   ├── Home.jsx        # <main> com as 9 seções
│       │   ├── *.jsx           # seções: Hero_Home, Favoritos, Lancamento_desconto,
│       │   │                   #   Categorias, Lancamento_especial, Territorio,
│       │   │                   #   Destaques, CarrosselDestaques, CarrosselArrastavel,
│       │   │                   #   Historias, Banner
│       │   └── dados/          # favoritos, categorias, territorio, historias, destaques
│       ├── equipamento/        # detalhe do produto (ao clicar num produto) — scaffold
│       ├── homem/  mulher/  guia-de-equipamento/  onde-encontrar/  institucional/
│       │                       # páginas da navegação — scaffolds (stub por enquanto)
│
├── docs/agentes/               # documentação dos agentes
├── package.json
├── tsconfig.app.json           # paths: { "@/*": ["./src/*"] }
└── vite.config.ts              # alias "@" → src/
```

### Alias de import `@` → `src/`
Imports usam **`@/...`** (absoluto a partir de `src/`), configurado em
`vite.config.ts` (`resolve.alias`) e `tsconfig.app.json` (`paths`). Ex.:
`import Header from "@/padrao/componentes/Header"`,
`import { favoritos } from "@/paginas/home/dados/favoritos"`,
`import logo from "@/padrao/assets/images/logo.png"`. Vantagem: **independe de
profundidade** — mover/criar páginas não quebra caminhos. Imports de irmãos na
mesma pasta podem ser relativos (`./Favoritos`).

## Fluxo de renderização e roteamento (React Router, 2026-07-13)
`index.html` → `src/index.jsx` (createRoot) → `src/App.jsx` (shell, agora com
`<BrowserRouter>`) → `<Routes>` → a página da rota atual.

O **shell** (`App.jsx`) é comum a todas as páginas: `<BrowserRouter>` é o
wrapper **mais externo** (o `Header` usa `<Link>`/`useNavigate`, precisa estar
dentro do contexto do Router); dentro dele, `<MotionConfig>` + `<ReactLenis
root>` (smooth scroll, ou o ramo reduced-motion sem Lenis) envolvem
`<Header/>` + `<Routes>` + `<Footer/>` — Header/Footer/Lenis **persistem**
entre trocas de rota, só o miolo (`<Routes>`) troca. Mapa de rotas:

| Rota | Componente | Pasta |
|---|---|---|
| `/` | `Home` | `src/paginas/home/` |
| `/institucional` | `Institucional` | `src/paginas/institucional/` |
| `/homem` | `Homem` | `src/paginas/homem/` |
| `/mulher` | `Mulher` | `src/paginas/mulher/` |
| `/guia-de-equipamento` | `GuiaDeEquipamento` | `src/paginas/guia-de-equipamento/` |
| `/onde-encontrar` | `OndeEncontrar` | `src/paginas/onde-encontrar/` |
| `/equipamento` | `Equipamento` | `src/paginas/equipamento/` |

O **toggle temporário de dev** (que trocava `<Home/>` por `<Institucional/>`
direto no `App.jsx`, usado enquanto não havia roteamento) foi **removido** —
cada página agora tem URL própria e coexistem.

**Reset de scroll na troca de rota:** `RolarAoTopoNaRota` (componente interno
de `App.jsx`, ao lado do `SincroniaLenisFramer`) observa
`useLocation().pathname` e rola ao topo a cada mudança —
`lenis.scrollTo(0,{immediate:true})` se o Lenis estiver montado, senão
`window.scrollTo(0,0)` (ramo reduced-motion). Sem isso, navegar por `<Link>`
preservaria a posição de scroll da página anterior.

**Débito conhecido:** em produção estática, `BrowserRouter` precisa de
*fallback SPA* no servidor (todas as rotas servindo `index.html`) — combinar
com o admin ao publicar o vhost. `vite dev`/`vite preview` já cobrem isso
nativamente.

### Smooth scroll global — Lenis (Fase 5)
`App.jsx` envolve a árvore num `<ReactLenis root>` (pacote **`lenis`**) —
suaviza o scroll da janela **sem** wrappear o DOM (`root:true` = instância no
`window`), então `position:sticky`/`fixed` (header minimalista, drawer, carrossel
pinado) seguem funcionando. `SincroniaLenisFramer` (no `App.jsx`) sincroniza o
rAF do Lenis com o frameloop do Framer Motion (via `useAnimationFrame`) — crítico
pro reveal (`padrao/lib/Revela.jsx`) e o carrossel
(`paginas/home/CarrosselDestaques.jsx`) não atrasarem 1 frame. Com
`prefers-reduced-motion`, o Lenis **nem inicializa** (scroll nativo). CSS mínimo
do Lenis em `padrao/estilos/base.css`.

## Composição da Home (ordem em paginas/home/Home.jsx)
```
<main>
  <Hero_Home/>           → capa com imagem de fundo + CTA masculino/feminino
  <Favoritos/>           → 3 cards "favoritos da coleção" (fundo escuro)
  <Lancamento_desconto/> → bloco split texto+imagem (fundo claro)
  <Categorias/>          → grid de 12 categorias (fundo escuro)
  <Lancamento_especial/> → banner com imagem de fundo + gradiente + texto
  <Territorio/>          → 4 cards "onde você pilota" (fundo escuro)
  <Destaques/>           → "mais vendidos": carrossel scroll-hijack (desktop),
  │                          arrastável (touch, CarrosselArrastavel) ou grade (reduced-motion)
  <Historias/>           → 3 cards de histórias (fundo escuro)
  <Banner/>              → faixa com frase grande (entrada blur por palavra)
</main>
```
Header e Footer ficam no **shell** (`App.jsx`), fora da Home — o DOM final é o
mesmo de antes da reestruturação.

## Fluxo de dados (padrão data-driven)
Cada seção importa seu array de dados e o percorre com `.map()`. Imagens são
**importadas** no arquivo de dados (pro Vite resolver o asset) e passadas como
campo do objeto.

Exemplo (`src/paginas/home/dados/favoritos.js`):
```js
import jaqueta from "@/padrao/assets/images/jaqueta_fav.jpg";
export const favoritos = [ { imagem: jaqueta, nome: "...", desc: "..." } /* ... */ ];
```
No componente (`src/paginas/home/Favoritos.jsx`):
```jsx
import { favoritos } from "@/paginas/home/dados/favoritos";
{favoritos.map((item, i) => (<div className="card" key={i}>...</div>))}
```
