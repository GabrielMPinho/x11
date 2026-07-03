import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarCategorias } from '../api';
import type { Categoria } from '../types';

const navLink = 'inline-block py-2.5 px-1 uppercase text-[0.85rem] tracking-[1.5px] font-light text-gray-1 hover:text-orange max-[980px]:block max-[980px]:py-3.5';
const megaMenuBase = 'hidden group-hover:flex absolute left-1/2 top-full -translate-x-1/2 gap-8 bg-bg-alt border border-border p-6 min-w-[480px] shadow-[0_12px_30px_rgba(0,0,0,0.5)] max-[980px]:min-w-0';
const megaMenuOpenMobile = 'max-[980px]:!flex max-[980px]:static max-[980px]:translate-x-0 max-[980px]:flex-col max-[980px]:shadow-none max-[980px]:m-0 max-[980px]:mb-2.5 max-[980px]:border-0 max-[980px]:bg-transparent max-[980px]:py-0 max-[980px]:pl-2.5 max-[980px]:pr-0';

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
    <header className="sticky top-0 z-[100] bg-black border-b border-border h-[88px] max-[980px]:h-16">
      <Link to="/" className="absolute left-6 top-1/2 -translate-y-1/2 h-16 z-10 max-[980px]:left-4 max-[980px]:h-11" onClick={fecharTudo}>
        <img src="/images/logo.png" alt="X11 Expert Riders" className="h-full w-auto block" />
      </Link>

      <div className="h-full flex items-center gap-6 pl-[270px] pr-6 max-[980px]:pl-[190px] max-[980px]:pr-3.5 max-[980px]:justify-end">
        <button
          className="hidden max-[980px]:block bg-transparent border-none text-white text-[1.4rem]"
          aria-label="Abrir menu"
          onClick={() => setNavAberto((v) => !v)}
        >
          &#9776;
        </button>

        <ul
          className={`${navAberto ? 'flex' : 'hidden'} min-[981px]:flex flex-1 gap-8 min-[981px]:justify-center max-[980px]:flex-col max-[980px]:fixed max-[980px]:top-16 max-[980px]:inset-x-0 max-[980px]:bottom-0 max-[980px]:overflow-y-auto max-[980px]:bg-bg-alt max-[980px]:p-5 max-[980px]:z-[150] max-[980px]:gap-1`}
          style={{ fontFamily: 'var(--font-nav)' }}
        >
          {catsMasc.length > 0 && (
            <li className="relative group max-[980px]:w-full max-[980px]:border-b max-[980px]:border-border">
              <Link
                to={`/categoria/${catsMasc[0].slug}`}
                className={navLink}
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
              <div className={`${megaMenuBase} ${megaMobileAberto === 'homem' ? megaMenuOpenMobile : ''}`}>
                <div>
                  <h4 className="text-[0.75rem] text-orange mb-3" style={{ fontFamily: 'var(--font-head)' }}>Categorias</h4>
                  <ul>
                    {catsMasc.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} className="block py-1.5 text-[0.9rem] text-gray-1 hover:text-white" onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[0.75rem] text-orange mb-3" style={{ fontFamily: 'var(--font-head)' }}>Unissex</h4>
                  <ul>
                    {catsUni.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} className="block py-1.5 text-[0.9rem] text-gray-1 hover:text-white" onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                    <li><Link to="/comparar" className="block py-1.5 text-[0.9rem] text-gray-1 hover:text-white" onClick={fecharTudo}>Comparar produtos</Link></li>
                  </ul>
                </div>
              </div>
            </li>
          )}
          {catsFem.length > 0 && (
            <li className="relative group max-[980px]:w-full max-[980px]:border-b max-[980px]:border-border">
              <Link
                to={`/categoria/${catsFem[0].slug}`}
                className={navLink}
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
              <div className={`${megaMenuBase} ${megaMobileAberto === 'mulher' ? megaMenuOpenMobile : ''}`}>
                <div>
                  <h4 className="text-[0.75rem] text-orange mb-3" style={{ fontFamily: 'var(--font-head)' }}>Categorias</h4>
                  <ul>
                    {catsFem.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} className="block py-1.5 text-[0.9rem] text-gray-1 hover:text-white" onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[0.75rem] text-orange mb-3" style={{ fontFamily: 'var(--font-head)' }}>Unissex</h4>
                  <ul>
                    {catsUni.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/categoria/${c.slug}`} className="block py-1.5 text-[0.9rem] text-gray-1 hover:text-white" onClick={fecharTudo}>{c.nome}</Link>
                      </li>
                    ))}
                    <li><Link to="/comparar" className="block py-1.5 text-[0.9rem] text-gray-1 hover:text-white" onClick={fecharTudo}>Comparar produtos</Link></li>
                  </ul>
                </div>
              </div>
            </li>
          )}
          <li className="relative max-[980px]:w-full max-[980px]:border-b max-[980px]:border-border">
            <Link to="/guia-de-equipamento" className={navLink} onClick={fecharTudo}>Guia de Equipamento</Link>
          </li>
          <li className="relative max-[980px]:w-full max-[980px]:border-b max-[980px]:border-border">
            <Link to="/onde-encontrar" className={navLink} onClick={fecharTudo}>Onde Encontrar</Link>
          </li>
          <li className="relative max-[980px]:w-full max-[980px]:border-b max-[980px]:border-border">
            <Link to="/institucional" className={navLink} onClick={fecharTudo}>Institucional</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
