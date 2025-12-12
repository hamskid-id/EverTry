import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    name: z
      .string({ message: "Business Name is required." })
      .min(3, { message: "Business Name required." }),
    tel: z
      .string({ message: "Phone Number is required." })
      .min(3, { message: "Phone Number is required." }),
    email: z
      .string({ message: "Email is required." })
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." }),
    agreeToTerms: z.boolean(),
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
    cpwd: z
      .string({ message: "Please confirm your password." })
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.pwd === data.cpwd, {
    path: ["cpwd"],
    message: "Passwords do not match.",
  })
  .refine((data) => data.agreeToTerms === true, {
    path: ["agreeToTerms"],
    message: "You must agree to the terms and conditions",
  });

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;
