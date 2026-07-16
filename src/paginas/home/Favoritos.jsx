import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { favoritos } from "@/paginas/home/dados/favoritos";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";

export default function Favoritos(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);
    const navegar = useNavigate();

    return (
        <section className="favoritos" ref={ref}>
            <RevelaComProgresso as="div" className="titulo" progresso={progresso} distancia={108}>
                <div className="escrito_fav">
                    <p className="p_laranja">SELEÇÃO</p>
                    <h2>FAVORITOS DA COLEÇÃO</h2>
                </div>
            </RevelaComProgresso>
            <div id="imagens">
                {favoritos.map((item, index) => (
                    // Card inteiro clicável (2026-07-13, Home: ligar os
                    // botões) — o próprio card é o link (`as="a"`), não só
                    // o "COMPRAR" (que virou `.cta_comprar`, um <span> — dois
                    // <a> aninhados seria HTML inválido). `href` real (não
                    // "#") + onClick/preventDefault navega via SPA, mesmo
                    // padrão do logo/link "INSTITUCIONAL" no Header.
                    <RevelaComProgresso
                        as="a"
                        href="/equipamento"
                        onClick={(evento) => { evento.preventDefault(); navegar("/equipamento"); }}
                        className="card"
                        key={index}
                        progresso={progresso}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                    >
                        <div className="zoom_imagem">
                            <img src={item.imagem} alt={item.alt} />
                        </div>
                        <p className="nome">{item.nome}</p>
                        <p className="desc">{item.desc}</p>
                        <span className="cta_comprar">COMPRAR</span>
                    </RevelaComProgresso>
                ))}
            </div>
        </section>
    )
}
