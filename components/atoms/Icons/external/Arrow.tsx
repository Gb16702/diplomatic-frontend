import type { IconWrapperProps } from "@/components/atoms/Icons/types";
import { IconWrapper } from "@/components/atoms/Icons/internal/IconWrapper";
import { cn } from "@/lib/utils";

type Direction = "right" | "left" | "up" | "down";

export type ArrowProps = Omit<IconWrapperProps, "children"> & {
  direction?: Direction;
};

export const Arrow = ({ direction = "right", className, ...props }: ArrowProps) => {
      const directionClasses = {
          right: "",
          left: "rotate-180",
          up: "-rotate-90",
          down: "rotate-90"
    };

    return (
        <IconWrapper size={24} {...props} className={cn(directionClasses[direction], className)}>
            <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </IconWrapper>
    )
};
