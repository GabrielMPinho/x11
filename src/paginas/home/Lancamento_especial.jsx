import { useRef } from "react";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useEstiloRevela } from "@/padrao/lib/useEstiloRevela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import BotaoCortado from "@/padrao/componentes/BotaoCortado";

export default function Lancamento_especial(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);
    const estiloBotao = useEstiloRevela(progresso, { atraso: 0.15, distancia: 72, saida: 64 });

    return (
        <section className="lancamento_especial" ref={ref}>
            <div id="container_texto">
                <RevelaComProgresso as="p" className="p_laranja" progresso={progresso} distancia={100}>LANÇAMENTO ESPECIAL</RevelaComProgresso>
                <RevelaComProgresso as="h1" progresso={progresso} atraso={0.05} distancia={108}>VALOR PARA AVENTURA</RevelaComProgresso>
                <RevelaComProgresso as="p" progresso={progresso} atraso={0.10} distancia={80}>Equipamento de aventura que não abre mão de qualidade,
                design e desempenho. Cada peça é testada para acompanhar
                você onde a estrada terminar.</RevelaComProgresso>
                <BotaoCortado style={estiloBotao}>EXPLORAR COLEÇÃO ➜</BotaoCortado>
            </div>
        </section>
    )
}
