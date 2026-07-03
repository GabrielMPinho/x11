import type { Recurso } from '../../types';

interface Props {
  descricao: string;
  recursos: Recurso[];
}

export default function RecursosSection({ descricao, recursos }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-10 items-center my-[60px] mb-[30px]">
        <div>
          <span className="eyebrow">Engineered Features</span>
          <h2>Cada costura tem um propósito.</h2>
        </div>
        <p className="text-gray-1">{descricao}</p>
      </div>
      <div className="grid grid-cols-4 max-[980px]:grid-cols-2 max-[620px]:grid-cols-1 gap-6">
        {recursos.map((r) => (
          <div className="border-t-[3px] border-orange pt-4" key={r.titulo}>
            <h4 className="text-[0.95rem]">{r.titulo}</h4>
            <p className="text-gray-2 text-[0.85rem]">{r.descricao}</p>
          </div>
        ))}
      </div>
    </>
  );
}
