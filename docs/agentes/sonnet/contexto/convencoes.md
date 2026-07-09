# Convenções e Regras

Regras que **o agente executor** deve seguir ao atuar neste projeto.

## Regras de ouro (inegociáveis)
1. **NÃO alterar o visual atual em desktop.** Qualquer refatoração,
   responsividade ou animação deve manter a aparência pixel-idêntica em telas
   grandes (> 1024px). Se estiver em dúvida se algo muda o visual, não faça —
   pergunte.
2. **Data-driven sempre.** Conteúdo repetido vive em `src/data/`, nunca
   hardcoded no JSX. Componente só percorre os dados com `.map()`.
3. **Imagens sempre via `import`.** Nunca referenciar imagem como string de
   caminho (`"../src/assets/..."`) — quebra no build de produção. Importe o
   asset (no arquivo de dados ou no componente) e use a variável.
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
- **Chaves em listas:** usar `key={index}` segue o padrão existente (listas
  estáticas, sem reordenação — aceitável aqui).
- **CSS:** um arquivo só (`src/index.css`), organizado por blocos comentados.
  Não criar CSS Modules nem styled-components. Reaproveitar as variáveis de
  `:root`.
- **Nomes de classe:** manter o padrão existente (mistura de `.classe` e `#id`
  em português). Não renomear classes existentes (quebraria o CSS).

## Animações (padrão a seguir)
- Usar o pacote `motion` (import `motion` de `"motion/react"`).
- Reveal bidirecional: `whileInView` **sem** `once`.
- Centralizar `variants` reutilizáveis em `src/lib/motion.js` (a criar na Fase 3)
  para manter a estética consistente.
- Só animar `transform`/`opacity`. Nunca animar propriedades que causam reflow
  (width, height, top, margin) de forma que altere o layout final.
- Sempre incluir fallback `prefers-reduced-motion`.

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
