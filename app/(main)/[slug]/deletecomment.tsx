'use client'
import { DeleteCommentAction } from "@/actions/delete-comment-action"
import { useMutation } from "@tanstack/react-query"

const DeleteComment = ({ commentId }: { commentId: string }) => {

  const { mutate } = useMutation({
    mutationFn: DeleteCommentAction
  })

  return (
    <button onClick={() => mutate(commentId)}
      className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent rounded-lg border border-accent/20 transition-all duration-150 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
      Ta bort kommentar
    </button>
  )
}

export default DeleteComment