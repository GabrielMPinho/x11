// Filtros da sidebar/barra de categorias — TODOS decorativos nesta passada
// (padrão do projeto: sem lógica de filtro real, só hover). Typos do PDF
// original corrigidos (conteúdo novo, não existente no site ainda): "TAMNHOS"
// → "TAMANHOS", "INVERSO" → "INVERNO", "ESPECIFICAÇÃOES" → "ESPECIFICAÇÕES".

export const categorias = [
  { nome: "TUDO" },
  { nome: "ADVENTURE", ativo: true },
  { nome: "TOURING" },
  { nome: "SPORT" },
  { nome: "URBAN" },
  { nome: "CLÁSSICO" },
];

export const tamanhos = ["P", "M", "G", "GG", "3G", "4G"];

export const estacoes = ["4 ESTAÇÕES", "VERÃO", "INVERNO"];

export const cores = [
  { nome: "Preto", hex: "#181614" },
  { nome: "Cinza", hex: "#4a4a4a" },
  { nome: "Bege", hex: "#c9b79c" },
  { nome: "Laranja", hex: "#FF5000" },
  { nome: "Branco", hex: "#e5e5e5" },
];

export const especificacoes = ["CE NÍVEL 1", "CE NÍVEL 2", "CLASSE AAA"];
