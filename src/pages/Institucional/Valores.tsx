const VALORES = [
  { num: '01', titulo: 'Segurança em Primeiro Lugar.', texto: 'Equipamento de moto é item de proteção. Tratamos cada produto com a seriedade que sua vida exige.' },
  { num: '02', titulo: 'Segurança Certificada', texto: 'Tecnologia de ponta com preço que cabe no bolso do motociclista brasileiro. Sem rótulos, sem exclusividade.' },
  { num: '03', titulo: 'Paixão por Duas Rodas.', texto: 'A gente pilota. A gente entende. Cada decisão nasce da estrada — e volta para ela.' },
];

export default function Valores() {
  return (
    <div className="container-x11 section">
      <div className="section-head">
        <span className="eyebrow">Nossos Valores</span>
        <h2>No Que Acreditamos</h2>
      </div>
      <div className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-[30px] text-center">
        {VALORES.map((v) => (
          <div key={v.num}>
            <div className="text-orange text-[1.4rem]" style={{ fontFamily: 'var(--font-head)' }}>{v.num}</div>
            <h4 className="mt-1.5">{v.titulo}</h4>
            <p className="text-gray-2 text-[0.88rem]">{v.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
