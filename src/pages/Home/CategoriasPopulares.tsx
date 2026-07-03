import { Link } from 'react-router-dom';
import type { CategoriaPopular } from '../../types';

export default function CategoriasPopulares({ categorias }: { categorias: CategoriaPopular[] }) {
  return (
    <section className="section">
      <div className="container-x11">
        <div className="section-head">
          <span className="eyebrow">Navegue</span>
          <h2>Categorias Populares</h2>
        </div>
        <div className="grid grid-cols-4 gap-4 max-[980px]:grid-cols-2 max-[620px]:grid-cols-1">
          {categorias.map((c) => (
            <Link
              key={c.nome}
              to={c.href}
              className="bg-bg-card border border-border py-[22px] px-3.5 text-center uppercase text-[0.85rem] tracking-[0.5px] font-semibold hover:border-orange hover:text-orange"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              {c.nome}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
