import jaqueta from "../src/assets/images/jaqueta_fav.jpg";
import conj1 from "../src/assets/images/conjunto1_fav.jpg";
import conj2 from "../src/assets/images/conjunto2_fav.jpg";

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
                <div className="card">
                    <img src={jaqueta} alt="imagem jaqueta" />
                    <p className="nome">JAQUETA STREET HOODY</p>
                    <p className="desc">Proteção térmica com tecido laminado para enfrentar qualquer clima na estrada</p>
                    <a href="#">COMPRAR ➜</a>
                </div>

                <div className="card">
                    <img src={conj1} alt="imagem conj1" />
                    <p className="nome">CALÇA RIDE FIT 2</p>
                    <p className="desc">Jeans de motociclismo com fibra de alta resistência para o uso diário</p>
                    <a href="#">COMPRAR ➜</a>
                </div>

                <div className="card">
                    <img src={conj2} alt="imagem conj1" />
                    <p className="nome">LUVA NITRO AIR</p>
                    <p className="desc">Couro premium com reforço em carbono para máxima sensibilidade e controle</p>
                    <a href="#">COMPRAR ➜</a>
                </div>
                </div>
        </section>
    )
}





