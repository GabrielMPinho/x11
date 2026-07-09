import { favoritos } from "../src/data/favoritos";

export default function Favoritos(){
    return (
        <section className="favoritos">
            <div className="titulo">
                <div className="escrito_fav">
                    <p className="p_laranja">SELEÇÃO</p>
                    <h2>FAVORITOS DA COLEÇÃO</h2>
                </div>
            </div>
            <div id="imagens">
                {favoritos.map((item, index) => (
                    <div className="card" key={index}>
                        <img src={item.imagem} alt={item.alt} />
                        <p className="nome">{item.nome}</p>
                        <p className="desc">{item.desc}</p>
                        <a href="#">COMPRAR ➜</a>
                    </div>
                ))}
            </div>
        </section>
    )
}
