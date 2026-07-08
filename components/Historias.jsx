const cards = [
    {imagem: "../src/assets/images/story1.jpg", titulo: "O COMEÇO DA JORNADA", subtitulo: "Como uma garagem pequena virou referência em equipamento de pilotagem feito com paixão"},
    {imagem: "../src/assets/images/story2.jpg", titulo: "PAI E FILHO: A VIAGEM DE UMA ", subtitulo: "Dois mil quilômetros, uma estrada e a memória que ficou marcada para sempre."},
    {imagem: "../src/assets/images/story3.jpg", titulo: "CONHEÇA QUEM PILOTA COM A X11", subtitulo: "Histórias de pilotos que transformaram o asfalto em um modo de viver"}
]

export default function Historias(){
    return(
        <section className="historias">
            <div className="titulo">
                <div className="escrito_cat">
                    <p className="p_laranja">DIÁRIO DE BORDO</p>
                    <h2>HISTÓRIAS</h2>
                </div>
            </div>
            <div id="container_historias">
                {
                    cards.map((card, index) => (
                        <div className="card_historia" key={index}>
                            <img src={card.imagem} alt="imagem card"/>
                            <h3>{card.titulo}</h3>
                            <p>{card.subtitulo}</p>
                            <a href="#">LEIA MAIS</a>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}