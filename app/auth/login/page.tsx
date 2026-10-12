import Link from "next/link"
import LoginForm from "./form"

const LoginPage = () => {
  return(
    <div>
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-6 items-center text-center">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-3xl font-bold text-primary tracking-tight">Logga in</h2>
        <p className="text-sm text-text/70 font-medium">Välkommen tillbaka!</p>
      </div>
      <div className="w-full p-6 bg-background/80 border border-surface rounded-2xl shadow-sm">
        <LoginForm />
      </div>
      <Link href="/auth/signup" className="text-sm text-text/80 hover:text-text transition-colors">
        Har du inget konto? <span className="text-accent font-bold hover:underline">Skapa konto här</span>
      </Link>
    </div>
    </div>
  )

}

export default LoginPage