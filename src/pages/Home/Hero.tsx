import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: "url('/images/hero-home.jpg')" }}>
      <div className="container hero-content">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h1>Engenharia que veste o piloto</h1>
        <p>Equipamento desenvolvido em laboratório para proteger dentro e fora da estrada. Onde tecnologia encontra estilo.</p>
        <div className="hero-actions">
          <Link to="/categoria/jaquetas-masculino" className="btn btn-primary">Ver Masculino</Link>
          <Link to="/categoria/jaquetas-feminino" className="btn btn-outline">Ver Feminino</Link>
        </div>
      </div>
    </section>
  );
}
