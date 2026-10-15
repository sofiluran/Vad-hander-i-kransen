import {z} from 'zod'

export const logInSchema = z.object({
  email: z.email("Wrong email"),
  password: z.string().min(5, "Password must be 5 characters")
})

export const signUpSchema = z.object({
  email: z.email("Wrong email"),
  password: z.string().min(5, "Password must be 5 characters"),
  username: z.string().min(6, "You need at least 6 characters")
})

export const eventSchema = z.object({
  title: z.string().min(6, "Title must be at least 6 characters"),
  content: z.string().optional(),
  image: z.instanceof(FormData).optional(), 
  adress: z.string().min(1, "Skriv in adress på eventet"), 
  date: z.string().optional(), 
  category: z.string().optional()
})

export const commentSchema = z.object({
  content: z.string().min(3, "Kommentarer måste vara mer än 3 karaktärer")
})