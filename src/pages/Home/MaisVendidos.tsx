import type { Produto } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function MaisVendidos({ produtos }: { produtos: Produto[] }) {
  return (
    <section className="section section-alt">
      <div className="container-x11">
        <div className="section-head">
          <span className="eyebrow">Os Favoritos</span>
          <h2>Os Mais Vendidos</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2.5 snap-x snap-mandatory">
          {produtos.map((p) => (
            <div key={p.id} className="min-w-[230px] snap-start">
              <ProductCard produto={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
