import type {
  Categoria, Produto, ResultadoListagem, Loja, TabelaTamanhos, Pagina, HomeData, Cor,
} from './types';

async function getJSON<T>(url: string): Promise<T> {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar ${url}`);
  }
  return resposta.json() as Promise<T>;
}

export function buscarHome() {
  return getJSON<HomeData>('/api/home');
}

export function buscarCategorias() {
  return getJSON<{ categorias: Categoria[] }>('/api/categorias');
}

export interface FiltrosCategoria {
  tamanho?: string[];
  cor?: string[];
  precoMin?: string;
  precoMax?: string;
  estacao?: string[];
  certificacao?: string[];
  estilo?: string;
  ordenar?: string;
  pagina?: number;
}

export function buscarCategoria(slug: string, filtros: FiltrosCategoria = {}) {
  const params = new URLSearchParams();
  Object.entries(filtros).forEach(([chave, valor]) => {
    if (valor === undefined || valor === '') return;
    if (Array.isArray(valor)) {
      valor.forEach((v) => params.append(chave, v));
    } else {
      params.append(chave, String(valor));
    }
  });
  const qs = params.toString();
  return getJSON<{ categoria: Categoria; resultado: ResultadoListagem; cores: Cor[]; tamanhos: string[] }>(
    `/api/categoria/${slug}${qs ? `?${qs}` : ''}`,
  );
}

export function buscarProduto(slug: string) {
  return getJSON<{ produto: Produto; categoria: Categoria; relacionados: Produto[]; guiaTamanhos: TabelaTamanhos }>(
    `/api/produto/${slug}`,
  );
}

export function buscarComparacao(ids: number[]) {
  if (!ids.length) return Promise.resolve({ produtos: [] as Produto[] });
  return getJSON<{ produtos: Produto[] }>(`/api/comparar?ids=${ids.join(',')}`);
}

export function buscarLojas(estado?: string, cidade?: string) {
  const params = new URLSearchParams();
  if (estado) params.append('estado', estado);
  if (cidade) params.append('cidade', cidade);
  const qs = params.toString();
  return getJSON<{ lojas: Loja[]; estados: string[] }>(`/api/lojas${qs ? `?${qs}` : ''}`);
}

export function buscarGuiaTamanhos() {
  return getJSON<{ tabelas: Record<string, TabelaTamanhos> }>('/api/guia-tamanhos');
}

export function buscarProdutos(q: string, limite = 60) {
  if (q.trim().length < 3) return Promise.resolve({ resultados: [] as Produto[] });
  return getJSON<{ resultados: Produto[] }>(`/api/busca?q=${encodeURIComponent(q)}&limite=${limite}`);
}

export function buscarPagina(slug: string) {
  return getJSON<{ pagina: Pagina }>(`/api/pagina/${slug}`);
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}
