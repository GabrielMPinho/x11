# Convenções e Regras

Regras que **o agente executor** deve seguir ao atuar neste projeto.

## Regras de ouro (inegociáveis)
1. **NÃO alterar o visual atual em desktop (> 1280px).** Qualquer refatoração,
   responsividade ou animação deve manter a aparência pixel-idêntica em telas
   grandes (**> 1280px** — fronteira atualizada de 1024→1280 pelo dono). Se
   estiver em dúvida se algo muda o visual, não faça — pergunte.
   - **Única exceção documentada (dono, 2026-07-10):** a seção **Destaques
     ("OS MAIS VENDIDOS")** PODE mudar no desktop, pois vira um **horizontal
     scroll carousel** (ver Fase 4 no planejamento). Todas as **demais** seções
     seguem pixel-idênticas > 1280px.
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
- Tornar elementos decorativos funcionais (setas de carrossel, botões, links).
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
