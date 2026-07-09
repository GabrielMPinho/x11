import { useRef } from "react";
import { favoritos } from "../src/data/favoritos";
import { RevelaComProgresso } from "../src/lib/Revela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";

export default function Favoritos(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="favoritos" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso}>
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
                        atraso={0.06 + index * 0.05}
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
