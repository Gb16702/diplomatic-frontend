"use client";

import { type FC } from "react";
import LogoFullLight from "@/public/logo/logo-full-light.svg";
import LogoFullDark from "@/public/logo/logo-full-dark.svg";
import LogoIconLight from "@/public/logo/logo-icon-light.svg";
import LogoIconDark from "@/public/logo/logo-icon-dark.svg";
import Image from "next/image";

export type LogoProps = {
  variant?: "icon" | "full";
  scheme?: "light" | "dark";
  className?: string;
}

export const Logo: FC<LogoProps> = ({ variant = "full", scheme = "light", className }) => {
  let src;

  if (variant === "full") {
    src = scheme === "light" ? LogoFullLight : LogoFullDark;
  } else {
    src = scheme === "light" ? LogoIconLight : LogoIconDark;
  }

  return <Image src={src} alt="Logo" className={className} role="img" />;
};
