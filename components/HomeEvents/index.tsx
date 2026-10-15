'use client'
import { HomeEventsType } from "@/lib/supabase/queries"
import Link from "next/link"
import { createClient } from "@/lib/supabase/browserClient"

const HomeEvents = ({ events, limit = 6 }: { events: HomeEventsType, limit?: number }) => {

  const supabase = createClient()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {events.slice(0, limit).map(event =>
        <Link
          className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-surface bg-background transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          key={event.id}
          href={`/${event.slug}`} >
          <div className='relative aspect-4/3 overflow-hidden bg-surface'>
            {event.image ? (
              <img
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                src={event.image}
                alt={event.title} />
            ) : <img src="/images/midsommarkransen.jpeg" alt="Placeholder image" />
            }

            {event.date && (
              <div className="absolute left-3 top-3 rounded-lg bg-background/95 px-3 py-2 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {new Date(`${event.date}T12:00:00`).toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    weekday: "long"
                  })}
                </p>
              </div>)}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-text transition-colors group-hover:text-primary sm:text-xl">
              {event.title}
            </h3>
            <div className="flex justify-between items-center mt-3">
              {event.category && (
                <div className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  {event.category.replace("-", " & ")}
                </div>
              )}
              <p className="text-sm font-medium text-text/70">
                Av: <span className="font-semibold text-secondary">{event.author.username}</span>
              </p>
            </div>
          </div>
        </Link>)}
    </div>
  )

}

export default HomeEvents


