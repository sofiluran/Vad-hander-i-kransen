import HomeEvents from "@/components/HomeEvents";
import { getHomeEvents } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const EventPage = async () => {
  const supabase = await createClient();
  const { data, error } = await getHomeEvents(supabase)
  if (error) {
    console.log("kunde inte hämta event", error)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">Alla Event</h2>
          <p className="text-base text-text/70 sm:text-lg">
            Upptäck alla kommande händelser i Midsommarkransen.
          </p>
        </div>
        {data && <HomeEvents events={data} limit={data.length}/>}
      </div>
    </div>
  )
}

export default EventPage