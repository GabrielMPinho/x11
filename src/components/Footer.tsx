import { Link } from 'react-router-dom';

const linkClass = 'block py-[5px] text-[0.9rem] text-gray-1 hover:text-white';
const headClass = 'text-orange text-[0.85rem] mb-4';

export default function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-border pt-[50px]">
      <div className="container-x11">
        <div className="grid grid-cols-3 max-[620px]:grid-cols-1 gap-10 max-[620px]:gap-6 pb-10 border-b border-border">
          <div>
            <h4 className={headClass}>Atendimento</h4>
            <ul>
              <li><Link to="/pagina/perguntas-frequentes" className={linkClass}>Perguntas frequentes</Link></li>
              <li><Link to="/pagina/entrega" className={linkClass}>Entrega</Link></li>
              <li><Link to="/pagina/trocas-devolucoes" className={linkClass}>Trocas e devoluções</Link></li>
              <li><Link to="/pagina/garantia" className={linkClass}>Garantia</Link></li>
              <li><Link to="/guia-de-equipamento" className={linkClass}>Guia de tamanhos</Link></li>
              <li><Link to="/pagina/contato" className={linkClass}>Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={headClass}>X11</h4>
            <ul>
              <li><Link to="/institucional" className={linkClass}>Nossa história</Link></li>
              <li><Link to="/pagina/tecnologia" className={linkClass}>Tecnologia</Link></li>
              <li><Link to="/pagina/carreiras" className={linkClass}>Carreiras</Link></li>
              <li><Link to="/pagina/responsabilidade" className={linkClass}>Responsabilidade</Link></li>
              <li><Link to="/onde-encontrar" className={linkClass}>Onde encontrar</Link></li>
              <li><Link to="/pagina/programa-de-membros" className={linkClass}>Programa de membros</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={headClass}>Novidades</h4>
            <ul>
              <li><Link to="/pagina/catalogo-2026" className={linkClass}>Catálogo X11 2026</Link></li>
              <li><Link to="/pagina/linha-capacetes-2026" className={linkClass}>Linha de capacetes 2026</Link></li>
              <li><Link to="/pagina/entenda-precos-pps" className={linkClass}>Entenda nossos preços (PPS)</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between max-[620px]:flex-col max-[620px]:gap-2.5 max-[620px]:text-center py-5 text-[0.8rem] text-gray-3">
          <span>Copyright &copy; 2026 X11. Todos os direitos reservados.</span>
          <img src="/images/logo.png" alt="X11" className="h-[30px]" />
        </div>
      </div>
    </footer>
  );
}
