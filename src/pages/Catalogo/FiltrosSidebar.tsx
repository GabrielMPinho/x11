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

const grupo = 'mb-6 border-b border-border pb-5 last:mb-0 last:border-b-0 last:pb-0';
const grupoTitulo = 'text-orange text-[0.78rem] mb-3';
const filtroCheck = 'flex items-center gap-2 text-[0.85rem] mb-2 text-gray-1';

export default function FiltrosSidebar({
  tamanhos, cores, tamanhoSelecionado, corSelecionada, estacaoSelecionada, certificacaoSelecionada,
  precoMin, precoMax, onToggleLista, onPrecoChange,
}: Props) {
  return (
    <div className="bg-bg-card border border-border rounded p-5 sticky top-[90px] max-[980px]:static">
      <div className={grupo}>
        <h4 className={grupoTitulo}>Tamanho</h4>
        <div className="flex flex-wrap gap-2">
          {tamanhos.map((t) => (
            <label
              key={t}
              className="border border-border has-checked:border-orange rounded-[3px] px-2.5 py-1.5 text-[0.8rem] cursor-pointer [&_input]:hidden"
            >
              <input
                type="checkbox"
                className="peer"
                checked={tamanhoSelecionado.includes(t)}
                onChange={() => onToggleLista('tamanho', t)}
              />
              <span className="peer-checked:text-orange">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={grupo}>
        <h4 className={grupoTitulo}>Preço</h4>
        <div className="flex gap-2">
          <input
            type="number" placeholder="Mín."
            defaultValue={precoMin}
            onBlur={(e) => onPrecoChange('precoMin', e.target.value)}
            className="w-1/2 bg-bg border border-border text-white p-1.5 rounded-[3px]"
          />
          <input
            type="number" placeholder="Máx."
            defaultValue={precoMax}
            onBlur={(e) => onPrecoChange('precoMax', e.target.value)}
            className="w-1/2 bg-bg border border-border text-white p-1.5 rounded-[3px]"
          />
        </div>
      </div>

      <div className={grupo}>
        <h4 className={grupoTitulo}>Estação</h4>
        {ESTACOES.map(([valor, rotulo]) => (
          <label className={filtroCheck} key={valor}>
            <input
              type="checkbox"
              checked={estacaoSelecionada.includes(valor)}
              onChange={() => onToggleLista('estacao', valor)}
            /> {rotulo}
          </label>
        ))}
      </div>

      <div className={grupo}>
        <h4 className={grupoTitulo}>Cor</h4>
        <div className="flex flex-wrap gap-2.5">
          {cores.map((c) => (
            <label key={c.nome} className="cursor-pointer text-center text-[0.7rem] text-gray-2 [&_input]:hidden">
              <input
                type="checkbox"
                className="peer"
                checked={corSelecionada.includes(c.nome)}
                onChange={() => onToggleLista('cor', c.nome)}
              />
              <span
                className="w-[26px] h-[26px] mx-auto mb-1 rounded-full border border-white/30 block peer-checked:outline peer-checked:outline-2 peer-checked:outline-orange peer-checked:outline-offset-2"
                style={{ background: c.hex }}
              />
              {c.nome}
            </label>
          ))}
        </div>
      </div>

      <div className={grupo}>
        <h4 className={grupoTitulo}>Especificações</h4>
        {CERTIFICACOES.map(([valor, rotulo]) => (
          <label className={filtroCheck} key={valor}>
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
