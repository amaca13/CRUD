import React from 'react'
import { supabase } from '../App'

export default function AuthPanel({supabase: sb, user}){
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function signUp(){ const { error } = await sb.auth.signUp({ email, password }); if(error) alert(error.message); else alert('Check email for confirmation if required.') }
  async function signIn(){ const { error } = await sb.auth.signInWithPassword({ email, password }); if(error) alert(error.message) }
  async function signOut(){ await sb.auth.signOut(); window.location.reload() }

  if(user){
    return (
      <div>
        <div className="text-sm">Signed in as <strong>{user.email}</strong></div>
        <div className="mt-3">
          <button onClick={signOut} className="w-full py-2 rounded bg-slate-100 hover:bg-slate-200">Sign out</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-medium mb-2">Sign in / Sign up</h3>
      <input className="w-full mb-2 p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={signIn} className="flex-1 py-2 rounded bg-sky-600 text-white">Sign in</button>
        <button onClick={signUp} className="flex-1 py-2 rounded border">Sign up</button>
      </div>
    </div>
  )
}
