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
    <div className="produto-info">
      <span className="eyebrow">Coleção Lab Crafted</span>
      <div className="estrelas">
        {[1, 2, 3, 4, 5].map((i) => <span key={i}>{i <= notaCheia ? '★' : '☆'}</span>)}
        <span style={{ color: 'var(--gray-3)', fontSize: '0.8rem' }}> ({produto.avaliacoes.length} avaliações)</span>
      </div>
      <h1>{produto.nome}</h1>
      <span className="preco">{formatarPreco(produto.preco)}</span>

      <div className="grupo-opcao">
        <label className="titulo">Cor</label>
        <div className="opcoes-cor">
          {produto.cores.map((c, i) => (
            <button
              key={c.nome}
              type="button"
              className={`swatch-btn${i === corAtiva ? ' active' : ''}`}
              style={{ background: c.hex }}
              title={c.nome}
              onClick={() => setCorAtiva(i)}
            />
          ))}
        </div>
      </div>

      <div className="grupo-opcao">
        <label className="titulo">Tamanho</label>
        <div className="opcoes-tamanho">
          {produto.tamanhos.map((t, i) => (
            <button
              key={t}
              type="button"
              className={i === tamanhoAtivo ? 'active' : ''}
              onClick={() => setTamanhoAtivo(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <button type="button" className="link-guia-tamanhos" onClick={onAbrirGuia}>
          📏 Guia de tamanhos
        </button>
      </div>

      <div className="produto-acoes">
        <Link to="/onde-encontrar" className="btn btn-primary">Onde Comprar</Link>
        <button type="button" className="btn btn-outline" onClick={() => toggle(produto.id)}>
          {isSelected(produto.id) ? 'Remover da comparação' : 'Comparar'}
        </button>
      </div>
      <p style={{ color: 'var(--gray-3)', fontSize: '0.78rem', marginTop: 10 }}>
        Garantia de 6 meses de fabricação · Venda através da rede de lojas parceiras
      </p>
    </div>
  );
}
