export default function StatusBadge({status}){return <span className={`badge ${status?.toLowerCase()}`}>{status?.replaceAll('_',' ')}</span>}
