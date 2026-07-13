# Levantamento — Página Institucional

> **Fonte:** `docs/layout/institucional.pdf` (texto em `institucional.txt`) + PNG
> enviado pelo dono. Estética = **mesma da Home** (tokens, títulos condensados
> bold itálico, kickers laranja em caixa-alta, fundos alternando preto/cinza).
> **Reaproveitar** de `src/padrao/`: Header, Footer, `BotaoCortado`, `Revela`,
> `motion.js`, tokens. Ver `sonnet/contexto/`.

## Regras específicas desta página
- **Espaçamento do PDF é problemático** (dono avisou) → usar ritmo/tokens do
  design system e o hero da Home como régua; PDF só define estrutura/proporção.
- **Responsivo e data-driven** desde o início (texto das seções repetidas em
  `src/paginas/institucional/dados/`). Desktop > 1280px sem quebra; liberdade
  ≤ 1280px preservando estética.
- **Ordem de execução:** 1 seção (ou bloco) por instrução no `sonnet/fazer/`,
  começando pelo **Hero** (destacado pelo dono).
- **Como ver a página (sem roteamento ainda):** decisão pendente — provável
  toggle temporário no `App.jsx` (render `<Institucional/>` no lugar de `<Home/>`
  durante o desenvolvimento) até a fase de roteamento. Confirmar com o dono.

## Assets
| Seção | Imagem | Situação |
|---|---|---|
| Hero | motociclista + moto vermelha na floresta | ❌ **falta** (alta-res) |
| Quem Somos #2 | jaqueta (detalhe do peito/zíper) | ✅ `institucional-quemsomos.jpg` |
| Quem Somos #3 | proteção/armadura (malha preta) | ✅ `institucional-detalhe.jpg` |
| Missão (quote) | grupo de motociclistas | ❌ **falta** (alta-res) |

## Estrutura (topo → base) e textos reais

### 1. HERO ⭐ (primeira instrução)
- Kicker (laranja): `INSTITUCIONAL`
- Título (branco, condensado, **caixa mista com ponto** — difere da Home que é
  all-caps): `Movidos pela mesma paixão.` (no layout quebra em 2 linhas:
  "Movidos pela" / "mesma paixão.")
- Subtítulo (laranja): `A liberdade sobre duas rodas`
- **Sem CTA/botões** (diferente do hero da Home).
- Fundo: foto full-bleed com overlay/gradiente escuro à esquerda p/ legibilidade;
  texto alinhado à esquerda, baixo/meio. Header completo sobreposto no topo.
- Padrão a seguir: `Hero_Home.jsx` (`.hero`/`.hero_bg` parallax/`#escrito` com
  `.p_laranja`+`h1`+subtítulo; `heroStagger`/`heroItem`), **sem** o bloco de
  botões.

### 2. QUEM SOMOS #1 — features
- Kicker: `QUEM SOMOS` · Título: `EQUIPAMENTOS DE ALTA PERFORMANCE PARA MOTOCICLISTAS.`
- Corpo (3 parágrafos, à direita):
  1. "A X11 nasceu para estar junto do motociclista que, assim como nós, deseja ir além em segurança — sem se prender a rótulos ou status. Cada um no seu estilo, todos com a mesma paixão pela estrada."
  2. "Somos uma marca brasileira com forte atuação no segmento duas rodas, reconhecida por unir segurança, inovação e design em produtos pensados para quem pilota de verdade."
  3. "Capacetes homologados, jaquetas, luvas, calças e macacões com proteções certificadas CE e materiais resistentes para diferentes estilos de pilotagem — do urbano ao adventure, do touring ao sport."
- **4 features** (ícone laranja + título + texto), data-driven:
  - `SEGURANÇA CERTIFICADA` — "Proteções CE Nível 1 e 2, materiais homologados e testes que vão além da norma."
  - `TECNOLOGIA ACESSÍVEL` — "Inovação no produto, preço justo na etiqueta. Alta performance sem ser inalcançável."
  - `PARA TODO ESTILO` — "Sport, Adventure, Urbano, Touring. O equipamento certo para a sua pilotagem."
  - `EXPERT RIDERS` — "Uma comunidade nacional de motociclistas que escolheu andar com a gente."

