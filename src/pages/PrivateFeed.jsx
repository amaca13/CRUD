import React from 'react'
import { supabase } from '../App'
import PostCard from '../shared/PostCard'
import CreatePost from '../shared/CreatePost'

export default function PrivateFeed(){
  const [posts, setPosts] = React.useState([])
  async function load(){
    const userRes = await supabase.auth.getUser()
    const user = userRes.data.user
    if(!user) return
    const { data, error } = await supabase.from('posts').select('*').eq('user_id', user.id).order('inserted_at', {ascending:false})
    if(error) console.error(error)
    else setPosts(data)
  }
  React.useEffect(()=>{ load() },[])
  return (
    <div>
      <h2 className="text-xl mb-3">My Posts (Private)</h2>
      <div className="card mb-4">
        <CreatePost onCreated={p=> setPosts(prev=>[p,...prev])} />
      </div>
      <div className="space-y-4">
        {posts.length===0 && <div className="card">You have no posts yet.</div>}
        {posts.map(p=> <PostCard key={p.id} post={p} onDeleted={id=> setPosts(prev=>prev.filter(x=>x.id!==id))} />)}
      </div>
    </div>
  )
}
