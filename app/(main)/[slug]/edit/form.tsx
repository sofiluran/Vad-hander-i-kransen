'use client'

import { EditEvent } from "@/actions/edit-page-action"
import { eventSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { type Tables } from "@/lib/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import z from "zod"

const EditPageForm = ({ initialValues, eventId }: { initialValues: Pick<Tables<"events">, "title" | "content" | "image" | "adress" | "category">, eventId: string }) => {

  const eventImageSchema = eventSchema.omit({ image: true })
    .extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(eventImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      image: initialValues.image || undefined,
      adress: initialValues.adress || undefined
    }
  })

  const { mutate, error } = useMutation({
    mutationFn: EditEvent
  })

  return (
    <form onSubmit={handleSubmit(values => {

      let imageForm = undefined
      if (values.image && typeof values.image !== "string" && values.image[0]) {
        imageForm = new FormData()
        imageForm.append('image', values.image[0])
      }

      mutate({
        eventdata: {
          title: values.title,
          content: values.content,
          image: imageForm,
          adress: values.adress
        }, eventId
      })
    }
    )} className="flex flex-col gap-4 p-6 bg-background/80 border border-surface rounded-2xl shadow-sm">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="label">Lägg till titel</label>
        <input className="input" {...register("title")} ></input>
        {errors.title && <ErrorMessage error={errors.title.message!} />}
      </div>

      <label htmlFor="adress">Byt adress</label>
      <input className="input" {...register("adress")}/>


      <label htmlFor="content" className="label">Ändra Innehåll</label>
      <textarea className="input" {...register("content")}></textarea>

      {initialValues.image &&
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-text">Nuvarande bild</span>
          <div className="w-full h-48 rounded-xl overflow-hidden bg-surface/50 border border-surface">
            <img src={initialValues.image} alt={initialValues.title} className="w-full h-full object-cover" />
          </div>
        </div>}

      <label htmlFor="image" className="label">Byt bild</label>
      <input type="file" className="input" {...register("image")} />
      {errors.image && <ErrorMessage error={errors.image.message!} />}

      <div className="pt-2 flex flex-col gap-2">
        <button className="w-full py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          Spara ändringar
        </button>
      </div>

      {error && <ErrorMessage error={error.message} />}
    </form>
  )
}

export default EditPageForm

