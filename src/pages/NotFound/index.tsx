import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada · X11 Expert Riders';
  }, []);

  return (
    <div className="container-x11 section text-center py-[120px]">
      <span className="eyebrow">Erro 404</span>
      <h1>Página não encontrada</h1>
      <p className="text-gray-2 mb-6">A página que você procura não existe ou foi movida.</p>
      <Link to="/" className="btn btn-primary">Voltar para a Home</Link>
    </div>
  );
}
