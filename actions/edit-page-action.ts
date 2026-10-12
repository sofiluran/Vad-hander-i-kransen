'use server'

import z from "zod"
import { eventSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { slugify } from "@/lib/supabase/slugify"
import { uploadImage } from "@/lib/supabase/upload-image"

export const EditEvent = async ({ eventdata, eventId }: { eventdata: z.infer<typeof eventSchema>, eventId: string }) => {

  const parsedData = eventSchema.parse(eventdata)

  const supabase = await createClient()

  const imageFile = eventdata.image?.get("image")

  const { data: event, error } = await supabase.from("events").select("*").eq("id", eventId).single()
  if (!event) throw new Error("event doesn't exist")

  let imageUrl;

  if (typeof imageFile !== "undefined") {
    if (!(imageFile instanceof File) && imageFile !== null) {
      throw Error("image is not in a valid format")
    }

    imageUrl = imageFile ? await uploadImage(imageFile) : null

  } else {
    imageUrl = event.image
  }

  const { data: updatedEvent } = await supabase.from("events")
    .update({ ...parsedData, slug: slugify(parsedData.title), image: imageUrl })
    .eq("id", eventId).select("slug")
    .single()
    .throwOnError()

  revalidatePath("/")
  redirect(`/${updatedEvent.slug}`)

}