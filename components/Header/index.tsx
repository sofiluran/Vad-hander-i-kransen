import Link from "next/link"
import AccountLinks from "./accountLinks"
import Logo from "./logo"
import Search from "./search"
import Navigation from "../Navbar"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface shadox-xs px-4 py-3 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className=" flex-1 hidden sm:block">
          <Navigation />
        </div>
        <Link href="/" className="flex justify-center hover:opacity-90 transition-opacity shrink-0 mx-10">
          <Logo />
        </Link>
        <div className="flex flex-1 flex-col gap-5 items-end justify-end ">
          <div>
            <AccountLinks />
          </div>
          <div>
            <Search />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 