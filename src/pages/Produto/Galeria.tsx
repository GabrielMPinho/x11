import { useState } from 'react';

export default function Galeria({ imagens, nome }: { imagens: string[]; nome: string }) {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origemZoom, setOrigemZoom] = useState('50% 50%');

  return (
    <>
      <div className="flex flex-col gap-2.5 max-[980px]:flex-row max-[980px]:order-2 max-[980px]:overflow-x-auto">
        {imagens.map((img, i) => (
          <img
            key={img + i}
            src={img}
            alt={`${nome} ${i + 1}`}
            className={`border rounded-[3px] cursor-pointer aspect-square object-cover ${i === imagemAtiva ? 'border-orange' : 'border-border'}`}
            onClick={() => { setImagemAtiva(i); setZoom(false); }}
          />
        ))}
      </div>
      <div
        className="bg-bg-alt rounded overflow-hidden aspect-[4/5] relative max-[980px]:order-1"
        style={{ cursor: zoom ? 'zoom-out' : 'zoom-in' }}
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
          className="w-full h-full object-cover transition-transform duration-[250ms]"
          style={{ transformOrigin: origemZoom, transform: zoom ? 'scale(1.8)' : undefined }}
        />
      </div>
    </>
  );
}
