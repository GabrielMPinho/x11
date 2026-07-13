import Produtos from "@/paginas/produtos/Produtos";

// Página "Homem" — PLP (listagem de produtos) compartilhada com Mulher.jsx
// via <Produtos/>; só o `genero` muda (breadcrumb). Ver src/paginas/produtos/.
export default function Homem(){
    return <Produtos genero="Homem" />
}
