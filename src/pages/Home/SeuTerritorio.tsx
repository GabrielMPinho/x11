import { Link } from 'react-router-dom';
import type { Territorio } from '../../types';

export default function SeuTerritorio({ territorios }: { territorios: Territorio[] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Seu Território</span>
          <h2>Onde Você Pilota?</h2>
        </div>
        <div className="territorio-tiles">
          {territorios.map((t) => (
            <Link key={t.slug} to={`/categoria/jaquetas-masculino?estilo=${t.estilo}`} className="territorio-tile">
              <img src={t.imagem} alt={t.nome} />
              <div className="label">
                <span className="eyebrow">{t.legenda}</span>
                <h3>{t.nome}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
