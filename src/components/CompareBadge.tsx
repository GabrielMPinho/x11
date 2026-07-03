import { Link } from 'react-router-dom';
import { useCompare } from '../hooks/useCompare';

export default function CompareBadge() {
  const { ids } = useCompare();
  if (ids.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 flex items-center gap-2.5 bg-orange text-white px-5 py-3 rounded-[30px] text-[0.85rem] tracking-[0.5px] z-[300] shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
      style={{ fontFamily: 'var(--font-head)' }}
    >
      <span>{ids.length} produto(s) para comparar</span>
      <Link to="/comparar" className="btn btn-primary btn-sm">Comparar</Link>
    </div>
  );
}
