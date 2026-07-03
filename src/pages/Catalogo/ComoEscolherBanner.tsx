import { Link } from 'react-router-dom';

export default function ComoEscolherBanner({ nomeCategoria }: { nomeCategoria: string }) {
  return (
    <section className="section">
      <div className="container">
        <div className="banner-promo">
          <div className="text">
            <span className="eyebrow">Em Destaque</span>
            <h2>Como escolher sua {nomeCategoria.toLowerCase()}?</h2>
            <p>Cada estilo de pilotagem pede um equipamento diferente. Use os filtros de estação e certificação para encontrar o ideal para você.</p>
            <Link to="/guia-de-equipamento" className="btn btn-primary">Guia de Equipamento</Link>
          </div>
          <img src="/images/testado-minas.jpg" alt="Como escolher" />
        </div>
      </div>
    </section>
  );
}
