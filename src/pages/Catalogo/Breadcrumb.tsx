import { Link } from 'react-router-dom';
import type { Categoria } from '../../types';

export default function Breadcrumb({ categoria }: { categoria: Categoria }) {
  return (
    <div className="text-[0.78rem] text-gray-2 mb-5 [&_a:hover]:text-orange">
      <Link to="/">Home</Link> /{' '}
      {categoria.genero !== 'unissex' && <>{categoria.genero === 'masculino' ? 'Homem' : 'Mulher'} / </>}
      {categoria.nome}
    </div>
  );
}
