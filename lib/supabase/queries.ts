import { createClient } from "./browserClient"
import { type QueryData } from '@supabase/supabase-js'

export const getHomeEvents = async (supabase: ReturnType<typeof createClient>) => {

  return await supabase.from("events")
    .select('title, id, slug, image, latitude, longitude, adress, date, author("username")')
    .order('created_at', { ascending: false })
}
export type HomeEventsType = QueryData<ReturnType<typeof getHomeEvents>>;


export const getSingleEvent = async (slug: string) => {
  const supabase = createClient()
  return await supabase.from("events")
    .select('id, title, content, adress, date, image, author("id", "username")')
    .eq('slug', slug)
    .single()
}
export type SingleEventType = QueryData<ReturnType<typeof getSingleEvent>>


export const searchEvents = async (searchTerm: string) => {
  const supabase = createClient()
  return await supabase.from("events")
    .select('title, slug')
    .textSearch('title', searchTerm)

}
export type SearchEventsType = QueryData<ReturnType<typeof searchEvents>>

export const getComment = async (eventid: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from("comments")
    .select('content, id, userid("id", "username")')
    .eq("eventid", eventid)
    .order('created_at', { ascending: false })
    if(error) console.log("Error", error)
      return data
}
export type CommentType = QueryData<ReturnType<typeof getComment>>

