import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import PublicFeed from './pages/PublicFeed'
import PrivateFeed from './pages/PrivateFeed'
import AuthPanel from './components/AuthPanel'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export { supabase }

export default function App(){
  const [user, setUser] = React.useState(null)

  React.useEffect(()=>{
    supabase.auth.getSession().then(({data}) => setUser(data.session?.user ?? null))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => sub.subscription.unsubscribe()
  },[])

  return (
    <div className="container">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Amaca Supabase Social</h1>
        <nav className="space-x-4">
          <Link to="/public" className="text-sky-600 hover:underline">Public</Link>
          <Link to="/private" className="text-sky-600 hover:underline">Private</Link>
        </nav>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <Routes>
            <Route path="/" element={<Navigate to='/public' replace/>} />
            <Route path="/public" element={<PublicFeed />} />
            <Route path="/private" element={ user ? <PrivateFeed /> : <Navigate to='/public' replace/> } />
          </Routes>
        </section>

        <aside className="space-y-4">
          <div className="card">
            <AuthPanel supabase={supabase} user={user} />
          </div>
          <div className="card text-xs text-slate-500">
            <strong>Notes</strong>
            <ul className="list-disc ml-5">
              <li>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify.</li>
              <li>Create Supabase bucket named <code>uploads</code> (public recommended for this assignment).</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="mt-6 text-center text-sm text-slate-500">Submission name: <strong>AMACA_supabase_social</strong></footer>
    </div>
  )
}
