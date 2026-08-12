import { Briefcase, CalendarClock, CheckCircle2, CircleX, TrendingUp } from 'lucide-react'

export default function Dashboard({ applications }) {
  const count = status => applications.filter(a=>a.status===status).length
  const interviewRate = applications.length ? Math.round((count('Interview') + count('Offer')) / applications.length * 100) : 0
  const stats = [
    ['Total applications', applications.length, Briefcase],
    ['Interviews', count('Interview'), CalendarClock],
    ['Offers', count('Offer'), CheckCircle2],
    ['Rejected', count('Rejected'), CircleX]
  ]
  return <section className="dashboard">
    <div className="stat-grid">{stats.map(([label,value,Icon])=><div className="stat-card" key={label}><div className="stat-icon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong></div></div>)}</div>
    <div className="insight-card"><TrendingUp size={20}/><div><strong>{interviewRate}% interview/offer conversion</strong><p>Keep your pipeline updated to make this metric meaningful.</p></div></div>
  </section>
}
