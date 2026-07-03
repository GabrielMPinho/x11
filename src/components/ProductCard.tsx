import { Link } from 'react-router-dom';
import type { Produto } from '../types';
import { formatarPreco } from '../api';
import { useCompare } from '../hooks/useCompare';

export default function ProductCard({ produto }: { produto: Produto }) {
  const { isSelected, toggle } = useCompare();

  return (
    <div className="bg-bg-card border border-border rounded overflow-hidden transition-transform duration-150 hover:-translate-y-1 hover:border-orange">
      <Link to={`/produto/${produto.slug}`} className="block aspect-[4/5] overflow-hidden bg-bg-alt">
        <img src={produto.imagens[0]} alt={produto.nome} loading="lazy" className="w-full h-full object-cover" />
      </Link>
      <div className="p-4">
        <span className="text-[0.7rem] text-gray-3 uppercase tracking-wide">{produto.estiloLabel} · {produto.estacaoLabel}</span>
        <h3 className="text-base my-1.5"><Link to={`/produto/${produto.slug}`}>{produto.nome}</Link></h3>
        <span className="text-orange font-bold" style={{ fontFamily: 'var(--font-head)' }}>{formatarPreco(produto.preco)}</span>
        <div className="flex gap-1.5 items-center mt-2">
          {produto.cores.slice(0, 3).map((c) => (
            <span key={c.nome} className="w-4 h-4 rounded-full border border-white/30 inline-block" style={{ background: c.hex }} title={c.nome} />
          ))}
          {produto.cores.length > 3 && (
            <span className="text-[0.7rem] text-gray-3">+{produto.cores.length - 3}</span>
          )}
        </div>
        <Link to={`/produto/${produto.slug}`} className="block mt-2.5 text-[0.78rem] text-orange uppercase tracking-wide" style={{ fontFamily: 'var(--font-head)' }}>Comprar &rarr;</Link>
        <label className="flex items-center gap-1.5 mt-2 text-[0.75rem] text-gray-2">
          <input
            type="checkbox"
            checked={isSelected(produto.id)}
            onChange={() => toggle(produto.id)}
          />
          Comparar
        </label>
      </div>
    </div>
  );
}
