# Instruções do Dono

Compilado de tudo que o dono do projeto instruiu até agora. Serve de norte para
o planejamento. **Manter atualizado** conforme novas instruções chegarem.

## Objetivo geral do projeto
- **Manter 100% do visual já feito.** Nada da aparência atual em desktop pode
  mudar. Esta é a regra mais importante.
- **Refinamento (2026-07-09):** só o **desktop full (> 1024px)** precisa ficar
  intacto. Nos **demais viewports (≤ 1024px) há liberdade total** de layout —
  desde que se preserve a **estética e o conteúdo** do site (mesmas cores,
  tipografia, textos, imagens, botões com corte diagonal; **sem inventar
  seções/componentes novos**) e se priorize uma **UI/UX agradável**.
- **Design novo de mobile (2026-07-09):** o dono quer um **design NOVO para o
  mobile** (não mais "desktop empilhado", e sim uma linguagem própria e coesa),
  com os **demais viewports transicionando gradualmente** até o desktop. Mantendo
  estética e conteúdo já presentes.
- **Fronteira do desktop intocado = > 1280px (2026-07-09):** o desktop original
  só "cabe" a partir de ~1360px e estoura entre ~1025–1280px. Por isso o design
  responsivo novo passa a cobrir **até 1280px**, e o **desktop full intocado vale
  acima de 1280px** (antes era 1024px). Regra de ouro do "não mudar o desktop"
  agora se refere a **> 1280px**.
- **Conferência visual:** sempre **validar nos 5 viewports** (390/768/1024/1280/
  1440) por screenshot e **apagar os prints** depois (economia de espaço). Método
  em `reference` da memória / CHANGELOG (Docker rootless + Playwright).
- Deixar a página **o mais "automática" possível** e **tirar o tipo estático**:
  conteúdo data-driven, componentes reutilizáveis, sem repetição / hardcode.
- **Movimento moderno com estética de moto**: animações, hover, micro-interações.
- **Mobile e responsividade total**: funciona em todos os tamanhos de tela, sem
  quebrar nem sair do padrão em nenhuma área.
- **Planejar completamente antes de executar.**

## Como conduzir o trabalho
- Trabalhar **em fases, na ordem definida**; ao fim de cada fase, **parar e
  aguardar o sinal verde do dono antes de commitar**.
- Ao final de cada alteração, **resumir o que foi feito e por quê** para consulta
  futura de outras IAs, e **atualizar TODOS os documentos** afetados.
- **O Opus nunca edita o código diretamente** (decisão do dono, 2026-07-09):
  sempre **apaga o arquivo atual** de `sonnet/fazer/` e escreve um novo com
  **contexto completo + prompt de ação**, e **sempre entrega ao dono um prompt
  curto de arranque** para colar no Sonnet. Ver `opus/README.md`.
- **O Opus define o design explicitamente, mas NÃO escreve código** (decisão do
  dono, 2026-07-09): a instrução diz **exatamente o que fazer e como deve ficar**
  (elementos, comportamento, valores-alvo, porquê) em forma de diretiva — **nunca**
  blocos de CSS/código prontos. O Opus **decide todo o design**; o **Sonnet
  escreve todo o código**.

## Decisões técnicas travadas (via perguntas ao dono)
- **Animações:** usar **Framer Motion** (pacote `motion`).
- **Interatividade:** elementos hoje decorativos (setas ← →, botões, links)
  recebem **apenas micro-interação/hover**, sem virar funcionais nesta passada.
- **Menu mobile:** **drawer lateral** (hambúrguer abre painel deslizante; fecha
  ao tocar fora).
- **Header — 2 estados, SEMPRE presente (2026-07-10):** o dono redefiniu o header.
  Nada de 3 estados nem de "sumir ao rolar". Só dois: **Hero/topo → header
  COMPLETO** (design cheio atual); **resto da página → header MINIMALISTA**
  (barra fixa enxuta, ~60px, logo pequeno + nav condensada, fundo sólido),
  **sempre visível** (nunca some). Design minimalista **definido pelo Opus** na
  instrução.
- **Smooth scroll (Lenis) — candidato pra DEPOIS (2026-07-10):** o dono gostou da
  ideia de scroll suave (perguntou sobre Locomotive Scroll). Decisão: **primeiro
  terminar o carrossel**, depois avaliar. Recomendação do Opus: usar **Lenis**
  (núcleo que a Locomotive v5 usa; o Framer já cobre os efeitos), como **Fase 5**.
  Requer aval do dono por ser dependência nova. Ver `backlog` (Fase 5 candidata).
- **Reveal de scroll:** **bidirecional** — ao descer, os elementos aparecem; ao
  subir, somem fazendo o caminho inverso.
- **Mais animação de entrada/saída (2026-07-10):** após a 2ª rodada da Fase 3, o
  dono conferiu no navegador e achou que ficou com **poucas animações de entrada
  e saída** — quer o movimento **mais perceptível** (maior amplitude, entrada/saída
  que se leem ao longo do scroll, seções se montando/desmontando), **mantendo** a
  base scroll-linked e sem regredir os invariantes (nada invisível, desktop
  >1280px intacto, sem scroll horizontal).
