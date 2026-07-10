import { useRef } from "react";
import imagem from "../src/assets/images/imagem_lancamento.jpg"
import { RevelaComProgresso } from "../src/lib/Revela";
import { useEstiloRevela } from "../src/lib/useEstiloRevela";
import { useProgressoSecao } from "../src/lib/useProgressoSecao";
import BotaoCortado from "./BotaoCortado";

export default function Lancamento(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);
    // BotaoCortado já é um motion.button (hover do preenchimento); recebe o
    // estilo do reveal direto via prop, sem wrapper (preserva o flex de #texto).
    const estiloBotao = useEstiloRevela(progresso, { atraso: 0.15, distancia: 72, saida: 64 });

    return (
        <section className="lancamento_desconto" ref={ref}>
            <div id="container_escrito">
                <div id="texto">
                    <RevelaComProgresso as="p" className="p_laranja" progresso={progresso} distancia={100}>LANÇAMENTO ESPECIAL</RevelaComProgresso>
                    <RevelaComProgresso as="h1" id="titulo_principal" progresso={progresso} atraso={0.05} distancia={108}>CONCORRA AO COMBRO DE PROTEÇÃO NO BIKE FEST</RevelaComProgresso>
                    <RevelaComProgresso as="p" className="p_preto" progresso={progresso} atraso={0.10} distancia={80}>Monte o conjunto perfeito para a próxima aventura: escolha uma jaqueta e uma calça e garanta 20% de desconto no look</RevelaComProgresso>
                    <BotaoCortado style={estiloBotao}>COMO PARTICIPAR ➜</BotaoCortado>
                </div>
            </div>
            <RevelaComProgresso as="div" id="container_imagem" progresso={progresso} atraso={0.08} distancia={108}>
                <img id="imagem_lancamento" src={imagem} alt="imagem lancamento" />
            </RevelaComProgresso>
        </section>
    )
}
