import { z } from 'zod'

export const AuthenticateUserWithEmailControllerBodyDto = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(2),
})
