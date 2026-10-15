import Link from "next/link"
import Logo from "./logo"

const Header = () => {
  return (
    <header className=" top-0 z-50 bg-background/80 backdrop-blur-md border-b-2 border-surface shadox-xs px-4 sm:px-8">
        <Link href="/" className="flex justify-center hover:opacity-90 transition-opacity shrink-0 mx-10">
          <Logo />
        </Link>
    </header>
  )
}

export default Header 