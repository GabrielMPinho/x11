const { porSlug } = require('./categorias');

const CORES = {
  preto: { nome: 'Preto', hex: '#1a1a1a' },
  cinza: { nome: 'Cinza Grafite', hex: '#4b4b4b' },
  caramelo: { nome: 'Caramelo', hex: '#b5793a' },
  vermelho: { nome: 'Vermelho', hex: '#c0392b' },
  azul: { nome: 'Azul Petróleo', hex: '#25506b' },
  verde: { nome: 'Verde Musgo', hex: '#4a5a3a' },
  branco: { nome: 'Branco Gelo', hex: '#d9d9d9' },
};

const CERTIFICACAO_LABEL = { ce1: 'CE 1', ce2: 'CE 2', aaa: 'Classe AAA' };
const ESTACAO_LABEL = { verao: 'Verão', inverno: 'Inverno', '4-estacoes': '4 Estações' };
const ESTILO_LABEL = { adventure: 'Adventure', touring: 'Touring', sport: 'Sport', urbano: 'Urbano', classico: 'Clássico' };

function tamanhosPara(tipo) {
  switch (tipo) {
    case 'bota':
      return ['38', '39', '40', '41', '42', '43', '44'];
    case 'luva':
      return ['P', 'M', 'G', 'GG'];
    case 'capacete':
      return ['56', '58', '60', '62'];
    case 'acessorio':
      return ['Único'];
    default:
      return ['P', 'M', 'G', 'GG', '3G', '4G'];
  }
}

function imagensPara(tipo) {
  switch (tipo) {
    case 'jaqueta':
      return ['/images/product-jacket.jpg', '/images/colecao-hero.jpg'];
    case 'calca':
      return ['/images/placeholder-calca.svg'];
    case 'bota':
      return ['/images/product-boot.jpg', '/images/combine-boot.jpg'];
    case 'luva':
      return ['/images/product-glove.jpg', '/images/combine-glove.jpg'];
    case 'capacete':
      return ['/images/placeholder-capacete.svg'];
    case 'segunda-pele':
      return ['/images/placeholder-segunda-pele.svg'];
    default:
      return ['/images/placeholder-acessorio.svg'];
  }
}

function coresPadrao(tipo) {
  if (tipo === 'capacete') return [CORES.preto, CORES.branco, CORES.vermelho];
  if (tipo === 'acessorio') return [CORES.preto];
  return [CORES.preto, CORES.cinza, CORES.caramelo];
}

function especificacoesRapidas(tipo, certificacao) {
  const cert = CERTIFICACAO_LABEL[certificacao] || 'CE 1';
  switch (tipo) {
    case 'jaqueta':
    case 'calca':
      return [
        { valor: '600D', legenda: 'Resistência à abrasão' },
        { valor: cert, legenda: 'Joelho / Quadril' },
        { valor: '20K', legenda: 'Membrana impermeável' },
        { valor: '4', legenda: 'Estações do ano' },
      ];
    case 'bota':
      return [
        { valor: '400D', legenda: 'Resistência à abrasão' },
        { valor: cert, legenda: 'Proteção maléolo' },
        { valor: '10K', legenda: 'Impermeabilização' },
        { valor: 'Antiderr.', legenda: 'Sola' },
      ];
    case 'luva':
      return [
        { valor: 'Carbono', legenda: 'Reforço nos nós' },
        { valor: cert, legenda: 'Certificação' },
        { valor: 'Couro', legenda: 'Palma' },
        { valor: 'Touch', legenda: 'Ponta compatível' },
      ];
    case 'capacete':
      return [
        { valor: cert, legenda: 'Certificação' },
        { valor: '1.450g', legenda: 'Peso médio (M)' },
        { valor: '5', legenda: 'Entradas de ar' },
        { valor: 'Removível', legenda: 'Forro interno' },
      ];
    case 'segunda-pele':
      return [
        { valor: 'FPS 50', legenda: 'Proteção solar' },
        { valor: 'Térmico', legenda: 'Tecido' },
        { valor: 'Plana', legenda: 'Costura sem atrito' },
        { valor: '4', legenda: 'Estações' },
      ];
    default:
      return [
        { valor: 'Reforçado', legenda: 'Material' },
        { valor: 'Ajustável', legenda: 'Fixação' },
        { valor: 'Refletivo', legenda: 'Visibilidade' },
        { valor: 'Universal', legenda: 'Encaixe' },
      ];
  }
}

