import { useEffect, useState } from 'react';
import { buscarGuiaTamanhos } from '../../api';
import type { TabelaTamanhos } from '../../types';

export default function GuiaEquipamento() {
  const [tabelas, setTabelas] = useState<Record<string, TabelaTamanhos> | null>(null);

  useEffect(() => {
    document.title = 'Guia de Equipamento · X11 Expert Riders';
    buscarGuiaTamanhos().then((d) => setTabelas(d.tabelas));
  }, []);

  if (!tabelas) return null;

  return (
    <>
      <section className="cat-hero" style={{ backgroundImage: "url('/images/colecao-hero.jpg')" }}>
        <div className="container">
          <span className="eyebrow">Encontre o caimento certo</span>
          <h1>Guia de Equipamento</h1>
        </div>
      </section>

      <div className="container section">
        <p style={{ color: 'var(--gray-1)', maxWidth: 640, marginBottom: 40 }}>
          Meça-se antes de escolher o tamanho: use uma fita métrica sem apertar e compare com as tabelas abaixo.
          Em caso de medida entre dois tamanhos, prefira o maior.
        </p>

        {Object.values(tabelas).map((tab) => (
          <div className="ficha-tecnica" key={tab.titulo}>
            <h2>{tab.titulo}</h2>
            <table>
              <thead>
                <tr>
                  {tab.colunas.map((c) => (
                    <th key={c} style={{ color: 'var(--orange)', textTransform: 'uppercase', fontSize: '0.75rem', textAlign: 'left', padding: 10 }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tab.linhas.map((linha, i) => (
                  <tr key={i}>{linha.map((v, j) => <td key={j}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
