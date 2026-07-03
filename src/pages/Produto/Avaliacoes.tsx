import type { Avaliacao } from '../../types';

export default function Avaliacoes({ avaliacoes }: { avaliacoes: Avaliacao[] }) {
  return (
    <div className="avaliacoes">
      <span className="eyebrow">Coleção Lab Crafted</span>
      <h2>{avaliacoes.length} Respostas</h2>
      {avaliacoes.length === 0 ? (
        <p className="sem-avaliacoes">Seja o primeiro a avaliar este produto na loja onde comprou.</p>
      ) : (
        <div className="grid-3">
          {avaliacoes.map((a, i) => (
            <div className="avaliacao-card" key={i}>
              <div className="estrelas">{[1, 2, 3, 4, 5].map((n) => <span key={n}>{n <= a.nota ? '★' : '☆'}</span>)}</div>
              <p>{a.comentario}</p>
              <div className="autor">{a.autor}</div>
              <div className="local">{a.localizacao}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