function recursosPadrao(tipo) {
  switch (tipo) {
    case 'jaqueta':
      return [
        { icone: 'shield', titulo: 'Proteção CE certificada', descricao: 'Armaduras removíveis nos ombros e cotovelos, ajustáveis em altura.' },
        { icone: 'droplet', titulo: 'Membrana H2O removível', descricao: 'Camada interna impermeável, retirável em segundos conforme o clima.' },
        { icone: 'wind', titulo: 'Ventilação direcional', descricao: 'Zíperes frontais e traseiros canalizam ar onde importa.' },
        { icone: 'thermometer', titulo: '4 estações reais', descricao: 'Forro térmico zipável, do frio da serra ao calor do asfalto.' },
      ];
    case 'calca':
      return [
        { icone: 'shield', titulo: 'Proteção CE nos pontos certos', descricao: 'Armaduras nos joelhos e reforço nos quadris.' },
        { icone: 'droplet', titulo: 'Membrana impermeável', descricao: 'Removível, mantém o piloto seco sem perder respirabilidade.' },
        { icone: 'wind', titulo: 'Ventilação lateral', descricao: 'Zíperes que abrem o fluxo de ar em dias quentes.' },
        { icone: 'settings', titulo: 'Ajuste completo', descricao: 'Cintura e barra reguláveis para caimento sob medida.' },
      ];
    case 'bota':
      return [
        { icone: 'shield', titulo: 'Proteção no maléolo', descricao: 'Contraforte reforçado protege o tornozelo em quedas e impactos.' },
        { icone: 'grip', titulo: 'Sola antiderrapante', descricao: 'Composto de borracha com canaletas para aderência em qualquer piso.' },
        { icone: 'droplet', titulo: 'Impermeabilização', descricao: 'Cabedal hidrofugado com membrana respirável.' },
        { icone: 'road', titulo: 'Conforto de longa distância', descricao: 'Palmilha anatômica pensada para dias inteiros de estrada.' },
      ];
    case 'luva':
      return [
        { icone: 'grip', titulo: 'Reforço nos nós', descricao: 'Slider externo em TPU protege em caso de deslizamento no asfalto.' },
        { icone: 'target', titulo: 'Sensibilidade no manete', descricao: 'Palma em couro fino para controle preciso da embreagem e freio.' },
        { icone: 'settings', titulo: 'Ajuste no punho', descricao: 'Fechamento duplo em velcro trava a luva no lugar certo.' },
        { icone: 'wind', titulo: 'Ventilação na palma', descricao: 'Perfurações estratégicas para dias quentes de pilotagem.' },
      ];
    case 'capacete':
      return [
        { icone: 'eye', titulo: 'Viseira anti-risco', descricao: 'Tratamento anti-risco e anti-embaçante para visibilidade total.' },
        { icone: 'wind', titulo: 'Ventilação eficiente', descricao: 'Entradas e saídas de ar dispostas para circulação constante.' },
        { icone: 'layers', titulo: 'Forro removível', descricao: 'Espuma interna removível e lavável, higiene facilitada.' },
        { icone: 'lock', titulo: 'Fivela micrométrica', descricao: 'Ajuste rápido e seguro com uma mão só.' },
      ];
    case 'segunda-pele':
      return [
        { icone: 'layers', titulo: 'Costura plana', descricao: 'Sem atrito por baixo do equipamento, mesmo em viagens longas.' },
        { icone: 'thermometer', titulo: 'Tecido térmico', descricao: 'Regula a temperatura corporal em diferentes climas.' },
        { icone: 'sun', titulo: 'Proteção solar', descricao: 'FPS 50+ para quem roda o dia inteiro exposto ao sol.' },
        { icone: 'droplet', titulo: 'Secagem rápida', descricao: 'Tecnologia dry-touch mantém a peça seca e leve.' },
      ];
    default:
      return [
        { icone: 'shield', titulo: 'Material resistente', descricao: 'Construção pensada para o uso diário na estrada.' },
        { icone: 'settings', titulo: 'Fixação universal', descricao: 'Compatível com a maioria dos modelos e equipamentos.' },
        { icone: 'eye', titulo: 'Visibilidade', descricao: 'Detalhes refletivos para maior segurança à noite.' },
        { icone: 'grip', titulo: 'Fácil manutenção', descricao: 'Materiais simples de limpar e conservar.' },
      ];
  }
}

