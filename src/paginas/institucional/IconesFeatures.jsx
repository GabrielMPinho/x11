// Ícones minimalistas inline (sem dependência nova) das 4 features de "Quem
// Somos #1" — traço laranja via `currentColor` (cor vem do CSS,
// `.feature_icone svg{color:var(--laranja)}`), viewBox 24×24 coerente entre
// todos. Mapeados por chave (`icone` em dados/features.js) pra manter a data
// só com texto.
export const iconesFeatures = {
  escudo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z" />
      <path d="M8.5 12 L11 14.5 L16 9" />
    </svg>
  ),
  raio: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z" />
    </svg>
  ),
  camadas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L21 8 L12 13 L3 8 Z" />
      <path d="M3 13 L12 18 L21 13" />
      <path d="M3 17.5 L12 22 L21 17.5" />
    </svg>
  ),
  capacete: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15a8 8 0 0 1 16 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M4 15h16" />
    </svg>
  ),
};
