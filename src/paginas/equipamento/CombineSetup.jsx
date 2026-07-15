import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { comboSetup } from "@/paginas/equipamento/dados/produto";
import { useCarrosselComSetas } from "@/paginas/equipamento/useCarrosselComSetas";
import { useAutoplayCarrossel } from "@/padrao/lib/useAutoplayCarrossel";

function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

// "COMBINE SEU SETUP" — cross-sell com setas funcionais (mesmo mecanismo de
// CarrosselDetalhes, via useCarrosselComSetas — inclusive o drag SÓ no
// toque/tablet, fix 2026-07-14: no desktop o trilho anda só pelas setas) +
// cards de produto que navegam pra /equipamento (mesma vitrine — mesmo
// padrão de clique de Favoritos/PLP: elemento clicável com
// onClick/preventDefault + useNavigate). `data-lenis-prevent-touch` (fix
// 2026-07-14) — Lenis só é bloqueado no toque, não na roda do mouse.
export default function CombineSetup() {
  const { containerRef, trilhoRef, x, arrastavel, dragConstraints, avancar, voltar } = useCarrosselComSetas();
  const navegar = useNavigate();
  // Autoplay só no mobile/toque (2026-07-15, item 5) — mesmo padrão de
  // CarrosselDetalhes: lista duplicada só quando `arrastavel`.
  const itens = arrastavel ? [...comboSetup, ...comboSetup] : comboSetup;
  const { pausar, retomar } = useAutoplayCarrossel({ x, trilhoRef, qtdItens: comboSetup.length, ativo: arrastavel });

  return (
    <section className="combine_setup_secao">
      <div className="combine_setup_cabecalho">
        <div className="combine_setup_titulo_bloco">
          <p className="p_laranja">SEGURANÇA DA CABEÇA AOS PÉS</p>
          <h2>COMBINE SEU SETUP</h2>
        </div>
        <div className="combine_setup_setas">
          <button type="button" className="seta_carrossel_pdp" onClick={voltar} aria-label="Ver produto anterior">←</button>
          <button type="button" className="seta_carrossel_pdp" onClick={avancar} aria-label="Ver próximo produto">→</button>
        </div>
      </div>

      <div className="trilho_combine_container" ref={containerRef} data-lenis-prevent-touch>
        <motion.div
          className={`trilho_combine${arrastavel ? " trilho_pdp_arrastavel" : ""}`}
          ref={trilhoRef}
          style={{ x }}
          drag={arrastavel ? "x" : false}
          dragConstraints={dragConstraints}
          dragElastic={0.12}
          dragMomentum
          onDragStart={pausar}
          onDragEnd={retomar}
        >
          {itens.map((item, index) => (
            <a
              href="/equipamento"
              className="card_combine"
              key={index}
              draggable={false}
              onClick={(evento) => { evento.preventDefault(); navegar("/equipamento"); }}
            >
              <div className="zoom_imagem card_combine_imagem">
                <img src={item.imagem} alt={item.nome} />
              </div>
              <p className="card_combine_nome">{item.nome}</p>
              <p className="card_combine_preco">{formatarPreco(item.preco)}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
