import productJacket from "@/padrao/assets/images/product-jacket.jpg";
import jaquetaFav from "@/padrao/assets/images/jaqueta_fav.jpg";
import conjunto2Fav from "@/padrao/assets/images/conjunto2_fav.jpg";
import combineBoot from "@/padrao/assets/images/combine-boot.jpg";
import luvaFav from "@/padrao/assets/images/luva_fav.jpg";
import placeholderCapacete from "@/padrao/assets/images/placeholder-capacete.svg";
import placeholderAcessorio from "@/padrao/assets/images/placeholder-acessorio.svg";

// Identidade unificada como JAQUETA EXPEDITION (decisão do Opus, ver
// docs/agentes/opus/backlog/produto.md, §"Decisões do Opus" item 1) — o PDF
// mesclava jaqueta/calça (Figma de dois produtos diferentes); o packshot
// disponível e a PLP ("HOMEM / JAQUETAS") apontam pra jaqueta, então todo
// texto onde o PDF dizia "calça"/"Dune Pro" foi escrito como "jaqueta"/
// "Expedition".
export const produto = {
  kicker: "COLEÇÃO LAB CRAFTED",
  tituloLinhas: ["JAQUETA", "EXPEDITION"],
  breadcrumb: "ADVENTURE / JAQUETAS / EXPEDITION H2O",
  avaliacaoMedia: 4.9,
  totalAvaliacoes: 312,
  preco: 1099.0,
  descricao:
    "Construída para a próxima travessia. Tecido Abrasion-Tough 600D com membrana impermeável removível, ventilação direcional e proteções CE Nível 2 nos joelhos e quadris. Pronta para o asfalto quente, a chuva fria e o off-road sujo — no mesmo dia.",
  cores: [
    { nome: "Grafite", hex: "#181614" },
    { nome: "Cinza", hex: "#4a4a4a" },
    { nome: "Caqui", hex: "#c9b79c" },
  ],
  tamanhos: ["P", "M", "G", "GG", "3G", "4G"],
  garantia: { titulo: "GARANTIA 6 MESES", subtitulo: "fabricação" },
};

// Galeria — não há 4 fotos-detalhe distintas da jaqueta nos assets (ver
// backlog produto.md, §Assets), então os 3 packshots disponíveis são
// ciclados nos 4 slots de thumbnail como PLACEHOLDER (⚠️ NÃO usar
// conjunto1_fav.jpg — idêntico a colecao-hero.jpg, bug de asset já
// documentado em componentes.md/CHANGELOG). Dono fornece os packshots reais
// depois.
const IMAGENS_GALERIA = [productJacket, jaquetaFav, conjunto2Fav];
export const galeriaProduto = Array.from(
  { length: 4 },
  (_, index) => IMAGENS_GALERIA[index % IMAGENS_GALERIA.length]
);

export const specsFaixa = [
  { numero: "600D", label: "RESISTÊNCIA À ABRASÃO" },
  { numero: "CE 2", label: "JOELHO + QUADRIL" },
  { numero: "20K", label: "MEMBRANA IMPERMEÁVEL" },
  { numero: "4", label: "ESTAÇÕES DO ANO" },
];

export const featuresProduto = [
  { icone: "escudo", titulo: "PROTEÇÃO CE NÍVEL 2", texto: "Armaduras SAS-TEC nos joelhos e quadris, ajustáveis em altura." },
  { icone: "gota", titulo: "MEMBRANA H2O REMOVÍVEL", texto: "Camada interna 20.000mm impermeável, removível em segundos." },
  { icone: "vento", titulo: "VENTILAÇÃO DIRECIONAL", texto: "Zíperes YKK frontais e traseiros canalizam ar onde importa." },
  { icone: "termometro", titulo: "4 ESTAÇÕES REAIS", texto: "Forro térmico zipável. De −5°C ao verão escaldante." },
];

// Valores placeholder ("Abrasion-Tough 600D Nylon ripstop", repetido em
// todas as linhas) — dono fornece os valores reais depois (ver backlog,
// §Pendências). Typos do PDF já corrigidos aqui: MENBRANA→MEMBRANA,
// ASJUTES→AJUSTES (conteúdo novo, sem typo pré-existente pra preservar).
const VALOR_PLACEHOLDER = "Abrasion-Tough 600D Nylon ripstop";
export const especificacoesTabela = [
  "TECIDO PRINCIPAL",
  "REFORÇOS",
  "MEMBRANA",
  "FORRO TÉRMICO",
  "PROTEÇÕES",
  "VENTILAÇÃO",
  "AJUSTES",
  "CERTIFICAÇÃO",
  "CONEXÕES",
].map((label) => ({ label, valor: VALOR_PLACEHOLDER }));

