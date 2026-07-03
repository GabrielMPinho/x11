import { Link } from 'react-router-dom';

export default function AventuraBanner() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="banner-promo">
          <div className="text">
            <span className="eyebrow">Lançamento Especial</span>
            <h2>Valor para Aventura</h2>
            <p>Equipamento de aventura que não abre mão de qualidade, design e desempenho. Cada peça é testada para acompanhar você onde a estrada terminar.</p>
            <Link to="/categoria/jaquetas-masculino?estilo=adventure" className="btn btn-primary">Explorar Coleção</Link>
          </div>
          <img src="/images/banner-aventura.jpg" alt="Aventura" />
        </div>
      </div>
    </section>
  );
}
