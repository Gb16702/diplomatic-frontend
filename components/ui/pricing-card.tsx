import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PricingCardProps {
  children: ReactNode;
  isHighlighted?: boolean;
  className?: string;
}

interface PricingCardSectionProps {
  children: ReactNode;
  className?: string;
}

function PricingCard({ children, isHighlighted = false, className }: PricingCardProps) {
  return (
    <div className={cn(
      "w-full flex-1 bg-background rounded-lg border-2 border-gray-border",
      "flex flex-col gap-10 p-10 items-center",
      isHighlighted && "border-orange",
      className
    )}>
      {children}
    </div>
  );
}

function PricingCardIllustration({ children, className }: PricingCardSectionProps) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      {children}
    </div>
  );
}

function PricingCardHeader({ children, className }: PricingCardSectionProps) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center gap-2.5 max-w-[275px]",
      className
    )}>
      {children}
    </div>
  );
}

function PricingCardFeatures({ children, className }: PricingCardSectionProps) {
  return (
    <div className={cn("w-full flex max-w-[275px]", className)}>
      {children}
    </div>
  );
}

function PricingCardBottom({ children, className }: PricingCardSectionProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-end flex-1",
      className
    )}>
      {children}
    </div>
  );
}

export { 
  PricingCard, 
  PricingCardIllustration, 
  PricingCardHeader, 
  PricingCardFeatures, 
  PricingCardBottom 
};