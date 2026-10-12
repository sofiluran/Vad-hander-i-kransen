'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const DeletePost = async(eventId:string) => {
  const supabase = await createClient()

  await supabase.from("events").delete().eq("id", eventId).throwOnError()

  revalidatePath("/") 
  redirect("/")
}