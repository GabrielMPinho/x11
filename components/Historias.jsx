import { useRef } from "react";
import { historias } from "../src/data/historias";
import { RevelaComProgresso } from "../src/lib/Revela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";

export default function Historias(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return(
        <section className="historias" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso}>
                <div className="escrito_cat">
                    <p className="p_laranja">DIÁRIO DE BORDO</p>
                    <h2>HISTÓRIAS</h2>
                </div>
            </RevelaComProgresso>
            <div id="container_historias">
                {
                    historias.map((card, index) => (
                        <RevelaComProgresso
                            as="div"
                            className="card_historia"
                            key={index}
                            progresso={progresso}
                            atraso={0.06 + index * 0.06}
                        >
                            <div className="zoom_imagem">
                                <img src={card.imagem} alt="imagem card" />
                            </div>
                            <h3>{card.titulo}</h3>
                            <p>{card.subtitulo}</p>
                            <a href="#">LEIA MAIS</a>
                        </RevelaComProgresso>
                    ))
                }
            </div>
        </section>
    )
}
