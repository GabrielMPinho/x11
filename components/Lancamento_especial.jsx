import { Revela } from "../src/lib/Revela";
import BotaoCortado from "./BotaoCortado";

export default function Lancamento_especial(){
    return (
        <section className="lancamento_especial">
            <Revela as="div" id="container_texto" distancia={48}>
                <p className="p_laranja">LANÇAMENTO ESPECIAL</p>
                <h1>VALOR PARA AVENTURA</h1>
                <p>Equipamento de aventura que não abre mão de qualidade,
                design e desempenho. Cada peça é testada para acompanhar
                você onde a estrada terminar.</p>
                <BotaoCortado>EXPLORAR COLEÇÃO ➜</BotaoCortado>
            </Revela>
        </section>
    )
}
