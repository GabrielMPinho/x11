import { useRef } from "react";
import { favoritos } from "../src/data/favoritos";
import { RevelaComProgresso } from "../src/lib/Revela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "../src/lib/useEstiloRevela";

export default function Favoritos(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="favoritos" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso} distancia={108}>
                <div className="escrito_fav">
                    <p className="p_laranja">SELEÇÃO</p>
                    <h2>FAVORITOS DA COLEÇÃO</h2>
                </div>
            </RevelaComProgresso>
            <div id="imagens">
                {favoritos.map((item, index) => (
                    <RevelaComProgresso
                        as="div"
                        className="card"
                        key={index}
                        progresso={progresso}
                        atraso={atrasoCard(index, favoritos.length)}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                    >
                        <div className="zoom_imagem">
                            <img src={item.imagem} alt={item.alt} />
                        </div>
                        <p className="nome">{item.nome}</p>
                        <p className="desc">{item.desc}</p>
                        <a href="#">COMPRAR ➜</a>
                    </RevelaComProgresso>
                ))}
            </div>
        </section>
    )
}
