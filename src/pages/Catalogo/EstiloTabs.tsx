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
    <div className="estilo-tabs">
      {ESTILOS.map((e) => (
        <a
          key={e.valor}
          href="#"
          className={estiloAtual === e.valor ? 'active' : ''}
          onClick={(ev) => { ev.preventDefault(); onSelecionar(e.valor); }}
        >
          {e.rotulo}
        </a>
      ))}
    </div>
  );
}
