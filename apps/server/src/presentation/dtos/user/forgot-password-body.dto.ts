import { z } from "zod";

export const ForgotPasswordBodyDto = z.object({
  email: z.string().trim().email(),
});
