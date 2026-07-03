const VALORES = [
  { num: '01', titulo: 'Segurança em Primeiro Lugar.', texto: 'Equipamento de moto é item de proteção. Tratamos cada produto com a seriedade que sua vida exige.' },
  { num: '02', titulo: 'Segurança Certificada', texto: 'Tecnologia de ponta com preço que cabe no bolso do motociclista brasileiro. Sem rótulos, sem exclusividade.' },
  { num: '03', titulo: 'Paixão por Duas Rodas.', texto: 'A gente pilota. A gente entende. Cada decisão nasce da estrada — e volta para ela.' },
];

export default function Valores() {
  return (
    <div className="container section">
      <div className="section-head">
        <span className="eyebrow">Nossos Valores</span>
        <h2>No Que Acreditamos</h2>
      </div>
      <div className="valores-grid">
        {VALORES.map((v) => (
          <div key={v.num}>
            <div className="num">{v.num}</div>
            <h4>{v.titulo}</h4>
            <p>{v.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
