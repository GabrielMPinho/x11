# Instrução — Split do `base.css` por página (PASSE 1, mecânico e seguro)

> **Objetivo:** quebrar `src/padrao/estilos/base.css` (2211 linhas) em vários
> arquivos CSS puros por página + fundação compartilhada, **sem mudar nada
> visual**. Refatoração 100% **mecânica**: recortar e colar blocos (que já são
> delimitados por `/* SEÇÃO */ … /* FIM SEÇÃO */`), **sem reescrever regra
> nenhuma**. Plano completo e racional: `docs/agentes/opus/backlog/
> refatoracao-css.md`. **Sem** Tailwind/CSS Modules/dependência nova.

## Princípio que garante ZERO mudança visual (leia primeiro)
CSS é sensível à **ordem da cascata**. Para a saída compilada pelo Vite ficar
**idêntica**, o `base.css` vira um **manifesto** que só faz `@import` dos parciais
**exatamente na ordem em que os blocos aparecem hoje**. Como o Vite inlina os
`@import` na ordem, o CSS final é equivalente → **desktop >1280px pixel-idêntico**
(regra de ouro preservada). Nada de reordenar, renomear seletor ou "melhorar"
regra — só mover.

## Escopo do PASSE 1 (este arquivo)
- Extrair a **fundação compartilhada** e o **CSS de cada página** para arquivos
  próprios.
- O bloco global de **RESPONSIVIDADE** (o mobile de Home+Institucional+Produtos,
  linhas ~1921–2210) sai **inteiro** para `responsividade.css`, importado **por
  último** (como está hoje). **NÃO** distribuir esse mobile por página agora —
  isso é o **passe 2** (outra instrução), mais delicado.
- A página **Equipamento (PDP)** já tem o mobile **self-contained** no próprio
  bloco (2217–2906) → vai inteira pro `equipamento.css` (desktop + mobile juntos).

## Mapa de corte (bloco atual do `base.css` → arquivo destino)
Use os comentários `/* SEÇÃO */` como âncora (as linhas podem variar 1–2):

| Origem (bloco / linhas aprox.) | Arquivo destino |
|---|---|
| Reset `*{}` (1–9) + `body{background}` (21–23) + regras `.lenis`/`html.lenis` (25–45) | `src/padrao/estilos/reset.css` |
| HEADER (44–102) **+** header minimalista (Fase 3, ~921–978) **+** hambúrguer/drawer/overlay (~1900–1918) | `src/padrao/estilos/header.css` |
| HERO·FAVORITOS·LANÇ. DESCONTO·CATEGORIAS·LANÇ. ESPECIAL·TERRITÓRIO·DESTAQUES·HISTORIAS·BANNER (106–830) | `src/paginas/home/home.css` |
| FOOTER (835–910) | `src/padrao/estilos/footer.css` |
| Botão cortado c/ preenchimento (Fase 3, ~979–999) | `src/padrao/estilos/botao.css` |
| Resto da Fase 3 (zoom moldura ~1000–1018, elevação hover ~1019–1088, `.hero_bg` ~1089–1100) | `src/padrao/estilos/animacoes.css` |
| INSTITUCIONAL — todas as seções (1106–1434) | `src/paginas/institucional/institucional.css` |
| PRODUTOS — PLP (1439–1864) | `src/paginas/produtos/produtos.css` |
| RESPONSIVIDADE global (1921–2210) | `src/padrao/estilos/responsividade.css` |
| PÁGINA EQUIPAMENTO / PDP, com seu mobile self-contained (2217–2906) | `src/paginas/equipamento/equipamento.css` |

