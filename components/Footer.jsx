import logo from "../src/assets/images/logo.png";
import { colunasFooter } from "../src/data/footer";

export default function Footer(){
    return(
        <footer className="footer">
            <div id="conteudo_footer">
                {colunasFooter.map((coluna, index) => (
                    <div className="coluna_footer" key={index}>
                        <p className="p_laranja">{coluna.titulo}</p>
                        {coluna.links.map((link, i) => (
                            <a href="#" key={i}>{link}</a>
                        ))}
                    </div>
                ))}
            </div>
            <div id="rodape_footer">
                <p>Copyright © 2026 X11. Todos os direitos reservados.</p>
                <div id="logo_footer">
                    <img src={logo} alt="logo X11" />
                </div>
            </div>
            <div id="fim_footer"></div>
        </footer>
    )
}
