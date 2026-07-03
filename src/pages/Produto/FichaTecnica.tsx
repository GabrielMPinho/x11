import type { FichaTecnicaItem } from '../../types';

export default function FichaTecnica({ itens }: { itens: FichaTecnicaItem[] }) {
  return (
    <div className="ficha-tecnica">
      <span className="eyebrow">Coleção Lab Crafted</span>
      <h2>Diferenciais Essenciais</h2>
      <table>
        <tbody>
          {itens.map((f) => (
            <tr key={f.chave}><td>{f.chave}</td><td>{f.valor}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
