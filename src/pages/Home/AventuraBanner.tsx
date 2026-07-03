import { Link } from 'react-router-dom';

export default function AventuraBanner() {
  return (
    <section className="section section-alt">
      <div className="container-x11">
        <div className="banner-promo">
          <div className="banner-promo-text">
            <span className="eyebrow">Lançamento Especial</span>
            <h2 className="text-[1.9rem]">Valor para Aventura</h2>
            <p className="mb-4">Equipamento de aventura que não abre mão de qualidade, design e desempenho. Cada peça é testada para acompanhar você onde a estrada terminar.</p>
            <Link to="/categoria/jaquetas-masculino?estilo=adventure" className="btn btn-primary w-fit">Explorar Coleção</Link>
          </div>
          <img src="/images/banner-aventura.jpg" alt="Aventura" className="w-full h-full object-cover min-h-[260px]" />
        </div>
      </div>
    </section>
  );
}
