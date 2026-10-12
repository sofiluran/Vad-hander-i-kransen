import { getComment, getSingleEvent } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import DeleteButton from "./deleteButton"
import Link from "next/link"
import Comments from "./comments"
import AddComment from "./addComment"

const EventPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const { data, error } = await getSingleEvent(slug)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAuthor: boolean = user && data && user.id === data.author.id ? true : false

  const comments = await getComment(data!.id)

  return (
    <div className="max-w-3xl mx-auto my-8 p-4 sm:p-8 bg-surface/40 border border-surface rounded-3xl shadow-sm">

      {data &&
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 border-b border-text/10 pb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">{data.title}</h2>

            <p className="text-sm font-medium text-text/70">Skapat av:
              <span className="text-secondary font-semibold">
                {data.author.username}
              </span>
            </p>
          </div>

          {data.date &&
            <div className="flex items-center gap-3 p-3 bg-surface/60 border border-surface rounded-xl">
              <div className="flex items-center justify-center w-11 h-11 roulded-lg bg-primary/pg text-primary">
                <span className="text-xl">🗓️</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-xs uppercase text-text/50">Datum för eventet </span>
                <span className="text-sm sm:text-base font-semibold text-text capitalize">
                  {new Date(`${data.date}T12:00:00`).toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                  })}
                </span>
              </div>
            </div>
          }

          {data.adress && (
            <p className="text-sm text-text/70 flex items-center gap-2">
              <span>📍</span>
              <span className="font-semibold text-text capitalize">Adress:</span>
              <span className="capitalize">{data.adress}</span>
            </p>
          )}

          {data.image &&
            <div className="overflow-hidden rounded-2xl border border-surface shadow-sm">
              <img src={data.image} alt={data.title} className="w-full max-h-112.5 object-cover" />
            </div>
          }

          {data.content &&
            <div className="text-text text-base sm:text-lg leading-relaxed whitespace-pre-line py-2">
              <p>{data.content}</p>
            </div>
          }

          {isAuthor &&
            <div className="flex items-center gap-3 pt-2 border-t border-text/10">
              <DeleteButton id={data.id} />
              <Link className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-accent/90 rounded-xl transition-colors shadow-sm" href={`/${slug}/edit`}>Redigera Event</Link>
            </div>
          }
          <div className="pt-6 border-t border-text/10 flex flex-col gap-6">
            <Comments eventid={data.id} isAuthor={isAuthor} userId={user ? user.id : null} />
            {user && <AddComment eventid={data.id} />}
          </div>
        </div>
      }
    </div>
  )



}

export default EventPage