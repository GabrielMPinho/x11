import { useRef } from "react";
import imagemQuemSomos from "@/padrao/assets/images/jaqueta_fav.jpg";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { paragrafosQuemSomos } from "@/paginas/institucional/dados/textosQuemSomos";

// "Quem Somos #2": split imagem (esquerda) + kicker/título/texto (direita).
// Layout compartilhado com QuemSomos3.jsx via `.quemsomos_split` (mesma
// grade 2 colunas) — a inversão de lado vem só da ORDEM no JSX (imagem
// primeiro aqui, texto primeiro lá), sem precisar de `order` no CSS.
export default function QuemSomos2(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="quemsomos_split quemsomos2_secao" ref={ref}>
            <RevelaComProgresso as="div" className="quemsomos_split_imagem zoom_imagem" progresso={progresso} distancia={108}>
                <img src={imagemQuemSomos} alt="Detalhe de jaqueta X11" />
            </RevelaComProgresso>
            <div className="quemsomos_split_texto">
                <RevelaComProgresso as="p" className="p_laranja" progresso={progresso} atraso={0}>QUEM SOMOS</RevelaComProgresso>
                <RevelaComProgresso as="h2" progresso={progresso} atraso={0.05}>FEITA POR MOTOCICLISTAS PARA MOTOCICLISTAS.</RevelaComProgresso>
                {paragrafosQuemSomos.map((paragrafo, index) => (
                    <RevelaComProgresso as="p" key={index} progresso={progresso} atraso={0.10 + index * 0.04} distancia={80}>
                        {paragrafo}
                    </RevelaComProgresso>
                ))}
            </div>
        </section>
    )
}
