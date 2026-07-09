import logo from "../src/assets/images/logo.png";
import { navegacao } from "../src/data/navegacao";

export default function Header(){
    return(
        <header>
            <img src={logo} alt="logo laranja"/>
            <nav>
                {navegacao.map((item, index) => (
                    <a href={item.link} key={index}>{item.nome}</a>
                ))}
            </nav>
        </header>
    )
}
