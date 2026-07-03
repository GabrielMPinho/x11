import { Link } from 'react-router-dom';
import type { Categoria, Produto } from '../../types';

export default function Breadcrumb({ categoria, produto }: { categoria: Categoria; produto: Produto }) {
  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link> /{' '}
      {categoria.genero !== 'unissex' && (
        <><Link to={`/categoria/${categoria.slug}`}>{categoria.genero === 'masculino' ? 'Homem' : 'Mulher'}</Link> / </>
      )}
      <Link to={`/categoria/${categoria.slug}`}>{categoria.nome}</Link> / {produto.nome}
    </div>
  );
}
