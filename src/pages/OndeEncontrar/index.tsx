import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { buscarLojas } from '../../api';
import type { Loja } from '../../types';

const inputClass = 'bg-bg-card border border-border text-white px-3.5 py-2.5 rounded';

export default function OndeEncontrar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [estados, setEstados] = useState<string[]>([]);
  const [cidadeInput, setCidadeInput] = useState(searchParams.get('cidade') || '');

  useEffect(() => {
    document.title = 'Onde Encontrar · X11 Expert Riders';
  }, []);

  useEffect(() => {
    buscarLojas(searchParams.get('estado') || undefined, searchParams.get('cidade') || undefined)
      .then((d) => { setLojas(d.lojas); setEstados(d.estados); });
  }, [searchParams]);

  function aoFiltrar(e: React.FormEvent) {
    e.preventDefault();
    const novo = new URLSearchParams();
    const estado = (document.getElementById('estado-select') as HTMLSelectElement)?.value;
    if (estado) novo.set('estado', estado);
    if (cidadeInput) novo.set('cidade', cidadeInput);
    setSearchParams(novo);
  }

  return (
    <>
      <section
        className="relative h-[260px] flex items-end bg-cover bg-center py-[30px] before:content-[''] before:absolute before:inset-0 before:bg-black/55"
        style={{ backgroundImage: "url('/images/institucional-hero.jpg')" }}
      >
        <div className="container-x11 relative">
          <span className="eyebrow">Rede de Lojas Parceiras</span>
          <h1>Onde Encontrar</h1>
        </div>
      </section>

      <div className="container-x11 section">
        <form className="flex gap-3 mb-[30px] flex-wrap" onSubmit={aoFiltrar}>
          <select id="estado-select" defaultValue={searchParams.get('estado') || ''} className={inputClass}>
            <option value="">Todos os estados</option>
            {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </select>
          <input
            type="text" placeholder="Buscar por cidade..."
            value={cidadeInput}
            onChange={(e) => setCidadeInput(e.target.value)}
            className={inputClass}
          />
          <button type="submit" className="btn btn-primary btn-sm">Filtrar</button>
        </form>

        <p className="text-gray-2 mb-5">{lojas.length} loja(s) encontrada(s)</p>

        {lojas.length === 0 ? (
          <div className="text-center py-[60px] text-gray-2">Nenhuma loja encontrada para esse filtro.</div>
        ) : (
          <div className="grid grid-cols-2 max-[620px]:grid-cols-1 gap-5">
            {lojas.map((l) => (
              <div className="bg-bg-card border border-border rounded p-5" key={l.id}>
                <span className="inline-block bg-orange text-white text-[0.7rem] px-2 py-0.5 rounded-[3px] mb-2.5" style={{ fontFamily: 'var(--font-head)' }}>{l.estado}</span>
                <h3 className="text-[1.05rem] mb-1.5">{l.nome}</h3>
                <p className="text-gray-2 text-[0.88rem] my-0.5">{l.endereco}</p>
                <p className="text-gray-2 text-[0.88rem] my-0.5">{l.cidade} - {l.estado}</p>
                <p className="text-gray-2 text-[0.88rem] my-0.5">{l.telefone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
