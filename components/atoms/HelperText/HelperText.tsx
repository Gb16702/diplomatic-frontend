"use client";

import type { ReactNode } from "react";

export type HelperTextProps =  {
    children: ReactNode;
}

export const HelperText = ({ children }: HelperTextProps) => {
    return (
        <p className="helper-text">
            {children}
        </p>
    );
};
