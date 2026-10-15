import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import LogoutButton from "../LogoutButton"

const AccountLinks = async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col gap-3">
      {user ?
        <div className="flex flex-col gap-3">
          <LogoutButton />
          <Link className="flex justify-center px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadom-md" href="/create">
          Skapa Event
          </Link>
        </div>
        :
        <div className="flex flex-col gap-3">
          <Link className="flex justify-center px-4 py-3 text-sm font-semibold text-text bg-surface border-2 border-primary/40 hover:border-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm" href="/auth/login">
            Logga In
          </Link>
          <Link className="flex justify-center px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md" href="/auth/signup">
            Skapa Konto
          </Link>
        </div>
      }
    </div>
  )
}

export default AccountLinks