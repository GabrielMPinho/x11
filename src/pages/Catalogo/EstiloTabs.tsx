const ESTILOS = [
  { valor: '', rotulo: 'Tudo' },
  { valor: 'adventure', rotulo: 'Adventure' },
  { valor: 'touring', rotulo: 'Touring' },
  { valor: 'sport', rotulo: 'Sport' },
  { valor: 'urbano', rotulo: 'Urbano' },
  { valor: 'classico', rotulo: 'Clássico' },
];

interface Props {
  estiloAtual: string;
  onSelecionar: (estilo: string) => void;
}

export default function EstiloTabs({ estiloAtual, onSelecionar }: Props) {
  return (
    <div className="flex gap-2.5 flex-wrap my-6">
      {ESTILOS.map((e) => (
        <a
          key={e.valor}
          href="#"
          className={`px-[18px] py-2 border rounded-[20px] uppercase text-[0.78rem] tracking-wide ${estiloAtual === e.valor ? 'border-orange text-orange' : 'border-border hover:border-orange hover:text-orange'}`}
          style={{ fontFamily: 'var(--font-head)' }}
          onClick={(ev) => { ev.preventDefault(); onSelecionar(e.valor); }}
        >
          {e.rotulo}
        </a>
      ))}
    </div>
  );
}
