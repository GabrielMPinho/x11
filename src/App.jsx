import Header from "../components/Header";
import Hero_Home from "../components/Hero_Home";
import Favoritos from "../components/Favoritos";
import Lancamento from "../components/Lancamento";

export default function App(){
    return (
        <>
            <Header />
            <main>
                <Hero_Home />
                <Favoritos />
                <Lancamento />
            </main>
        </>
    )
}