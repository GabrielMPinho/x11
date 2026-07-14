# Convenções e Regras

Regras que **o agente executor** deve seguir ao atuar neste projeto.

## Regras de ouro (inegociáveis)
1. **A régua do desktop é 1440px, escalado proporcionalmente até 1024px
   (dono, 2026-07-14 — "Escala proporcional do desktop 1024→1440").**
   Substitui a regra antiga de "acima de 1280 intocado, sem detalhe abaixo":
   - **≥1440px:** pixel-idêntico a hoje, travado (era a regra antiga,
     continua valendo aqui).
   - **1024px → 1440px:** NÃO é mais o design responsivo — é **o mesmo
     desenho do 1440, escalado proporcionalmente** (via `--u`, ver
     `estilos.md`). Home e chrome (header/footer) já convertidos; se estiver
     em dúvida se algo é "faixa de tela" (fica em `vh`) ou "caixa de
     conteúdo" (vira `aspect-ratio`/`calc(N*var(--u))`), não invente — ver a
     lei de conversão em `estilos.md` ou pergunte.
   - **≤1023px:** o design responsivo de sempre, sem nenhuma mudança visual.
   - **Institucional/Produtos/Equipamento AINDA NÃO foram convertidas** —
     seguem no modelo antigo (tablet a partir de ≤1280px) até cada uma
     ganhar sua própria instrução de escala. Não é bug, é consequência
     intencional documentada.
   - **Proporções travadas na LARGURA, não na altura (decisão do dono):**
     caixas de conteúdo que usavam `vh` (card de Favoritos, imagem de
     Território, etc.) viraram `aspect-ratio` derivado da largura — exceção
     explícita e autorizada à ideia de "nunca mudar nada", só pra essas
     caixas especificamente (efeito colateral aceito: numa janela mais alta
     que 900px, essas imagens não esticam mais).
   - **Única exceção documentada (dono, 2026-07-10):** a seção **Destaques
     ("OS MAIS VENDIDOS")** PODE mudar no desktop, pois vira um **horizontal
     scroll carousel** (ver Fase 4 no planejamento) — hoje ativo a partir de
     **1024px** (recuado de 1281px junto com a escala). Todas as **demais**
     seções seguem fiéis ao desenho do 1440 (agora escalado, não mais
     "trocando de layout").
   - **Exceção tipográfica (dono, 2026-07-13):** a **fonte** do site inteiro
     mudou para o sistema de 3 fontes (**Chakra Petch** / **IBM Plex Sans
     Condensed** / **Open Sans Condensed**) — isso altera a tipografia da Home
     no desktop, **autorizado**. O **layout/estrutura** segue
     preservado; **só a fonte** muda. Ver `padrao-api.md` (tipografia).
2. **Data-driven sempre.** Conteúdo repetido vive em `dados/` da página
   (`src/paginas/<pagina>/dados/`) ou em `src/padrao/dados/` se for compartilhado,
   nunca hardcoded no JSX. Componente só percorre os dados com `.map()`.
3. **Imagens sempre via `import`.** Nunca referenciar imagem como string de
   caminho — quebra no build de produção. Importe o asset via alias
   (`import x from "@/padrao/assets/images/..."`) e use a variável.
4. **Documentar a cada alteração.** Ao final de qualquer mudança, atualizar:
   - `docs/agentes/alterações/CHANGELOG.md` (nova entrada NO TOPO)
   - `docs/agentes/sonnet/contexto/*` (se a mudança afetou
     arquitetura/estilos/componentes)
5. **Commit só com sinal verde do dono.** Fazer a alteração, resumir, e aguardar
   autorização antes de `git commit`. O agente executor **não** commita sozinho.

## Padrões de código
- **Idioma:** português para nomes de variáveis, arquivos de dados, classes CSS
  e comentários.
- **Componentes:** `.jsx`, `export default function NomeDoComponente(){ ... }`.
- **Estrutura de pastas (multi-página, 2026-07-10):** comum a todas as páginas em
  **`src/padrao/`** (componentes, lib, dados, estilos, assets); cada página em
  **`src/paginas/<pagina>/`** (com seus componentes e `dados/`). Ao criar uma
  página nova, siga esse padrão. Ver `arquitetura.md`.
