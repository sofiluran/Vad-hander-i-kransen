import Link from "next/link"
import SignupForm from "./form"

const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-6 items-center text-center">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-3xl font-bold text-primary tracking-tight">Skapa ett konto</h1>
        <p className="text-sm text-text/70 font-medium">Fyll i dina uppgifter för att komma igång</p>
      </div>
      <div className="w-full p-6 bg-background/80 border border-surface rounded-2xl shadow-sm">
        <SignupForm />
      </div>
      <Link href="/auth/login" className="text-sm text-text/80 hover:text-text transition-colors">Har du redan ett konto? <span className="text-accent font-bold hover:underline">Logga in här</span></Link>
    </div>
  )

}

export default SignupPage