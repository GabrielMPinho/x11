import { territorio } from "../src/data/territorio";

export default function Territorio(){
    return(
        <section className="territorio">
            <div className="titulo">
                <div className="escrito_cat">
                    <p className="p_laranja">SEU TERRITÓRIO</p>
                    <h2>ONDE VOCÊ PILOTA?</h2>
                </div>
            </div>
                <div id="container_cards">
                    {
                        territorio.map((card, index) => (
                            <div className="card_territorio" key={index}>
                                <img src={card.imagem} alt="imagem territorio" className="imagem_territorio" />
                                <p className="p_laranja">{card.subtitulo}</p>
                                <h3>{card.titulo}</h3>
                            </div>
                        ))
                    }
                </div>
        </section>
    )
}
