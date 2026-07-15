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
- **Roteamento com React Router (2026-07-13):** o dono aprovou adicionar
  `react-router-dom` para ter **Home + Institucional (e as demais páginas)
  navegáveis por URL**, coexistindo (fim do toggle temporário). É a Fase 0 das
  páginas (`backlog/paginas.md`). Em seguida: **institucional completa** (todas as
  seções + **hero com texto centralizado** no meio, pedido do dono).
- **Tratamento das imagens — experimento na Favoritos (2026-07-13):** o dono
  achou as imagens de seção "secas/coladas" (retângulos crus). Testando **3
  tratamentos distintos** (1 por card) na seção **Favoritos da Home** — **exceção
  pontual à regra de ouro** (só essa seção muda no desktop). Estilos: (1) fade pro
  fundo, (2) corte diagonal + duotone, (3) duotone com reveal no hover. O dono
  escolhe 1, que vira o **padrão reutilizável** das imagens. Instrução:
  `sonnet/fazer/favoritos-tratamento-imagens.md`.

- **Conferir o PDF VISUALMENTE, sempre (2026-07-14):** ao planejar uma página a
  partir de um PDF de layout, o Opus deve **renderizar o PDF em imagem e olhar** —
  não basta o `.txt` extraído. Registrado como regra fixa em `opus/README.md` e o
  método (Docker rootless + poppler `pdftoppm` → PNG → ler) em
  `docs/layout/README.md`.
- **Página PRODUTO / Equipamento (2026-07-14):** o dono mandou fazer a **última
  página** — o detalhe do produto (`/equipamento`). Filtros da PLP **ficam como
  estão** (visuais, sem lógica — "não tem problema serem visuais"). Instrução
  ativa: `sonnet/fazer/equipamento-pagina-produto.md`; levantamento visual em
  `opus/backlog/produto.md`. Decisões de design do Opus (dono pode vetar):
  produto unificado como **JAQUETA EXPEDITION** (layout mistura jaqueta/calça);
  **sem CTA de compra** (vitrine); **setas dos carrosséis funcionais** nesta
  página; **galeria com troca de imagem** no clique do thumbnail.

- **⭐ A RÉGUA DO DESKTOP PASSA A SER 1440px (2026-07-14)** — o dono: *"o padrão
  de desktop deve ser o que está em **1440px**. O **1024px** deve ser **esse mesmo
  modelo, porém com as devidas proporções**."* Isso **redefine a regra de ouro**:
  - **Referência = 1440 × 900.** O 1024 tem que ser o **1440 encolhido** (0,7111×) —
    mesmas grades, mesmo desenho, só menor. Nada de "outro layout" em 1024.
  - **Fronteira nova:** **desktop ≥ 1024px** (escalando de 1024 a 1440) ·
    **responsivo ≤ 1023px** (o design atual, intocado por ora). Antes a fronteira
    era >1280px.
  - **Acima de 1440px:** nada muda.
  - **Proporções travadas na LARGURA** (decisão do dono nesta rodada): hoje as
    caixas são dimensionadas em `vh`, então o "desktop do 1440" **muda conforme a
    altura da janela** (o card de Favoritos tem 855px numa janela 1440×900 e
    1026px numa 1440×1080 — medido). As caixas de conteúdo passam a derivar a
    altura da largura (`aspect-ratio`). **Exceção autorizada à regra de ouro:**
    em janelas mais altas que 900px o desktop deixa de esticar as imagens.
  - **Texto com piso de legibilidade** (decisão do dono): o layout escala fiel
    (0,7111×), mas a fonte **não desce de 12px** — senão a nav cairia de 16px pra
    11,4px. O piso só morde as fontes pequenas; os títulos escalam fiéis.
  - **Outros viewports:** o dono disse ter **mais ajustes** para os demais
    viewports — este (1024) é "o principal por enquanto".
  - Instrução ativa: `sonnet/fazer/escala-desktop-1024-1440.md` (fundação `--u` +
    chrome compartilhado + Home). Institucional/Produtos/Equipamento vêm depois,
    uma instrução por página.

