const lojas = [
  { id: 1, nome: 'X11 Store Belo Horizonte', endereco: 'Av. do Contorno, 4520 - Funcionários', cidade: 'Belo Horizonte', estado: 'MG', telefone: '(31) 3333-1001' },
  { id: 2, nome: 'Moto Gear BH Motos', endereco: 'Av. Cristiano Machado, 2100', cidade: 'Belo Horizonte', estado: 'MG', telefone: '(31) 3333-1002' },
  { id: 3, nome: 'Rota Norte Equipamentos', endereco: 'Rua Pará, 880 - Savassi', cidade: 'Belo Horizonte', estado: 'MG', telefone: '(31) 3333-1003' },
  { id: 4, nome: 'X11 Store São Paulo', endereco: 'Av. Rebouças, 1200', cidade: 'São Paulo', estado: 'SP', telefone: '(11) 3333-2001' },
  { id: 5, nome: 'Duas Rodas Equipamentos', endereco: 'Av. Paulista, 900', cidade: 'São Paulo', estado: 'SP', telefone: '(11) 3333-2002' },
  { id: 6, nome: 'Ride Shop Campinas', endereco: 'Av. Norte-Sul, 340', cidade: 'Campinas', estado: 'SP', telefone: '(19) 3333-2003' },
  { id: 7, nome: 'X11 Store Rio de Janeiro', endereco: 'Av. das Américas, 4200', cidade: 'Rio de Janeiro', estado: 'RJ', telefone: '(21) 3333-3001' },
  { id: 8, nome: 'Asfalto Quente Motoequipamentos', endereco: 'Rua Voluntários da Pátria, 550', cidade: 'Rio de Janeiro', estado: 'RJ', telefone: '(21) 3333-3002' },
  { id: 9, nome: 'X11 Store Curitiba', endereco: 'Av. Sete de Setembro, 3100', cidade: 'Curitiba', estado: 'PR', telefone: '(41) 3333-4001' },
  { id: 10, nome: 'Estrada Livre Moto Center', endereco: 'Rua Marechal Deodoro, 780', cidade: 'Curitiba', estado: 'PR', telefone: '(41) 3333-4002' },
  { id: 11, nome: 'X11 Store Porto Alegre', endereco: 'Av. Ipiranga, 6681', cidade: 'Porto Alegre', estado: 'RS', telefone: '(51) 3333-5001' },
  { id: 12, nome: 'Sul Rider Equipamentos', endereco: 'Av. Assis Brasil, 2200', cidade: 'Porto Alegre', estado: 'RS', telefone: '(51) 3333-5002' },
  { id: 13, nome: 'X11 Store Goiânia', endereco: 'Av. T-7, 1450 - Setor Bueno', cidade: 'Goiânia', estado: 'GO', telefone: '(62) 3333-6001' },
  { id: 14, nome: 'Cerrado Motos Acessórios', endereco: 'Av. Anhanguera, 3300', cidade: 'Goiânia', estado: 'GO', telefone: '(62) 3333-6002' },
  { id: 15, nome: 'X11 Store Salvador', endereco: 'Av. Tancredo Neves, 1200', cidade: 'Salvador', estado: 'BA', telefone: '(71) 3333-7001' },
  { id: 16, nome: 'Costa Rider Moto Shop', endereco: 'Av. Oceânica, 890', cidade: 'Salvador', estado: 'BA', telefone: '(71) 3333-7002' },
];

function porEstado(estado) {
  if (!estado) return lojas;
  return lojas.filter((l) => l.estado === estado);
}

function estadosDisponiveis() {
  return [...new Set(lojas.map((l) => l.estado))].sort();
}

module.exports = { lojas, porEstado, estadosDisponiveis };
