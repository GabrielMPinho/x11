import { useRef } from "react";
import { valores } from "@/paginas/institucional/dados/valores";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";

// Kicker+título centralizados (padrão de Categorias/Território da Home) + 3
// colunas numeradas (01/02/03).
export default function Valores(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="valores_secao" ref={ref}>
            <RevelaComProgresso as="div" className="valores_cabecalho" progresso={progresso} distancia={108}>
                <p className="p_laranja">NOSSOS VALORES</p>
                <h2>NO QUE ACREDITAMOS</h2>
            </RevelaComProgresso>
            <div className="valores_grid">
                {valores.map((valor, index) => (
                    <RevelaComProgresso
                        as="div"
                        className="valor_card"
                        key={index}
                        progresso={progresso}
                        atraso={atrasoCard(index, valores.length)}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                    >
                        <p className="valor_numero">{valor.numero}</p>
                        <h3>{valor.titulo}</h3>
                        <p className="valor_texto">{valor.texto}</p>
                    </RevelaComProgresso>
                ))}
            </div>
        </section>
    )
}
