import React from 'react'
import { supabase } from '../App'

export default function CreatePost({onCreated}){
  const [title,setTitle]=React.useState('')
  const [body,setBody]=React.useState('')
  const [isPublic,setIsPublic]=React.useState(false)
  const [file,setFile]=React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    const user = (await supabase.auth.getUser()).data.user
    if(!user){ alert('Please sign in'); setLoading(false); return }

    let media_path = null
    let media_type = null
    if(file){
      const filename = `${user.id}/${Date.now()}_${file.name}`
      const { error: upErr } = await supabase.storage.from('uploads').upload(filename, file, { cacheControl: '3600', upsert: false })
      if(upErr){ alert(upErr.message); setLoading(false); return }
      media_path = filename
      media_type = file.type.startsWith('video') ? 'video' : 'image'
    }

    const { data, error } = await supabase.from('posts').insert([{ title, body, is_public: isPublic, user_id: user.id, media_path, media_type }]).select().single()
    if(error) alert(error.message)
    else {
      setTitle(''); setBody(''); setFile(null); setIsPublic(false)
      onCreated && onCreated(data)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full p-2 border rounded" placeholder="Write something..." rows="4" value={body} onChange={e=>setBody(e.target.value)} />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} /> Public</label>
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-sky-600 text-white" disabled={loading}>{loading ? 'Posting...' : 'Create'}</button>
      </div>
    </form>
  )
}
