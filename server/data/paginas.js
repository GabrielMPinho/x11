const paginas = {
  'perguntas-frequentes': {
    titulo: 'Perguntas Frequentes',
    paragrafos: [
      'Reunimos aqui as dúvidas mais comuns sobre produtos, tamanhos e onde comprar equipamentos X11.',
      'Como sei qual tamanho escolher? Consulte o Guia de Equipamento, que traz tabelas de medidas para jaquetas, calças, botas, luvas e capacetes.',
      'A X11 vende direto ao consumidor? Não. Nossos produtos são vendidos através da rede de lojas parceiras — use o Onde Encontrar para localizar o revendedor mais próximo.',
      'Como faço para comparar dois produtos? Use o botão "Comparar" nos cards de produto ou na página do produto para montar uma tabela lado a lado.',
    ],
  },
  entrega: {
    titulo: 'Entrega',
    paragrafos: [
      'Por vender através de uma rede de lojas parceiras, os prazos e condições de entrega são definidos por cada revendedor autorizado.',
      'Ao encontrar a loja mais próxima em Onde Encontrar, consulte diretamente as opções de entrega e retirada disponíveis.',
    ],
  },
  'trocas-devolucoes': {
    titulo: 'Trocas e Devoluções',
    paragrafos: [
      'Trocas e devoluções são realizadas diretamente com a loja parceira onde a compra foi efetuada, respeitando o Código de Defesa do Consumidor.',
      'Guarde sempre a nota fiscal e entre em contato com o revendedor em até 7 dias corridos após o recebimento, em caso de arrependimento de compra.',
    ],
  },
  garantia: {
    titulo: 'Garantia',
    paragrafos: [
      'Todos os equipamentos X11 possuem garantia de fábrica de 6 meses contra defeitos de fabricação, contados a partir da data de compra na nota fiscal.',
      'Em caso de dúvida sobre a garantia do seu produto, procure a loja onde efetuou a compra ou fale com nosso time em Contato.',
    ],
  },
  contato: {
    titulo: 'Contato',
    paragrafos: [
      'Atendimento X11 — segunda a sexta, das 8h às 18h.',
      'E-mail: atendimento@x11.com.br',
      'Para encontrar uma loja física, use o Onde Encontrar.',
    ],
  },
  tecnologia: {
    titulo: 'Tecnologia',
    paragrafos: [
      'Cada peça X11 nasce em laboratório: tecidos Abrasion-Tough, membranas impermeáveis removíveis e proteções certificadas CE são testados antes de chegar à estrada.',
      'Trabalhamos com fornecedores homologados e protocolos próprios de teste em campo, do cerrado brasileiro às trilhas da Cordilheira dos Andes.',
    ],
  },
  carreiras: {
    titulo: 'Carreiras',
    paragrafos: [
      'A X11 é feita por motociclistas, para motociclistas — e crescemos com gente apaixonada por duas rodas.',
      'No momento não há vagas abertas divulgadas neste canal. Fique de olho nas nossas redes sociais para futuras oportunidades.',
    ],
  },
  responsabilidade: {
    titulo: 'Responsabilidade',
    paragrafos: [
      'Acreditamos que equipamento de moto é item de proteção, por isso investimos em segurança certificada acima de tendências.',
      'Buscamos fornecedores e processos produtivos que respeitem boas práticas trabalhistas e ambientais em nossa cadeia de produção em Minas Gerais.',
    ],
  },
  'programa-de-membros': {
    titulo: 'Programa de Membros',
    paragrafos: [
      'Mais de 200 mil motociclistas já vestem X11. O Programa de Membros conecta essa comunidade a conteúdos, novidades de produto e eventos como o Bike Fest.',
      'Em breve, mais detalhes sobre como participar.',
    ],
  },
  'catalogo-2026': {
    titulo: 'Catálogo X11 2026',
    paragrafos: [
      'Confira a linha completa 2026 nas páginas de Homem e Mulher, organizadas por categoria: jaquetas, calças, botas, luvas, capacetes, segunda pele e acessórios.',
    ],
  },
  'linha-capacetes-2026': {
    titulo: 'Linha de Capacetes 2026',
    paragrafos: [
      'A linha 2026 de capacetes X11 traz casco em policarbonato injetado, viseiras anti-risco e forro interno removível em todos os modelos.',
      'Veja os modelos disponíveis na categoria Capacetes.',
    ],
  },
  'entenda-precos-pps': {
    titulo: 'Entenda Nossos Preços (PPS)',
    paragrafos: [
      'PPS — Preço Praticado Sugerido. É o valor de referência sugerido pela X11 para venda ao consumidor final em toda a rede de lojas parceiras.',
      'O preço final pode variar conforme a política comercial de cada revendedor autorizado.',
    ],
  },
};

function porSlug(slug) {
  return paginas[slug];
}

module.exports = { paginas, porSlug };
