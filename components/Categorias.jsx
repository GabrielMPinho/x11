import { categorias } from "../src/data/categorias";

export default function Categorias(){
    return (
        <section className="categorias">
            <div className="titulo">
                <div className="escrito_cat">
                    <p className="p_laranja">NAVEGUE</p>
                    <h2>CATEGORIAS POPULARES</h2>
                </div>
            </div>
            <div id="conteiner_categorias">
              {categorias.map((cat, index) => (
                <a href={cat.link} className="card_categoria" key={index}>
                <span className="icone_seta">↗</span>
                <p>{cat.nome}</p>
                </a>
            ))}
            </div>
        </section>
    )
}