## Ordem do manifesto `base.css` (idêntica à de hoje — NÃO reordenar)
`base.css` fica só com `@import`, nesta ordem exata:
1. `@import "./tokens.css";` (já existe)
2. `@import "./reset.css";`
3. `@import "./header.css";`
4. `@import "@/paginas/home/home.css";`
5. `@import "./footer.css";`
6. `@import "./botao.css";`
7. `@import "./animacoes.css";`
8. `@import "@/paginas/institucional/institucional.css";`
9. `@import "@/paginas/produtos/produtos.css";`
10. `@import "./responsividade.css";`
11. `@import "@/paginas/equipamento/equipamento.css";`

- **Atenção à ordem 10→11:** hoje o bloco RESPONSIVIDADE vem **antes** do bloco
  EQUIPAMENTO no arquivo — então `responsividade.css` importa **antes** de
  `equipamento.css`. Manter assim.
- **Imports com alias `@`:** o Vite resolve `@` → `src/` **também em CSS**
  (`resolve.alias` do `vite.config.ts` vale pro `@import`). Se por algum motivo o
  `@import "@/paginas/..."` não resolver no build, cair para caminho **relativo**
  (`../../paginas/home/home.css` a partir de `src/padrao/estilos/`) — o que
  importa é a **ordem**, não o estilo do caminho.
- **Não** mudar o `<link>` do `index.html` — continua apontando pro `base.css`.

## Cuidados mecânicos (não escorregar)
- **Mover, não reescrever.** Cada regra vai **verbatim** pro arquivo destino
  (mesma ordem interna). Nenhum seletor renomeado, nenhum valor mexido.
- **Header dividido em 2 pontos:** as regras de header estão em 2 lugares do
  arquivo (base ~44–102 e minimalista ~921–978, com o Home no meio). Ao juntar
  tudo em `header.css`, mantenha a **ordem relativa entre elas** (base antes do
  minimalista). Como os seletores de header (`header`, `.header_minimalista`,
  `#drawer_menu`…) **não colidem** com os das seções da Home, puxá-las pra antes
  do `home.css` no manifesto **não** muda a cascata.
- **Comentários viajam junto** com suas regras (não perder o racional embutido).
- **Não** criar `@media` novos nem mexer nos existentes neste passe.

## Verificação (o que É seu — Sonnet)
- `npx vite build` ✅ · `npm run lint` ✅.
- **Prova de equivalência do CSS compilado** (essencial, já que é recorte
  mecânico): comparar o bundle CSS **antes × depois**. Sugestão objetiva:
  1. Antes de começar, `npx vite build` e guardar o `dist/assets/index-*.css`.
  2. Depois do split, `npx vite build` de novo e comparar os dois CSS
     **normalizados** (ex.: ordenar/normalizar whitespace) — devem ter **as
     mesmas regras, na mesma ordem**. Reportar no resumo que a comparação bateu
     (ou qualquer diferença encontrada). Só a ordem de whitespace pode variar.
- Conferir que `base.css` ficou **só com `@import`** (nenhuma regra solta) e que
  cada arquivo novo existe com seu bloco.
- ⚠️ **NÃO tire prints** — a conferência visual dos 5 viewports (390/768/1024/
  1280/1440) é do **Opus** (comparo antes×depois; a diferença tem que ser zero).

## Documentar (sem commitar)
- **CHANGELOG** (entrada NO TOPO): split do `base.css` em fundação + arquivos por
  página (passe 1, mecânico, saída idêntica). Listar os arquivos criados e a
  ordem do manifesto.
- **`contexto/estilos.md` e `arquitetura.md`:** atualizar — o CSS deixou de ser
  um `base.css` único; agora é um manifesto + parciais (fundação em
  `padrao/estilos/`, mobile global ainda em `responsividade.css`, cada página com
  seu `<pagina>.css`; a Equipamento já com mobile próprio). Registrar que o
  **passe 2** (co-locar o mobile de Home/Institucional/Produtos em cada página)
  fica pendente.
- **Não commitar.** Resuma (inclua o resultado da prova de equivalência do CSS).
  O Opus confere os 5 viewports antes×depois e o dono dá o sinal verde.
