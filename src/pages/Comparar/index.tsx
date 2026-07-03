import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarComparacao, formatarPreco } from '../../api';
import type { Produto } from '../../types';
import { useCompare } from '../../hooks/useCompare';

export default function Comparar() {
  const { ids, remove } = useCompare();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    document.title = 'Comparação de Produtos · X11 Expert Riders';
  }, []);

  useEffect(() => {
    setCarregando(true);
    buscarComparacao(ids)
      .then((d) => setProdutos(d.produtos))
      .finally(() => setCarregando(false));
  }, [ids]);

  const chavesFicha = [...new Set(produtos.flatMap((p) => p.fichaTecnica.map((f) => f.chave)))];

  return (
    <div className="container section">
      <div className="section-head">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h2>Comparação de Produtos</h2>
      </div>

      {carregando ? null : produtos.length === 0 ? (
        <div className="compare-empty">
          Você ainda não selecionou produtos para comparar.<br />
          Marque a caixa "Comparar" nos produtos que quiser colocar lado a lado.
          <br /><br />
          <Link to="/categoria/jaquetas-masculino" className="btn btn-primary">Ver Produtos</Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                {produtos.map((p) => (
                  <th key={p.id}>
                    <img className="thumb" src={p.imagens[0]} alt={p.nome} />
                    <div>{p.nome}</div>
                    <div style={{ color: 'var(--orange)' }}>{formatarPreco(p.preco)}</div>
                    <button className="compare-remove" onClick={() => remove(p.id)}>Remover</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td>Estilo</td>{produtos.map((p) => <td key={p.id}>{p.estiloLabel}</td>)}</tr>
              <tr><td>Estação</td>{produtos.map((p) => <td key={p.id}>{p.estacaoLabel}</td>)}</tr>
              <tr><td>Certificação</td>{produtos.map((p) => <td key={p.id}>{p.certificacaoLabel}</td>)}</tr>
              <tr><td>Tamanhos</td>{produtos.map((p) => <td key={p.id}>{p.tamanhos.join(', ')}</td>)}</tr>
              {chavesFicha.map((chave) => (
                <tr key={chave}>
                  <td>{chave}</td>
                  {produtos.map((p) => {
                    const item = p.fichaTecnica.find((f) => f.chave === chave);
                    return <td key={p.id}>{item ? item.valor : '—'}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
