import { z } from "zod";

export const CreateUserWithGoogleBodyDto = z.object({
  accessToken: z.string().trim().nonempty(),
});
