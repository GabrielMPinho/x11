# Contexto do Projeto X11 (para o agente de código)

> Documentação de contexto para o agente executor (Sonnet) entender o projeto
> por completo antes de atuar. Leia os arquivos na ordem abaixo.

## Índice
1. [`README.md`](./README.md) — este arquivo: visão geral, stack e como rodar.
2. [`arquitetura.md`](./arquitetura.md) — estrutura de pastas e fluxo de dados.
3. [`componentes.md`](./componentes.md) — o que cada componente/seção faz.
4. [`estilos.md`](./estilos.md) — sistema de CSS, variáveis e o estado do layout.
5. [`convencoes.md`](./convencoes.md) — regras e padrões a seguir SEMPRE.

## Referência de design (fonte da verdade do visual)
A referência do visual é **o próprio site rodando em desktop** — ele deve ser
preservado 100%. Não há PDF de layout versionado no projeto. Atualmente só a
página HOME está implementada em código.

## O que é o projeto
Landing page (single-page) de e-commerce da marca **X11**, de equipamentos de
motociclismo (jaquetas, luvas, capacetes, botas etc.). É uma página de
apresentação/vitrine — **não** há backend, carrinho, rotas ou lógica de negócio.
Estética: agressiva, angular, tom escuro com destaque em laranja.

## Stack
- **React 19** (`react` / `react-dom` ^19.2)
- **Vite 8** (bundler + dev server)
- **Framer Motion** (pacote `motion`) — animações
- **CSS puro** em um único arquivo `src/index.css` (NÃO usa Tailwind, apesar de
  um commit antigo mencionar migração que foi revertida)
- **Oxlint** — linter
- Componentes em **`.jsx`** (JavaScript + JSX). Apesar do nome "React + TS" no
  README padrão, o projeto **não usa TypeScript** de fato.

## Como rodar
```bash
npm install
npm run dev      # sobe o Vite (porta padrão 5173; usar porta alta se publicar)
npm run lint     # oxlint
npx vite build   # build de produção (usar este, não `npm run build` — ver abaixo)
```

### Atenção ao build
`npm run build` = `tsc -b && vite build`. O `tsc -b` **falha** por
desconfiguração pré-existente (`tsconfig.app.json` inclui só `src` e procura
`.ts/.tsx`, mas o projeto é `.jsx`). Para gerar produção use `npx vite build`
diretamente até que o tsconfig seja ajustado.

## Idioma
Todo o conteúdo e a comunicação são em **português do Brasil**. Nomes de
variáveis, classes CSS e arquivos de dados usam português.

## Regras de ouro (do dono do projeto)
1. **NUNCA alterar o visual atual em desktop.** Refatorações e responsividade
   devem preservar 100% da aparência em telas grandes. Ver `convencoes.md`.
2. Manter tudo **data-driven** — conteúdo em `src/data/`, nunca hardcoded no JSX.
3. A cada alteração, atualizar `docs/agentes/alterações/CHANGELOG.md` (entrada
   nova no topo).
