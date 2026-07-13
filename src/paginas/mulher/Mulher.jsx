import Produtos from "@/paginas/produtos/Produtos";

// Página "Mulher" — PLP (listagem de produtos) compartilhada com Homem.jsx
// via <Produtos/>; só o `genero` muda (breadcrumb). Ver src/paginas/produtos/.
export default function Mulher(){
    return <Produtos genero="Mulher" />
}
