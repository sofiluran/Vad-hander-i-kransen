'use client'
import { CreateEvent } from "@/actions/create-event-action"
import { eventSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const CreateEventPage = () => {

  const eventImageSchema = eventSchema.omit({ image: true })
    .extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(eventImageSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: CreateEvent
  })

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-primary tracking-tight">Skapa ett inlägg</h2>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()
        if (values.image) imageForm.append('image', values.image[0])
        mutate({
          title: values.title,
          content: values.content,
          image: imageForm,
          adress: values.adress,
          date: values.date
        })
      })}
        className="flex flex-col gap-4 p-6 bg-background/80 border border-surface rounded-2xl shadow-sm">

        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-semibold text-text">Ange rubrik</label>
          <input {...register("title")} className="w-full px-3.5 py-2.5 text-sm bg-white border border-surface rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"></input>
          {errors.title && <ErrorMessage error={errors.title.message!} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="label">Datum</label>
          <input type="date" className="input" {...register("date")} />
          {errors.date && <ErrorMessage error={errors.date.message!} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="content" className="text-sm font-semibold text-text">Innehåll</label>
          <textarea {...register("content")} className="w-full p-3.5 text-sm bg-white border border-surface rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-y"></textarea>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="image" className="text-sm font-semibold text-text">Välj en bild</label>
          <input type="file" {...register("image")} className="w-full text-sm text-text/70 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-surface file:text-primary hover:file:bg-surface/80 file:transition-colors file:cursor-pointer cursor-pointer" />
          {errors.image && <ErrorMessage error={errors.image.message!} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="adress" className="text-sm font-semibold text-text">
            Adress
          </label>
          <input type="text" {...register("adress")} className="w-full px-3.5 py-2.5 text-sm bg-white border border-surface rounded-xl text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          {errors.adress && <ErrorMessage error={errors.adress.message!} />}
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button className="w-full py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Skapa inlägg
          </button>
          {error && <ErrorMessage error={error.message} />}
        </div>

      </form>



    </div>
  )

}

export default CreateEventPage