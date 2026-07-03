import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { buscarLojas } from '../../api';
import type { Loja } from '../../types';

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
      <section className="cat-hero" style={{ backgroundImage: "url('/images/institucional-hero.jpg')" }}>
        <div className="container">
          <span className="eyebrow">Rede de Lojas Parceiras</span>
          <h1>Onde Encontrar</h1>
        </div>
      </section>

      <div className="container section">
        <form className="lojas-filtros" onSubmit={aoFiltrar}>
          <select id="estado-select" defaultValue={searchParams.get('estado') || ''}>
            <option value="">Todos os estados</option>
            {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </select>
          <input
            type="text" placeholder="Buscar por cidade..."
            value={cidadeInput}
            onChange={(e) => setCidadeInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">Filtrar</button>
        </form>

        <p style={{ color: 'var(--gray-2)', marginBottom: 20 }}>{lojas.length} loja(s) encontrada(s)</p>

        {lojas.length === 0 ? (
          <div className="sem-resultados">Nenhuma loja encontrada para esse filtro.</div>
        ) : (
          <div className="lojas-grid">
            {lojas.map((l) => (
              <div className="loja-card" key={l.id}>
                <span className="estado-tag">{l.estado}</span>
                <h3>{l.nome}</h3>
                <p>{l.endereco}</p>
                <p>{l.cidade} - {l.estado}</p>
                <p>{l.telefone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
