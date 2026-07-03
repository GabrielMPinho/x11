import type { ResultadoListagem } from '../../types';
import ProductCard from '../../components/ProductCard';

interface Props {
  resultado: ResultadoListagem;
  onPagina: (pagina: number) => void;
}

export default function ProdutosGrid({ resultado, onPagina }: Props) {
  return (
    <div id="produtos-container">
      <p className="text-gray-2 text-[0.85rem] mb-4">
        {resultado.total} produto{resultado.total === 1 ? '' : 's'} · página {resultado.pagina} de {resultado.totalPaginas}
      </p>
      <div className="grid grid-cols-3 gap-[22px] max-[980px]:grid-cols-2 max-[620px]:grid-cols-1">
        {resultado.itens.length === 0 ? (
          <div className="text-center py-[60px] text-gray-2 col-span-full">Nenhum produto encontrado com esses filtros. Tente ajustar a busca.</div>
        ) : (
          resultado.itens.map((p) => <ProductCard key={p.id} produto={p} />)
        )}
      </div>
      {resultado.totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: resultado.totalPaginas }, (_, i) => i + 1).map((p) => (
            <a
              key={p} href="#"
              className={`border rounded-[3px] px-3.5 py-2 text-[0.85rem] ${p === resultado.pagina ? 'border-orange text-orange' : 'border-border hover:border-orange hover:text-orange'}`}
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
