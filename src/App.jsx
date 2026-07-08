import Header from "../components/Header";

import Hero_Home from "../components/Hero_Home";
import Favoritos from "../components/Favoritos";
import Lancamento_desconto from "../components/Lancamento_desconto";
import Categorias from "../components/Categorias";
import Lancamento_especial from "../components/Lancamento_especial";
import Territorio from "../components/Territorio";
import Destaques from "../components/Destaques";
import Historias from "../components/Historias";

export default function App(){
    return (
        <>
            <Header />
            <main>
                <Hero_Home />
                <Favoritos />
                <Lancamento_desconto />
                <Categorias />
                <Lancamento_especial />
                <Territorio />
                <Destaques />
                <Historias />
            </main>
        </>
    )
}