// "SINTA COM OS OLHOS" — 8 cards de detalhe macro (fix 2026-07-14, 1ª
// conferência do dono: com só 4 cards de ~320px o trilho não transbordava
// em telas largas, então `useCarrosselComSetas` media `maxArrasto≈0` e
// setas/arraste ficavam sem curso — "carrossel estático"). Continua
// ciclando os 3 packshots disponíveis (mesmo ciclo `index%3` da galeria,
// ⚠️ nunca `conjunto1_fav.jpg` — bug de asset documentado), agora com 8
// legendas distintas plausíveis. Kicker é idêntico nos 8, renderizado
// direto no componente (não faz parte da data).
const IMAGENS_DESTAQUES = [productJacket, jaquetaFav, conjunto2Fav];
const LEGENDAS_DESTAQUES = [
  "Costura reforçada nos pontos de maior tensão.",
  "Zíper YKK de ventilação frontal.",
  "Botão de pressão em liga reforçada.",
  "Logo emborrachado, resistente à abrasão.",
  "Punho ajustável por velcro, veda a manga contra vento e chuva.",
  "Bolso frontal ventilado, zíper impermeável duplo.",
  "Faixa refletiva 360° costurada nas costas e mangas.",
  "Forro térmico removível, zíper invisível na gola.",
];
export const destaquesMacro = LEGENDAS_DESTAQUES.map((legenda, index) => ({
  imagem: IMAGENS_DESTAQUES[index % IMAGENS_DESTAQUES.length],
  legenda,
}));

// Avaliações — texto plausível de review (não lorem ipsum), 2-3 frases por
// card, pedido explícito da instrução.
export const avaliacoes = [
  {
    nome: "MARINA OLIVEIRA",
    local: "Curitiba › Ushuaia",
    texto: "Encarei -4°C na Patagônia com essa jaqueta por baixo de só uma camada térmica e não senti frio nas costas. A ventilação frontal também dá conta do calor no asfalto — uso o ano inteiro.",
  },
  {
    nome: "DIEGO ALMEIDA",
    local: "Belo Horizonte › Serra da Canastra",
    texto: "Pegou uma chuva forte na estrada de terra e a membrana segurou 100%, nada passou. O corte não atrapalha em cima da moto, mesmo com a armadura nos joelhos.",
  },
  {
    nome: "RAFAELA COSTA",
    local: "Porto Alegre › Cabo Polônio",
    texto: "Uso todo santo dia pra ir trabalhar e nos fins de semana pra rodar. Depois de um ano ainda parece nova, mesmo com queda numa curva de terra — só um risco leve no cotovelo.",
  },
];

// COMBINE SEU SETUP — cross-sell (cards navegam pra /equipamento, mesma
// vitrine). Foi de 4 pra 8 itens (fix 2026-07-14, mesmo motivo de
// destaquesMacro acima — 4 cards de 260px não transbordavam em telas
// largas). Prioriza FOTOS reais disponíveis — os SVGs de linha
// (`placeholder-capacete`/`placeholder-acessorio`) ficam só em 2 dos 8
// cards (capacete e "climate" não têm foto própria disponível).
// ⚠️ Achado (2026-07-14, ao tentar diversificar as botas): `product-boot.jpg`
// é BYTE A BYTE IDÊNTICO a `combine-boot.jpg` (mesmo MD5) — outro bug de
// asset duplicado, mesma família do já documentado `conjunto1_fav.jpg` ==
// `colecao-hero.jpg` (ver CHANGELOG/componentes.md). Por isso `product-boot`
// NÃO é importado aqui — usá-lo mostraria a mesma bota 3x sob nomes
// diferentes. Só 4 fotos são realmente distintas (`combine-boot`, `luva_fav`,
// `jaqueta_fav`, `conjunto2_fav`), então `combine-boot`/`jaqueta_fav` repetem
// 1x cada nos 8 slots (mesmo princípio de ciclo de placeholder do resto do
// projeto). TRAVEL 3/VELER/IRON 3 reaproveitam nomes já usados na PLP
// (`dados/produtos.js`) — mesmo catálogo, coerente entre as páginas. Preços
// variam (não mais todos R$599) — dono fornece os valores reais depois.
export const comboSetup = [
  { nome: "BOTA SIERRA", preco: 649.0, imagem: combineBoot },
  { nome: "LUVA HAVOC", preco: 379.0, imagem: luvaFav },
  { nome: "CAPACETE TURNER PRISMA 2", preco: 899.0, imagem: placeholderCapacete },
  { nome: "CLIMATE 3", preco: 349.0, imagem: placeholderAcessorio },
  { nome: "TRAVEL 3", preco: 899.0, imagem: jaquetaFav },
  { nome: "VELER", preco: 799.0, imagem: conjunto2Fav },
  { nome: "BOTA TOURMARK", preco: 599.0, imagem: combineBoot },
  { nome: "IRON 3", preco: 749.0, imagem: jaquetaFav },
];
