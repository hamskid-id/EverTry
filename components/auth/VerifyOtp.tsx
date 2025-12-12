"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import CustomButton from "../shared/CustomButton";
import { toast } from "sonner";
import { OTPData, OTPSchema } from "@/schema/forget-password";

interface IVerifyOTP {
  setDisplayVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyOTP: React.FC<IVerifyOTP> = ({ setDisplayVerify }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<OTPData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmitForm = async (values: OTPData) => {
    setIsLoading(true);

    // Simulate verification delay (1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(values);
    toast.success("Verification Successful!");

    setIsLoading(false);
    setDisplayVerify(false);

    // Redirect after successful verification
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="flex w-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel></FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} disabled={isLoading}>
                  <InputOTPGroup className="gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div
                        key={index}
                        className="otp-slot-wrapper sm:h-[50px] h-[40px] sm:w-[50px] w-[40px]"
                      >
                        <InputOTPSlot
                          index={index}
                          className="!border-0 bg-[#1A1D21] !rounded-[8px] text-white text-[18px] w-full h-full flex items-center justify-center"
                        />
                      </div>
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          disabled={isLoading}
          isLoading={isLoading}
          title={isLoading ? "Verifying..." : "Verify"}
        />
      </form>
    </Form>
  );
};

export default VerifyOTP;
