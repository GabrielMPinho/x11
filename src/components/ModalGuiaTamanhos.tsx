import type { TabelaTamanhos } from '../types';

interface Props {
  aberto: boolean;
  tabela: TabelaTamanhos;
  onFechar: () => void;
}

export default function ModalGuiaTamanhos({ aberto, tabela, onFechar }: Props) {
  return (
    <div
      className={`modal-overlay${aberto ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onFechar(); }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onFechar} aria-label="Fechar">&times;</button>
        <span className="eyebrow">Guia de Tamanhos</span>
        <h3>{tabela.titulo}</h3>
        <table>
          <thead>
            <tr>{tabela.colunas.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {tabela.linhas.map((linha, i) => (
              <tr key={i}>{linha.map((v, j) => <td key={j}>{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
