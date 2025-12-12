import { z } from "zod";

export const SignInFormSchema = z.object({
  tel: z
    .string({ message: "Phone Number is required." })
    .min(3, { message: "Phone Number is required." }),
  pwd: z
    .string({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character.",
    }),
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;
