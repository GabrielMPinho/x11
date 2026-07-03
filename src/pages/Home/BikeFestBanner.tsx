import { Link } from 'react-router-dom';

export default function BikeFestBanner() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="banner-promo">
          <div className="text">
            <span className="eyebrow">Lançamento Especial</span>
            <h2>Concorra ao combo de proteção no Bike Fest</h2>
            <p>Monte o conjunto perfeito para a próxima aventura: escolha uma jaqueta e uma calça e garanta 20% de desconto no look.</p>
            <Link to="/pagina/catalogo-2026" className="btn btn-primary">Como Participar</Link>
          </div>
          <img src="/images/banner-bikefest.jpg" alt="Bike Fest" />
        </div>
      </div>
    </section>
  );
}
