import { cn } from "@/lib/utils";
import { getButtonClasses } from "@/components/atoms/Button/Button";
import type { ReactNode } from "react";

export type IconButtonProps =  {
    variant: "contained" | "outlined";
    color: "primary" | "secondary";
    disabled?: boolean;
    icon: ReactNode;
    onClick?: () => void;
};

export const IconButton = ({
    icon,
    variant,
    color,
    disabled = false,
    onClick
}: IconButtonProps) => {
    const buttonClasses = getButtonClasses(variant, color);

    return (
        <button className={cn("icon-button", buttonClasses)} type="button" disabled={disabled} onClick={disabled ? undefined : onClick}>
            {icon}
        </button>
    )
}
