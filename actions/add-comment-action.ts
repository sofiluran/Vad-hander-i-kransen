'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { commentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export const AddCommentAction = async ({ commentdata, eventid }: { commentdata: z.infer<typeof commentSchema>, eventid: string }) => {
  const supabase = await createClient()

  const parsedData = commentSchema.parse(commentdata)

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Du måste logga in")

  await supabase.from("comments")
    .insert({ eventid: eventid, userid: user.id, ...parsedData })
    .throwOnError()

  revalidatePath("/")
}