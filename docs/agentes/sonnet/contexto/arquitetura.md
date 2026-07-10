# Arquitetura

## Estrutura de pastas
```
x11/
├── index.html              # entry HTML; carrega /src/index.jsx e a fonte (Google Fonts)
├── components/             # componentes de seção (um por bloco da página)
│   ├── Header.jsx
│   ├── Hero_Home.jsx
│   ├── Favoritos.jsx
│   ├── Lancamento_desconto.jsx
│   ├── Categorias.jsx
│   ├── Lancamento_especial.jsx
│   ├── Territorio.jsx
│   ├── Destaques.jsx
│   ├── Historias.jsx
│   ├── Banner.jsx
│   └── Footer.jsx
├── src/
│   ├── index.jsx           # cria o root React e renderiza <App/>
│   ├── App.jsx             # compõe todas as seções na ordem da página
│   ├── index.css           # TODO o estilo (arquivo único)
│   ├── data/               # conteúdo data-driven (1 arquivo por seção)
│   │   ├── navegacao.js
│   │   ├── favoritos.js
│   │   ├── categorias.js
│   │   ├── destaques.js
│   │   ├── territorio.js
│   │   ├── historias.js
│   │   └── footer.js
│   └── assets/images/      # todas as imagens (.jpg, .png, .svg)
├── docs/
│   └── agentes/            # documentação dos agentes (ver estrutura abaixo)
├── package.json
└── vite.config.ts
```

### Estrutura de `docs/agentes/`
```
docs/agentes/
├── opus/                   # agente PLANEJADOR (Opus)
│   ├── README.md           # papel do Opus e fluxo de trabalho
│   ├── instrucoes-do-dono.md
│   ├── roadmap.md          # fases e status
│   └── backlog/            # prompts de fases futuras (aguardando a vez)
├── sonnet/                 # agente EXECUTOR de código (Sonnet)
│   ├── README.md           # como o executor opera
│   ├── contexto/           # tudo que o executor deve SABER
│   └── fazer/              # UMA única instrução por vez (o que fazer agora)
└── alterações/
    └── CHANGELOG.md        # histórico (entradas novas no topo)
```

> Observação: `components/` está na RAIZ, não em `src/`. Por isso os imports
> dentro dos componentes usam `../src/...` para alcançar assets e dados.

## Fluxo de renderização
`index.html` → `src/index.jsx` (createRoot) → `src/App.jsx` → seções.

## Composição da página (ordem em App.jsx)
```
<Header/>                 → topo fixo com logo + navegação
<main>
  <Hero_Home/>           → capa com imagem de fundo + CTA masculino/feminino
  <Favoritos/>           → 3 cards "favoritos da coleção" (fundo escuro)
  <Lancamento_desconto/> → bloco split texto+imagem (fundo claro)
  <Categorias/>          → grid de 12 categorias (fundo escuro)
  <Lancamento_especial/> → banner com imagem de fundo + gradiente + texto
  <Territorio/>          → 4 cards "onde você pilota" (fundo escuro)
  <Destaques/>           → cards de produtos "mais vendidos" (9, data-driven — fundo cinza)
  <Historias/>           → 3 cards de histórias (fundo escuro)
  <Banner/>              → faixa com frase grande centralizada
</main>
<Footer/>                → 3 colunas de links + rodapé com logo
```

## Fluxo de dados (padrão data-driven)
Cada seção com conteúdo repetido importa seu array de `src/data/` e o percorre
com `.map()`. As imagens são **importadas** no arquivo de dados (para o Vite
resolver o asset) e passadas como campo do objeto.

Exemplo (`src/data/favoritos.js`):
```js
import jaqueta from "../assets/images/jaqueta_fav.jpg";
export const favoritos = [
  { imagem: jaqueta, alt: "...", nome: "...", desc: "..." },
  // ...
];
```
E no componente:
```jsx
import { favoritos } from "../src/data/favoritos";
{favoritos.map((item, i) => (<div className="card" key={i}>...</div>))}
```
