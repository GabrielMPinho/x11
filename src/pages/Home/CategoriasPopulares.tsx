import { Link } from 'react-router-dom';
import type { CategoriaPopular } from '../../types';

export default function CategoriasPopulares({ categorias }: { categorias: CategoriaPopular[] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Navegue</span>
          <h2>Categorias Populares</h2>
        </div>
        <div className="cat-tiles">
          {categorias.map((c) => (
            <Link key={c.nome} to={c.href} className="cat-tile">{c.nome}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
