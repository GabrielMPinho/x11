import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarComparacao, formatarPreco } from '../../api';
import type { Produto } from '../../types';
import { useCompare } from '../../hooks/useCompare';

const cell = 'border border-border p-3.5 text-left text-[0.85rem] align-top';

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
    <div className="container-x11 section">
      <div className="section-head">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h2>Comparação de Produtos</h2>
      </div>

      {carregando ? null : produtos.length === 0 ? (
        <div className="text-center py-20 text-gray-2">
          Você ainda não selecionou produtos para comparar.<br />
          Marque a caixa "Comparar" nos produtos que quiser colocar lado a lado.
          <br /><br />
          <Link to="/categoria/jaquetas-masculino" className="btn btn-primary">Ver Produtos</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse block overflow-x-auto">
            <thead>
              <tr>
                <th className={cell}></th>
                {produtos.map((p) => (
                  <th key={p.id} className={`${cell} bg-bg-card text-orange uppercase text-[0.75rem] tracking-wide`}>
                    <img className="w-[90px] h-[90px] object-cover rounded-[3px] mb-2.5" src={p.imagens[0]} alt={p.nome} />
                    <div>{p.nome}</div>
                    <div className="text-orange">{formatarPreco(p.preco)}</div>
                    <button className="text-gray-3 text-[0.75rem] underline bg-transparent border-none mt-2" onClick={() => remove(p.id)}>Remover</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td className={cell}>Estilo</td>{produtos.map((p) => <td key={p.id} className={cell}>{p.estiloLabel}</td>)}</tr>
              <tr><td className={cell}>Estação</td>{produtos.map((p) => <td key={p.id} className={cell}>{p.estacaoLabel}</td>)}</tr>
              <tr><td className={cell}>Certificação</td>{produtos.map((p) => <td key={p.id} className={cell}>{p.certificacaoLabel}</td>)}</tr>
              <tr><td className={cell}>Tamanhos</td>{produtos.map((p) => <td key={p.id} className={cell}>{p.tamanhos.join(', ')}</td>)}</tr>
              {chavesFicha.map((chave) => (
                <tr key={chave}>
                  <td className={cell}>{chave}</td>
                  {produtos.map((p) => {
                    const item = p.fichaTecnica.find((f) => f.chave === chave);
                    return <td key={p.id} className={cell}>{item ? item.valor : '—'}</td>;
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
