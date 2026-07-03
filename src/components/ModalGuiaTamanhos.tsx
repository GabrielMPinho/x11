import type { TabelaTamanhos } from '../types';

interface Props {
  aberto: boolean;
  tabela: TabelaTamanhos;
  onFechar: () => void;
}

export default function ModalGuiaTamanhos({ aberto, tabela, onFechar }: Props) {
  return (
    <div
      className={`fixed inset-0 bg-black/75 items-center justify-center z-[500] p-5 ${aberto ? 'flex' : 'hidden'}`}
      onClick={(e) => { if (e.target === e.currentTarget) onFechar(); }}
    >
      <div className="relative bg-bg-alt border border-border rounded max-w-[560px] w-full max-h-[80vh] overflow-y-auto p-[30px]">
        <button className="absolute top-4 right-4 bg-transparent border-none text-white text-[1.4rem]" onClick={onFechar} aria-label="Fechar">&times;</button>
        <span className="eyebrow">Guia de Tamanhos</span>
        <h3>{tabela.titulo}</h3>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>{tabela.colunas.map((c) => <th key={c} className="border border-border p-2 text-center text-[0.85rem] text-orange">{c}</th>)}</tr>
          </thead>
          <tbody>
            {tabela.linhas.map((linha, i) => (
              <tr key={i}>{linha.map((v, j) => <td key={j} className="border border-border p-2 text-center text-[0.85rem]">{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
