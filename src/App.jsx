import { MotionConfig } from "motion/react";
import Header from "../components/Header";

import Hero_Home from "../components/Hero_Home";
import Favoritos from "../components/Favoritos";
import Lancamento_desconto from "../components/Lancamento_desconto";
import Categorias from "../components/Categorias";
import Lancamento_especial from "../components/Lancamento_especial";
import Territorio from "../components/Territorio";
import Destaques from "../components/Destaques";
import Historias from "../components/Historias";
import Banner from "../components/Banner";

import Footer from "../components/Footer";

export default function App(){
    return (
        // reducedMotion="user" respeita o prefers-reduced-motion do SO para
        // todo componente motion da árvore (reveal, hover, header, parallax)
        // sem precisar repetir a checagem em cada componente.
        <MotionConfig reducedMotion="user">
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
                <Banner />
            </main>
            <Footer />
        </MotionConfig>
    )
}