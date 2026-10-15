'use client'

import { Logout } from "@/actions/logout-action"

const LogoutButton = () => {
  return (
    <div onClick={Logout}
      className="w-full px-4 py-3 text-sm font-semibold text-text bg-surface border-2 border-primary/40 hover:border-primary hover:bg-primary/10 rounded-xl transition-all duration-200 cursor-pointer">
      Logga Ut
    </div>
  )
}

export default LogoutButton