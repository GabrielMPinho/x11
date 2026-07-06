import logo from "../src/assets/images/logo.png";

export default function Header(){
    return(
        <header>
            <img src={logo} alt="logo laranja"/>
            <nav>
                <a href="">HOMEM</a>
                <a href="">MULHER</a>
                <a href="">GUIA DE EQUIPAMENTO</a>
                <a href="">ONDE ENCONTRAR</a>
                <a href="">INSTITUCIONAL</a>
            </nav>
        </header>
    )
}