function fichaTecnicaPadrao(tipo) {
  switch (tipo) {
    case 'jaqueta':
      return [
        { chave: 'Tecido principal', valor: 'Nylon 600D Abrasion-Tough' },
        { chave: 'Reforços', valor: 'Ombros e cotovelos em 900D' },
        { chave: 'Membrana', valor: 'Impermeável removível 20.000mm' },
        { chave: 'Forro térmico', valor: 'Zipável, para até -5°C' },
        { chave: 'Proteções', valor: 'CE Nível 2 (ombros e cotovelos)' },
        { chave: 'Ventilação', valor: 'Zíperes YKK frontais e traseiros' },
        { chave: 'Ajustes', valor: 'Cintura, punhos e barra reguláveis' },
        { chave: 'Certificação', valor: 'EN 17092' },
      ];
    case 'calca':
      return [
        { chave: 'Tecido principal', valor: 'Nylon 600D / Cordura' },
        { chave: 'Reforços', valor: 'Joelhos e quadris em 900D' },
        { chave: 'Membrana', valor: 'Impermeável removível 20.000mm' },
        { chave: 'Proteções', valor: 'CE Nível 2 nos joelhos' },
        { chave: 'Ventilação', valor: 'Zíperes laterais' },
        { chave: 'Ajustes', valor: 'Cintura ajustável com velcro' },
        { chave: 'Certificação', valor: 'EN 17092' },
      ];
    case 'bota':
      return [
        { chave: 'Cabedal', valor: 'Couro legítimo hidrofugado' },
        { chave: 'Sola', valor: 'Borracha antiderrapante com canaletas' },
        { chave: 'Proteção', valor: 'Contraforte reforçado no calcanhar e maléolo' },
        { chave: 'Impermeabilização', valor: 'Membrana respirável' },
        { chave: 'Fecho', valor: 'Zíper lateral + velcro de ajuste' },
        { chave: 'Forro', valor: 'Têxtil respirável' },
        { chave: 'Certificação', valor: 'EN 13634' },
      ];
    case 'luva':
      return [
        { chave: 'Palma', valor: 'Couro de cabra legítimo' },
        { chave: 'Dorso', valor: 'Tecido stretch com reforço em carbono' },
        { chave: 'Punho', valor: 'Fechamento em velcro duplo' },
        { chave: 'Proteção nos nós', valor: 'Slider externo em TPU' },
        { chave: 'Compatibilidade', valor: 'Touch screen no indicador' },
        { chave: 'Certificação', valor: 'EN 13594' },
      ];
    case 'capacete':
      return [
        { chave: 'Casco', valor: 'Policarbonato injetado' },
        { chave: 'Viseira', valor: 'Anti-risco e anti-embaçante' },
        { chave: 'Ventilação', valor: '5 entradas + 2 saídas de ar' },
        { chave: 'Forro interno', valor: 'Removível e lavável' },
        { chave: 'Peso médio', valor: '1.450g (tamanho M)' },
        { chave: 'Fivela', valor: 'Micrométrica' },
        { chave: 'Certificação', valor: 'INMETRO / DOT' },
      ];
    case 'segunda-pele':
      return [
        { chave: 'Tecido', valor: 'Poliamida com elastano' },
        { chave: 'Costuras', valor: 'Planas, sem atrito' },
        { chave: 'Proteção solar', valor: 'FPS 50+' },
        { chave: 'Secagem', valor: 'Rápida, tecnologia dry-touch' },
        { chave: 'Ajuste', valor: 'Compressão moderada' },
        { chave: 'Certificação', valor: 'OEKO-TEX' },
      ];
    default:
      return [
        { chave: 'Material', valor: 'Nylon balístico / Polipropileno' },
        { chave: 'Fixação', valor: 'Alças ajustáveis / velcro universal' },
        { chave: 'Visibilidade', valor: 'Detalhes refletivos 360°' },
        { chave: 'Encaixe', valor: 'Universal para a maioria dos modelos' },
      ];
  }
}

