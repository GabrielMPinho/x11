// `genero` decide o destino de navegação (ver Categorias.jsx,
// DESTINO_POR_GENERO): masculina/neutra → /homem, feminina → /mulher. Era
// `link: "/categoria/…"` — rota que não existe; trocado por `genero`
// (2026-07-13, Home: ligar os botões) porque é o atributo real do
// conteúdo, a rota é só uma decisão derivada dele.
export const categorias = [
  { nome: "Luvas Masculinas", genero: "masculino" },
  { nome: "Jaquetas Masculinas", genero: "masculino" },
  { nome: "Calças de Couro", genero: "neutro" },
  { nome: "Jeans Femininos", genero: "feminino" },
  { nome: "Botas de Pilotagem", genero: "neutro" },
  { nome: "Capacetes", genero: "neutro" },
  { nome: "Acessórios", genero: "neutro" },
  { nome: "Segunda Pele", genero: "neutro" },
  { nome: "Balaclava", genero: "neutro" },
  { nome: "Equipamentos para o Verão", genero: "neutro" },
  { nome: "Equipamentos 4 Estações", genero: "neutro" },
  { nome: "Calças Femininas", genero: "feminino" },
];
