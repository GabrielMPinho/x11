export default function BannerTestado() {
  return (
    <div className="banner-testado" style={{ backgroundImage: "url('/images/testado-minas.jpg')" }}>
      <div className="content">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h2>Testado Minas Gerais</h2>
        <p style={{ color: 'var(--gray-1)' }}>
          Quatro pilotos. Um único equipamento do início ao fim. Sem reparos. Sem reclamações. Apenas poeira, sal e a próxima curva.
        </p>
      </div>
    </div>
  );
}
