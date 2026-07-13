import { categorias } from "@/paginas/produtos/dados/filtros";

// Breadcrumb (esquerda, varia por `genero` — só isso muda entre Homem/Mulher)
// + abas de categoria (direita, decorativas — só hover, sem lógica de filtro
// real nesta passada, padrão do projeto).
export default function BarraCategorias({ genero }){
    return (
        <div className="barra_categorias">
            <p className="breadcrumb_produtos">{genero} / JAQUETAS</p>
            <div className="abas_categorias">
                {categorias.map((categoria, index) => (
                    <button
                        type="button"
                        key={index}
                        className={`aba_categoria${categoria.ativo ? " aba_categoria_ativa" : ""}`}
                    >
                        {categoria.nome}
                    </button>
                ))}
            </div>
        </div>
    )
}
