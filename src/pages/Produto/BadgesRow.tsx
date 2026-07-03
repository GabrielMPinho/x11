import type { EspecificacaoRapida } from '../../types';

export default function BadgesRow({ especificacoes }: { especificacoes: EspecificacaoRapida[] }) {
  return (
    <div className="grid grid-cols-4 max-[980px]:grid-cols-2 bg-bg-card border border-border rounded my-10">
      {especificacoes.map((e) => (
        <div className="text-center py-[26px] px-2.5 border-r border-border last:border-r-0" key={e.legenda}>
          <div className="text-orange text-[1.6rem] font-bold" style={{ fontFamily: 'var(--font-head)' }}>{e.valor}</div>
          <div className="text-[0.75rem] text-gray-2 uppercase tracking-wide mt-1">{e.legenda}</div>
        </div>
      ))}
    </div>
  );
}
