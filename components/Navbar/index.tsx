'use client'

import { useState, useEffect } from "react"
import Search from "../Header/search"
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

const Navigation = ({ accountlinks }: { accountlinks: React.ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false)
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [showMenu])

  return (
    <div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-surface text-primary rounded-xl border border-surface font-bold shadow-sm ">
        {showMenu ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>

      <aside className={` flex flex-col w-72 bg-surface/50 border-l border-surface p-6 gap-6 sticky overflow-y-auto top-0 h-screen
               ${showMenu ? "fixed inset-y-0 right-0 z-50 bg-background shadow-2xl w-100" : "hidden md:flex"}`}>

        <Link href="/" className="text-xl font-bold tracking-tight  text-primary" onClick={() => setShowMenu(false)}>
          Vad händer i kransen?
        </Link>

        <div className="w-full">
          <Search />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <p className="px-3 mb-4 text-xs font-semibold uppercase tracking-widest text-text/50 ">Utforska</p>
          <Link href="/event" className="navlink" onClick={() => setShowMenu(false)}>
            Alla Event
          </Link>
          <Link href="/profile" className="navlink mb-10" onClick={() => setShowMenu(false)}>
            Min Profil
          </Link>
          <div className="w-full">
            {accountlinks}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Navigation