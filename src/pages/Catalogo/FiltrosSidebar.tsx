import type { Cor } from '../../types';

interface Props {
  tamanhos: string[];
  cores: Cor[];
  tamanhoSelecionado: string[];
  corSelecionada: string[];
  estacaoSelecionada: string[];
  certificacaoSelecionada: string[];
  precoMin: string;
  precoMax: string;
  onToggleLista: (chave: string, valor: string) => void;
  onPrecoChange: (chave: string, valor: string) => void;
}

const ESTACOES: [string, string][] = [['4-estacoes', '4 Estações'], ['verao', 'Verão'], ['inverno', 'Inverno']];
const CERTIFICACOES: [string, string][] = [['ce1', 'CE Nível 1'], ['ce2', 'CE Nível 2'], ['aaa', 'Classe AAA']];

export default function FiltrosSidebar({
  tamanhos, cores, tamanhoSelecionado, corSelecionada, estacaoSelecionada, certificacaoSelecionada,
  precoMin, precoMax, onToggleLista, onPrecoChange,
}: Props) {
  return (
    <div className="filtros">
      <div className="filtro-grupo">
        <h4>Tamanho</h4>
        <div className="filtro-tamanhos">
          {tamanhos.map((t) => (
            <label key={t}>
              <input
                type="checkbox"
                checked={tamanhoSelecionado.includes(t)}
                onChange={() => onToggleLista('tamanho', t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filtro-grupo filtro-preco">
        <h4>Preço</h4>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="number" placeholder="Mín."
            defaultValue={precoMin}
            onBlur={(e) => onPrecoChange('precoMin', e.target.value)}
            style={{ width: '50%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--white)', padding: 6, borderRadius: 3 }}
          />
          <input
            type="number" placeholder="Máx."
            defaultValue={precoMax}
            onBlur={(e) => onPrecoChange('precoMax', e.target.value)}
            style={{ width: '50%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--white)', padding: 6, borderRadius: 3 }}
          />
        </div>
      </div>

      <div className="filtro-grupo">
        <h4>Estação</h4>
        {ESTACOES.map(([valor, rotulo]) => (
          <label className="filtro-check" key={valor}>
            <input
              type="checkbox"
              checked={estacaoSelecionada.includes(valor)}
              onChange={() => onToggleLista('estacao', valor)}
            /> {rotulo}
          </label>
        ))}
      </div>

      <div className="filtro-grupo">
        <h4>Cor</h4>
        <div className="filtro-cores">
          {cores.map((c) => (
            <label key={c.nome}>
              <input
                type="checkbox"
                checked={corSelecionada.includes(c.nome)}
                onChange={() => onToggleLista('cor', c.nome)}
              />
              <span className="swatch" style={{ background: c.hex }} />
              {c.nome}
            </label>
          ))}
        </div>
      </div>

      <div className="filtro-grupo">
        <h4>Especificações</h4>
        {CERTIFICACOES.map(([valor, rotulo]) => (
          <label className="filtro-check" key={valor}>
            <input
              type="checkbox"
              checked={certificacaoSelecionada.includes(valor)}
              onChange={() => onToggleLista('certificacao', valor)}
            /> {rotulo}
          </label>
        ))}
      </div>
    </div>
  );
}
