"use client";

import { Loader } from "@/components/atoms/Loader";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export type ButtonProps =  {
    variant: "contained" | "outlined" | "text";
    color: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    withShadow?: boolean;
    children: ReactNode;
    onClick?: () => void;
};

export const getButtonClasses = (variant: ButtonProps["variant"], color: ButtonProps["color"]): string => {
  const variantColorMap = {
    contained: {
      primary: "bg-orange text-cream not-disabled:hover:bg-orange-dark focus:outline-2 focus:outline-offset-2 focus:outline-orange",
      secondary: "bg-black text-cream not-disabled:hover:bg-black/90 focus:outline-2 focus:outline-offset-2 focus:outline-black"
    },
    outlined: {
      primary: "bg-transparent border-2 border-orange text-orange",
      secondary: "bg-transparent border-2 border-black text-black"
    },
    text: {
      primary: "text-orange",
      secondary: "text-black"
    }
  };

  return variantColorMap[variant][color];
};

const getShadowClasses = (variant: ButtonProps["variant"], color: ButtonProps["color"], withShadow?: boolean): string => {
  if (!withShadow || variant !== "contained") return "";

  return color === "primary" ? "custom-shadow-orange" : "custom-shadow-black";
};

const getLoaderColor = (variant: ButtonProps["variant"], color: ButtonProps["color"]): string => {
  if (variant === "contained") {
    return "#fcf7ee";
  } else {
    return color === "primary" ? "#c65122" : "#040402";
  }
};

export const Button = ({
    children,
    variant,
    color,
    type = "button",
    loading = false,
    disabled = false,
    withShadow = false,
    onClick
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const buttonClasses = getButtonClasses(variant, color);
  const shadowClasses = getShadowClasses(variant, color, withShadow);
  const loaderColor = getLoaderColor(variant, color);

  return (
    <button
      className={cn(
          "standard-button",
          buttonClasses,
          shadowClasses,
          loading && "relative text-transparent"
      )}
      disabled={isDisabled}
      type={type}
      aria-busy={loading}
      onClick={isDisabled ? undefined : onClick}
    >
      {children}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader stroke={loaderColor} />
        </span>
      )}
    </button>
  );
};
