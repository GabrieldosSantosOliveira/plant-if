import { z } from 'zod'

export const ResetPasswordBodyDto = z.object({
  email: z.string().trim().email(),
  code: z.string().trim().nonempty().min(2),
  resetPassword: z.string().trim().nonempty().min(2),
})
