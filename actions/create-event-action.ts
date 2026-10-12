'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { eventSchema } from "./schemas"
import z from "zod"
import { slugify } from "@/lib/supabase/slugify"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadImage } from "@/lib/supabase/upload-image"

export const CreateEvent = async (eventdata: z.infer<typeof eventSchema>) => {
  const parsedData = eventSchema.parse(eventdata)
  const slug = slugify(parsedData.title)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized access")

  const imageFile = eventdata.image?.get("image")

  if (!(imageFile instanceof File) && imageFile !== null && imageFile !== "undefined") {
    throw Error("image is not in a valid format")
  }

  const imageUrl = (imageFile && imageFile !== "undefined") ? await uploadImage(imageFile) : null

  let latitude = 59.3005
  let longitude = 18.0125

  if (parsedData.adress) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(parsedData.adress)}`,
        {
          headers: {
            'User-Agent': 'MidsommarkransenApp/1.0',
          }
        }
      )

      const geoData = await response.json()

      if (geoData && geoData.length > 0) {

        latitude = Number(geoData[0].lat)
        longitude = Number(geoData[0].lon)
      }
    } catch (error) {
      console.log("Error", error)
    }
  }

  const { data, error } = await supabase.from("events").insert({
    ...parsedData,
    slug: slug,
    image: imageUrl,
    author: user.id,
    latitude: latitude,
    longitude: longitude, 
  })

  if (error) console.log(error)

  revalidatePath("/")
  redirect(`/${slug}`)


}