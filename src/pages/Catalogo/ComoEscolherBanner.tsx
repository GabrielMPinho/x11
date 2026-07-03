import { Link } from 'react-router-dom';

export default function ComoEscolherBanner({ nomeCategoria }: { nomeCategoria: string }) {
  return (
    <section className="section">
      <div className="container-x11">
        <div className="banner-promo">
          <div className="banner-promo-text">
            <span className="eyebrow">Em Destaque</span>
            <h2>Como escolher sua {nomeCategoria.toLowerCase()}?</h2>
            <p className="mb-4">Cada estilo de pilotagem pede um equipamento diferente. Use os filtros de estação e certificação para encontrar o ideal para você.</p>
            <Link to="/guia-de-equipamento" className="btn btn-primary w-fit">Guia de Equipamento</Link>
          </div>
          <img src="/images/testado-minas.jpg" alt="Como escolher" className="w-full h-full object-cover min-h-[260px]" />
        </div>
      </div>
    </section>
  );
}
