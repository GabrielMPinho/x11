import { useState } from "react";
import { tamanhos, estacoes, cores, especificacoes } from "@/paginas/produtos/dados/filtros";

// 5 blocos de filtro, todos DECORATIVOS (só hover, sem lógica de filtro real
// — padrão do projeto nesta passada). No mobile (≤768px) vira um bloco
// colapsável no topo, aberto/fechado pelo botão "FILTROS"; em telas maiores o
// botão fica oculto via CSS e o conteúdo é sempre visível (o estado `aberto`
// só importa abaixo desse breakpoint).
export default function SidebarFiltros(){
    const [aberto, setAberto] = useState(false);

    return (
        <aside className="sidebar_filtros">
            <button
                type="button"
                className="botao_filtros_mobile"
                onClick={() => setAberto((atual) => !atual)}
                aria-expanded={aberto}
                aria-controls="conteudo_filtros"
            >
                FILTROS <span className={`seta_filtros${aberto ? " seta_filtros_aberta" : ""}`}>▾</span>
            </button>

            <div id="conteudo_filtros" className={`sidebar_filtros_conteudo${aberto ? " sidebar_filtros_aberta" : ""}`}>
                <div className="filtro_bloco">
                    <p className="p_laranja">TAMANHOS</p>
                    <div className="filtro_tamanhos_grid">
                        {tamanhos.map((tamanho, index) => (
                            <button type="button" className="botao_tamanho" key={index}>{tamanho}</button>
                        ))}
                    </div>
                </div>

                <div className="filtro_bloco">
                    <p className="p_laranja">PREÇOS</p>
                    <div className="filtro_preco_trilho">
                        <div className="filtro_preco_preenchido">
                            <span className="filtro_preco_alca" />
                        </div>
                    </div>
                    <div className="filtro_preco_labels">
                        <span>R$ 200</span>
                        <span>R$ 2.200</span>
                    </div>
                </div>

                <div className="filtro_bloco">
                    <p className="p_laranja">ESTAÇÃO</p>
                    <div className="filtro_checkbox_lista">
                        {estacoes.map((estacao, index) => (
                            <label className="filtro_checkbox_item" key={index}>
                                <span className="checkbox_decorativo" />
                                {estacao}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="filtro_bloco">
                    <p className="p_laranja">COR</p>
                    <div className="filtro_cores_swatches">
                        {cores.map((cor, index) => (
                            <span
                                key={index}
                                className="swatch_cor"
                                style={{ backgroundColor: cor.hex }}
                                title={cor.nome}
                            />
                        ))}
                    </div>
                </div>

                <div className="filtro_bloco">
                    <p className="p_laranja">ESPECIFICAÇÕES</p>
                    <div className="filtro_checkbox_lista">
                        {especificacoes.map((especificacao, index) => (
                            <label className="filtro_checkbox_item" key={index}>
                                <span className="checkbox_decorativo" />
                                {especificacao}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
}
