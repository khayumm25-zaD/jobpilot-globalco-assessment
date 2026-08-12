import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  BriefcaseBusiness,
  LogOut,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'

import Auth from './components/Auth'
import Modal from './components/Modal'
import ApplicationForm from './components/ApplicationForm'
import ApplicationCard from './components/ApplicationCard'
import Dashboard from './components/Dashboard'
import AIAnalyzer from './components/AIAnalyzer'
import { supabase } from './lib/supabase'

const demo = [
  {
    id: 'demo-1',
    company: 'Globalco Advanced',
    role: 'Software Engineer',
    location: 'Hyderabad',
    status: 'Assessment',
    salary: '₹6–8 LPA',
    applied_date: '2026-08-10',
    notes: 'Complete project assessment.',
  },
  {
    id: 'demo-2',
    company: 'TechNova',
    role: 'AI Prompt Engineer Intern',
    location: 'Hyderabad',
    status: 'Interview',
    salary: '₹25k/month',
    applied_date: '2026-08-08',
    notes: 'Prepare LLM evaluation examples.',
  },
]

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])
  const [tab, setTab] = useState('applications')
  const [modal, setModal] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  // --------------------------------------------------
  // AUTHENTICATION
  // --------------------------------------------------

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      setApplications(demo)
      return
    }

    let mounted = true

    async function initializeAuth() {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error('Session error:', error)
      }

      if (mounted) {
        setSession(currentSession)
        setLoading(false)
      }
    }

    initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // --------------------------------------------------
  // LOAD APPLICATIONS
  // --------------------------------------------------

  useEffect(() => {
    if (session) {
      loadApplications()
    }
  }, [session])

  async function loadApplications() {
    if (!supabase || !session) {
      return
    }

    try {
      const {
        data,
        error,
      } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('applied_date', {
          ascending: false,
        })

      if (error) {
        console.error('Load applications error:', error)
        return
      }

      setApplications(data || [])
    } catch (error) {
      console.error('Unexpected load error:', error)
    }
  }

  // --------------------------------------------------
  // CREATE / UPDATE APPLICATION
  // --------------------------------------------------

  async function saveApplication(form) {
    // Demo mode
    if (!supabase || !session) {
      const item = {
        ...form,
        id: crypto.randomUUID(),
      }

      setApplications((current) => [item, ...current])
      setModal(null)

      return
    }

    try {
      // UPDATE
      if (modal?.item?.id) {
        const {
          data,
          error,
        } = await supabase
          .from('applications')
          .update(form)
          .eq('id', modal.item.id)
          .eq('user_id', session.user.id)
          .select()
          .single()

        if (error) {
          console.error('Update application error:', error)
          throw error
        }

        setApplications((current) =>
          current.map((item) =>
            item.id === modal.item.id ? data : item
          )
        )
      }

      // CREATE
      else {
        const {
          data,
          error,
        } = await supabase
          .from('applications')
          .insert({
            ...form,
            user_id: session.user.id,
          })
          .select()
          .single()

        if (error) {
          console.error('Create application error:', error)
          throw error
        }

        setApplications((current) => [data, ...current])
      }

      setModal(null)
    } catch (error) {
      console.error('Save application error:', error)

      alert(
        `Unable to save application:\n${
          error?.message || 'Unknown error'
        }`
      )
    }
  }

  // --------------------------------------------------
  // DELETE APPLICATION
  // --------------------------------------------------

  async function deleteApplication(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    )

    if (!confirmed) {
      return
    }

    // Demo mode
    if (!supabase || !session || id.startsWith('demo-')) {
      setApplications((current) =>
        current.filter((item) => item.id !== id)
      )

      return
    }

    try {
      console.log('Deleting application:', id)

      const {
        data,
        error,
      } = await supabase
        .from('applications')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select('id')
        .maybeSingle()

      if (error) {
        console.error('Delete application error:', error)

        alert(
          `Unable to delete application:\n${error.message}`
        )

        return
      }

      if (!data) {
        console.error('No application deleted.', {
          applicationId: id,
          userId: session.user.id,
        })

        alert(
          'The application could not be deleted because no matching record was found for your account.'
        )

        return
      }

      console.log('Application deleted successfully:', data)

      // Reload directly from Supabase
      await loadApplications()
    } catch (error) {
      console.error('Unexpected delete error:', error)

      alert(
        `Unexpected error while deleting application:\n${
          error?.message || 'Unknown error'
        }`
      )
    }
  }

  // --------------------------------------------------
  // SEARCH + FILTER
  // --------------------------------------------------

  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase().trim()

    return applications.filter((application) => {
      const matchesStatus =
        status === 'All' ||
        application.status === status

      const searchableText = `
        ${application.company || ''}
        ${application.role || ''}
        ${application.location || ''}
      `.toLowerCase()

      const matchesSearch =
        searchableText.includes(searchTerm)

      return matchesStatus && matchesSearch
    })
  }, [applications, status, search])

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="loading">
        Loading JobPilot…
      </div>
    )
  }

  // --------------------------------------------------
  // AUTH SCREEN
  // --------------------------------------------------

  if (supabase && !session) {
    return <Auth supabase={supabase} />
  }

  const userName =
    session?.user?.user_metadata?.full_name ||
    'Developer'

  // --------------------------------------------------
  // MAIN APPLICATION
  // --------------------------------------------------

  return (
    <div className="app-shell">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <span className="brand-icon">
            <BriefcaseBusiness size={21} />
          </span>

          JobPilot
        </div>

        <nav>

          <button
            className={
              tab === 'applications'
                ? 'active'
                : ''
            }
            onClick={() =>
              setTab('applications')
            }
          >
            <BriefcaseBusiness size={18} />
            Applications
          </button>

          <button
            className={
              tab === 'dashboard'
                ? 'active'
                : ''
            }
            onClick={() =>
              setTab('dashboard')
            }
          >
            <BarChart3 size={18} />
            Dashboard
          </button>

          <button
            className={
              tab === 'ai'
                ? 'active'
                : ''
            }
            onClick={() =>
              setTab('ai')
            }
          >
            <Sparkles size={18} />
            AI Job Match
          </button>

        </nav>

        <div className="sidebar-foot">

          <div className="user-mini">

            <div className="avatar">
              {userName
                .slice(0, 1)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {userName}
              </strong>

              <span>
                Candidate
              </span>
            </div>

          </div>

          {supabase && (
            <button
              className="logout"
              onClick={() =>
                supabase.auth.signOut()
              }
            >
              <LogOut size={16} />
              Sign out
            </button>
          )}

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main">

        {/* AI */}

        {tab === 'ai' ? (
          <AIAnalyzer />
        ) : tab === 'dashboard' ? (

          /* DASHBOARD */

          <>
            <div className="page-title">

              <div>
                <h1>
                  Dashboard
                </h1>

                <p>
                  A quick view of your job search pipeline.
                </p>
              </div>

              <button
                className="primary"
                onClick={() =>
                  setModal({
                    type: 'add',
                  })
                }
              >
                <Plus size={17} />
                Add application
              </button>

            </div>

            <Dashboard
              applications={applications}
            />
          </>

        ) : (

          /* APPLICATIONS */

          <>

            <div className="page-title">

              <div>
                <h1>
                  Applications
                </h1>

                <p>
                  Track every opportunity from application to offer.
                </p>
              </div>

              <button
                className="primary"
                onClick={() =>
                  setModal({
                    type: 'add',
                  })
                }
              >
                <Plus size={17} />
                Add application
              </button>

            </div>

            {/* SEARCH + FILTER */}

            <div className="toolbar">

              <div className="search">

                <Search size={17} />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search company, role, location…"
                />

              </div>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="All">
                  All
                </option>

                <option value="Applied">
                  Applied
                </option>

                <option value="Assessment">
                  Assessment
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

            </div>

            {/* APPLICATION CARDS */}

            {filtered.length > 0 ? (

              <div className="cards">

                {filtered.map((item) => (

                  <ApplicationCard
                    key={item.id}
                    item={item}
                    onEdit={(application) =>
                      setModal({
                        type: 'edit',
                        item: application,
                      })
                    }
                    onDelete={deleteApplication}
                  />

                ))}

              </div>

            ) : (

              <div className="empty">

                <BriefcaseBusiness size={30} />

                <h3>
                  No applications found
                </h3>

                <p>
                  Add your first application to start tracking.
                </p>

              </div>

            )}

          </>

        )}

      </main>

      {/* ADD / EDIT MODAL */}

      {modal && (

        <Modal
          title={
            modal.type === 'edit'
              ? 'Edit application'
              : 'Add application'
          }
          onClose={() =>
            setModal(null)
          }
        >

          <ApplicationForm
            initialValue={modal.item}
            onSave={saveApplication}
            onClose={() =>
              setModal(null)
            }
          />

        </Modal>

      )}

    </div>
  )
}