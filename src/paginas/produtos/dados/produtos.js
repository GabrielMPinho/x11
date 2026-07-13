import productJacket from "@/padrao/assets/images/product-jacket.jpg";
import jaquetaFav from "@/padrao/assets/images/jaqueta_fav.jpg";
import conjunto2Fav from "@/padrao/assets/images/conjunto2_fav.jpg";

// Não há 12 imagens de produto distintas nos assets (docs/agentes/opus/backlog/
// produtos.md) — as disponíveis são alternadas em ciclo como PLACEHOLDER. O
// dono fornece os 12 packshots reais depois; nesse ponto é só trocar a coluna
// `imagem` abaixo, o resto (tag/nome/preço/cores) já é real do layout.
// ⚠️ `conjunto1_fav.jpg` foi EXCLUÍDO do ciclo de propósito (achado ao
// investigar por que uma imagem não aparecia no build de produção): esse
// arquivo é BYTE A BYTE IDÊNTICO a `colecao-hero.jpg` (mesmo MD5) — bug de
// asset pré-existente (não introduzido nesta tarefa), que também faz o card
// "CALÇA RIDE FIT 2" da Favoritos (Home) mostrar a foto do hero da coleção
// por engano. Ver CHANGELOG. Usá-lo aqui repetiria a mesma foto do
// `HeroColecao` dentro da própria grade — por isso o ciclo usa só as 3
// imagens realmente distintas disponíveis.
const IMAGENS_PLACEHOLDER = [productJacket, jaquetaFav, conjunto2Fav];

// Swatches de cor decorativos (não há paleta real definida por produto ainda);
// alternados junto com a imagem, mesma lógica de placeholder.
const SWATCHES_PLACEHOLDER = [
  ["#181614", "#4a4a4a", "#c9b79c"],
  ["#FF5000", "#181614", "#e5e5e5"],
  ["#4a4a4a", "#c9b79c", "#181614"],
];

const NOMES = [
  "EXPEDITION CERRADO",
  "TRAVEL 3",
  "VELER",
  "IRON 3",
  "STRECH",
  "ONE SPORT",
  "STREET HOODY",
  "PUFFER",
  "RAIN CASUAL",
  "GUARD 3",
  "SUPER AIR",
  "NEO CITY",
];

export const produtos = NOMES.map((nome, index) => ({
  nome,
  tag: "ADVENTURE · 4-SEASONS",
  preco: 599.0,
  imagem: IMAGENS_PLACEHOLDER[index % IMAGENS_PLACEHOLDER.length],
  cores: SWATCHES_PLACEHOLDER[index % SWATCHES_PLACEHOLDER.length],
  maisCores: (index % 3) + 1,
}));
