import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { buscarCategoria } from '../../api';
import type { Categoria, ResultadoListagem, Cor } from '../../types';
import CatHero from './CatHero';
import Breadcrumb from './Breadcrumb';
import EstiloTabs from './EstiloTabs';
import FiltrosSidebar from './FiltrosSidebar';
import ProdutosGrid from './ProdutosGrid';
import ComoEscolherBanner from './ComoEscolherBanner';

export default function Catalogo() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [resultado, setResultado] = useState<ResultadoListagem | null>(null);
  const [cores, setCores] = useState<Cor[]>([]);
  const [tamanhos, setTamanhos] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setCarregando(true);
    buscarCategoria(slug, {
      tamanho: searchParams.getAll('tamanho'),
      cor: searchParams.getAll('cor'),
      estacao: searchParams.getAll('estacao'),
      certificacao: searchParams.getAll('certificacao'),
      precoMin: searchParams.get('precoMin') || undefined,
      precoMax: searchParams.get('precoMax') || undefined,
      estilo: searchParams.get('estilo') || undefined,
      ordenar: searchParams.get('ordenar') || undefined,
      pagina: Number(searchParams.get('pagina') || 1),
    })
      .then((d) => {
        setCategoria(d.categoria);
        setResultado(d.resultado);
        setCores(d.cores);
        setTamanhos(d.tamanhos);
        setErro(false);
      })
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, [slug, searchParams]);

  useEffect(() => {
    if (categoria) document.title = `${categoria.nome} · X11 Expert Riders`;
  }, [categoria]);

  function atualizarParam(chave: string, valores: string[] | string | null) {
    const novo = new URLSearchParams(searchParams);
    novo.delete(chave);
    if (Array.isArray(valores)) {
      valores.forEach((v) => novo.append(chave, v));
    } else if (valores) {
      novo.set(chave, valores);
    }
    novo.delete('pagina');
    setSearchParams(novo);
  }

  function alternarValorLista(chave: string, valor: string) {
    const atuais = searchParams.getAll(chave);
    const novos = atuais.includes(valor) ? atuais.filter((v) => v !== valor) : [...atuais, valor];
    atualizarParam(chave, novos);
  }

  function irParaPagina(pagina: number) {
    const novo = new URLSearchParams(searchParams);
    novo.set('pagina', String(pagina));
    setSearchParams(novo);
  }

  if (erro) return <div className="container section"><p className="sem-resultados">Categoria não encontrada.</p></div>;
  if (!categoria) return null;

  return (
    <>
      <CatHero categoria={categoria} />

      <div className="container" style={{ paddingTop: 30 }}>
        <Breadcrumb categoria={categoria} />

        <EstiloTabs
          estiloAtual={searchParams.get('estilo') || ''}
          onSelecionar={(estilo) => atualizarParam('estilo', estilo || null)}
        />

        <div className="catalogo-layout">
          <FiltrosSidebar
            tamanhos={tamanhos}
            cores={cores}
            tamanhoSelecionado={searchParams.getAll('tamanho')}
            corSelecionada={searchParams.getAll('cor')}
            estacaoSelecionada={searchParams.getAll('estacao')}
            certificacaoSelecionada={searchParams.getAll('certificacao')}
            precoMin={searchParams.get('precoMin') || ''}
            precoMax={searchParams.get('precoMax') || ''}
            onToggleLista={alternarValorLista}
            onPrecoChange={(chave, valor) => atualizarParam(chave, valor || null)}
          />

          <div>
            <div className="catalogo-toolbar">
              <span className="eyebrow" style={{ margin: 0 }}>Em destaque</span>
              <select
                value={searchParams.get('ordenar') || 'destaque'}
                onChange={(e) => atualizarParam('ordenar', e.target.value)}
              >
                <option value="destaque">Em destaque</option>
                <option value="preco-asc">Preço: menor para maior</option>
                <option value="preco-desc">Preço: maior para menor</option>
                <option value="nome">Nome A-Z</option>
              </select>
            </div>

            {!carregando && resultado && <ProdutosGrid resultado={resultado} onPagina={irParaPagina} />}
          </div>
        </div>
      </div>

      <ComoEscolherBanner nomeCategoria={categoria.nome} />
    </>
  );
}
