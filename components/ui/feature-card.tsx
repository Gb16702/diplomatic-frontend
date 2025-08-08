import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      "w-[400px] h-[270px] rounded-xl p-6 shadow-lg",
      "flex flex-col gap-6",
      className
    )}>
      <div className="flex items-center gap-3">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
        <h3 className="text-2xl font-serif font-medium text-black">
          {title}
        </h3>
      </div>
      
      <div>
        <p className="text-base text-gray-dark leading-[30px] m-0">
          {description}
        </p>
      </div>
    </div>
  );
}