import { z } from 'zod'

export const CreateUserWithFacebookBodyDto = z.object({
  accessToken: z.string().trim().nonempty(),
})
