import type { FichaTecnicaItem } from '../../types';

export default function FichaTecnica({ itens }: { itens: FichaTecnicaItem[] }) {
  return (
    <div className="my-[60px]">
      <span className="eyebrow">Coleção Lab Crafted</span>
      <h2>Diferenciais Essenciais</h2>
      <table className="w-full border-collapse">
        <tbody>
          {itens.map((f) => (
            <tr key={f.chave}>
              <td className="py-3.5 px-2.5 border-b border-border text-gray-2 uppercase text-[0.78rem] tracking-wide w-[220px]">{f.chave}</td>
              <td className="py-3.5 px-2.5 border-b border-border text-[0.9rem]">{f.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
