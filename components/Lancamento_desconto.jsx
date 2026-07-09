import imagem from "../src/assets/images/imagem_lancamento.jpg"
import { Revela } from "../src/lib/Revela";
import BotaoCortado from "./BotaoCortado";

export default function Lancamento(){
    return (
        <section className="lancamento_desconto">
            <div id="container_escrito">
                <Revela as="div" id="texto" distancia={48}>
                    <p className="p_laranja">LANÇAMENTO ESPECIAL</p>
                    <h1 id="titulo_principal">CONCORRA AO COMBRO DE PROTEÇÃO NO BIKE FEST</h1>
                    <p className="p_preto">Monte o conjunto perfeito para a próxima aventura: escolha uma jaqueta e uma calça e garanta 20% de desconto no look</p>
                    <BotaoCortado>COMO PARTICIPAR ➜</BotaoCortado>
                </Revela>
            </div>
            <Revela as="div" id="container_imagem" distancia={48}>
                <img id="imagem_lancamento" src={imagem} alt="imagem lancamento" />
            </Revela>
        </section>
    )
}
