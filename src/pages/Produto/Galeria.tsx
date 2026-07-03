import { useState } from 'react';

export default function Galeria({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origemZoom, setOrigemZoom] = useState('50% 50%');

  return (
    <>
      <div className="galeria-thumbs">
        {imagens.map((img, i) => (
          <img
            key={img + i}
            src={img}
            alt={`${nome} ${i + 1}`}
            className={i === imagemAtiva ? 'active' : ''}
            onClick={() => { setImagemAtiva(i); setZoom(false); }}
          />
        ))}
      </div>
      <div
        className={`galeria-principal${zoom ? ' zoom' : ''}`}
        onClick={() => setZoom((v) => !v)}
        onMouseMove={(e) => {
          if (!zoom) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setOrigemZoom(`${x}% ${y}%`);
        }}
      >
        <img
          src={imagens[imagemAtiva]}
          alt={nome}
          style={{ transformOrigin: origemZoom }}
        />
      </div>
    </>
  );
}
