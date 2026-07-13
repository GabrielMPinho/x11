import { useRef } from "react";
import { timeline } from "@/paginas/institucional/dados/timeline";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";

// 4 marcos em grade — sem kicker/título próprio (o material de layout não
// tem cabeçalho pra esta seção, só o grid de anos; não inventar conteúdo
// que não está na fonte).
export default function Timeline(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="timeline_secao" ref={ref}>
            <div className="timeline_grid">
                {timeline.map((marco, index) => (
                    <RevelaComProgresso
                        as="div"
                        className="marco_timeline"
                        key={index}
                        progresso={progresso}
                        atraso={atrasoCard(index, timeline.length)}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                    >
                        <p className="marco_ano">{marco.ano}</p>
                        <p className="marco_titulo">{marco.titulo}</p>
                        <p className="marco_texto">{marco.texto}</p>
                    </RevelaComProgresso>
                ))}
            </div>
        </section>
    )
}
