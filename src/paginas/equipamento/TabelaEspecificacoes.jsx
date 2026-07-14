import { useRef } from "react";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { especificacoesTabela } from "@/paginas/equipamento/dados/produto";

// Split: kicker + "DIFERENCIAIS"/"ESSENCIAIS" empilhados + parágrafo curto
// (esquerda) · tabela label/valor com linha divisória (direita). Valores
// são placeholder (ver dados/produto.js) — dono fornece os reais depois.
export default function TabelaEspecificacoes() {
  const ref = useRef(null);
  const progresso = useProgressoSecao(ref);

  return (
    <section className="especificacoes_secao" ref={ref}>
      <RevelaComProgresso as="div" className="especificacoes_texto" progresso={progresso} distancia={100}>
        <p className="p_laranja">COLEÇÃO LAB CRAFTED</p>
        <h2>DIFERENCIAIS</h2>
        <h2>ESSENCIAIS</h2>
        <p className="especificacoes_paragrafo">
          Construção pensada peça a peça — cada camada resolve um problema real de quem roda longe de casa.
        </p>
      </RevelaComProgresso>

      <RevelaComProgresso as="div" className="tabela_especificacoes" progresso={progresso} atraso={0.05} distancia={80}>
        {especificacoesTabela.map((linha, index) => (
          <div className="linha_especificacao" key={index}>
            <span className="label_especificacao">{linha.label}</span>
            <span className="valor_especificacao">{linha.valor}</span>
          </div>
        ))}
      </RevelaComProgresso>
    </section>
  );
}
