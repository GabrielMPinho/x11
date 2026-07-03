import { Link } from 'react-router-dom';
import { useCompare } from '../hooks/useCompare';

export default function CompareBadge() {
  const { ids } = useCompare();
  if (ids.length === 0) return null;

  return (
    <div className="compare-badge show">
      <span>{ids.length} produto(s) para comparar</span>
      <Link to="/comparar" className="btn btn-primary btn-sm">Comparar</Link>
    </div>
  );
}
