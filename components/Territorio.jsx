const cards = [
    {imagem: "../src/assets/images/cat-aventura.jpg", subtitulo: "EXPLORE SEM LIMITES", titulo: "AVENTURA"},
    {imagem: "../src/assets/images/cat-sport.jpg", subtitulo: "VELOCIDADE NA PISTA", titulo: "SPORT"},
    {imagem: "../src/assets/images/cat-urbano.jpg", subtitulo: "ESTILO NA CIDADE", titulo: "URBANO"},
    {imagem: "../src/assets/images/colecao-hero.jpg", subtitulo: "SEGURANÇA NA ESTRADA", titulo: "TOURING"}
]


export default function Territorio(){
    return(
        <section className="territorio">
            <div className="titulo">
                <div className="escrito_cat">
                    <p className="p_laranja">SEU TERRITÓRIO</p>
                    <h2>ONDE VOCÊ PILOTA?</h2>
                </div>
                </div>
                <div id="container_cards">
                    {
                        cards.map((card, index) => (
                            <div className="card_territorio" key={index}>
                                <img src={card.imagem} alt="imagem territorio" className="imagem_territorio" />
                                <p className="p_laranja">{card.subtitulo}</p>
                                <h3>{card.titulo}</h3>
                            </div>
                        ))
                    }
                </div>
        </section>
    )
}