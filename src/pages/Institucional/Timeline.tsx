const MARCOS = [
  { ano: '2007', titulo: 'Fundação', texto: 'A X11 nasce em Minas Gerais com um propósito claro: oferecer ao motociclista brasileiro equipamentos de alta performance, com segurança certificada e preço justo.' },
  { ano: '2009', titulo: 'Primeira Fábrica', texto: 'Inauguração da unidade própria. Controle total do processo produtivo, do desenvolvimento à entrega — sem intermediários, sem abrir mão da qualidade.' },
  { ano: '2015', titulo: 'Linha Adventure', texto: 'Lançamento da primeira linha completa para off-road. Equipamentos testados em campo, do cerrado brasileiro às trilhas da Cordilheira dos Andes.' },
  { ano: '2021', titulo: 'Expert Riders', texto: 'Mais de 200 mil motociclistas equipados. Presença nacional, comunidade ativa e a mesma paixão de sempre: a liberdade sobre duas rodas.' },
];

export default function Timeline() {
  return (
    <div className="timeline">
      {MARCOS.map((m) => (
        <div key={m.ano}>
          <div className="ano">{m.ano}</div>
          <div className="titulo">{m.titulo}</div>
          <p>{m.texto}</p>
        </div>
      ))}
    </div>
  );
}
