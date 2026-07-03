import type { Avaliacao } from '../../types';

export default function Avaliacoes({ avaliacoes }: { avaliacoes: Avaliacao[] }) {
  return (
    <div className="my-[60px]">
      <span className="eyebrow">Coleção Lab Crafted</span>
      <h2>{avaliacoes.length} Respostas</h2>
      {avaliacoes.length === 0 ? (
        <p className="text-gray-2 text-[0.9rem]">Seja o primeiro a avaliar este produto na loja onde comprou.</p>
      ) : (
        <div className="grid-3">
          {avaliacoes.map((a, i) => (
            <div className="bg-bg-card border border-border p-5 rounded" key={i}>
              <div className="text-orange mb-2">{[1, 2, 3, 4, 5].map((n) => <span key={n}>{n <= a.nota ? '★' : '☆'}</span>)}</div>
              <p className="mb-2">{a.comentario}</p>
              <div className="uppercase text-[0.8rem] mt-2.5" style={{ fontFamily: 'var(--font-head)' }}>{a.autor}</div>
              <div className="text-gray-3 text-[0.78rem]">{a.localizacao}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
