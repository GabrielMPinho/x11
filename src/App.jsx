import Header from "../components/Header";
import Hero_Home from "../components/Hero_Home";
import Favoritos from "../components/Favoritos";
import Lancamento_desconto from "../components/Lancamento_desconto";
import Categorias from "../components/Categorias";

export default function App(){
    return (
        <>
            <Header />
            <main>
                <Hero_Home />
                <Favoritos />
                <Lancamento_desconto />
                <Categorias />
            </main>
        </>
    )
}