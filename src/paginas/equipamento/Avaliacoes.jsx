import { useRef } from "react";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";
import { avaliacoes } from "@/paginas/equipamento/dados/produto";
import { iconesEquipamento } from "@/paginas/equipamento/IconesEquipamento";

const TOTAL_ESTRELAS = 5;

// "23 RESPOSTAS" — 3 cards de review (estrelas + texto + linha divisória +
// nome + localização), mesmo padrão de reveal por card das outras grades.
export default function Avaliacoes() {
  const ref = useRef(null);
  const progresso = useProgressoSecao(ref);

  return (
    <section className="avaliacoes_secao" ref={ref}>
      <RevelaComProgresso as="div" className="avaliacoes_titulo_bloco" progresso={progresso} distancia={108}>
        <p className="p_laranja">COLEÇÃO LAB CRAFTED</p>
        <h2>23 RESPOSTAS</h2>
      </RevelaComProgresso>

      <div className="avaliacoes_grid">
        {avaliacoes.map((avaliacao, index) => (
          <RevelaComProgresso
            as="div"
            className="card_avaliacao"
            key={index}
            progresso={progresso}
            atraso={atrasoCard(index, avaliacoes.length)}
            larguraEntrada={LARGURA_ENTRADA_CARD}
          >
            <span className="avaliacao_estrelas" aria-hidden="true">
              {Array.from({ length: TOTAL_ESTRELAS }).map((_, estrelaIndex) => (
                <span className="produto_estrela" key={estrelaIndex}>{iconesEquipamento.estrela}</span>
              ))}
            </span>
            <p className="avaliacao_texto">{avaliacao.texto}</p>
            <p className="avaliacao_nome">{avaliacao.nome}</p>
            <p className="avaliacao_local">{avaliacao.local}</p>
          </RevelaComProgresso>
        ))}
      </div>
    </section>
  );
}
