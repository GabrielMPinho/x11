export default function Hero() {
  return (
    <section
      className="relative h-[420px] flex items-end bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.2))]"
      style={{ backgroundImage: "url('/images/institucional-hero.jpg')" }}
    >
      <div className="container-x11 relative pb-[50px]">
        <span className="eyebrow">Institucional</span>
        <h1 className="text-[2.6rem]">Movidos pela mesma paixão.</h1>
        <p className="text-gray-1">A liberdade sobre duas rodas.</p>
      </div>
    </section>
  );
}
