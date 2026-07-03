export interface Categoria {
  slug: string;
  nome: string;
  genero: 'masculino' | 'feminino' | 'unissex';
  tipo: string;
  menu: string;
}

export interface Cor {
  nome: string;
  hex: string;
}

export interface EspecificacaoRapida {
  valor: string;
  legenda: string;
}

export interface Recurso {
  icone: string;
  titulo: string;
  descricao: string;
}

export interface FichaTecnicaItem {
  chave: string;
  valor: string;
}

export interface Avaliacao {
  autor: string;
  localizacao: string;
  nota: number;
  comentario: string;
}

export interface Produto {
  id: number;
  nome: string;
  slug: string;
  categoriaSlug: string;
  genero: 'masculino' | 'feminino' | 'unissex';
  tipo: string;
  estilo: string;
  estiloLabel: string;
  estacao: string;
  estacaoLabel: string;
  certificacao: string;
  certificacaoLabel: string;
  preco: number;
  descricao: string;
  imagens: string[];
  cores: Cor[];
  tamanhos: string[];
  destaque: boolean;
  maisVendido: boolean;
  novidade: boolean;
  especificacoesRapidas: EspecificacaoRapida[];
  recursos: Recurso[];
  fichaTecnica: FichaTecnicaItem[];
  avaliacoes: Avaliacao[];
  avaliacaoMedia: number;
}

export interface ResultadoListagem {
  itens: Produto[];
  total: number;
  pagina: number;
  totalPaginas: number;
  porPagina: number;
}

export interface Loja {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
}

export interface TabelaTamanhos {
  titulo: string;
  colunas: string[];
  linhas: string[][];
}

export interface Pagina {
  titulo: string;
  paragrafos: string[];
}

export interface CategoriaPopular {
  nome: string;
  href: string;
}

export interface Territorio {
  slug: string;
  nome: string;
  legenda: string;
  imagem: string;
  estilo: string;
}

export interface Historia {
  titulo: string;
  resumo: string;
  imagem: string;
}

export interface HomeData {
  favoritos: Produto[];
  populares: CategoriaPopular[];
  territorios: Territorio[];
  maisVendidos: Produto[];
  historias: Historia[];
}
