import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const CHAVE = 'x11_compare';
const MAX_ITENS = 4;

function lerIds(): number[] {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) || '[]');
    return Array.isArray(dados) ? dados.map(Number) : [];
  } catch {
    return [];
  }
}

interface CompareContextValue {
  ids: number[];
  isSelected: (id: number) => boolean;
  toggle: (id: number) => void;
  remove: (id: number) => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>(() => lerIds());

  useEffect(() => {
    const onStorage = () => setIds(lerIds());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const salvar = useCallback((novos: number[]) => {
    localStorage.setItem(CHAVE, JSON.stringify(novos));
    setIds(novos);
  }, []);

  const toggle = useCallback((id: number) => {
    setIds((atual) => {
      let novos: number[];
      if (atual.includes(id)) {
        novos = atual.filter((i) => i !== id);
      } else {
        novos = atual.length >= MAX_ITENS ? [...atual.slice(1), id] : [...atual, id];
      }
      localStorage.setItem(CHAVE, JSON.stringify(novos));
      return novos;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setIds((atual) => {
      const novos = atual.filter((i) => i !== id);
      localStorage.setItem(CHAVE, JSON.stringify(novos));
      return novos;
    });
  }, []);

  const isSelected = useCallback((id: number) => ids.includes(id), [ids]);

  return (
    <CompareContext.Provider value={{ ids, isSelected, toggle, remove }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare deve ser usado dentro de <CompareProvider>');
  return ctx;
}
