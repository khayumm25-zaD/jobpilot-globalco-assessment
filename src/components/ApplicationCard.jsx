import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import { formatDate } from '../lib/format'

export default function ApplicationCard({ item, onEdit, onDelete }) {
  return <article className="app-card">
    <div className="app-top">
      <div className="company-logo">{item.company?.slice(0,1).toUpperCase()}</div>
      <div className="app-title"><h3>{item.role}</h3><p>{item.company} · {item.location || 'Location not set'}</p></div>
      <span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span>
    </div>
    <div className="app-meta"><span>Applied {formatDate(item.applied_date)}</span>{item.salary && <span>{item.salary}</span>}</div>
    {item.notes && <p className="notes">{item.notes}</p>}
    <div className="card-actions">
      {item.job_url && <a className="secondary small" href={item.job_url} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Job post</a>}
      <button className="secondary small" onClick={()=>onEdit(item)}><Pencil size={14}/> Edit</button>
      <button className="danger small" onClick={()=>onDelete(item.id)}><Trash2 size={14}/> Delete</button>
    </div>
  </article>
}
