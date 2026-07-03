import type { Produto } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function Relacionados({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) return null;

  return (
    <div className="my-[60px] mb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="eyebrow">Sinta com os olhos</span>
          <h2 className="mb-0">Combine Seu Setup</h2>
        </div>
      </div>
      <div className="grid-4">
        {produtos.map((p) => <ProductCard key={p.id} produto={p} />)}
      </div>
    </div>
  );
}
