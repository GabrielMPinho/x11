import type { Produto } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function Relacionados({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) return null;

  return (
    <div style={{ margin: '60px 0 80px' }}>
      <div className="relacionados-header">
        <div>
          <span className="eyebrow">Sinta com os olhos</span>
          <h2 style={{ margin: 0 }}>Combine Seu Setup</h2>
        </div>
      </div>
      <div className="grid-4">
        {produtos.map((p) => <ProductCard key={p.id} produto={p} />)}
      </div>
    </div>
  );
}
