'use client'
import { HomeEventsType } from "@/lib/supabase/queries"
import Link from "next/link"
import { createClient } from "@/lib/supabase/browserClient"

const HomeEvents = ({ events }: { events: HomeEventsType }) => {

  const supabase = createClient()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {events.map(event =>
        <Link
          className="group flex flex-col justify-between p-5 bg-background border border-surface rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 ease-in-out hover:-translate-y-0.5 overflow-hidden"
          key={event.id}
          href={`/${event.slug}`} >
          <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors line-clamp-2">{event.title}</h3>
          <div className='flex flex-col gap-3'>
            {event.image && (
              <div className='w-full h-48 rounded-xl overflow-hidden bg-surface/50'>
                <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' src={event.image} alt={event.title} />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-4">
            {event.date && (
              <div className="flex flex-col items-center justify-center min-w-16 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2">
                🗓️ {new Date(`${event.date}T12:00:00`).toLocaleDateString("sv-SE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long"
                })}
              </div>)}
          </div>
          <p className="mt-4 text-sm font-medium text-text/70 group-hover:text-secondary transition-colors self-start">
            av: <span className="font-semibold text-secondary">{event.author.username}</span>
          </p>
        </Link>)}
    </div>
  )

}

export default HomeEvents


