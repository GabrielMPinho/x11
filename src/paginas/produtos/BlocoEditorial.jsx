import { Revela } from "@/padrao/lib/Revela";
import BotaoCortado from "@/padrao/componentes/BotaoCortado";

// Card escuro "editorial" — texto (kicker+título+parágrafo) à esquerda,
// botão à direita (desktop; empilha no mobile). Texto do corpo é lorem ipsum
// no PDF original (placeholder de layout, não conteúdo de marca) — trocado
// por um lorem ipsum limpo em vez de replicar o ruído de OCR do PDF.
// `Revela` gerencia seu próprio ref internamente (useScroll) — não passar
// `ref` de fora (sobrescreveria o mecanismo dele).
export default function BlocoEditorial(){
    return (
        <section className="bloco_editorial_secao">
            <Revela as="div" className="bloco_editorial" distancia={100}>
                <div className="bloco_editorial_texto_grupo">
                    <p className="p_laranja">COLEÇÃO LAB CRAFTED</p>
                    <h2>Como escolher sua jaqueta?</h2>
                    <p className="bloco_editorial_texto">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.
                    </p>
                </div>
                <BotaoCortado>EM DESTAQUE</BotaoCortado>
            </Revela>
        </section>
    )
}
