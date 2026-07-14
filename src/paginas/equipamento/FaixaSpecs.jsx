import { Revela } from "@/padrao/lib/Revela";
import { specsFaixa } from "@/paginas/equipamento/dados/produto";

// Faixa de 4 números com divisórias verticais — reveal em BLOCO (`Revela`,
// não por card individual: são só 4 números curtos, não uma grade de
// cards).
export default function FaixaSpecs() {
  return (
    <Revela as="section" className="faixa_specs_secao" distancia={100}>
      {specsFaixa.map((spec, index) => (
        <div className="spec_item" key={index}>
          <p className="spec_numero">{spec.numero}</p>
          <p className="spec_label">{spec.label}</p>
        </div>
      ))}
    </Revela>
  );
}
