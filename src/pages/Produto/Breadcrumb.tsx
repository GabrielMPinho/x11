import { Link } from 'react-router-dom';
import type { Categoria, Produto } from '../../types';

export default function Breadcrumb({ categoria, produto }: { categoria: Categoria; produto: Produto }) {
  return (
    <div className="text-[0.78rem] text-gray-2 mb-5 [&_a:hover]:text-orange">
      <Link to="/">Home</Link> /{' '}
      {categoria.genero !== 'unissex' && (
        <><Link to={`/categoria/${categoria.slug}`}>{categoria.genero === 'masculino' ? 'Homem' : 'Mulher'}</Link> / </>
      )}
      <Link to={`/categoria/${categoria.slug}`}>{categoria.nome}</Link> / {produto.nome}
    </div>
  );
}
