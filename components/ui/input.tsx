import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type = "text", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    if (isPassword) {
      return (
        <div className={cn("input-wrapper", containerClassName)}>
          <input
            type={inputType}
            id={id}
            name={id}
            className={cn(
              "font-grotesk w-full h-full px-3 py-2 text-sm bg-transparent border-0 outline-none placeholder:text-gray disabled:cursor-not-allowed pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-black transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      )
    }

    return (
      <div className={cn("input-wrapper", containerClassName)}>
        <input
          type={type}
          id={id}
          name={id}
          className={cn(
            "font-grotesk w-full h-full px-3 py-2 text-sm bg-transparent border-0 outline-none placeholder:text-gray disabled:cursor-not-allowed",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
