"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  const isFilled = char && !isActive;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-filled={isFilled}
      className={cn(
        "relative p-[1px] rounded-[8px] bg-[#363A3D] transition-all duration-200",
        "data-[active=true]:bg-gradient-to-r data-[active=true]:from-[#82DBF7] data-[active=true]:to-[#B6F09C]",
        "data-[filled=true]:bg-[#24AE7C]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-[#1A1D21] rounded-[8px] text-[18px] transition-colors",
          isFilled ? "text-[#24AE7C]" : "text-white"
        )}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-gradient-to-r from-[#82DBF7] to-[#B6F09C] h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
