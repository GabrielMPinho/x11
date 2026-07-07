import imagem from "../src/assets/images/imagem_lancamento.jpg"

export default function Lancamento(){
    return (
        <section className="lancamento_desconto">
            <div id="container_escrito">
                <div id="texto">
                    <p className="p_laranja">LANÇAMENTO ESPECIAL</p>
                    <h1 id="titulo_principal">CONCORRA AO COMBRO DE PROTEÇÃO NO BIKE FEST</h1>
                    <p>Monte o conjunto perfeito para a próxima aventura: escolha uma jaqueta e uma calça e garanta 20% de desconto no look</p>
                    <button>COMO PARTICIPAR ➜</button>
                </div>
            </div>
            <div id="container_imagem">
                <img id="imagem_lancamento" src={imagem} alt="imagem lancamento" />
            </div>
            
        </section>
    )
}







