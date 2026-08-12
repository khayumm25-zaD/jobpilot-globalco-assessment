import { useState } from 'react'
import { BriefcaseBusiness, Lock, Mail, UserRound } from 'lucide-react'

export default function Auth({ supabase }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setMessage('')
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email, password: form.password
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } }
        })
        if (error) throw error
        setMessage('Account created. Check your email if confirmation is enabled.')
        setMode('login')
      }
    } catch (err) {
      setMessage(err.message)
    } finally { setBusy(false) }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="brand"><span className="brand-icon"><BriefcaseBusiness size={22}/></span> JobPilot</div>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="muted">Track applications. Understand your fit. Move faster.</p>
        <form onSubmit={submit} className="stack">
          {mode === 'signup' && (
            <label>Full name<div className="input-wrap"><UserRound size={17}/><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div></label>
          )}
          <label>Email<div className="input-wrap"><Mail size={17}/><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div></label>
          <label>Password<div className="input-wrap"><Lock size={17}/><input required minLength="6" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div></label>
          {message && <div className="alert">{message}</div>}
          <button className="primary" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
        <button className="link-btn" onClick={()=>{setMode(mode==='login'?'signup':'login');setMessage('')}}>
          {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </section>
    </main>
  )
}
