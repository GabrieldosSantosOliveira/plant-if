import { z } from 'zod'

export const IsUserAlreadyExistsBodyDto = z.object({
  email: z.string().trim().nonempty().email(),
})
