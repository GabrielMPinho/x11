import type { Historia } from '../../types';

export default function DiarioDeBordo({ historias }: { historias: Historia[] }) {
  return (
    <section className="section">
      <div className="container-x11">
        <div className="section-head">
          <span className="eyebrow">Diário de Bordo</span>
          <h2>Histórias</h2>
        </div>
        <div className="grid-3">
          {historias.map((h) => (
            <div className="bg-bg-card border border-border rounded overflow-hidden" key={h.titulo}>
              <img src={h.imagem} alt={h.titulo} className="aspect-[16/10] object-cover w-full" />
              <div className="p-[18px]">
                <h3 className="text-[1.05rem]">{h.titulo}</h3>
                <p className="text-gray-2 text-[0.9rem]">{h.resumo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
