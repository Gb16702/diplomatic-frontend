import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckIconProps {
  stroke?: string;
  size?: number;
  className?: string;
  variant?: "default" | "circle";
}

export function CheckIcon({ 
  stroke = "currentColor", 
  size = 16, 
  className,
  variant = "default" 
}: CheckIconProps) {
  if (variant === "circle") {
    return (
      <div className={cn(
        "bg-green p-1 rounded-full flex items-center justify-center w-fit h-fit",
        className
      )}>
        <Check size={size} stroke={stroke} />
      </div>
    );
  }

  return <Check size={size} stroke={stroke} className={className} />;
}