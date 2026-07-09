import { useRef } from "react";
import { categorias } from "../src/data/categorias";
import { RevelaComProgresso } from "../src/lib/Revela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";

export default function Categorias(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="categorias" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso}>
                <div className="escrito_cat">
                    <p className="p_laranja">NAVEGUE</p>
                    <h2>CATEGORIAS POPULARES</h2>
                </div>
            </RevelaComProgresso>
            <div id="conteiner_categorias">
              {categorias.map((cat, index) => (
                <RevelaComProgresso
                    as="a"
                    href={cat.link}
                    className="card_categoria"
                    key={index}
                    progresso={progresso}
                    atraso={0.04 + index * 0.025}
                    distancia={24}
                >
                    <span className="icone_seta">↗</span>
                    <p>{cat.nome}</p>
                </RevelaComProgresso>
            ))}
            </div>
        </section>
    )
}
