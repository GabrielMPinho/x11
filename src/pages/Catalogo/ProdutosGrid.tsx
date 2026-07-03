import type { ResultadoListagem } from '../../types';
import ProductCard from '../../components/ProductCard';

interface Props {
  resultado: ResultadoListagem;
  onPagina: (pagina: number) => void;
}

export default function ProdutosGrid({ resultado, onPagina }: Props) {
  return (
    <div id="produtos-container">
      <p className="catalogo-count">
        {resultado.total} produto{resultado.total === 1 ? '' : 's'} · página {resultado.pagina} de {resultado.totalPaginas}
      </p>
      <div className="produtos-grid">
        {resultado.itens.length === 0 ? (
          <div className="sem-resultados">Nenhum produto encontrado com esses filtros. Tente ajustar a busca.</div>
        ) : (
          resultado.itens.map((p) => <ProductCard key={p.id} produto={p} />)
        )}
      </div>
      {resultado.totalPaginas > 1 && (
        <div className="paginacao">
          {Array.from({ length: resultado.totalPaginas }, (_, i) => i + 1).map((p) => (
            <a
              key={p} href="#"
              className={p === resultado.pagina ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onPagina(p); }}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
