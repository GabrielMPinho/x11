import { useState } from "react";
import { motion } from "motion/react";
import { heroStagger, heroItem } from "@/padrao/lib/motion";
import { produto, galeriaProduto } from "@/paginas/equipamento/dados/produto";
import { iconesEquipamento } from "@/paginas/equipamento/IconesEquipamento";

const TOTAL_ESTRELAS = 5;

function formatarPrecoInteiro(valor) {
  return `R$ ${Math.round(valor).toLocaleString("pt-BR")}`;
}

// Breadcrumb + split galeria/info. Entrada em stagger no load
// (heroStagger/heroItem, como o Hero da Home) — NÃO full-bleed, NÃO ligado
// a scroll (é a 1ª coisa vista na página). Troca de imagem principal
// (thumbnail → packshot) e seleção de cor/tamanho são estado local
// (`useState`), micro-interação de UI autocontida — sem lógica de
// e-commerce (decisão do Opus: sem CTA de compra, ver backlog produto.md).
export default function HeroProduto() {
  const [imagemAtiva, setImagemAtiva] = useState(0);
  const [corAtiva, setCorAtiva] = useState(0);
  const [tamanhoAtivo, setTamanhoAtivo] = useState(0);

  return (
    <motion.section className="hero_produto" variants={heroStagger} initial="hidden" animate="visible">
      <motion.p className="equipamento_breadcrumb" variants={heroItem}>{produto.breadcrumb}</motion.p>

      <div className="hero_produto_corpo">
        <motion.div className="hero_produto_galeria" variants={heroItem}>
          <div className="hero_produto_thumbs">
            {galeriaProduto.map((imagem, index) => (
              <button
                type="button"
                key={index}
                className={`thumb_produto${index === imagemAtiva ? " thumb_produto_ativo" : ""}`}
                onClick={() => setImagemAtiva(index)}
                aria-label={`Ver imagem ${index + 1} do produto`}
                aria-pressed={index === imagemAtiva}
              >
                <img src={imagem} alt="" />
              </button>
            ))}
          </div>
          <div className="hero_produto_packshot zoom_imagem">
            <img src={galeriaProduto[imagemAtiva]} alt={produto.tituloLinhas.join(" ")} />
          </div>
        </motion.div>

        <motion.div className="hero_produto_info" variants={heroItem}>
          <p className="p_laranja">{produto.kicker}</p>
          <h1 className="hero_produto_titulo">
            {produto.tituloLinhas.map((linha, index) => (
              <span key={index}>
                {linha}
                {index < produto.tituloLinhas.length - 1 && <br />}
              </span>
            ))}
          </h1>

          <div className="produto_rating">
            <span className="produto_estrelas" aria-hidden="true">
              {Array.from({ length: TOTAL_ESTRELAS }).map((_, index) => (
                <span className="produto_estrela" key={index}>{iconesEquipamento.estrela}</span>
              ))}
            </span>
            <span className="produto_rating_texto">{produto.avaliacaoMedia} · {produto.totalAvaliacoes} avaliações</span>
          </div>

          <p className="produto_preco">{formatarPrecoInteiro(produto.preco)}</p>
          <p className="produto_descricao">{produto.descricao}</p>

          <div className="produto_opcao_bloco">
            <p className="produto_opcao_label">COR</p>
            <div className="produto_swatches">
              {produto.cores.map((cor, index) => (
                <button
                  type="button"
                  key={index}
                  className={`produto_swatch${index === corAtiva ? " produto_swatch_ativo" : ""}`}
                  style={{ backgroundColor: cor.hex }}
                  onClick={() => setCorAtiva(index)}
                  aria-label={cor.nome}
                  aria-pressed={index === corAtiva}
                />
              ))}
            </div>
          </div>

          <div className="produto_opcao_bloco">
            <p className="produto_opcao_label">TAMANHO</p>
            <div className="produto_chips_tamanho">
              {produto.tamanhos.map((tamanho, index) => (
                <button
                  type="button"
                  key={index}
                  className={`produto_chip_tamanho${index === tamanhoAtivo ? " produto_chip_tamanho_ativo" : ""}`}
                  onClick={() => setTamanhoAtivo(index)}
                  aria-pressed={index === tamanhoAtivo}
                >
                  {tamanho}
                </button>
              ))}
            </div>
          </div>

          <div className="produto_garantia">
            <span className="icone_garantia" aria-hidden="true">{iconesEquipamento.medalha}</span>
            <span className="produto_garantia_texto">
              <strong>{produto.garantia.titulo}</strong>
              <span>{produto.garantia.subtitulo}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
