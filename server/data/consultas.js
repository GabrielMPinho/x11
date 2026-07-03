const { produtos } = require('./produtos');
const { categorias, porSlug } = require('./categorias');

function listarProdutos(opts = {}) {
  const {
    categoriaSlug, tamanho, cor, precoMin, precoMax, estacao, certificacao,
    estilo, ordenar = 'destaque', pagina = 1, porPagina = 12,
  } = opts;

  let lista = produtos.slice();

  if (categoriaSlug) {
    lista = lista.filter((p) => p.categoriaSlug === categoriaSlug);
  }
  if (estilo) {
    const estilos = Array.isArray(estilo) ? estilo : [estilo];
    lista = lista.filter((p) => estilos.includes(p.estilo));
  }
  if (tamanho) {
    const tamanhos = Array.isArray(tamanho) ? tamanho : [tamanho];
    lista = lista.filter((p) => p.tamanhos.some((t) => tamanhos.includes(t)));
  }
  if (cor) {
    const cores = Array.isArray(cor) ? cor : [cor];
    lista = lista.filter((p) => p.cores.some((c) => cores.includes(c.nome)));
  }
  if (precoMin) lista = lista.filter((p) => p.preco >= Number(precoMin));
  if (precoMax) lista = lista.filter((p) => p.preco <= Number(precoMax));
  if (estacao) {
    const estacoes = Array.isArray(estacao) ? estacao : [estacao];
    lista = lista.filter((p) => estacoes.includes(p.estacao));
  }
  if (certificacao) {
    const certs = Array.isArray(certificacao) ? certificacao : [certificacao];
    lista = lista.filter((p) => certs.includes(p.certificacao));
  }

  switch (ordenar) {
    case 'preco-asc':
      lista.sort((a, b) => a.preco - b.preco);
      break;
    case 'preco-desc':
      lista.sort((a, b) => b.preco - a.preco);
      break;
    case 'nome':
      lista.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    default:
      lista.sort((a, b) => (b.destaque - a.destaque) || (b.maisVendido - a.maisVendido));
  }

  const total = lista.length;
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));
  const paginaAtual = Math.min(Math.max(1, Number(pagina)), totalPaginas);
  const inicio = (paginaAtual - 1) * porPagina;
  const itens = lista.slice(inicio, inicio + porPagina);

  return { itens, total, pagina: paginaAtual, totalPaginas, porPagina };
}

function coresDaCategoria(categoriaSlug) {
  const nomes = new Set();
  const mapa = new Map();
  produtos
    .filter((p) => !categoriaSlug || p.categoriaSlug === categoriaSlug)
    .forEach((p) => p.cores.forEach((c) => {
      if (!nomes.has(c.nome)) { nomes.add(c.nome); mapa.set(c.nome, c.hex); }
    }));
  return [...nomes].map((nome) => ({ nome, hex: mapa.get(nome) }));
}

function tamanhosDaCategoria(categoriaSlug) {
  const tamanhos = new Set();
  produtos
    .filter((p) => !categoriaSlug || p.categoriaSlug === categoriaSlug)
    .forEach((p) => p.tamanhos.forEach((t) => tamanhos.add(t)));
  return [...tamanhos];
}

function buscar(query, limite = 8) {
  if (!query || query.trim().length < 3) return [];
  const termo = query.trim().toLowerCase();
  return produtos
    .filter((p) => p.nome.toLowerCase().includes(termo))
    .slice(0, limite);
}

function relacionados(produto, limite = 4) {
  return produtos
    .filter((p) => p.id !== produto.id && p.tipo === produto.tipo)
    .slice(0, limite);
}

function maisVendidos(limite = 5) {
  return produtos
    .filter((p) => p.maisVendido)
    .sort((a, b) => a.maisVendidoOrdem - b.maisVendidoOrdem)
    .slice(0, limite);
}

function favoritosHome(limite = 3) {
  return produtos
    .filter((p) => p.favoritoHome)
    .sort((a, b) => a.favoritoOrdem - b.favoritoOrdem)
    .slice(0, limite);
}

function destaques(limite = 3) {
  return produtos.filter((p) => p.destaque).slice(0, limite);
}

function compararPorIds(ids) {
  const idsNum = ids.map(Number).filter(Boolean);
  return produtos.filter((p) => idsNum.includes(p.id));
}

module.exports = {
  listarProdutos,
  coresDaCategoria,
  tamanhosDaCategoria,
  buscar,
  relacionados,
  maisVendidos,
  favoritosHome,
  destaques,
  compararPorIds,
};
