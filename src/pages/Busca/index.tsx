import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { buscarProdutos } from '../../api';
import type { Produto } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function Busca() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [resultados, setResultados] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    document.title = `Busca: ${q} · X11 Expert Riders`;
    setCarregando(true);
    buscarProdutos(q, 60).then((d) => setResultados(d.resultados)).finally(() => setCarregando(false));
  }, [q]);

  return (
    <div className="container-x11 section">
      <div className="section-head">
        <span className="eyebrow">Resultado da busca</span>
        <h2>{carregando ? 'Buscando...' : `${resultados.length} resultado(s) para "${q}"`}</h2>
      </div>

      {!carregando && resultados.length === 0 ? (
        <div className="text-center py-[60px] text-gray-2">Nenhum produto encontrado. Tente outro termo (mínimo 3 letras).</div>
      ) : (
        <div className="grid-3">
          {resultados.map((p) => <ProductCard key={p.id} produto={p} />)}
        </div>
      )}
    </div>
  );
}
