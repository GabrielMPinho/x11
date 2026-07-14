import { useRef } from "react";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";
import { atrasoCard, LARGURA_ENTRADA_CARD } from "@/padrao/lib/useEstiloRevela";
import { featuresProduto } from "@/paginas/equipamento/dados/produto";
import { iconesEquipamento } from "@/paginas/equipamento/IconesEquipamento";

// Topo em split (kicker+título à esquerda, parágrafo à direita) + 4
// colunas de feature com divisórias — mesmo mecanismo de reveal coreografado
// de QuemSomos1 (Institucional): useProgressoSecao no container,
// RevelaComProgresso por elemento, atrasoCard/LARGURA_ENTRADA_CARD nos
// cards de grade. Classes próprias (feature_pdp_*), não reutiliza os
// seletores de features da Institucional.
export default function EngineeredFeatures() {
  const ref = useRef(null);
  const progresso = useProgressoSecao(ref);

  return (
    <section className="engineered_features_secao" ref={ref}>
      <div className="engineered_features_topo">
        <RevelaComProgresso as="div" className="engineered_features_titulo_bloco" progresso={progresso} distancia={108}>
          <p className="p_laranja">ENGINEERED FEATURES</p>
          <h2>Cada costura tem um propósito.</h2>
        </RevelaComProgresso>
        <RevelaComProgresso as="p" className="engineered_features_paragrafo" progresso={progresso} atraso={0.05} distancia={80}>
          Desenvolvida com pilotos de longa distância em três continentes. Testada em −5°C e em 42°C. A Expedition é a jaqueta que você esquece de tirar.
        </RevelaComProgresso>
      </div>

      <div className="engineered_features_grid">
        {featuresProduto.map((feature, index) => (
          <RevelaComProgresso
            as="div"
            className="feature_pdp_card"
            key={index}
            progresso={progresso}
            atraso={atrasoCard(index, featuresProduto.length)}
            larguraEntrada={LARGURA_ENTRADA_CARD}
          >
            <span className="feature_pdp_icone" aria-hidden="true">{iconesEquipamento[feature.icone]}</span>
            <h3>{feature.titulo}</h3>
            <p>{feature.texto}</p>
          </RevelaComProgresso>
        ))}
      </div>
    </section>
  );
}
