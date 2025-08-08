import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}

export function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
      <div className={cn(
        "w-full max-w-[400px] bg-card rounded-lg shadow-lg p-8",
        className
      )}>
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Image
            src="/logo/diplomate-emblem.svg"
            alt="Diplomate.ai"
            width={32}
            height={32}
            className="mb-6"
          />
          <h1 className="text-2xl font-medium font-grotesk text-foreground">
            {title}
          </h1>
          <p className="text-sm text-gray-dark mt-2">
            {subtitle}
          </p>
        </div>

        {/* Form Content */}
        {children}
      </div>
    </div>
  );
}