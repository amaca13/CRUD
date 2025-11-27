import React from 'react'
import { supabase } from '../App'

export default function PostCard({post, onDeleted}){
  const [url, setUrl] = React.useState(null)
  React.useEffect(()=>{
    if(post.media_path){
      const { publicURL } = supabase.storage.from('uploads').getPublicUrl(post.media_path)
      setUrl(publicURL)
    }
  },[post])

  async function handleDelete(){
    const { error } = await supabase.from('posts').delete().eq('id', post.id)
    if(error) alert(error.message)
    else onDeleted && onDeleted(post.id)
  }

  return (
    <article className="card">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{post.title || 'Untitled'}</h3>
        <span className="text-xs text-slate-400">{new Date(post.inserted_at).toLocaleString()}</span>
      </div>
      <p className="mt-2 text-sm text-slate-700">{post.body}</p>
      {url && post.media_type === 'image' && <img src={url} alt="" className="mt-3 rounded max-h-60 object-contain" />}
      {url && post.media_type === 'video' && <video src={url} controls className="mt-3 rounded max-h-60" />}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-500">By: {post.user_id.slice(0,8)}</div>
        <div className="flex gap-2">
          <button onClick={handleDelete} className="text-sm px-3 py-1 border rounded">Delete</button>
        </div>
      </div>
    </article>
  )
}