- **Imports com alias `@` → `src/`:** use `@/padrao/...`, `@/paginas/...`
  (absolutos, independem de profundidade). Irmãos na mesma pasta podem ser `./X`.
- **Chaves em listas:** usar `key={index}` segue o padrão existente (listas
  estáticas, sem reordenação — aceitável aqui).
- **CSS:** em `src/padrao/estilos/` — **`tokens.css`** (cores `:root` + fonte
  base) importado no topo de **`base.css`** (reset + Lenis + TODAS as regras,
  organizado por blocos comentados). Um arquivo de regras só (`base.css`); **não**
  criar CSS Modules nem styled-components. Reaproveitar as variáveis de `:root`
  (tokens). `base.css` é linkado no `index.html`.
- **Nomes de classe:** manter o padrão existente (mistura de `.classe` e `#id`
  em português). Não renomear classes existentes (quebraria o CSS).

## Animações (padrão a seguir)
- Usar o pacote `motion` (import de `"motion/react"`).
- **Modelo atual (Fase 3, 2ª rodada): reveal LIGADO AO SCROLL** (`useScroll` +
  `useTransform`), NÃO `whileInView`. Ver `src/padrao/lib/Revela.jsx`
  (`Revela`/`RevelaComProgresso`) e `src/padrao/lib/useProgressoSecao.js`. É
  bidirecional por natureza (subir reverte a mesma curva).
- **Fail-safe:** cada unidade de reveal tem UM único elemento `motion`; imagens
  e textos são filhos DOM comuns. Nunca pôr opacity inicial numa `<img>` nem
  depender de propagação de variant. O único opacity<1 é o wrapper de reveal,
  que sempre chega a 1 quando em cena.
- Só animar `transform`/`opacity`. Nunca animar propriedades que causam reflow
  (width, height, top, margin) de forma que altere o layout final.
- Sempre incluir fallback `prefers-reduced-motion` (tudo estático e visível).
- **Exceção estrutural aprovada (Fase 4):** a seção Destaques usa `sticky` +
  altura alta (~300vh) + `x` ligado ao scroll — o único lugar onde a altura
  muda, e só no desktop; ver Fase 4.

## O que NÃO fazer sem autorização explícita
- Corrigir typos de conteúdo (`MOTOCILISMO`, `COMBRO`, título cortado em
  Historias) — o dono decide.
- Tornar elementos decorativos funcionais **sem pedido explícito**. **Parcialmente
  revertido (2026-07-13, "Home: ligar os botões"):** os botões do Hero (VER
  MASCULINO/FEMININO), Lançamento especial (EXPLORAR COLEÇÃO), os cards de
  Favoritos (COMPRAR) e Categorias **agora navegam de verdade** — ver
  `componentes.md`. **Continuam decorativos** (sem pedido ainda): setas do
  carrossel de Destaques, Histórias "LEIA MAIS", Lançamento desconto "COMO
  PARTICIPAR", links de categoria do footer. Não estender a navegação a
  esses sem pedido novo do dono.
- Migrar para TypeScript, Tailwind, ou qualquer nova dependência pesada.
- Alterar o layout desktop "para melhorar" — mesmo que pareça frágil.

## Fluxo de trabalho Opus → Sonnet (do dono)
O dono usa **Opus para planejar** e **Sonnet para executar** (economia de
tokens). O funcionamento:
1. O **Opus** deixa **uma única instrução** em `docs/agentes/sonnet/fazer/`.
2. O **Sonnet** lê todo o `contexto/`, executa essa instrução e resume o que fez.
3. O **Opus** confere o resultado (build/lint/visual). Se houver correções
   necessárias, **substitui o arquivo em `fazer/`** com a correção; se estiver
   ok, coloca a próxima instrução do backlog.
4. O commit só acontece com o sinal verde do dono.

> Regra da pasta `fazer/`: **sempre apenas 1 instrução por vez**.

> **Conferência visual = só Opus + dono.** O **Sonnet nunca** tira nem analisa
> screenshots. Ele verifica por `npx vite build`, `npm run lint` e checagens
> objetivas no código. A validação por print nos viewports (390/768/1024/1280/
> 1440) é feita pelo **Opus** (e pelo dono), na etapa de conferência.
