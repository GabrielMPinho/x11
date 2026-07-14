import { Revela } from "@/padrao/lib/Revela";

// Full-bleed com testado-minas.jpg de fundo (a própria foto do PDF, mesmo
// asset que o Hero da Institucional usa — reaproveitar o ARQUIVO de imagem
// entre páginas é normal, diferente de reutilizar um SELETOR CSS de outra
// página). Técnica em camadas idêntica ao `.hero_institucional`/`.missao_secao`
// (bg via CSS + overlay ::after + conteúdo por cima), com classes 100%
// próprias desta seção. `z-index:0` na seção (nunca -1, ver o fix de clique
// do Hero da Home no CHANGELOG) — aqui não há link/botão, mas o padrão evita
// o mesmo bug latente se algo clicável entrar depois.
export default function BannerTestado() {
  return (
    <section className="banner_testado_secao">
      <div className="banner_testado_bg" />
      <Revela as="div" className="banner_testado_conteudo" distancia={100}>
        <p className="p_laranja">COLEÇÃO LAB CRAFTED</p>
        <h2 className="banner_testado_titulo">
          TESTADO
          <br />
          MINAS GERAIS
        </h2>
        <p className="banner_testado_texto">
          Quatro pilotos. Uma única jaqueta do início ao fim. Sem reparos. Sem reclamações. Apenas poeira, sal e a próxima curva.
        </p>
      </Revela>
    </section>
  );
}
