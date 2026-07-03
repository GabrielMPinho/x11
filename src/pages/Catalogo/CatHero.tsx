import type { Categoria } from '../../types';

export default function CatHero({ categoria }: { categoria: Categoria }) {
  const genero = categoria.genero === 'masculino' ? 'Masculinas' : categoria.genero === 'feminino' ? 'Femininas' : '';

  return (
    <section className="cat-hero" style={{ backgroundImage: "url('/images/colecao-hero.jpg')" }}>
      <div className="container">
        <span className="eyebrow">Coleção Lab Crafted</span>
        <h1>{categoria.nome} {genero}</h1>
      </div>
    </section>
  );
}
