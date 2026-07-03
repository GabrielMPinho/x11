import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarPagina } from '../../api';
import type { Pagina as PaginaType } from '../../types';
import NotFound from '../NotFound';

export default function Pagina() {
  const { slug } = useParams<{ slug: string }>();
  const [pagina, setPagina] = useState<PaginaType | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setErro(false);
    setPagina(null);
    buscarPagina(slug).then((d) => setPagina(d.pagina)).catch(() => setErro(true));
  }, [slug]);

  useEffect(() => {
    if (pagina) document.title = `${pagina.titulo} · X11 Expert Riders`;
  }, [pagina]);

  if (erro) return <NotFound />;
  if (!pagina) return null;

  return (
    <div className="section w-full max-w-[760px] mx-auto px-5">
      <h1>{pagina.titulo}</h1>
      {pagina.paragrafos.map((p, i) => (
        <p key={i} className="text-gray-1 mb-4">{p}</p>
      ))}
    </div>
  );
}
