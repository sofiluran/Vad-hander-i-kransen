import { getComment } from "@/lib/supabase/queries";
import DeleteComment from "./deletecomment";

const Comments = async ({ eventid, isAuthor, userId }: { eventid: string, isAuthor: boolean, userId: string | null }) => {
  const comments = await getComment(eventid)
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-primary">Kommentarer</h3>

      {comments && comments.length ? (
        <div className="flex flex-col gap-4">
          {comments.map(comment => (
            <div className="flex flex-col gap-3 p-4 bg-background/80 border border-surface rounded-2xl shadow-sm hover:border-surface/80 transition-colors" key={comment.id}>
              <p className="text-text text-base leading-relaxed">{comment.content} </p>
              <div className="flex items-center justify-between pt-2 border-t border-text/10 text-xs font-medium text-text/70">
                <div className="text-right">Av: <span className="text-secondary font-semibold">{comment.userid.username}</span></div>
                {(isAuthor || (userId === comment.userid.id)) && <DeleteComment commentId={comment.id} />}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-background/40 border border-dashed border-surface rounded-2xl text-center">
          <h2 className="text-text/70 text-sm font-medium">Inga kommentarer just nu:</h2>
        </div>
      )}
    </div>
  )

}

export default Comments