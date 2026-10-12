'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from "@/actions/login-action"
import { logInSchema } from '@/actions/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'

const LoginForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(logInSchema)
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: LogIn
  })

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-4 text-left" >

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className='label'>E-mail</label>
          <input className="input" {...register("email")} placeholder="E-mail..." />
          {errors.email && <ErrorMessage error={errors.email.message!} />}
        </div>

        <div className=''>
          <label htmlFor="password" className="label">Lösenord</label>
          <input className="input" {...register("password")} placeholder="Lösenord..." type="password" />
          {errors.password && <ErrorMessage error={errors.password.message!} />}
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <button className="w-full py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" >{isPending ? "Loggar in dig" : "Logga in"}</button>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </div>
  )
}

export default LoginForm