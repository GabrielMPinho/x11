import { useRef } from "react";
import imagemDetalhe from "@/padrao/assets/images/institucional-detalhe.jpg";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";

// "Quem Somos #3": split invertido — texto (esquerda) + imagem (direita).
// Mesma grade `.quemsomos_split` de QuemSomos2.jsx; a ordem no JSX (texto
// antes da imagem) já posiciona certo, sem CSS extra.
export default function QuemSomos3(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="quemsomos_split quemsomos3_secao" ref={ref}>
            <div className="quemsomos_split_texto">
                <RevelaComProgresso as="p" className="p_laranja" progresso={progresso} atraso={0}>QUEM SOMOS</RevelaComProgresso>
                <RevelaComProgresso as="h2" progresso={progresso} atraso={0.05}>CADA DETALHE PENSADO PARA A SUA PROTEÇÃO.</RevelaComProgresso>
                <RevelaComProgresso as="p" progresso={progresso} atraso={0.10} distancia={80}>
                    Costuras reforçadas, ferragens metálicas, tecidos abrasion-tough e proteções CE posicionadas com precisão nos pontos de impacto. O resultado é equipamento que cumpre o que promete — na estrada e no laudo técnico.
                </RevelaComProgresso>
            </div>
            <RevelaComProgresso as="div" className="quemsomos_split_imagem zoom_imagem" progresso={progresso} atraso={0.08} distancia={108}>
                <img src={imagemDetalhe} alt="Detalhe de armadura e proteções X11" />
            </RevelaComProgresso>
        </section>
    )
}
