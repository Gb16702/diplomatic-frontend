"use client"

import type { ReactNode } from "react";

export type FormGroupProps = {
    children?: ReactNode;
}

export const FormGroup = ({children}: FormGroupProps) => {
    return (
        <div className="form-group">
            {children}
        </div>
    )
}
