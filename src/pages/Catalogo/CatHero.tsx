import type { Categoria } from '../../types';

export default function CatHero({ categoria }: { categoria: Categoria }) {
  const genero = categoria.genero === 'masculino' ? 'Masculinas' : categoria.genero === 'feminino' ? 'Femininas' : '';

  return (
    <section
      className="relative h-[260px] flex items-end bg-cover bg-center py-[30px] before:content-[''] before:absolute before:inset-0 before:bg-black/55"
      style={{ backgroundImage: "url('/images/colecao-hero.jpg')" }}
    >
      <div className="container-x11 relative">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h1>{categoria.nome} {genero}</h1>
      </div>
    </section>
  );
}
