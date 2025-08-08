import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader } from "@/components/ui/loader"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold font-grotesk transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2 outline-none",
  {
    variants: {
      variant: {
        contained:
          "bg-orange text-cream hover:bg-orange-dark focus-visible:ring-orange",
        "contained-secondary":
          "bg-black text-cream hover:bg-black/90 focus-visible:ring-black",
        outlined:
          "bg-transparent border border-orange text-orange hover:bg-orange/10 focus-visible:ring-orange",
        "outlined-secondary":
          "bg-transparent border border-black text-black hover:bg-black/10 focus-visible:ring-black",
        text:
          "text-orange hover:bg-orange/10 focus-visible:ring-orange",
        "text-secondary":
          "text-black hover:bg-black/10 focus-visible:ring-black",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive",
      },
      size: {
        default: "h-12 px-12",
        sm: "h-10 px-8",
        lg: "h-14 px-16",
        icon: "h-12 w-12",
      },
      shadow: {
        none: "",
        orange: "shadow-orange hover:shadow-orange-dark",
        black: "shadow-black",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "default",
      shadow: "none",
    },
  }
)

function Button({
  className,
  variant,
  size,
  shadow,
  loading = false,
  asChild = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button"
  const isDisabled = disabled || loading

  const getLoaderColor = () => {
    if (variant?.includes("contained")) {
      return "#fcf7ee" // cream
    } else if (variant?.includes("text") || variant?.includes("outlined")) {
      return variant.includes("secondary") ? "#040402" : "#c65122" // black or orange
    }
    return "#fcf7ee"
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, shadow }),
        loading && "relative text-transparent",
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {children}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader className="text-current" size={16} />
        </span>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
