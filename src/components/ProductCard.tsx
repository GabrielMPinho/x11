import { Link } from 'react-router-dom';
import type { Produto } from '../types';
import { formatarPreco } from '../api';
import { useCompare } from '../hooks/useCompare';

export default function ProductCard({ produto }: { produto: Produto }) {
  const { isSelected, toggle } = useCompare();

  return (
    <div className="product-card">
      <Link to={`/produto/${produto.slug}`} className="thumb">
        <img src={produto.imagens[0]} alt={produto.nome} loading="lazy" />
      </Link>
      <div className="body">
        <span className="eyebrow-cat">{produto.estiloLabel} · {produto.estacaoLabel}</span>
        <h3><Link to={`/produto/${produto.slug}`}>{produto.nome}</Link></h3>
        <span className="preco">{formatarPreco(produto.preco)}</span>
        <div className="swatches">
          {produto.cores.slice(0, 3).map((c) => (
            <span key={c.nome} className="swatch" style={{ background: c.hex }} title={c.nome} />
          ))}
          {produto.cores.length > 3 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--gray-3)' }}>+{produto.cores.length - 3}</span>
          )}
        </div>
        <Link to={`/produto/${produto.slug}`} className="comprar-link">Comprar &rarr;</Link>
        <label className="compare-check">
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
