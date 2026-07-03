import type { EspecificacaoRapida } from '../../types';

export default function BadgesRow({ especificacoes }: { especificacoes: EspecificacaoRapida[] }) {
  return (
    <div className="badges-row">
      {especificacoes.map((e) => (
        <div className="badge" key={e.legenda}>
          <div className="valor">{e.valor}</div>
          <div className="legenda">{e.legenda}</div>
        </div>
      ))}
    </div>
  );
}
