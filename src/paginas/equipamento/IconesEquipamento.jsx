// Ícones minimalistas inline (sem dependência nova), próprios da página
// Equipamento — não importa os de `institucional/IconesFeatures.jsx` pra
// manter cada página autocontida (padrão do projeto: comum vive em
// `padrao/`, o resto é da própria pasta da página). Mesmo estilo: traço
// laranja via `currentColor` (cor real vem do CSS), viewBox 24×24.
export const iconesEquipamento = {
  escudo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z" />
      <path d="M8.5 12 L11 14.5 L16 9" />
    </svg>
  ),
  gota: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 C12 2 5 11 5 15.5 A7 7 0 0 0 19 15.5 C19 11 12 2 12 2 Z" />
    </svg>
  ),
  vento: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 13h15a3 3 0 1 1-3 3" />
      <path d="M3 18h8a2.5 2.5 0 1 0-2.5-2.5" />
    </svg>
  ),
  termometro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14.5V4a2 2 0 1 0-4 0v10.5a4 4 0 1 0 4 0Z" />
      <path d="M10 8h.01" />
    </svg>
  ),
  medalha: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5 L7 22 L12 19 L17 22 L15 14.5" />
    </svg>
  ),
  estrela: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L14.9 8.6 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.6 Z" />
    </svg>
  ),
};
