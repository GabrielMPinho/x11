import { historias } from "../src/data/historias";

export default function Historias(){
    return(
        <section className="historias">
            <div className="titulo">
                <div className="escrito_cat">
                    <p className="p_laranja">DIÁRIO DE BORDO</p>
                    <h2>HISTÓRIAS</h2>
                </div>
            </div>
            <div id="container_historias">
                {
                    historias.map((card, index) => (
                        <div className="card_historia" key={index}>
                            <img src={card.imagem} alt="imagem card"/>
                            <h3>{card.titulo}</h3>
                            <p>{card.subtitulo}</p>
                            <a href="#">LEIA MAIS</a>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
