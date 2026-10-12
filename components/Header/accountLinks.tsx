import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import { Logout } from "@/actions/logout-action"

const AccountLinks = async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <div className="flex gap-5">
      {user ?
        <div className="flex items-center gap-3">
          <div onClick={Logout} className="px-3 py-2 text-sm font-semibold text-text hover:text-accent border border-surface hover:bg-surface/50 rounded-xl transition-all cursor-pointer">
            Logga Ut
          </div>
          <Link className="px-3 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm" href="/create">
            Skapa Event
          </Link>
        </div>
        :
        <div className="flex items-center gap-2">
          <Link className="inline-block px-3 py-2 text-sm font-semibold text-text hover:text-primary bg-surface/60 hover:bg-surface rounded-xl transition-all" href="/auth/login">
            Logga In
          </Link>
          <Link className="inline-block px-3 py-2 text-sm font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-xl transition-all shadow-sm" href="/auth/signup">
            Skapa Konto
          </Link>
        </div>
      }
    </div>
  )
}

export default AccountLinks