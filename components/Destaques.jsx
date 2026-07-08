const produtos = [
    {imagem: "../src/assets/images/placeholder-acessorio.svg", titulo: "CAPACETE REVO JAGUAR", preco: 599.00},
    {imagem: "../src/assets/images/placeholder-acessorio.svg", titulo: "JAQUETA EXPEDITION", preco: 599.00},
    {imagem: "../src/assets/images/placeholder-acessorio.svg", titulo: "BOTA TOURMARK", preco: 599.00},
    {imagem: "../src/assets/images/placeholder-acessorio.svg", titulo: "CALÇA RIDE FIT 2", preco: 599.00},
    {imagem: "../src/assets/images/placeholder-acessorio.svg", titulo: "LUVA HAVOC", preco: 599.00},
]

export default function Destaques(){
    return(
        <section className="destaques">
            <div id="conteudo_destaques">
                <div id="escrito_destaques">
                    <div id="titulo_destaque">
                        <p className="p_laranja">OS MAIS PROCURADOS</p>
                        <h3>OS MAIS VENDIDOS</h3>
                    </div>
                    <div id="setas_destaques">
                        <p className="seta">←</p> 
                        <p className="seta">→</p>
                    </div>
                </div>
                <div id="produtos_destaques">
                    {
                        produtos.map((produto, index) => (
                            <div className="card_produto" key={index}> 
                                <img src={produto.imagem} alt="imagem produto destaque" className="imagem_produto_destaque"/>
                                <p className="titulo_produto_destaque">{produto.titulo}</p>
                                <p className="preco_produto_destaque">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}