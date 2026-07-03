import type { Recurso } from '../../types';

interface Props {
  descricao: string;
  recursos: Recurso[];
}

export default function RecursosSection({ descricao, recursos }: Props) {
  return (
    <>
      <div className="recursos-intro">
        <div>
          <span className="eyebrow">Engineered Features</span>
          <h2>Cada costura tem um propósito.</h2>
        </div>
        <p style={{ color: 'var(--gray-1)' }}>{descricao}</p>
      </div>
      <div className="recursos-grid">
        {recursos.map((r) => (
          <div className="recurso-item" key={r.titulo}>
            <h4>{r.titulo}</h4>
            <p>{r.descricao}</p>
          </div>
        ))}
      </div>
    </>
  );
}
