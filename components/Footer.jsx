import logo from "../src/assets/images/logo.png";
import { colunasFooter } from "../src/data/footer";
import { Revela } from "../src/lib/Revela";

export default function Footer(){
    return(
        <footer className="footer">
            <Revela as="div" id="conteudo_footer" distancia={100}>
                {colunasFooter.map((coluna, index) => (
                    <div className="coluna_footer" key={index}>
                        <p className="p_laranja">{coluna.titulo}</p>
                        {coluna.links.map((link, i) => (
                            <a href="#" key={i}>{link}</a>
                        ))}
                    </div>
                ))}
            </Revela>
            <Revela as="div" id="rodape_footer" distancia={64}>
                <p>Copyright © 2026 X11. Todos os direitos reservados.</p>
                <div id="logo_footer">
                    <img src={logo} alt="logo X11" />
                </div>
            </Revela>
            <div id="fim_footer"></div>
        </footer>
    )
}
