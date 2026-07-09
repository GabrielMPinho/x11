# Instruções do Dono

Compilado de tudo que o dono do projeto instruiu até agora. Serve de norte para
o planejamento. **Manter atualizado** conforme novas instruções chegarem.

## Objetivo geral do projeto
- **Manter 100% do visual já feito.** Nada da aparência atual em desktop pode
  mudar. Esta é a regra mais importante.
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

## Decisões técnicas travadas (via perguntas ao dono)
- **Animações:** usar **Framer Motion** (pacote `motion`).
- **Interatividade:** elementos hoje decorativos (setas ← →, botões, links)
  recebem **apenas micro-interação/hover**, sem virar funcionais nesta passada.
- **Menu mobile:** **drawer lateral** (hambúrguer abre painel deslizante; fecha
  ao tocar fora).
- **Reveal de scroll:** **bidirecional** — ao descer, os elementos aparecem; ao
  subir, somem fazendo o caminho inverso.

## Ordem das fases (definida pelo dono)
Numeração pela **ordem real de execução**:
1. **Fase 1 — Fundação + Data-driven** ✅ concluída.
2. **Fase 2 — Responsividade + Mobile** ⏳ ativa (antes das animações, para
   animar sobre base estável).
3. **Fase 3 — Animações** ⬜ pendente.

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

## Observações
- O dono apagou o PDF de layout que havia adicionado — não há PDF versionado. A
  fonte da verdade do visual é o **site rodando em desktop**.
