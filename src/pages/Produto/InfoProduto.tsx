import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Produto } from '../../types';
import { formatarPreco } from '../../api';
import { useCompare } from '../../hooks/useCompare';

export default function InfoProduto({ produto, onAbrirGuia }: { produto: Produto; onAbrirGuia: () => void }) {
  const [corAtiva, setCorAtiva] = useState(0);
  const [tamanhoAtivo, setTamanhoAtivo] = useState(0);
  const { isSelected, toggle } = useCompare();

  const notaCheia = Math.round(produto.avaliacaoMedia);

  return (
    <div>
      <span className="eyebrow">Coleção Lab Crafted</span>
      <div className="text-orange text-[0.9rem] mb-1.5">
        {[1, 2, 3, 4, 5].map((i) => <span key={i}>{i <= notaCheia ? '★' : '☆'}</span>)}
        <span className="text-gray-3 text-[0.8rem]"> ({produto.avaliacoes.length} avaliações)</span>
      </div>
      <h1 className="text-[2rem]">{produto.nome}</h1>
      <span className="block mb-5 text-[1.6rem] text-orange" style={{ fontFamily: 'var(--font-head)' }}>{formatarPreco(produto.preco)}</span>

      <div className="mb-[22px]">
        <label className="block text-[0.8rem] text-gray-2 mb-2 uppercase tracking-wide">Cor</label>
        <div className="flex gap-2.5">
          {produto.cores.map((c, i) => (
            <button
              key={c.nome}
              type="button"
              className={`w-[30px] h-[30px] rounded-full border-2 cursor-pointer ${i === corAtiva ? 'border-orange' : 'border-transparent'}`}
              style={{ background: c.hex }}
              title={c.nome}
              onClick={() => setCorAtiva(i)}
            />
          ))}
        </div>
      </div>

      <div className="mb-[22px]">
        <label className="block text-[0.8rem] text-gray-2 mb-2 uppercase tracking-wide">Tamanho</label>
        <div className="flex flex-wrap gap-2">
          {produto.tamanhos.map((t, i) => (
            <button
              key={t}
              type="button"
              className={`min-w-[44px] px-2.5 py-2 bg-bg-card border rounded-[3px] text-white ${i === tamanhoAtivo ? 'border-orange text-orange' : 'border-border'}`}
              onClick={() => setTamanhoAtivo(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[0.78rem] text-gray-2 hover:text-orange mt-2.5 underline bg-transparent border-none"
          onClick={onAbrirGuia}
        >
          📏 Guia de tamanhos
        </button>
      </div>

      <div className="flex gap-3 mt-[26px]">
        <Link to="/onde-encontrar" className="btn btn-primary">Onde Comprar</Link>
        <button type="button" className="btn btn-outline" onClick={() => toggle(produto.id)}>
          {isSelected(produto.id) ? 'Remover da comparação' : 'Comparar'}
        </button>
      </div>
      <p className="text-gray-3 text-[0.78rem] mt-2.5">
        Garantia de 6 meses de fabricação · Venda através da rede de lojas parceiras
      </p>
    </div>
  );
}
