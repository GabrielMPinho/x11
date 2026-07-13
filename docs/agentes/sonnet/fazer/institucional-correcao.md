# Instrução — Institucional: corrigir 3 divergências vs PDF

> Conferência do Opus comparando a `/institucional` com o **PDF renderizado**
> (`docs/layout/institucional.pdf`) achou 3 divergências. **Corrigir apenas
> estas 3** — o resto da página está fiel. **NÃO mexer no Hero** (o dono aprovou
> o Hero como está).

## Correção 1 — Quem Somos #2: trocar a imagem
- Hoje `QuemSomos2.jsx` importa `institucional-quemsomos.jpg`, que na verdade é
  uma **foto de grupo** (3 pessoas + moto) — não bate com o PDF.
- No PDF, o Quem Somos #2 mostra um **detalhe de jaqueta**. Trocar a imagem por
  **`jaqueta_fav.jpg`** (import do mesmo diretório de assets).
- Não mudar mais nada da seção (layout, textos, reveal): só a imagem.

## Correção 2 — Missão: adicionar a foto de grupo como fundo
- Hoje a `Missao.jsx` / `.missao_secao` tem **fundo escuro liso**. No PDF, a faixa
  "Ir além em segurança…" tem uma **foto de grupo de motociclistas ao fundo**.
- Usar **`institucional-quemsomos.jpg`** (a foto de grupo que saiu do QS#2) como
  **imagem de fundo da Missão**, cobrindo a seção (`cover`), com um **overlay
  escuro** por cima para legibilidade — **a mesma técnica do Hero** (camada de
  imagem atrás + camada/gradiente escuro), com **classe própria da Missão** (não
  reutilizar os seletores do Hero).
- Manter kicker "MISSÃO", a frase e a assinatura **centralizados e bem legíveis**
  sobre a imagem (contraste suficiente).

## Correção 3 — Missão: remover o itálico
- Em `.missao_frase` (base.css) há `font-style: italic`. **Remover** — a frase
  fica **reta** (como no PDF).

## Regras
- **Somente** estas 3 mudanças; não tocar em outras seções, no Hero, nem na Home.
- Fontes/tokens como já estão; responsividade preservada (a Missão com imagem
  precisa continuar sem overflow e legível nos 3 breakpoints).

## Verificação (o que É seu — Sonnet)
- `npx vite build` ✅ · `npm run lint` ✅.
- Checagem **no código**: QS#2 importa `jaqueta_fav.jpg`; Missão tem camada de
  imagem (`institucional-quemsomos.jpg`) + overlay + **sem** `font-style:italic`;
  imports via alias `@`.
- ⚠️ **NÃO tire prints.** A conferência visual (comparação com o PDF) é do **Opus
  e do dono**.

## Documentar (sem commitar)
- **CHANGELOG** (topo): correção das 3 divergências (imagem do QS#2; fundo e
  itálico da Missão).
- **Não commitar** — resuma o que fez. O Opus reconfere contra o PDF.
