import Logo from "@/components/Header/logo"
import Link from "next/link"

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-surface px-4 py-3 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link className="block" href="/">
            <Logo />
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col justify-center py-8">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout