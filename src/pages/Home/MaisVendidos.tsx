import type { Produto } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function MaisVendidos({ produtos }: { produtos: Produto[] }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Os Favoritos</span>
          <h2>Os Mais Vendidos</h2>
        </div>
        <div className="carrossel">
          {produtos.map((p) => <ProductCard key={p.id} produto={p} />)}
        </div>
      </div>
    </section>
  );
}
