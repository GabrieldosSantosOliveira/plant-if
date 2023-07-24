import { z } from 'zod'

export const CreateUserWithEmailBodyDto = z.object({
  email: z.string().trim().email(),
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  password: z.string().trim().min(2),
})
