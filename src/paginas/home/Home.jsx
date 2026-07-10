import Hero_Home from "./Hero_Home";
import Favoritos from "./Favoritos";
import Lancamento_desconto from "./Lancamento_desconto";
import Categorias from "./Categorias";
import Lancamento_especial from "./Lancamento_especial";
import Territorio from "./Territorio";
import Destaques from "./Destaques";
import Historias from "./Historias";
import Banner from "./Banner";

// Página Home (a landing atual). As seções são componentes desta pasta;
// tudo que é comum a todas as páginas (Header, Footer, tokens, lib, etc.)
// vive em src/padrao/. O <main> é o mesmo de antes — Header/Footer ficam no
// shell (src/App.jsx), então o DOM final é idêntico ao anterior.
export default function Home(){
    return (
        <main>
            <Hero_Home />
            <Favoritos />
            <Lancamento_desconto />
            <Categorias />
            <Lancamento_especial />
            <Territorio />
            <Destaques />
            <Historias />
            <Banner />
        </main>
    )
}
