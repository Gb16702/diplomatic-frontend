import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: number;
}

export function Loader({ className, size = 16 }: LoaderProps) {
  return (
    <svg
      className={cn("spinner", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="circle"
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}