- **Deploy na Vercel (2026-07-14):** o dono tentou publicar e o build quebrou
  (`TS18003` — o script `npm run build` rodava `tsc -b` num projeto sem nenhum
  arquivo `.ts`). Disse **"pode arrumar isso você mesmo"** → **exceção pontual**
  à regra "o Opus não edita código" (a 2ª; a 1ª foi a reestruturação
  multi-página). O Opus corrigiu o script e criou o `vercel.json` com o
  **fallback SPA** (sem ele, `/institucional` e as outras rotas dariam 404 em
  produção). Detalhes no CHANGELOG. **Fora essas exceções, a regra segue valendo.**

- **Validação em laptop + rodada de MOBILE (2026-07-14):** depois da escala de
  desktop (`fd458ce`), o dono validou no laptop e pediu:
  - **Corrigir** o **botão VER FEMININO** do hero da Home, que **sumiu** (o Opus
    mediu: o hero é posicionado por `vh`, então em janela de 768px de altura o 2º
    botão é cortado pelo `overflow:hidden` — em 1440×900 sobravam só 2px).
  - **Corrigir** a seção **Histórias, sem espaçamento embaixo** no 1440 e no
    laptop (`margin-bottom` comentado + `margin-top:11vh`). ⚠️ **Muda o 1440 —
    autorizado**, foi o dono que apontou.
  - **Mobile — animações:** o dono disse "faltando animações em todas as
    páginas". O Opus mediu: elas **rodam**, mas **fora da tela** — o reveal segue
    o progresso da **seção**, e no mobile as seções ficam 2–5× mais altas que a
    viewport. Decisão: no mobile o reveal passa a seguir o **próprio elemento**.
  - **Mobile — PLP (Homem/Mulher): 2 colunas** de produtos (hoje 1).
  - **Mobile — carrosséis: SEM setas**, com **avanço automático**, **ainda
    arrastáveis**. Desenho do autoplay definido pelo Opus (contínuo/lento, ~1 card
    a cada 3,5s, loop sem emenda, pausa no toque e retoma em ~1,5s, sem autoplay
    em `reduced-motion`). Vale para os 3 carrosséis; **desktop inalterado**.
  - Backlog: `opus/backlog/mobile.md` · Instrução:
    `sonnet/fazer/correcoes-hero-historias-e-mobile.md`.

- **RODADA 2 de correção — validação do dono (2026-07-15):** o Sonnet executou a
  instrução acima (ainda **não commitada**), o dono validou e **quatro pontos
  ficaram quebrados**. O Opus reproduziu e mediu tudo no navegador:
  - **Hero** — a troca de `top:vh` por `padding-top: calc(351*--u)` **fixo** joga
    o parágrafo e os 2 botões **abaixo da dobra** em janela de laptop (medido: 2
    botões 114px abaixo em 1440×768; 140px em 1600×740 — o print do dono). 1440×900
    ainda cabe. Correção: header+hero = 1 tela; conteúdo ancorado **de baixo** com
    folga elástica no topo.
  - **Histórias** — `padding:224*--u` dos dois lados (seção virou 1054px) **e** a
    remoção do `margin-top` do container fez o título (`.titulo{top:7vh}`)
    **sobrepor os cards**. Correção: ritmo simétrico moderado (referência
    **Território**, 63/63) + folga real título↔cards.
  - **Mobile some tudo** — o reveal por elemento usou janela **curta**
    (`start 70%`) numa curva que tem **saída**, então o bloco vai a opacity 0 **em
    cena** (medido: 42/47 blocos). Correção: usar a **passagem inteira** do
    elemento (`end start`), como o desktop faz por seção.
  - **Carrossel da Home** — a rodada anterior pôs **autoplay** no
    `CarrosselArrastavel` (modo toque), que ativa em ponteiro grosso em **qualquer
    largura** → a Home passou a andar sozinha **também no laptop**. O dono: *"o
    carrossel da home deve se manter intacto, como era antes"*. **Decisão do Opus
    (dono pode vetar):** reverter **só** o carrossel da Home a `fd458ce` (arraste
    puro no toque, sem autoplay); o autoplay **fica** nos 2 do Equipamento (não
    reclamados). Se o dono quiser autoplay na Home só no mobile real, é outra
    rodada.
  - Instrução ativa: `sonnet/fazer/correcao-hero-historias-mobile-carrossel.md`
    (substituiu a anterior). Backlog em `opus/backlog/mobile.md`.
  - **Conferido pelo Opus (2026-07-16, medido + prints):** os 4 pontos passaram —
    hero com os 2 botões acima da dobra em todos os laptops (header+hero=100vh) e
    idêntico em 1440×900; Histórias sem sobreposição e cabendo na tela; mobile sem
    vão preto nem overflow (banner assenta); carrossel da Home com `git diff
    fd458ce` vazio. **Verde, aguardando o dono validar e liberar o commit.**

