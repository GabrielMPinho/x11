import { motion } from "motion/react";
import { destaquesMacro } from "@/paginas/equipamento/dados/produto";
import { useCarrosselComSetas } from "@/paginas/equipamento/useCarrosselComSetas";

// "SINTA COM OS OLHOS / DESTAQUES" — carrossel horizontal com setas
// FUNCIONAIS (decisão do Opus, backlog produto.md), sempre disponíveis, +
// arraste SÓ no toque/tablet (fix 2026-07-14, pedido do dono: no desktop o
// trilho anda só pelas setas, sem drag de mouse — `arrastavel` vem do
// hook). `data-lenis-prevent-touch` (não `-prevent` puro, fix 2026-07-14):
// bloqueia o Lenis só no TOQUE, pra não brigar com o drag horizontal do
// mobile — no desktop a roda do mouse volta a rolar a página normalmente
// por cima do carrossel. `user-select`/`-webkit-user-drag:none` seguem
// sempre ativos (inertes/inofensivos no desktop) — mesmo cuidado de gesto
// do fix de arraste mobile da Home, ver CHANGELOG. NÃO é o modo `hijack`
// (scroll-linked, complexo) — aqui o trilho só se move por seta/drag.
//
// Setas nos 2 EXTREMOS do carrossel (fix 2026-07-14, pedido do dono — antes
// ficavam juntas no cabeçalho, centralizadas): `.destaques_pdp_carrossel_wrap`
// vira o contexto de posicionamento (`position:relative`); cada seta é
// absoluta, uma em `left`, outra em `right`, dentro do próprio respiro
// (`margin:0 6vw`) do `.trilho_destaques_pdp_container` — não `passam` do
// início/fim do carrossel, ficam contidas na mesma faixa de 6vw, sem
// sobrepor os cards.
export default function CarrosselDetalhes() {
  const { containerRef, trilhoRef, x, arrastavel, dragConstraints, avancar, voltar } = useCarrosselComSetas();

  return (
    <section className="destaques_pdp_secao">
      <div className="destaques_pdp_cabecalho">
        <p className="p_laranja">SINTA COM OS OLHOS</p>
        <h2>DESTAQUES</h2>
      </div>

      <div className="destaques_pdp_carrossel_wrap">
        <button
          type="button"
          className="seta_carrossel_pdp seta_carrossel_pdp_esquerda"
          onClick={voltar}
          aria-label="Ver detalhe anterior"
        >
          ←
        </button>

        <div className="trilho_destaques_pdp_container" ref={containerRef} data-lenis-prevent-touch>
          <motion.div
            className={`trilho_destaques_pdp${arrastavel ? " trilho_pdp_arrastavel" : ""}`}
            ref={trilhoRef}
            style={{ x }}
            drag={arrastavel ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0.12}
            dragMomentum
          >
            {destaquesMacro.map((item, index) => (
              <div className="card_destaque_pdp" key={index}>
                <div className="zoom_imagem">
                  <img src={item.imagem} alt={item.legenda} />
                </div>
                <p className="p_laranja card_destaque_pdp_kicker">COLEÇÃO LAB CRAFTED</p>
                <p className="card_destaque_pdp_legenda">{item.legenda}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          type="button"
          className="seta_carrossel_pdp seta_carrossel_pdp_direita"
          onClick={avancar}
          aria-label="Ver próximo detalhe"
        >
          →
        </button>
      </div>
    </section>
  );
}
