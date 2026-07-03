export default function BannerTestado() {
  return (
    <div
      className="relative h-80 my-[60px] bg-cover bg-center flex items-center rounded overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/50"
      style={{ backgroundImage: "url('/images/testado-minas.jpg')" }}
    >
      <div className="relative px-11 max-w-[520px]">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h2>Testado Minas Gerais</h2>
        <p className="text-gray-1">
          Quatro pilotos. Um único equipamento do início ao fim. Sem reparos. Sem reclamações. Apenas poeira, sal e a próxima curva.
        </p>
      </div>
    </div>
  );
}
