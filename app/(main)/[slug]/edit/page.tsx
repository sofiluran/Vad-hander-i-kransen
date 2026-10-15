import { getSingleEvent } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import EditPageForm from "./form"

const EditEventPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await getSingleEvent(slug)
  if (user && data && user.id !== data.author.id)
    redirect("/")

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      {data &&
        <div>
          <h2 className="text-2xl font-bold text-primary tracking-tight">Redigera: {data.title}</h2>
          <EditPageForm initialValues={{ title: data.title, content: data.content, image: data.image, adress: data.adress, category: data.category }} eventId={data.id} />
        </div>}
    </div>
  )
}

export default EditEventPage