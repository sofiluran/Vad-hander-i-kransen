'use client'

import { Logout } from "@/actions/logout-action"

const LogoutButton = () => {
  return (
    <div onClick={Logout} className="px-3 py-2 text-sm font-semibold text-text hover:text-accent border border-surface hover:bg-surface/50 rounded-xl transition-all cursor-pointer">
      Logga Ut
    </div>
  )
}

export default LogoutButton