function mediaAvaliacoes(avaliacoes) {
  if (!avaliacoes || avaliacoes.length === 0) return null;
  const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
  return Math.round((soma / avaliacoes.length) * 10) / 10;
}

let proximoId = 1;
function criarProduto(dados) {
  const cat = porSlug(dados.categoriaSlug);
  const tipo = cat.tipo;
  const produto = {
    id: proximoId++,
    nome: dados.nome,
    slug: dados.slug,
    categoriaSlug: dados.categoriaSlug,
    genero: cat.genero,
    tipo,
    estilo: dados.estilo,
    estiloLabel: ESTILO_LABEL[dados.estilo],
    estacao: dados.estacao,
    estacaoLabel: ESTACAO_LABEL[dados.estacao],
    certificacao: dados.certificacao || 'ce1',
    certificacaoLabel: CERTIFICACAO_LABEL[dados.certificacao || 'ce1'],
    preco: dados.preco,
    descricao: dados.descricao,
    imagens: dados.imagens || imagensPara(tipo),
    cores: dados.cores || coresPadrao(tipo),
    tamanhos: dados.tamanhos || tamanhosPara(tipo),
    destaque: !!dados.destaque,
    maisVendido: !!dados.maisVendido,
    maisVendidoOrdem: dados.maisVendidoOrdem ?? Infinity,
    favoritoHome: !!dados.favoritoHome,
    favoritoOrdem: dados.favoritoOrdem ?? Infinity,
    novidade: !!dados.novidade,
    especificacoesRapidas: dados.especificacoesRapidas || especificacoesRapidas(tipo, dados.certificacao),
    recursos: dados.recursos || recursosPadrao(tipo),
    fichaTecnica: dados.fichaTecnica || fichaTecnicaPadrao(tipo),
    avaliacoes: dados.avaliacoes || [],
  };
  produto.avaliacaoMedia = mediaAvaliacoes(produto.avaliacoes) || 4.5;
  return produto;
}

