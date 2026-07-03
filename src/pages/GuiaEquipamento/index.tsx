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
      <section
        className="relative h-[260px] flex items-end bg-cover bg-center py-[30px] before:content-[''] before:absolute before:inset-0 before:bg-black/55"
        style={{ backgroundImage: "url('/images/colecao-hero.jpg')" }}
      >
        <div className="container-x11 relative">
          <span className="eyebrow">Encontre o caimento certo</span>
          <h1>Guia de Equipamento</h1>
        </div>
      </section>

      <div className="container-x11 section">
        <p className="text-gray-1 max-w-[640px] mb-10">
          Meça-se antes de escolher o tamanho: use uma fita métrica sem apertar e compare com as tabelas abaixo.
          Em caso de medida entre dois tamanhos, prefira o maior.
        </p>

        {Object.values(tabelas).map((tab) => (
          <div className="my-[60px]" key={tab.titulo}>
            <h2>{tab.titulo}</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {tab.colunas.map((c) => (
                    <th key={c} className="text-orange uppercase text-[0.75rem] text-left p-2.5">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tab.linhas.map((linha, i) => (
                  <tr key={i}>{linha.map((v, j) => <td key={j} className="p-2.5 border-b border-border text-[0.9rem]">{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
