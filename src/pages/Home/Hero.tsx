import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      className="relative min-h-[560px] flex items-center bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(13,13,13,0.92)_30%,rgba(13,13,13,0.35))]"
      style={{ backgroundImage: "url('/images/hero-home.jpg')" }}
    >
      <div className="relative z-10 w-full max-w-[560px] mx-auto px-5">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h1 className="text-[3rem] leading-[1.05] mb-[18px] max-[620px]:text-[2.1rem]">Engenharia que veste o piloto</h1>
        <p className="text-gray-1 mb-[26px] max-w-[440px]">Equipamento desenvolvido em laboratório para proteger dentro e fora da estrada. Onde tecnologia encontra estilo.</p>
        <div className="flex gap-3.5 flex-wrap">
          <Link to="/categoria/jaquetas-masculino" className="btn btn-primary">Ver Masculino</Link>
          <Link to="/categoria/jaquetas-feminino" className="btn btn-outline">Ver Feminino</Link>
        </div>
      </div>
    </section>
  );
}
