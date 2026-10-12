import MapWrapper from "@/components/EventMap/mapWrapper";
import Footer from "@/components/Footer";
import HomeEvents from "@/components/HomeEvents";
import { getHomeEvents } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await getHomeEvents(supabase)

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="text-center flex flex-col gap-2 pb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">Vad händer i kransen</h1>
          <p className="text-text/70 text-base sm:text-lg">Håll dig uppdaterad med det senaste från Midsommarkransen</p>
        </header>
      </div>

      {data && <HomeEvents events={data} />}

      <div className="flex flex-col gap-1 mt-6 items-center ">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">📍</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text"> Hitta ditt event:</h2>
        </div>
        <p className="text-text/60 text-sm sm:text-base">
          Utforska alla händelser i Midsommarkransen direkt på kartan
        </p>
      </div>

      <div className="">
        <MapWrapper events={data} />
      </div>

      <Footer />
    </div>
  );
}
