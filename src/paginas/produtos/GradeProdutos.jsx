import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { produtos } from "@/paginas/produtos/dados/produtos";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";

function formatarPreco(valor){
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

// Contador + dropdown (ambos decorativos — sem lógica de ordenação/paginação
// real nesta passada) + grade 3 col × 4 linhas de cards. Cards em FUNDO CLARO
// (`--background_claro`) — único bloco de fundo claro da página, fiel ao PDF
// (packshot precisa de contraste). Mesmo padrão de reveal por card
// (`atrasoCard`/`LARGURA_ENTRADA_CARD`) de Favoritos/Categorias/Território.
// Card inteiro clicável → /equipamento (2026-07-14, pedido do dono — a PDP
// já existia mas nenhum card da PLP navegava até ela ainda; Favoritos, na
// Home, já fazia isso). Mesmo padrão de Favoritos: `as="a"` + `href` real +
// onClick/preventDefault navega via SPA (evita reload de página).
export default function GradeProdutos(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);
    const navegar = useNavigate();

    return (
        <div className="grade_produtos_container" ref={ref}>
            <div className="grade_topo">
                <p className="contador_produtos">12 DE 24 PRODUTOS</p>
                <button type="button" className="dropdown_ordenar">
                    EM DESTAQUE <span className="seta_dropdown">▾</span>
                </button>
            </div>
            <div className="grade_produtos">
                {produtos.map((produto, index) => (
                    <RevelaComProgresso
                        as="a"
                        href="/equipamento"
                        onClick={(evento) => { evento.preventDefault(); navegar("/equipamento"); }}
                        className="card_produto_plp"
                        key={index}
                        progresso={progresso}
                        atraso={atrasoCard(index, produtos.length)}
                        larguraEntrada={LARGURA_ENTRADA_CARD}
                    >
                        <div className="zoom_imagem card_produto_plp_imagem">
                            <img src={produto.imagem} alt={produto.nome} />
                        </div>
                        <p className="card_produto_plp_tag">{produto.tag}</p>
                        <p className="card_produto_plp_nome">{produto.nome}</p>
                        <p className="card_produto_plp_preco">{formatarPreco(produto.preco)}</p>
                        <div className="card_produto_plp_cores">
                            {produto.cores.map((cor, corIndex) => (
                                <span key={corIndex} className="swatch_cor swatch_cor_pequeno" style={{ backgroundColor: cor }} />
                            ))}
                            {produto.maisCores > 0 && <span className="card_produto_plp_mais">+{produto.maisCores}</span>}
                        </div>
                    </RevelaComProgresso>
                ))}
            </div>
        </div>
    )
}
