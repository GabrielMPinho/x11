import { motion } from "motion/react";
import { transicaoHover } from "../src/lib/motion";

// Botão com corte diagonal (clip-path) da marca. Reaproveitado no Hero,
// Lançamento desconto e Lançamento especial: no hover, uma camada de cor
// cresce por trás do texto (scaleX, respeitando o corte diagonal do pai
// via clip-path). Renderiza um <button> real, então os seletores CSS
// existentes por id/descendente (#botao_masculino, #texto button,
// #container_texto button) continuam funcionando sem mudança.
// `style` (opcional) recebe opacity/y de um reveal ligado ao scroll (ver
// useEstiloRevela em src/lib/Revela.jsx) — assim o botão vira sua própria
// unidade de reveal sem precisar de um wrapper div extra que mudaria o
// layout do flex/grid ao redor.
export default function BotaoCortado({ id, className, style, children }) {
    return (
        <motion.button
            id={id}
            className={["botao_cortado", className].filter(Boolean).join(" ")}
            style={style}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
        >
            <motion.span
                className="preenchimento_botao"
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={transicaoHover}
            />
            <span className="texto_botao">{children}</span>
        </motion.button>
    );
}
