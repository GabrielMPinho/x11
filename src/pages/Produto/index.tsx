import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarProduto } from '../../api';
import type { Produto as ProdutoType, Categoria, TabelaTamanhos } from '../../types';
import ModalGuiaTamanhos from '../../components/ModalGuiaTamanhos';
import Breadcrumb from './Breadcrumb';
import Galeria from './Galeria';
import InfoProduto from './InfoProduto';
import BadgesRow from './BadgesRow';
import RecursosSection from './RecursosSection';
import BannerTestado from './BannerTestado';
import FichaTecnica from './FichaTecnica';
import Avaliacoes from './Avaliacoes';
import Relacionados from './Relacionados';

export default function Produto() {
  const { slug } = useParams<{ slug: string }>();
  const [produto, setProduto] = useState<ProdutoType | null>(null);
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [relacionados, setRelacionados] = useState<ProdutoType[]>([]);
  const [guiaTamanhos, setGuiaTamanhos] = useState<TabelaTamanhos | null>(null);
  const [erro, setErro] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setErro(false);
    buscarProduto(slug)
      .then((d) => {
        setProduto(d.produto);
        setCategoria(d.categoria);
        setRelacionados(d.relacionados);
        setGuiaTamanhos(d.guiaTamanhos);
      })
      .catch(() => setErro(true));
  }, [slug]);

  useEffect(() => {
    if (produto) document.title = `${produto.nome} · X11 Expert Riders`;
  }, [produto]);

  if (erro) return <div className="container-x11 section"><p className="text-center py-[60px] text-gray-2">Produto não encontrado.</p></div>;
  if (!produto || !categoria || !guiaTamanhos) return null;

  return (
    <div className="container-x11 pt-6">
      <Breadcrumb categoria={categoria} produto={produto} />

      <div className="grid grid-cols-[90px_1fr_1fr] max-[980px]:grid-cols-1 gap-6 mb-[50px]">
        <Galeria imagens={produto.imagens} nome={produto.nome} />
        <InfoProduto produto={produto} onAbrirGuia={() => setModalAberto(true)} />
      </div>

      <BadgesRow especificacoes={produto.especificacoesRapidas} />
      <RecursosSection descricao={produto.descricao} recursos={produto.recursos} />
      <BannerTestado />
      <FichaTecnica itens={produto.fichaTecnica} />
      <Avaliacoes avaliacoes={produto.avaliacoes} />
      <Relacionados produtos={relacionados} />

      <ModalGuiaTamanhos aberto={modalAberto} tabela={guiaTamanhos} onFechar={() => setModalAberto(false)} />
    </div>
  );
}
