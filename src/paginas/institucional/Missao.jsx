import { useRef } from "react";
import { RevelaComProgresso } from "@/padrao/lib/Revela";
import { useProgressoSecao } from "@/padrao/lib/useProgressoSecao";

// Faixa-citação, "no espírito do Banner" da Home (frase grande centralizada,
// bordas superior/inferior), mas com o reveal padrão da página (não o
// blur-por-palavra específico do Banner). Foto de grupo de motociclistas
// (`institucional-quemsomos.jpg`, correção 2026-07-13 — comparação com o PDF)
// como fundo, mesma técnica de camadas do Hero (`.missao_bg` atrás +
// `::after` em overlay escuro) — imagem referenciada em CSS (`base.css`),
// como o `.hero_institucional_bg`, não via import aqui. Classes próprias
// (não reutiliza os seletores do Hero). `.missao_conteudo` fica por cima do
// overlay (z-index:1) — sem parallax, só a estrutura em camadas.
export default function Missao(){
    const ref = useRef(null);
    const progresso = useProgressoSecao(ref);

    return (
        <section className="missao_secao" ref={ref}>
            <div className="missao_bg" />
            <div className="missao_conteudo">
                <RevelaComProgresso as="p" className="p_laranja" progresso={progresso} distancia={80}>MISSÃO</RevelaComProgresso>
                <RevelaComProgresso as="h1" className="missao_frase" progresso={progresso} atraso={0.05} distancia={100}>
                    "Ir além em segurança.<br />Cada um em seu estilo."
                </RevelaComProgresso>
                <RevelaComProgresso as="p" className="missao_assinatura" progresso={progresso} atraso={0.10} distancia={72}>
                    X11 - EXPERT RIDERS
                </RevelaComProgresso>
            </div>
        </section>
    )
}