- **Horizontal scroll carousel no Destaques (2026-07-10):** o dono gostou do
  padrão de `hover.dev` (horizontal scroll carousel — rolar pra baixo faz os
  cards andarem pra o lado) e **aprovou aplicá-lo na seção "OS MAIS VENDIDOS"
  (Destaques)**, **inclusive no desktop >1280px**, abrindo uma **exceção pontual
  à regra de ouro** — SÓ nessa seção. As demais seções continuam pixel-idênticas
  no desktop. Vira a **Fase 4** do planejamento.
- **Banner com "blur por palavra" (2026-07-10):** o dono quer na frase antes do
  footer o efeito do `TextEffect` de motion-primitives (`per="word"`,
  `preset="blur"`) — cada palavra entra num blur-in em sequência. **Continua sem
  marquee e estática em repouso** (só a entrada muda). **Sem instalar
  motion-primitives nem Tailwind:** reproduzir com o `motion` já existente. ✅
  **Concluído** (Fase 3) e commitado.
- **Tipografia GLOBAL — sistema de 3 fontes (2026-07-13):** o dono trocou a
  identidade tipográfica de **TODO o projeto** para **Chakra Petch** (títulos/
  números), **IBM Plex Sans Condensed** (kickers/nav/botões) e **Open Sans
  Condensed** (corpo) — as 3 fontes do layout, confirmadas por `pdffonts`.
  **Exceção explícita à regra de ouro:** a **fonte** da Home muda no desktop
  > 1280px (autorizado — "Global"); o **layout permanece**. Feita como fundação
  **antes** do hero da institucional. Instrução: `sonnet/fazer/tipografia-global.md`.

## Ordem das fases (executada)
As **fases 1–7 estão concluídas e commitadas** (Fundação/data-driven,
Responsividade+mobile, Animações, Carrossel de Destaques, Lenis, Refinos e a
Reestruturação multi-página). Ver `backlog/planejamento-completo.md`.
**Frente atual:** as **páginas novas** (roteamento → equipamento → páginas da
navegação) — backlog em `backlog/paginas.md`. A **institucional** está em
execução (começando pelo **Hero**); levantamento em `backlog/institucional.md`.

## Documentação (estrutura exigida pelo dono)
- **`docs/agentes/sonnet/`** — tudo que o agente de código precisa **saber**
  (`contexto/`) e **fazer** (`fazer/`).
- **`docs/agentes/sonnet/fazer/`** — **apenas 1 instrução por vez.**
- **`docs/agentes/opus/`** — as instruções do dono + o planejamento.
- **`docs/agentes/opus/backlog/planejamento-completo.md`** — **todo o
  planejamento** (todas as fases). Cada fase concluída deve ser **marcada como
  concluída** neste arquivo.
- **`docs/agentes/alterações/`** — o CHANGELOG (entradas novas no topo, formato
  `AAAA-MM-DD HH:MM — TÍTULO` + resumo do que foi feito e por quê).
- **Fluxo:** após o agente de código terminar, o Opus confere e, se necessário,
  **substitui o arquivo na pasta `fazer/`** do Sonnet (correção ou próxima
  instrução).
- Ao final de cada alteração, **sempre atualizar** os documentos.

## Fluxo Opus ↔ Sonnet (economia de tokens)
- **Opus** planeja e confere. **Sonnet** executa.
- O Opus deixa um **prompt estruturado** em `sonnet/fazer/`, autossuficiente, com
  a mesma qualidade que o Opus entregaria.

## Estrutura multi-página (2026-07-10)
- **O dono pediu para versionar o projeto para receber novas páginas.** Estrutura:
  **cada página na sua pasta** (`src/paginas/<pagina>/`) e **uma pasta só de
  padronização** (`src/padrao/`) com tudo comum a todas as páginas (fontes, cores,
  espaçamento, componentes padrão, Header, Footer, lib, assets).
- **As páginas serão:** as da **navegação** (Homem, Mulher, Guia de Equipamento,
  Onde Encontrar, Institucional) + uma de **equipamento específico** (detalhe do
  produto, ao clicar num produto). A **Home** já existe; as outras são scaffolds.
- **Exceção pontual ao fluxo:** o dono pediu que o **Opus fizesse a reestruturação
  ele mesmo** ("faça você mesmo, faça apenas isso") — feito e commitado
  (`598a7ad`), visual conferido idêntico. (Fora isso, a regra "Opus não edita
  código" segue valendo.)
- **Backlog das páginas:** ver `opus/backlog/paginas.md` (roteamento primeiro,
  depois equipamento, depois as demais). Decisões abertas do dono ali.

## Observações
- O dono apagou o PDF de layout que havia adicionado — não há PDF versionado. A
  fonte da verdade do visual é o **site rodando em desktop**.
