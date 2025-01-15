import { z } from "zod";

export const zodSignUpSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  email: z.string().email("Invalid email address").min(6),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});
