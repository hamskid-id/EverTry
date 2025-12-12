"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";

import Link from "next/link";
import AuthLayout from "./Layout";
import { SignInFormData, SignInFormSchema } from "@/schema/sign-in";
import CustomInputField from "../shared/CustomInputField";
import { FormFieldType } from "@/types";
import CustomButton from "../shared/CustomButton";
import { useState } from "react";
import { CustomModal } from "../shared/CustomModal";
import VerifyOTP from "./VerifyOtp";
import { PhoneSvg } from "@/svg";

const SignIn: React.FC = () => {
  const [displayVerify, setDisplayVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      tel: "",
      pwd: "",
    },
  });

  const handleSubmitForm = async (values: SignInFormData) => {
    setIsLoading(true);

    // Simulate network delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show OTP verification modal
    setDisplayVerify(true);
    setIsLoading(false);
    console.log(values);
  };

  return (
    <AuthLayout
      description="Log in to your account"
      enableFooter
      footerLink="/sign-up"
      footerText={`Don't have an account?`}
      footerLinkTitle="Sign Up"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="flex w-full flex-col gap-4 mt-6"
        >
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
          <Link
            href={"/auth/forget-password"}
            className="ms-auto text-end font-medium sm:text-md text-[13px] text-[#82DBF7] hover:text-primary-500 hover:underline transition-colors"
          >
            Forget Password ?
          </Link>
          <CustomButton
            disabled={isLoading}
            isLoading={isLoading}
            title={isLoading ? "Signing in..." : "Sign in"}
          />
        </form>
      </Form>
      <CustomModal
        width="sm:max-w-[460px]"
        title="Verify OTP"
        description="Please enter the OTP sent to your registered mobile number."
        open={displayVerify}
        setOpen={setDisplayVerify}
      >
        <VerifyOTP setDisplayVerify={setDisplayVerify} />
      </CustomModal>
    </AuthLayout>
  );
};

export default SignIn;
