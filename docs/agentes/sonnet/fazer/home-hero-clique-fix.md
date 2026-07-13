# Instrução — Home: corrigir o CLIQUE dos botões do Hero (z-index)

> **Diagnóstico do Opus (teste Playwright real):** os botões do Hero (`VER
> MASCULINO`/`VER FEMININO`) têm `onClick`/navegação **corretos**, mas o clique
> **não chega neles** — no ponto do botão, quem recebe o clique é o `<main>`
> (`document.elementFromPoint` retorna `MAIN`, e `page.click` dá timeout). A URL
> não muda.
> **Causa raiz:** `.hero` tem **`z-index: -1`** em `base.css` → o hero inteiro (e
> os botões) fica **atrás do `<main>`**, que captura os cliques.

## Correção
- **Remover o `z-index: -1` do `.hero`** (deixar `auto`/0), pra o hero deixar de
  ficar atrás do `<main>`.
- **Manter o visual:** reorganizar o empilhamento **dentro** do hero pra o
  `.hero_bg` (camada de parallax) continuar **atrás** do conteúdo — dar ao
  `.hero_bg` um z-index baixo e ao `#escrito`/`#botoes` um z-index **acima**
  (o `.hero` já é `position: relative`, cria o contexto). O **repouso do desktop
  deve ficar pixel-idêntico** — só muda o stacking interno, nada visual.
- Garantir (no código) que os botões do Hero ficam **clicáveis** (não cobertos
  pelo `<main>`).

## Verificar de passagem
- **`.hero_institucional`** também tem `z-index: -1` — lá **não há botões**, então
  não bloqueia nada; se for trivial alinhar o mesmo padrão, faça; senão, deixe.
- Os outros botões ligados (`EXPLORAR COLEÇÃO`, `COMPRAR` dos Favoritos, cards de
  Categoria) estão em seções **sem** z-index negativo — confirmar no código que
  não têm o mesmo problema (não devem ter).

## Regras
- **Só o stacking do Hero**; **visual em repouso idêntico** (regra de ouro). Não
  mexer em outras seções nem no conteúdo.

## Verificação (o que É seu — Sonnet)
- `npx vite build` ✅ · `npm run lint` ✅.
- Checagem **no código**: `.hero` sem `z-index` negativo; `.hero_bg` atrás do
  `#escrito`/`#botoes`; visual do hero em repouso inalterado.
- ⚠️ **NÃO tire prints** nem teste clique — a conferência de comportamento/visual
  é do **Opus** (eu re-testo o clique via Playwright depois).

## Documentar (sem commitar)
- **CHANGELOG** (topo): correção do clique dos botões do Hero (z-index do `.hero`).
- **Não commitar** — resuma. O Opus re-testa o clique.