const produtos = [
  // ---------- JAQUETAS MASCULINO ----------
  criarProduto({
    nome: 'Jaqueta Expedition', slug: 'jaqueta-expedition', categoriaSlug: 'jaquetas-masculino',
    estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce2', preco: 1099, destaque: true,
    maisVendido: true, maisVendidoOrdem: 2,
    descricao: 'Construída para a próxima travessia. Tecido Abrasion-Tough 600D com membrana impermeável removível, ventilação direcional e proteções CE Nível 2 nos joelhos e quadris. Pronta para o asfalto quente, a chuva fria e o off-road sujo — no mesmo dia.',
    imagens: ['/images/product-jacket.jpg', '/images/colecao-hero.jpg', '/images/testado-minas.jpg', '/images/institucional-detalhe.jpg'],
    recursos: [
      { icone: 'shield', titulo: 'Proteção CE Nível 2', descricao: 'Armaduras SAS-TEC nos joelhos e quadris, ajustáveis em altura.' },
      { icone: 'droplet', titulo: 'Membrana H2O Removível', descricao: 'Camada interna 20.000mm impermeável, removível em segundos.' },
      { icone: 'wind', titulo: 'Ventilação Direcional', descricao: 'Zíperes YKK frontais e traseiros canalizam ar onde importa.' },
      { icone: 'thermometer', titulo: '4 Estações Reais', descricao: 'Forro térmico zipável. De −5°C ao verão escaldante.' },
    ],
    fichaTecnica: [
      { chave: 'Tecido Principal', valor: 'Abrasion-Tough 600D Nylon ripstop' },
      { chave: 'Reforços', valor: 'Ombros e cotovelos em 900D' },
      { chave: 'Membrana', valor: 'Impermeável removível 20.000mm' },
      { chave: 'Forro Térmico', valor: 'Zipável, para até -5°C' },
      { chave: 'Proteções', valor: 'SAS-TEC CE Nível 2 (joelhos e quadris)' },
      { chave: 'Ventilação', valor: 'Zíperes YKK frontais e traseiros' },
      { chave: 'Ajustes', valor: 'Cintura, punhos e barra reguláveis' },
      { chave: 'Certificação', valor: 'EN 17092' },
      { chave: 'Conexões', valor: 'Zíper para acoplar à calça e formar macacão' },
    ],
    avaliacoes: [
      { autor: 'Marina Oliveira', localizacao: 'Curitiba · Ushuaia', nota: 5, comentario: 'Enfrentei sol, chuva e estrada de terra na mesma viagem e a jaqueta segurou tudo. A membrana removível faz muita diferença.' },
      { autor: 'Marina Oliveira', localizacao: 'Curitiba · Ushuaia', nota: 5, comentario: 'Ventilação direcional realmente funciona nos dias quentes — não esperava tanto conforto numa adventure.' },
      { autor: 'Marina Oliveira', localizacao: 'Curitiba · Ushuaia', nota: 4, comentario: 'Caimento excelente, só senti falta de mais um bolso interno para documentos.' },
    ],
  }),
  criarProduto({ nome: 'Expedition Cerrado', slug: 'expedition-cerrado', categoriaSlug: 'jaquetas-masculino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce2', preco: 599, descricao: 'Versão de entrada da linha Expedition, com o mesmo DNA off-road e reforços nos pontos de maior desgaste do cerrado brasileiro.' }),
  criarProduto({ nome: 'Travel 3', slug: 'travel-3', categoriaSlug: 'jaquetas-masculino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Feita para viagens longas: bolsos amplos, forro térmico destacável e ajuste ergonômico para horas de estrada.' }),
  criarProduto({ nome: 'Veler', slug: 'veler', categoriaSlug: 'jaquetas-masculino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Equilíbrio entre proteção e leveza para quem roda entre asfalto e trilha sem trocar de equipamento.' }),
  criarProduto({ nome: 'Iron 3', slug: 'iron-3', categoriaSlug: 'jaquetas-masculino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce2', preco: 599, descricao: 'Reforçada nos ombros e costas, pensada para quem enfrenta terrenos irregulares com carga extra.' }),
  criarProduto({ nome: 'One Sport', slug: 'one-sport', categoriaSlug: 'jaquetas-masculino', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, descricao: 'Corte esportivo e tecido perfurado para dias quentes na pista ou na cidade.' }),
  criarProduto({ nome: 'Strech', slug: 'strech', categoriaSlug: 'jaquetas-masculino', estilo: 'urbano', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Tecido com elastano nos pontos de movimento para máxima liberdade no trânsito da cidade.' }),
  criarProduto({ nome: 'Street Hoody', slug: 'street-hoody', categoriaSlug: 'jaquetas-masculino', estilo: 'urbano', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, favoritoHome: true, favoritoOrdem: 1, descricao: 'Proteção térmica com tecido laminado para enfrentar qualquer clima na estrada.' }),
  criarProduto({ nome: 'Puffer', slug: 'puffer', categoriaSlug: 'jaquetas-masculino', estilo: 'urbano', estacao: 'inverno', certificacao: 'ce1', preco: 599, descricao: 'Acolchoada para o frio intenso, sem abrir mão das proteções essenciais de pilotagem.' }),
  criarProduto({ nome: 'Rain Casual', slug: 'rain-casual', categoriaSlug: 'jaquetas-masculino', estilo: 'urbano', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Visual casual por fora, 100% impermeável por dentro — para não pegar chuva no trajeto de todo dia.' }),
  criarProduto({ nome: 'Guard 3', slug: 'guard-3', categoriaSlug: 'jaquetas-masculino', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce2', preco: 599, descricao: 'Voltada ao touring de longa distância, com proteção reforçada e bolsos para acessórios de viagem.' }),
  criarProduto({ nome: 'Super Air', slug: 'super-air-masculina', categoriaSlug: 'jaquetas-masculino', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, descricao: 'Malha 3D altamente ventilada para o calor do verão sem abrir mão da proteção.' }),
  criarProduto({ nome: 'Neo City', slug: 'neo-city', categoriaSlug: 'jaquetas-masculino', estilo: 'urbano', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Design urbano discreto que passa despercebido fora da moto, mas protege como uma jaqueta técnica.' }),

  // ---------- JAQUETAS FEMININO ----------
  criarProduto({ nome: 'Jaqueta Evo 4 Feminina', slug: 'evo-4-feminina', categoriaSlug: 'jaquetas-feminino', estilo: 'sport', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Modelagem feminina com proteção CE nos ombros e cotovelos, para o dia a dia esportivo.' }),
  criarProduto({ nome: 'Jaqueta Super Air Feminina', slug: 'super-air-feminina', categoriaSlug: 'jaquetas-feminino', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, descricao: 'Ventilação total para o verão, com caimento pensado para o corpo feminino.' }),
  criarProduto({ nome: 'Jaqueta Sport Naked Feminina', slug: 'sport-naked-feminina', categoriaSlug: 'jaquetas-feminino', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, descricao: 'Visual esportivo para quem pilota naked, com proteção discreta e leve.' }),
  criarProduto({ nome: 'Jaqueta Expedition Feminina', slug: 'expedition-feminina', categoriaSlug: 'jaquetas-feminino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce2', preco: 1099, destaque: true, descricao: 'A versão feminina da Expedition, com o mesmo tecido 600D e membrana impermeável removível.' }),

  // ---------- CALÇAS MASCULINO ----------
  criarProduto({ nome: 'Calça Ride Fit 2', slug: 'calca-ride-fit-2', categoriaSlug: 'calcas-masculino', estilo: 'classico', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, favoritoHome: true, favoritoOrdem: 2, maisVendido: true, maisVendidoOrdem: 4, descricao: 'Jeans de motociclismo com fibra de alta resistência para o uso diário.' }),
  criarProduto({ nome: 'Calça Jeans Ride 2 Masculino', slug: 'calca-jeans-ride-2-masculino', categoriaSlug: 'calcas-masculino', estilo: 'classico', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Reforço interno em fibra e proteções removíveis nos joelhos, com visual jeans tradicional.' }),

  // ---------- CALÇAS FEMININO ----------
  criarProduto({ nome: 'Calça Jeans Ride 2 Feminina', slug: 'calca-jeans-ride-2-feminina', categoriaSlug: 'calcas-feminino', estilo: 'classico', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Modelagem feminina com reforço em fibra de aramida e proteções nos joelhos.' }),
  criarProduto({ nome: 'Calça Dune Pro H2O', slug: 'calca-dune-pro-h2o', categoriaSlug: 'calcas-feminino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce2', preco: 899, destaque: true, descricao: 'Desenvolvida com pilotos de longa distância: testada de -5°C a 42°C, com membrana impermeável removível. A calça que você esquece de tirar.' }),

  // ---------- BOTAS MASCULINO ----------
  criarProduto({ nome: 'Bota Tourmark', slug: 'bota-tourmark', categoriaSlug: 'botas-masculino', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, maisVendido: true, maisVendidoOrdem: 3, descricao: 'Cano alto com proteção reforçada no maléolo, pensada para o off-road pesado.' }),
  criarProduto({ nome: 'Bota Sierra', slug: 'bota-sierra', categoriaSlug: 'botas-masculino', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Quatro pilotos, uma única bota do início ao fim — testada em Minas Gerais, sem reparos e sem reclamações.' }),
  criarProduto({ nome: 'Bota Race Track', slug: 'bota-race-track', categoriaSlug: 'botas-masculino', estilo: 'sport', estacao: 'verao', certificacao: 'ce2', preco: 599, descricao: 'Slider e proteção rígida no calcanhar para quem leva a pista a sério.' }),
  criarProduto({ nome: 'Bota Cruiser', slug: 'bota-cruiser', categoriaSlug: 'botas-masculino', estilo: 'classico', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Visual clássico em couro para o dia a dia, sem abrir mão da proteção certificada.' }),

  // ---------- BOTAS FEMININO ----------
  criarProduto({ nome: 'Bota Ride Feminina', slug: 'bota-ride-feminina', categoriaSlug: 'botas-feminino', estilo: 'urbano', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Cano curto e visual urbano, com proteção certificada para o trajeto diário.' }),

  // ---------- LUVAS MASCULINO ----------
  criarProduto({ nome: 'Luva Havoc', slug: 'luva-havoc', categoriaSlug: 'luvas-masculino', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, destaque: true, maisVendido: true, maisVendidoOrdem: 5, descricao: 'Reforço em carbono nos nós e perfurações no dorso para ventilação máxima em qualquer distância.' }),
  criarProduto({ nome: 'Luva Nitro Air', slug: 'luva-nitro-air', categoriaSlug: 'luvas-masculino', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, favoritoHome: true, favoritoOrdem: 3, descricao: 'Couro premium com reforço em carbono para máxima sensibilidade e controle.' }),
  criarProduto({ nome: 'Luva Combine', slug: 'luva-combine', categoriaSlug: 'luvas-masculino', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Equilíbrio entre proteção e conforto para combinar com qualquer jaqueta da linha touring.' }),

  // ---------- CAPACETES ----------
  criarProduto({ nome: 'Capacete Revo Jaguar', slug: 'capacete-revo-jaguar', categoriaSlug: 'capacetes', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, maisVendido: true, maisVendidoOrdem: 1, descricao: 'Grafismo exclusivo, viseira anti-risco e ventilação eficiente para o dia a dia esportivo.' }),
  criarProduto({ nome: 'Capacete Turner Prisma 2', slug: 'capacete-turner-prisma-2', categoriaSlug: 'capacetes', estilo: 'urbano', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Casco leve em policarbonato com forro removível e fivela micrométrica.' }),
  criarProduto({ nome: 'Capacete Trust Pro Transit', slug: 'capacete-trust-pro-transit', categoriaSlug: 'capacetes', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce2', preco: 599, descricao: 'Pensado para longas distâncias, com ventilação reforçada e viseira solar interna.' }),
  criarProduto({ nome: 'Capacete Revo Pro Eleven', slug: 'capacete-revo-pro-eleven', categoriaSlug: 'capacetes', estilo: 'sport', estacao: 'verao', certificacao: 'ce1', preco: 599, descricao: 'Aerodinâmica esportiva com acabamento premium e excelente custo-benefício.' }),

  // ---------- SEGUNDA PELE ----------
  criarProduto({ nome: 'Segunda Pele Climate 3', slug: 'segunda-pele-climate-3', categoriaSlug: 'segunda-pele-masculino', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Camada base térmica que regula a temperatura do corpo em qualquer estação do ano.' }),
  criarProduto({ nome: 'Segunda Pele Climate 3 Feminina', slug: 'segunda-pele-climate-3-feminina', categoriaSlug: 'segunda-pele-feminino', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Versão feminina da Climate 3, com o mesmo tecido térmico de costura plana.' }),

  // ---------- ACESSÓRIOS ----------
  criarProduto({ nome: 'Mochila Rider Expedition', slug: 'mochila-rider-expedition', categoriaSlug: 'acessorios', estilo: 'adventure', estacao: '4-estacoes', certificacao: 'ce1', preco: 599, descricao: 'Compartimentos impermeáveis e alças reforçadas para levar o essencial em qualquer viagem.' }),
  criarProduto({ nome: 'Protetor de Coluna Shield', slug: 'protetor-coluna-shield', categoriaSlug: 'acessorios', estilo: 'touring', estacao: '4-estacoes', certificacao: 'ce2', preco: 599, descricao: 'Placa certificada CE Nível 2, compatível com a maioria das jaquetas da linha.' }),
];

function todos() {
  return produtos;
}

function porSlugProduto(slug) {
  return produtos.find((p) => p.slug === slug);
}

module.exports = {
  produtos,
  todos,
  porSlugProduto,
  CERTIFICACAO_LABEL,
  ESTACAO_LABEL,
  ESTILO_LABEL,
};
