import { useState } from 'react'
import { STATUSES } from '../lib/format'

const initial = { company:'', role:'', location:'', job_url:'', status:'Applied', salary:'', notes:'', applied_date:new Date().toISOString().slice(0,10) }

export default function ApplicationForm({ initialValue, onSave, onClose }) {
  const [form, setForm] = useState(initialValue || initial)
  const [busy, setBusy] = useState(false)
  const update = (key, value) => setForm(f=>({...f,[key]:value}))

  const submit = async e => {
    e.preventDefault(); setBusy(true)
    try { await onSave(form) } finally { setBusy(false) }
  }

  return <form onSubmit={submit} className="stack">
    <div className="grid-2">
      <label>Company<input required value={form.company} onChange={e=>update('company',e.target.value)}/></label>
      <label>Role<input required value={form.role} onChange={e=>update('role',e.target.value)}/></label>
      <label>Location<input value={form.location} onChange={e=>update('location',e.target.value)} placeholder="Hyderabad / Remote"/></label>
      <label>Status<select value={form.status} onChange={e=>update('status',e.target.value)}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
      <label>Applied date<input type="date" value={form.applied_date} onChange={e=>update('applied_date',e.target.value)}/></label>
      <label>Salary<input value={form.salary} onChange={e=>update('salary',e.target.value)} placeholder="Optional"/></label>
    </div>
    <label>Job URL<input type="url" value={form.job_url} onChange={e=>update('job_url',e.target.value)} placeholder="https://..."/></label>
    <label>Notes<textarea rows="4" value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder="Recruiter contact, next step, preparation notes…"/></label>
    <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary" disabled={busy}>{busy?'Saving…':'Save application'}</button></div>
  </form>
}
