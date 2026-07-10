import { useRef } from "react";
import { territorio } from "@/paginas/home/dados/territorio";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";

export default function Territorio(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return(
        <section className="territorio" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso} distancia={108}>
                <div className="escrito_cat">
                    <p className="p_laranja">SEU TERRITÓRIO</p>
                    <h2>ONDE VOCÊ PILOTA?</h2>
                </div>
            </RevelaComProgresso>
            <div id="container_cards">
                {
                    territorio.map((card, index) => (
                        <RevelaComProgresso
                            as="div"
                            className="card_territorio"
                            key={index}
                            progresso={progresso}
                            atraso={atrasoCard(index, territorio.length)}
                            larguraEntrada={LARGURA_ENTRADA_CARD}
                        >
                            <div className="zoom_imagem">
                                <img src={card.imagem} alt="imagem territorio" className="imagem_territorio" />
                            </div>
                            <p className="p_laranja">{card.subtitulo}</p>
                            <h3>{card.titulo}</h3>
                        </RevelaComProgresso>
                    ))
                }
            </div>
        </section>
    )
}
