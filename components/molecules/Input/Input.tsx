"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/atoms/Icons/external/Eye";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type = "text", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const isPasswordVisible = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="form-group-wrapper">
            <div className="input-wrapper">
                <input
                    type={isPasswordVisible}
                    id={id}
                    name={id}
                    className={cn(isPassword && "pr-10")}
                    ref={ref}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-light-secondary-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOffIcon strokeColor="black" size={18} /> : <EyeIcon size={18} strokeColor="black" />}
                    </button>
                )}
            </div>
        </div>
    );
});

Input.displayName = "Input"