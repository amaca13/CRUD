import React from 'react'
import { supabase } from '../App'
import PostCard from '../shared/PostCard'

export default function PublicFeed(){
  const [posts, setPosts] = React.useState([])
  async function load(){
    const { data, error } = await supabase.from('posts').select('*').order('inserted_at', {ascending:false})
    if(error) console.error(error)
    else setPosts(data.filter(p=>p.is_public))
  }
  React.useEffect(()=>{ load() },[])
  return (
    <div>
      <h2 className="text-xl mb-3">Public Feed</h2>
      <div className="space-y-4">
        {posts.length===0 && <div className="card">No public posts yet.</div>}
        {posts.map(p=> <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  )
}
