import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categorias } from "@/paginas/home/dados/categorias";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";

// Destino por gênero (2026-07-13, Home: ligar os botões) — ainda não há
// páginas de categoria de verdade, então masculino/neutro caem em /homem e
// feminino em /mulher (pedido explícito do dono).
const DESTINO_POR_GENERO = { masculino: "/homem", feminino: "/mulher", neutro: "/homem" };

export default function Categorias(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);
    const navegar = useNavigate();

    return (
        <section className="categorias" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso} distancia={108}>
                <div className="escrito_cat">
                    <p className="p_laranja">NAVEGUE</p>
                    <h2>CATEGORIAS POPULARES</h2>
                </div>
            </RevelaComProgresso>
            <div id="conteiner_categorias">
              {categorias.map((cat, index) => {
                const destino = DESTINO_POR_GENERO[cat.genero];
                return (
                    <RevelaComProgresso
                        as="a"
                        href={destino}
                        onClick={(evento) => { evento.preventDefault(); navegar(destino); }}
                        className="card_categoria"
                        key={index}
                        progresso={progresso}
                        atraso={atrasoCard(index, categorias.length)}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                        distancia={72}
                    >
                        <span className="icone_seta">↗</span>
                        <p>{cat.nome}</p>
                    </RevelaComProgresso>
                );
              })}
            </div>
        </section>
    )
}
