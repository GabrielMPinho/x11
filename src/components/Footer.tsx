import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Atendimento</h4>
            <ul>
              <li><Link to="/pagina/perguntas-frequentes">Perguntas frequentes</Link></li>
              <li><Link to="/pagina/entrega">Entrega</Link></li>
              <li><Link to="/pagina/trocas-devolucoes">Trocas e devoluções</Link></li>
              <li><Link to="/pagina/garantia">Garantia</Link></li>
              <li><Link to="/guia-de-equipamento">Guia de tamanhos</Link></li>
              <li><Link to="/pagina/contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h4>X11</h4>
            <ul>
              <li><Link to="/institucional">Nossa história</Link></li>
              <li><Link to="/pagina/tecnologia">Tecnologia</Link></li>
              <li><Link to="/pagina/carreiras">Carreiras</Link></li>
              <li><Link to="/pagina/responsabilidade">Responsabilidade</Link></li>
              <li><Link to="/onde-encontrar">Onde encontrar</Link></li>
              <li><Link to="/pagina/programa-de-membros">Programa de membros</Link></li>
            </ul>
          </div>
          <div>
            <h4>Novidades</h4>
            <ul>
              <li><Link to="/pagina/catalogo-2026">Catálogo X11 2026</Link></li>
              <li><Link to="/pagina/linha-capacetes-2026">Linha de capacetes 2026</Link></li>
              <li><Link to="/pagina/entenda-precos-pps">Entenda nossos preços (PPS)</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright &copy; 2026 X11. Todos os direitos reservados.</span>
          <img src="/images/logo.png" alt="X11" />
        </div>
      </div>
    </footer>
  );
}
