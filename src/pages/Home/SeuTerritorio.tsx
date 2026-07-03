import { Link } from 'react-router-dom';
import type { Territorio } from '../../types';

export default function SeuTerritorio({ territorios }: { territorios: Territorio[] }) {
  return (
    <section className="section">
      <div className="container-x11">
        <div className="section-head">
          <span className="eyebrow">Seu Território</span>
          <h2>Onde Você Pilota?</h2>
        </div>
        <div className="grid grid-cols-4 gap-5 max-[980px]:grid-cols-2 max-[620px]:grid-cols-1">
          {territorios.map((t) => (
            <Link key={t.slug} to={`/categoria/jaquetas-masculino?estilo=${t.estilo}`} className="relative aspect-[3/4] overflow-hidden rounded block">
              <img src={t.imagem} alt={t.nome} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 p-[18px] bg-[linear-gradient(0deg,rgba(0,0,0,0.85),transparent)]">
                <span className="eyebrow mb-0.5">{t.legenda}</span>
                <h3 className="text-[1.2rem] mb-0">{t.nome}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
