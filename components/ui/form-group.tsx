import * as React from "react"
import { cn } from "@/lib/utils"

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("form-group", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormGroup.displayName = "FormGroup"

interface FormLabelWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  required?: boolean
  optional?: boolean
}

const FormLabelWrapper = React.forwardRef<HTMLDivElement, FormLabelWrapperProps>(
  ({ className, children, required = false, optional = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("label-wrapper", className)}
        {...props}
      >
        <span className={cn(required && "label-required")}>
          {children}
        </span>
        {optional && (
          <span className="optional">(optional)</span>
        )}
      </div>
    )
  }
)
FormLabelWrapper.displayName = "FormLabelWrapper"

interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  error?: boolean
}

const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ className, children, error = false, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-sm text-gray-dark leading-tight font-light",
          error && "text-destructive",
          className
        )}
        {...props}
      >
        {children}
      </p>
    )
  }
)
HelperText.displayName = "HelperText"

export { FormGroup, FormLabelWrapper, HelperText }