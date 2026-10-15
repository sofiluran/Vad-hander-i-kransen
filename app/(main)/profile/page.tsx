import MapWrapper from "@/components/EventMap/mapWrapper"
import { getUserEvents } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"


const Profile = async () => {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userEvents = user ? await getUserEvents(user.id) : null


  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6">
      {user && <div >
        <div className="bg-surface/40 border border-surface rounded-2xl p-6 flex flex-col gap-2 shadow-sm mb-4" >
          <h1 className="text-2xl font-bold text-primary tracking-tight">Min Profil</h1>
          <p className="text-sm text-text/70">
            Inloggad som: <span className="font-semibold text-text">{user.email}</span>
          </p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-text">Mina event: </h2>

          {userEvents?.data && userEvents?.data.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {userEvents.data.map(event => (
                <Link
                  href={`/${event.slug}`}
                  key={event.id}
                  className="group rounded-2xl border border-surface bg-surface/40 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
                  <div className="flex  flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-bold text-text transition-colors group-hover:text-primary">{event.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text/60">
                      {new Date(`${event.date}T12:00:00`).toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long"
                      })}
                    </div>
                    <span className="mt-1 text-sm font-semibold text-primary">
                      Visa event →
                    </span>

                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-surface bg-surface/40 p-5 text-sm text-text/60">Du har inte skapat ett event ännu</p>
          )}
        </section>
      </div>}

        <div className="flex items-center gap-4">
          <Link href="/create"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm">
            Skapa nytt event
          </Link>
        </div>

      {userEvents &&
        <MapWrapper events={userEvents.data} />
      }


    </div>
  )
}

export default Profile 