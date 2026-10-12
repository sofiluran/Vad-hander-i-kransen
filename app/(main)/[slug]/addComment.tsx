'use client'

import { AddCommentAction } from "@/actions/add-comment-action"
import { commentSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddComment = ({ eventid }: { eventid: string }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(commentSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: AddCommentAction,
    onSuccess: () => reset(),
    onSettled: () => toast("Du har kommenterat")

  })

  return (
    <form onSubmit={handleSubmit(values => mutate({ commentdata: { content: values.content }, eventid }))}
      className="flex flex-col gap-3 p-5 bg-background/60 border border-surface rounded-2xl shadow-sm">
      <label htmlFor="content" className="text-sm font-bold text-primary">Skriv en kommentar</label>
      <textarea {...register("content")} placeholder="Skriv din kommentar" className="w-full p-3 bg-white border border-surface/80 rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150 resize-y"></textarea>
      {errors.content && <ErrorMessage error={errors.content.message!} />}

      <div className="flex items-center justify-between pt-1">
        <button className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 active:scale-[0.98] rounded-xl transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          Kommentera
        </button>
        {error && <ErrorMessage error={error.message} />}
      </div>

    </form>
  )
}

export default AddComment