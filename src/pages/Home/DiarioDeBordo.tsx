import type { Historia } from '../../types';

export default function DiarioDeBordo({ historias }: { historias: Historia[] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Diário de Bordo</span>
          <h2>Histórias</h2>
        </div>
        <div className="grid-3">
          {historias.map((h) => (
            <div className="historia-card" key={h.titulo}>
              <img src={h.imagem} alt={h.titulo} />
              <div className="body">
                <h3>{h.titulo}</h3>
                <p>{h.resumo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
