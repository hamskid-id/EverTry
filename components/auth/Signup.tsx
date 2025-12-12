"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import AuthLayout from "./Layout";
import { SignUpFormData, SignUpFormSchema } from "@/schema/signup";
import CustomInputField from "../shared/CustomInputField";
import { FormFieldType } from "@/types";
import CustomButton from "../shared/CustomButton";
import { EmailSvg, NameSvg, PhoneSvg } from "@/svg";

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      pwd: "",
      tel: "",
      name: "",
      cpwd: "",
    },
  });

  const handleSubmitForm = async (values: SignUpFormData) => {
    setIsLoading(true);

    // Simulate API delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(values);

    setIsLoading(false);

    // After successful signup, redirect to verify OTP or dashboard
    router.push("/dashboard");
  };

  return (
    <AuthLayout
      enableFooter
      footerLink="/sign-in"
      footerText={`Already have an account?`}
      footerLinkTitle="Sign in"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-4 mt-6"
        >
          <CustomInputField
            name="name"
            label="Full name"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Enter your full name..."
            disabled={isLoading}
            icon={<NameSvg />}
          />
          <CustomInputField
            name="email"
            icon={<EmailSvg />}
            label="Email address"
            control={form.control}
            fieldType={FormFieldType.EMAIL}
            placeholder="your@company.com"
            disabled={isLoading}
          />
          <CustomInputField
            name="tel"
            label="Phone number"
            icon={<PhoneSvg />}
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            placeholder="+234 901 334 7728"
            disabled={isLoading}
          />
          <CustomInputField
            name="pwd"
            label="Password *"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Create a strong password"
            disabled={isLoading}
          />
          <CustomInputField
            name="cpwd"
            label="Confirm Password"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            placeholder="Confirm your new password"
            disabled={isLoading}
          />
          <CustomButton
            disabled={isLoading}
            isLoading={isLoading}
            title={isLoading ? "Creating Account..." : "Get Started"}
          />
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
