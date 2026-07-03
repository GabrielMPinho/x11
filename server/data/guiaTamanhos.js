const tabelas = {
  vestuario: {
    titulo: 'Jaquetas, calças e segunda pele',
    colunas: ['Tamanho', 'Peito (cm)', 'Cintura (cm)', 'Quadril (cm)'],
    linhas: [
      ['P', '92-96', '78-82', '92-96'],
      ['M', '97-101', '83-87', '97-101'],
      ['G', '102-106', '88-92', '102-106'],
      ['GG', '107-111', '93-97', '107-111'],
      ['3G', '112-116', '98-102', '112-116'],
      ['4G', '117-121', '103-107', '117-121'],
    ],
  },
  bota: {
    titulo: 'Botas',
    colunas: ['Tamanho (BR)', 'Comprimento do pé (cm)'],
    linhas: [
      ['38', '24,5'], ['39', '25,2'], ['40', '25,9'], ['41', '26,6'],
      ['42', '27,3'], ['43', '28,0'], ['44', '28,7'],
    ],
  },
  luva: {
    titulo: 'Luvas',
    colunas: ['Tamanho', 'Contorno da mão (cm)'],
    linhas: [['P', '18-19'], ['M', '20-21'], ['G', '22-23'], ['GG', '24-25']],
  },
  capacete: {
    titulo: 'Capacetes',
    colunas: ['Tamanho', 'Contorno da cabeça (cm)'],
    linhas: [['56', '55-56'], ['58', '57-58'], ['60', '59-60'], ['62', '61-62']],
  },
};

function porTipo(tipo) {
  if (tipo === 'jaqueta' || tipo === 'calca' || tipo === 'segunda-pele') return tabelas.vestuario;
  return tabelas[tipo] || tabelas.vestuario;
}

module.exports = { tabelas, porTipo };
