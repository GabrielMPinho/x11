import { useRef } from "react";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";
import { paragrafosQuemSomos } from "@/paginas/institucional/dados/textosQuemSomos";
import { features } from "@/paginas/institucional/dados/features";
import { iconesFeatures } from "@/paginas/institucional/IconesFeatures";

// "Quem Somos #1": título+texto no topo (split 2 colunas) + 4 features em
// grade abaixo — mesmo mecanismo de reveal coreografado do
// Lancamento_desconto (useProgressoSecao no container, RevelaComProgresso
// por elemento) + o padrão de card de grade (atrasoCard/LARGURA_ENTRADA_CARD)
// usado por Favoritos/Categorias/Territorio.
export default function QuemSomos1(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="quemsomos1_secao" ref={ref}>
            <div className="quemsomos1_topo">
                <RevelaComProgresso as="div" className="quemsomos1_titulo_bloco" progresso={progresso} distancia={108}>
                    <p className="p_laranja">QUEM SOMOS</p>
                    <h2>EQUIPAMENTOS DE ALTA PERFORMANCE PARA MOTOCICLISTAS.</h2>
                </RevelaComProgresso>
                <div className="quemsomos1_texto">
                    {paragrafosQuemSomos.map((paragrafo, index) => (
                        <RevelaComProgresso as="p" key={index} progresso={progresso} atraso={0.05 + index * 0.04} distancia={80}>
                            {paragrafo}
                        </RevelaComProgresso>
                    ))}
                </div>
            </div>
            <div className="quemsomos1_features">
                {features.map((feature, index) => (
                    <RevelaComProgresso
                        as="div"
                        className="feature_card"
                        key={index}
                        progresso={progresso}
                        atraso={atrasoCard(index, features.length)}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                    >
                        <span className="feature_icone" aria-hidden="true">{iconesFeatures[feature.icone]}</span>
                        <h3>{feature.titulo}</h3>
                        <p>{feature.texto}</p>
                    </RevelaComProgresso>
                ))}
            </div>
        </section>
    )
}
