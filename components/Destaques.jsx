import { useRef } from "react";
import { destaques } from "../src/data/destaques";
import { RevelaComProgresso } from "../src/lib/Revela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";

export default function Destaques(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return(
        <section className="destaques" ref={ref}>
            <div id="conteudo_destaques">
                <div id="escrito_destaques">
                    <RevelaComProgresso as="div" id="titulo_destaque" progresso={progresso}>
                        <p className="p_laranja">OS MAIS PROCURADOS</p>
                        <h3>OS MAIS VENDIDOS</h3>
                    </RevelaComProgresso>
                    <div id="setas_destaques">
                        <p className="seta">←</p>
                        <p className="seta">→</p>
                    </div>
                </div>
                <div id="produtos_destaques">
                    {
                        destaques.map((produto, index) => (
                            <RevelaComProgresso
                                as="div"
                                className="card_produto"
                                key={index}
                                progresso={progresso}
                                atraso={0.06 + index * 0.05}
                            >
                                <div className="zoom_imagem">
                                    <img src={produto.imagem} alt="imagem produto destaque" className="imagem_produto_destaque"/>
                                </div>
                                <p className="titulo_produto_destaque">{produto.titulo}</p>
                                <p className="preco_produto_destaque">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                            </RevelaComProgresso>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