- **LANÇAMENTO ESPECIAL "Bike Fest" — bloco de texto (2026-07-16):** ⚠️ há **DUAS
  seções com o kicker "LANÇAMENTO ESPECIAL"** — o dono se confundiu e depois
  esclareceu que é a de **fundo BRANCO**, título **"CONCORRA AO COMBRO DE PROTEÇÃO
  NO BIKE FEST"**, foto do estande à direita = a seção **`.lancamento_desconto`**
  (não a `.lancamento_especial`/"Valor para Aventura"/fundo escuro). O texto está
  **esticado** (ocupa os 823px inteiros da coluna esquerda, alinhado à esquerda);
  ele quer **estreito (forma quadrada) e centralizado**. Refinamento: **mexer
  APENAS no bloco de texto** (`#texto`) — não tocar na imagem, no fundo nem no
  conteúdo (incl. o typo "COMBRO"). Como o fundo é branco e o texto preto, **não
  há problema de legibilidade** (o alerta de overlay que eu havia levantado era da
  outra seção, não se aplica).

- **Header — logo cobrindo o preto (2026-07-16):** o dono quer tirar a **faixa de
  ~15px de preto acima** da logo — ela deve cobrir toda a altura preta do header,
  **sem** mudar largura nem posição horizontal. Medido: header 108px, logo 308×130
  empurrada por `top: calc(26*--u)` (15px de preto acima, 37px passando pro hero).
  Correção: `header img{ top }` de `26` → **`11`** (= `(130−108)/2`, o offset que
  leva o topo da logo ao topo do header; escala com `--u`, zera o preto em todos os
  viewports). A logo sobe 15px (cobre os 22px do hero em vez de 37).

- **Produtos (PLP) — botão "EM DESTAQUE" cortado no mobile (2026-07-16):** no
  bloco editorial ("Como escolher sua jaqueta?") das páginas `/homem` e `/mulher`,
  o botão herda a regra global `button{width:14vw}` (=55px @390) e o texto (95px)
  **corta** ("EM DESTA...") por causa do `overflow:hidden`. Desktop ok (202px).
  Correção: incluir `.bloco_editorial .botao_cortado` na regra `≤1023` que já dá
  `width:auto; white-space:nowrap` aos CTAs da Home. Só mobile; desktop intacto.

- **Reveal no mobile — era só configuração do aparelho (2026-07-16):** o dono
  reportou que no celular real os elementos não animavam (mas no emulador do PC
  sim). Diagnóstico: era o **"Reduzir Movimento" ligado no aparelho** — o site
  desliga animações + Lenis de propósito nesse caso (`prefers-reduced-motion`, ver
  `App.jsx`). Desligou no celular → voltou a animar. **Sem alteração de código** (o
  comportamento está correto). Fica registrado como pegadinha de conferência mobile.

  Os **três** ajustes de layout acima (LANÇAMENTO Bike Fest, logo do header, botão
  da PLP) foram **juntados numa instrução só** (nenhum executado ainda):
  `sonnet/fazer/home-lancamento-bikefest-e-logo-header.md`.

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
