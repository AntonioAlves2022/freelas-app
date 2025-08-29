import {email, z} from 'zod'
import {infer as ZodInfer} from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3,'Name should have at least 3 characters'),
  email: z.email('Invalid E-mail address'),
  password: z.string().min(6, 'Password should have at least 6 characters'),
  avatarUrl: z.string().optional()
})

export type CreateUserDTO = z.infer<typeof createUserSchema>