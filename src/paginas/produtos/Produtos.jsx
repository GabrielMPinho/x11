import HeroColecao from "@/paginas/produtos/HeroColecao";
import BarraCategorias from "@/paginas/produtos/BarraCategorias";
import SidebarFiltros from "@/paginas/produtos/SidebarFiltros";
import GradeProdutos from "@/paginas/produtos/GradeProdutos";
import BlocoEditorial from "@/paginas/produtos/BlocoEditorial";

// PLP (página de listagem de produtos) — reutilizada por Homem.jsx e
// Mulher.jsx via prop `genero` ("Homem"/"Mulher"), única diferença entre as
// duas rotas nesta passada (só muda o breadcrumb "{genero} / JAQUETAS" em
// BarraCategorias). Header/Footer vêm do shell (App.jsx) — não recriados
// aqui.
export default function Produtos({ genero }){
    return (
        <main className="produtos_plp">
            <HeroColecao />
            <BarraCategorias genero={genero} />
            <div className="produtos_corpo">
                <SidebarFiltros />
                <GradeProdutos />
            </div>
            <BlocoEditorial />
        </main>
    )
}
