const express = require('express');
const router = express.Router();

const { categorias, porSlug: categoriaPorSlug } = require('../data/categorias');
const { porSlugProduto } = require('../data/produtos');
const consultas = require('../data/consultas');
const { porEstado, estadosDisponiveis } = require('../data/lojas');
const { paginas, porSlug: paginaPorSlug } = require('../data/paginas');
const guiaTamanhos = require('../data/guiaTamanhos');

const HISTORIAS = [
  { titulo: 'O Começo da Jornada', resumo: 'Como uma garagem pequena virou referência em equipamento de pilotagem feito com paixão.', imagem: '/images/story1.jpg' },
  { titulo: 'Pai e Filho: A Viagem de Uma Vida', resumo: 'Dois mil quilômetros, uma estrada e a memória que ficou marcada para sempre.', imagem: '/images/story2.jpg' },
  { titulo: 'Conheça Quem Pilota com a X11', resumo: 'Histórias de pilotos que transformaram o asfalto em um modo de viver.', imagem: '/images/story3.jpg' },
];

const TERRITORIOS = [
  { slug: 'aventura', nome: 'Aventura', legenda: 'Explore sem limites', imagem: '/images/cat-aventura.jpg', estilo: 'adventure' },
  { slug: 'sport', nome: 'Sport', legenda: 'Velocidade na pista', imagem: '/images/cat-sport.jpg', estilo: 'sport' },
  { slug: 'urbano', nome: 'Urbano', legenda: 'Estilo na cidade', imagem: '/images/cat-urbano.jpg', estilo: 'urbano' },
  { slug: 'touring', nome: 'Touring', legenda: 'Segurança na estrada', imagem: '/images/cat-touring.jpg', estilo: 'touring' },
];

// Grade "Categorias Populares" (8 atalhos de navegação, 2 linhas x 4 colunas)
const CATEGORIAS_POPULARES = [
  { nome: 'Luvas Masculinas', href: '/categoria/luvas-masculino' },
  { nome: 'Jaquetas Masculinas', href: '/categoria/jaquetas-masculino' },
  { nome: 'Calças de Couro', href: '/categoria/calcas-masculino' },
  { nome: 'Jeans Femininos', href: '/categoria/calcas-feminino' },
  { nome: 'Botas de Pilotagem', href: '/categoria/botas-masculino' },
  { nome: 'Capacetes', href: '/categoria/capacetes' },
  { nome: 'Acessórios', href: '/categoria/acessorios' },
  { nome: 'Segunda Pele', href: '/categoria/segunda-pele-masculino' },
];

function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// ---------------------------------------------------------------- Home
router.get('/home', (req, res) => {
  res.json({
    favoritos: consultas.favoritosHome(3),
    populares: CATEGORIAS_POPULARES,
    territorios: TERRITORIOS,
    maisVendidos: consultas.maisVendidos(5),
    historias: HISTORIAS,
  });
});

// ---------------------------------------------------------------- Categorias / catálogo
router.get('/categorias', (req, res) => {
  res.json({ categorias });
});

function opcoesFiltro(req) {
  return {
    categoriaSlug: req.params.slug,
    tamanho: req.query.tamanho,
    cor: req.query.cor,
    precoMin: req.query.precoMin,
    precoMax: req.query.precoMax,
    estacao: req.query.estacao,
    certificacao: req.query.certificacao,
    estilo: req.query.estilo,
    ordenar: req.query.ordenar,
    pagina: req.query.pagina || 1,
  };
}

router.get('/categoria/:slug', (req, res) => {
  const categoria = categoriaPorSlug(req.params.slug);
  if (!categoria) return res.status(404).json({ erro: 'Categoria não encontrada' });

  const resultado = consultas.listarProdutos(opcoesFiltro(req));
  res.json({
    categoria,
    resultado,
    cores: consultas.coresDaCategoria(categoria.slug),
    tamanhos: consultas.tamanhosDaCategoria(categoria.slug),
  });
});

// ---------------------------------------------------------------- Produto
router.get('/produto/:slug', (req, res) => {
  const produto = porSlugProduto(req.params.slug);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  const categoria = categoriaPorSlug(produto.categoriaSlug);

  res.json({
    produto,
    categoria,
    relacionados: consultas.relacionados(produto, 4),
    guiaTamanhos: guiaTamanhos.porTipo(produto.tipo),
  });
});

// ---------------------------------------------------------------- Comparação
router.get('/comparar', (req, res) => {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  res.json({ produtos: consultas.compararPorIds(ids) });
});

// ---------------------------------------------------------------- Onde encontrar
router.get('/lojas', (req, res) => {
  const estado = req.query.estado || '';
  const cidadeQuery = (req.query.cidade || '').trim().toLowerCase();
  let lista = porEstado(estado);
  if (cidadeQuery) {
    lista = lista.filter((l) => l.cidade.toLowerCase().includes(cidadeQuery));
  }
  res.json({ lojas: lista, estados: estadosDisponiveis() });
});

// ---------------------------------------------------------------- Guia de equipamento
router.get('/guia-tamanhos', (req, res) => {
  res.json({ tabelas: guiaTamanhos.tabelas });
});

// ---------------------------------------------------------------- Busca
router.get('/busca', (req, res) => {
  const q = req.query.q || '';
  const limite = req.query.limite ? Number(req.query.limite) : 8;
  res.json({ resultados: consultas.buscar(q, limite) });
});

// ---------------------------------------------------------------- Páginas genéricas
router.get('/pagina/:slug', (req, res) => {
  const pagina = paginaPorSlug(req.params.slug);
  if (!pagina) return res.status(404).json({ erro: 'Página não encontrada' });
  res.json({ pagina });
});

router.get('/paginas', (req, res) => {
  res.json({ paginas });
});

module.exports = router;
