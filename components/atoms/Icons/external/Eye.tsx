"use client";

import { IconWrapper } from "@/components/atoms/Icons/internal/IconWrapper";
import type { IconWrapperProps } from "@/components/atoms/Icons/types";

export const EyeIcon = (props: Omit<IconWrapperProps, "children">) => {
    return (
        <IconWrapper {...props}>
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </IconWrapper>
    );
};

export const EyeOffIcon = (props: Omit<IconWrapperProps, "children">) => {
    return (
        <IconWrapper {...props}>
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
        </IconWrapper>
    );
};
