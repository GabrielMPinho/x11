# Changelog — X11

> Registro de todas as alterações do projeto. **Entradas mais novas no topo.**
> Formato de cada entrada: `## AAAA-MM-DD HH:MM — TÍTULO` seguido do que foi feito e **por quê**.

---

## 2026-07-09 09:28 — Fase 1: Fundação e conteúdo data-driven

**O que foi feito:**
- Instalada a biblioteca `motion` (Framer Motion, compatível com React 19). Ainda **não** utilizada — preparação para a Fase 3 (animações).
- Criada a pasta `src/data/` com 7 arquivos que concentram todo o conteúdo textual e as imagens de cada seção: `navegacao.js`, `favoritos.js`, `categorias.js`, `destaques.js`, `territorio.js`, `historias.js`, `footer.js`.
- Refatorados os componentes `Header`, `Favoritos` e `Footer` — que tinham JSX repetido escrito à mão — para gerar o conteúdo via `.map()` sobre os dados.
- Os componentes que já eram data-driven (`Categorias`, `Destaques`, `Territorio`, `Historias`) tiveram seus arrays de dados movidos para `src/data/`.
- **Correção de bug:** imagens de `Destaques`, `Territorio`, `Historias` e `Footer` eram referenciadas como **string literal** (`"../src/assets/..."`), o que funcionava só no dev e **quebrava no build de produção**. Migradas para `import`.
- Corrigido o `<title>` de `ReactFacts` → `X11` no `index.html`.

**Por quê:**
- Requisito do usuário de deixar a página "o mais automática possível" e "tirar o tipo estático": centralizar conteúdo em dados torna manutenção trivial (editar 1 linha de dado em vez de mexer no JSX) e elimina repetição.
- O fix de imagens era necessário para que o `vite build` gerasse os assets corretamente — sem ele, a versão de produção ficaria com imagens quebradas.

**Verificação:** `vite build` ✅ (todas as imagens empacotadas) · `oxlint` ✅ · DOM de saída idêntico ao anterior (zero mudança visual).

**Pendência conhecida (pré-existente, não introduzida aqui):** `npm run build` executa `tsc -b` antes do vite e falha porque `tsconfig.app.json` procura `.ts/.tsx` mas o projeto é todo `.jsx`. Sem impacto visual. A validar/corrigir em fase futura.