### 3. QUEM SOMOS #2 — imagem + texto
- Imagem à esquerda (`institucional-quemsomos.jpg`).
- Kicker `QUEM SOMOS` · Título: `FEITA POR MOTOCICLISTAS PARA MOTOCICLISTAS.`
- Corpo: **no PDF vem idêntico aos 3 parágrafos da seção #1** → provável
  **placeholder**; confirmar com o dono se o texto deve variar. ⚠️

### 4. TIMELINE — marcos (4 colunas)
- `2007` **FUNDAÇÃO** — "A X11 nasce em Minas Gerais com um propósito claro: oferecer ao motociclista brasileiro equipamentos de alta performance, com segurança certificada e preço justo." (⚠️ PDF traz "Minas Gerias" — typo, confirmar.)
- `2009` **PRIMEIRA FÁBRICA** — "Inauguração da unidade própria. Controle total do processo produtivo, do desenvolvimento à entrega — sem intermediários, sem abrir mão da qualidade."
- `2015` **LINHA ADVENTURE** — "Lançamento da primeira linha completa para off-road. Equipamentos testados em campo, do cerrado brasileiro às trilhas da Cordilheira dos Andes."
- `2021` **EXPERT RIDERS** — "Mais de 200 mil motociclistas equipados. Presença nacional, comunidade ativa e a mesma paixão de sempre: a liberdade sobre duas rodas."

### 5. QUEM SOMOS #3 — texto + imagem
- Kicker `QUEM SOMOS` · Título: `CADA DETALHE PENSADO PARA A SUA PROTEÇÃO.`
- Corpo: "Costuras reforçadas, ferragens metálicas, tecidos abrasion-tough e proteções CE posicionadas com precisão nos pontos de impacto. O resultado é equipamento que cumpre o que promete — na estrada e no laudo técnico."
- Imagem à direita (`institucional-detalhe.jpg`).

### 6. MISSÃO — quote (banner)
- Kicker: `MISSÃO`
- Frase (grande): `"Ir além em segurança. Cada um em seu estilo."`
- Assinatura: `X11 - EXPERT RIDERS`
- Fundo: foto de grupo de motociclistas + overlay escuro (asset falta). Análogo
  ao `Banner`/`Lancamento_especial` da Home.

### 7. NOSSOS VALORES — "NO QUE ACREDITAMOS" (3 colunas)
- Kicker (centralizado): `NOSSOS VALORES` · Título: `NO QUE ACREDITAMOS`
- `01` **SEGURANÇA EM PRIMEIRO LUGAR.** — "Equipamento de moto é item de proteção. Tratamos cada produto com a seriedade que sua vida exige."
- `02` **SEGURANÇA CERTIFICADA** — "Tecnologia de ponta com preço que cabe no bolso do motociclista brasileiro. Sem rótulos, sem exclusividade." (⚠️ título "02" parece repetir a feature da seção #1 — possível engano do layout; confirmar título com o dono.)
- `03` **PAIXÃO POR DUAS RODAS.** — "A gente pilota. A gente entende. Cada decisão nasce da estrada — e volta para ela."

### 8. FOOTER
- **Reaproveitar o `Footer` compartilhado** (`src/padrao/componentes/Footer.jsx`
  + `dados/footer.js`) — não recriar. As colunas do PDF (ATENDIMENTO / X11 /
  NOVIDADES) podem divergir do `footer.js` atual; se o dono quiser o conteúdo do
  layout, ajustar os **dados**, não o componente.

## Pendências pro dono
1. Imagens alta-res do **Hero** e da **Missão** (as demais já existem nos assets).
2. Textos repetidos em Quem Somos #1/#2 — variar? (placeholder no layout).
3. Títulos/typos a confirmar: "Minas Gerais", título do valor "02".
4. Como ver a página antes do roteamento (toggle temporário vs roteamento antes).
