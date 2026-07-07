const categorias = [
  { nome: "Luvas Masculinas", link: "/categoria/luvas-masculinas" },
  { nome: "Jaquetas Masculinas", link: "/categoria/jaquetas-masculinas" },
  { nome: "Calças de Couro", link: "/categoria/calcas-couro" },
  { nome: "Jeans Femininos", link: "/categoria/jeans-femininos" },
  { nome: "Botas de Pilotagem", link: "/categoria/botas-pilotagem" },
  { nome: "Capacetes", link: "/categoria/capacetes" },
  { nome: "Acessórios", link: "/categoria/acessorios" },
  { nome: "Segunda Pele", link: "/categoria/segunda-pele" },
  { nome: "Balaclava", link: "/categoria/balaclava" },
  { nome: "Equipamentos para o Verão", link: "/categoria/verao" },
  { nome: "Equipamentos 4 Estações", link: "/categoria/4-estacoes" },
  { nome: "Calças Femininas", link: "/categoria/calcas-femininas" },
];

export default function Categorias(){
    return (
        <section className="categorias">
            <div className="titulo">
                <div className="escrito_cat">
                    <p className="p_laranja">NAVEGUE</p>
                    <h2>CATEGORIAS POPULARES</h2>
                </div>
            </div>
            <div id="conteiner_categorias">
              {categorias.map((cat, index) => (
                <a href={cat.link} className="card_categoria" key={index}>
                <span className="icone_seta">↗</span>
                <p>{cat.nome}</p>
                </a>
            ))}
            </div>
        </section>
    )
}