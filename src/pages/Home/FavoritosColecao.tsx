import type { Produto } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function FavoritosColecao({ favoritos }: { favoritos: Produto[] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Seleção</span>
          <h2>Favoritos da Coleção</h2>
        </div>
        <div className="grid-3">
          {favoritos.map((p) => <ProductCard key={p.id} produto={p} />)}
        </div>
      </div>
    </section>
  );
}
