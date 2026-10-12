'use client'

import { signUpSchema } from "@/actions/schemas"
import { SignUp } from "@/actions/signup-action"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const SignupForm = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: SignUp
  })

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col gap-4 text-left" >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="label">Användarnamn</label>
          <input className="input" {...register("username")} placeholder="Användarnamn..." />
          {errors.username && <ErrorMessage error={errors.username.message!} />}
        </div>
        <div>
          <label htmlFor="email" className="label">E-mail</label>
          <input className="input" {...register("email")} placeholder="E-mail..." />
          {errors.email && <ErrorMessage error={errors.email.message!} />}
        </div>
        <div>
          <label htmlFor="password" className="label">Lösenord</label>
          <input className="input" {...register("password")} placeholder="Lösenord..." type="password" />
          {errors.password && <ErrorMessage error={errors.password.message!} />}
        </div>
        <div>
          <button className="w-full py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Skapa Konto
          </button>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </div>
  )

}

export default SignupForm