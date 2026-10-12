'use client'
import { DeletePost } from "@/actions/delete-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({ id }: { id: string }) => {
  const { mutate } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast("Ditt Event har raderats")
  })

  return (
    <>
      <button onClick={() => mutate(id)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-accent bg-accent/10 hover:bg-accent hover:text-white border border-accent/20 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow">
        Radera detta event</button>
    </>
  )

}

export default DeleteButton