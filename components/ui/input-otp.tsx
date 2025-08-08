"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof OTPInput> {
  onComplete?: (value: string) => void;
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(({ className, containerClassName, onComplete, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    onComplete={onComplete}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2.5", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  const isFilled = char !== "";

  return (
    <div
      ref={ref}
      className={cn(
        // Base styles - match original 80x80px slots
        "relative flex h-20 w-20 items-center justify-center border-2 border-gray-lighter bg-white transition-all duration-200 cursor-text",
        "rounded-lg", // 8px border radius
        // Focus state - orange border + shadow
        isActive && "border-orange shadow-[0_0_0_3px_rgba(198,81,34,0.2)] z-10",
        // Filled state - orange border
        isFilled && "border-orange",
        className
      )}
      {...props}
    >
      {/* Digit display */}
      <span 
        className={cn(
          "text-[28px] font-medium font-mono text-orange leading-none select-none",
          // Selected state styling could be added here
        )}
      >
        {char}
      </span>
      
      {/* Cursor for active empty slot */}
      {hasFakeCaret && !char && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-0.5 bg-orange animate-caret-blink" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };