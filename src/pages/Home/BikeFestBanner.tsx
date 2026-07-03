import { Link } from 'react-router-dom';

export default function BikeFestBanner() {
  return (
    <section className="section section-alt">
      <div className="container-x11">
        <div className="banner-promo">
          <div className="banner-promo-text">
            <span className="eyebrow">Lançamento Especial</span>
            <h2 className="text-[1.9rem]">Concorra ao combo de proteção no Bike Fest</h2>
            <p className="mb-4">Monte o conjunto perfeito para a próxima aventura: escolha uma jaqueta e uma calça e garanta 20% de desconto no look.</p>
            <Link to="/pagina/catalogo-2026" className="btn btn-primary w-fit">Como Participar</Link>
          </div>
          <img src="/images/banner-bikefest.jpg" alt="Bike Fest" className="w-full h-full object-cover min-h-[260px]" />
        </div>
      </div>
    </section>
  );
}
