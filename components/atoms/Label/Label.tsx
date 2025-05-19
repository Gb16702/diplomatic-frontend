"use client";

import { cn } from "@/lib/utils";
import { type LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    htmlFor?: string;
    required?: boolean;
}

export const Label = ({ htmlFor, required = false, children}: LabelProps) => {
    return (
        <div className="label-wrapper">
            <label htmlFor={htmlFor} className={cn(required && "label-required")}>
                {children}
            </label>
            {!required && (
                <span className="optional">Optional</span>
            )}
        </div>
    );
};
