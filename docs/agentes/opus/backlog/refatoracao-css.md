# Plano — Quebrar o `base.css` gigante em arquivos por página (CSS puro)

> **Status:** ⏳ EM EXECUÇÃO — **passe 1 ativo** em `sonnet/fazer/
> css-split-passe-1.md` (Produto concluída e commitada, `3cc0ea1`). Passe 1 =
> split mecânico (fundação + arquivos por página; mobile global fica inteiro em
> `responsividade.css`). **Passe 2** (co-locar o mobile de Home/Institucional/
> Produtos em cada página) vira instrução própria depois — a Equipamento já
> nasceu com o mobile self-contained.
>
> **Intenção do dono:** "cada página vai ter seu CSS" — o alvo é a **co-locação
> por página** (o CSS exclusivo de cada página no arquivo dela; o compartilhado
> — tokens/reset/header/footer/botão/animações — em `src/padrao/estilos/`). Ver
> abaixo os 2 passes (o passe 2 é o que leva o **mobile** de cada página pro
> arquivo dela).
>
> **Motivação (dono, 2026-07-14):** "não estou gostando de ter um arquivo css
> enorme". Hoje `src/padrao/estilos/base.css` tem **2211 linhas** e cresce a cada
> página nova.

## Diretriz
Fatiar o `base.css` em **vários arquivos CSS puros**, espelhando a arquitetura
"cada página na sua pasta" que o projeto já usa (o CSS é hoje a única exceção
centralizada). **Sem** Tailwind, **sem** CSS Modules, **sem** styled-components,
**sem** dependência nova — continua CSS puro, só que modular.

**Refatoração MECÂNICA:** recortar e colar os blocos (que já são delimitados por
`/* SEÇÃO */ … /* FIM SEÇÃO */`), **sem reescrever nenhuma regra**. O
`base.css` vira um **manifesto** que só faz `@import` dos parciais **na mesma
ordem de hoje** → o CSS compilado pelo Vite fica **idêntico** → desktop >1280px
**pixel-perfeito** (regra de ouro respeitada). O `<link>` do `index.html` não
muda (continua apontando pro `base.css`).

## Estrutura-alvo
```
src/padrao/estilos/
  tokens.css          (já existe — cores + fontes :root)
  base.css            → SÓ o manifesto (@import na ordem abaixo)
  reset.css           (reset do topo + bloco LENIS)
  header.css          (HEADER + header minimalista, hoje na Fase 3)
  footer.css          (FOOTER)
  botao.css           (botão cortado com preenchimento — hoje na Fase 3)
  animacoes.css       (resto da "FASE 3 — ANIMAÇÕES base": zoom moldura,
                       elevação hover, hero_bg parallax — regras globais)
src/paginas/home/home.css                    (HERO..BANNER da Home)
src/paginas/institucional/institucional.css
src/paginas/produtos/produtos.css
src/paginas/equipamento/equipamento.css      (quando a página existir)
src/padrao/estilos/responsividade.css        (ver ⚠️ abaixo)
```

## Mapa de corte (blocos atuais do `base.css` → arquivo destino)
Faixas de linha conferidas em 2026-07-14 (podem mudar conforme o arquivo evolui —
usar os comentários `/* SEÇÃO */` como âncora, não os números):

| Linhas | Bloco atual | Vai para |
|---|---|---|
| ~1–42 | topo (reset) + LENIS | `reset.css` |
| 44–102 | HEADER | `header.css` |
| 106–830 | HERO · FAVORITOS · LANÇAMENTO DESCONTO · CATEGORIAS · LANÇAMENTO ESPECIAL · TERRITÓRIO · DESTAQUES · HISTORIAS · BANNER | `home.css` |
| 835–910 | FOOTER | `footer.css` |
| 915–1101 | FASE 3 — ANIMAÇÕES (base) | dividir: header minimalista→`header.css`; botão cortado→`botao.css`; zoom/elevação/hero_bg→`animacoes.css` |
| 1106–1434 | INSTITUCIONAL (hero, quem somos 1/2/3, timeline, missão, valores) | `institucional.css` |
| 1439–1864 | PRODUTOS — PLP | `produtos.css` |
| 1870–2210 | RESPONSIVIDADE (global) | `responsividade.css` (ver ⚠️) |

**Ordem do manifesto `base.css`** (idêntica à de hoje — NÃO reordenar):
`tokens → reset → header → home → footer → botao → animacoes → institucional →
produtos → responsividade` (+ `equipamento` na posição da página quando existir).

## ⚠️ O cuidado principal — o bloco global de RESPONSIVIDADE
As linhas **1870–2210** são um bloco único com **todas** as regras mobile do site
(3 `@media`: `max-width:1280 / 768 / 480`), misturando Home + Institucional +
Produtos. Duas formas de tratar:
- **Passe 1 (recomendado, zero risco):** manter esse bloco inteiro como
  `responsividade.css`, importado **por último** (como está hoje) — saída
  idêntica. Simples, seguro, resolve o "arquivo gigante" (fica isolado).
- **Passe 2 (refino, opcional depois):** distribuir cada regra `@media` para o
  arquivo da sua página (co-locar mobile+desktop). Mais organizado, mas exige
  cuidado com a cascata (mesma especificidade → ordem importa) e conferência
  visual mais atenta. Fazer só depois do passe 1 estar validado, e só se o dono
  quiser.

Os `@media (hover:hover)` que estão **dentro** das seções (Fase 3, Produtos)
viajam junto com sua seção naturalmente — sem tratamento especial.

## Como amarrar os parciais (2 opções)
- **(i) Manifesto com `@import`** (recomendado p/ o passe 1): `base.css` só tem
  `@import "./reset.css"; @import "./header.css"; …`. O Vite inlina tudo na
  ordem → saída idêntica. `index.html` intacto.
- **(ii) Componente importa seu CSS:** cada página faz `import "./home.css"` no
  `.jsx`. Mais co-locado/moderno, mas a ordem passa a depender do grafo de
  imports do JS — só é seguro porque cada página usa classes com namespace
  próprio (`.hero_institucional`, `.colecao_hero`, `.equipamento_pdp`…). Se
  adotar, a **fundação** (tokens/reset/header/footer/animações) tem que carregar
  **antes** de qualquer página (manter via manifesto no `index.html`).
  Recomendação: **(i) no passe 1**; (ii) é evolução opcional.

## Verificação (quando executar)
- `npx vite build` ✅ · `npm run lint` ✅.
- **Diff do CSS compilado:** como é recorte mecânico, o bundle final tem que ser
  equivalente (só muda ordem de whitespace). Conferir que nenhuma regra sumiu/
  duplicou.
- **Conferência visual do Opus** nos 5 viewports (390/768/1024/1280/1440) antes/
  depois → diferença **zero**. É o teste real de que a cascata foi preservada.

## Sequência com a página Produto — DECIDIDA
**Produto primeiro, split depois** (dono, 2026-07-14). A página Equipamento é
construída normalmente (seu CSS entra no `base.css`, como as outras hoje); assim
que ela estiver concluída e conferida, esta refatoração roda e move **também** o
CSS recém-criado da Equipamento pros arquivos separados. Ou seja, o split já
nasce cobrindo as 4 páginas (Home, Institucional, Produtos, Equipamento).
