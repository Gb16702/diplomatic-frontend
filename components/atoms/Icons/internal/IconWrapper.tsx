"use client"

import type { IconWrapperProps } from "../types"

export const IconWrapper = ({
  size = "24",
  fillColor = "none",
  strokeColor = "currentColor",
  strokeWidth = 2,
  className = "",
  children,
}: IconWrapperProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
    >
      {children}
    </svg>
  );
};
