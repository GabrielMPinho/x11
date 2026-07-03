import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarCategorias } from '../api';
import type { Categoria } from '../types';

export default function Header() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [navAberto, setNavAberto] = useState(false);
  const [megaMobileAberto, setMegaMobileAberto] = useState<'homem' | 'mulher' | null>(null);

  useEffect(() => {
    buscarCategorias().then((d) => setCategorias(d.categorias)).catch(() => {});
  }, []);

  const catsMasc = categorias.filter((c) => c.genero === 'masculino');
  const catsFem = categorias.filter((c) => c.genero === 'feminino');
  const catsUni = categorias.filter((c) => c.genero === 'unissex');

  function fecharTudo() {
    setNavAberto(false);
    setMegaMobileAberto(null);
  }

  return (
    <header className="site-header">
      <Link to="/" className="logo-block" onClick={fecharTudo}>
        <img src="/images/logo.png" alt="X11 Expert Riders" />
      </Link>

      <div className="header-bar">
        <button className="mobile-nav-toggle" aria-label="Abrir menu" onClick={() => setNavAberto((v) => !v)}>
          &#9776;
        </button>

        <ul className={`main-nav${navAberto ? ' nav-open' : ''}`}>
          {catsMasc.length > 0 && (
            <li>
              <Link
                to={`/categoria/${catsMasc[0].slug}`}
                onClick={(e) => {
                  if (window.innerWidth <= 980) {
                    e.preventDefault();
                    setMegaMobileAberto((v) => (v === 'homem' ? null : 'homem'));
                  } else {
                    fecharTudo();
                  }
                }}
              >
                Homem
              </Link>
              <div className={`mega-menu${megaMobileAberto === 'homem' ? ' open-mobile' : ''}`}>
                <div className="mega-col">
                  <h4>Categorias</h4>
                  <ul>
                    {catsMasc.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mega-col">
                  <h4>Unissex</h4>
                  <ul>
                    {catsUni.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                    <li><Link to="/comparar" onClick={fecharTudo}>Comparar produtos</Link></li>
                  </ul>
                </div>
              </div>
            </li>
          )}
          {catsFem.length > 0 && (
            <li>
              <Link
                to={`/categoria/${catsFem[0].slug}`}
                onClick={(e) => {
                  if (window.innerWidth <= 980) {
                    e.preventDefault();
                    setMegaMobileAberto((v) => (v === 'mulher' ? null : 'mulher'));
                  } else {
                    fecharTudo();
                  }
                }}
              >
                Mulher
              </Link>
              <div className={`mega-menu${megaMobileAberto === 'mulher' ? ' open-mobile' : ''}`}>
                <div className="mega-col">
                  <h4>Categorias</h4>
                  <ul>
                    {catsFem.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mega-col">
                  <h4>Unissex</h4>
                  <ul>
                    {catsUni.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                    <li><Link to="/comparar" onClick={fecharTudo}>Comparar produtos</Link></li>
                  </ul>
                </div>
              </div>
            </li>
          )}
          <li><Link to="/guia-de-equipamento" onClick={fecharTudo}>Guia de Equipamento</Link></li>
          <li><Link to="/onde-encontrar" onClick={fecharTudo}>Onde Encontrar</Link></li>
          <li><Link to="/institucional" onClick={fecharTudo}>Institucional</Link></li>
        </ul>
      </div>
    </header>
  );
}
