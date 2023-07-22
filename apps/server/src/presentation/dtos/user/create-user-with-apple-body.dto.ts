import { z } from 'zod'

export const CreateUserWithAppleBodyDto = z.object({
  code: z.string().trim().nonempty(),
  email: z.string().trim().nonempty(),
  firstName: z.string().trim().nonempty().optional(),
  lastName: z.string().trim().nonempty().optional(),
})
