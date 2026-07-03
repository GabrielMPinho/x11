const categorias = [
  { slug: 'jaquetas-masculino', nome: 'Jaquetas', genero: 'masculino', tipo: 'jaqueta', menu: 'Masculino' },
  { slug: 'calcas-masculino', nome: 'Calças', genero: 'masculino', tipo: 'calca', menu: 'Masculino' },
  { slug: 'botas-masculino', nome: 'Botas', genero: 'masculino', tipo: 'bota', menu: 'Masculino' },
  { slug: 'luvas-masculino', nome: 'Luvas', genero: 'masculino', tipo: 'luva', menu: 'Masculino' },
  { slug: 'segunda-pele-masculino', nome: 'Segunda Pele', genero: 'masculino', tipo: 'segunda-pele', menu: 'Masculino' },
  { slug: 'jaquetas-feminino', nome: 'Jaquetas', genero: 'feminino', tipo: 'jaqueta', menu: 'Feminino' },
  { slug: 'calcas-feminino', nome: 'Calças', genero: 'feminino', tipo: 'calca', menu: 'Feminino' },
  { slug: 'botas-feminino', nome: 'Botas', genero: 'feminino', tipo: 'bota', menu: 'Feminino' },
  { slug: 'luvas-feminino', nome: 'Luvas', genero: 'feminino', tipo: 'luva', menu: 'Feminino' },
  { slug: 'segunda-pele-feminino', nome: 'Segunda Pele', genero: 'feminino', tipo: 'segunda-pele', menu: 'Feminino' },
  { slug: 'capacetes', nome: 'Capacetes', genero: 'unissex', tipo: 'capacete', menu: 'ambos' },
  { slug: 'acessorios', nome: 'Acessórios', genero: 'unissex', tipo: 'acessorio', menu: 'ambos' },
];

function porSlug(slug) {
  return categorias.find((c) => c.slug === slug);
}

module.exports = { categorias, porSlug };
