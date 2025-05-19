import "./globals.css";

import type { ReactNode } from "react";
import { rubik, dmSans, playfairDisplay, spaceGrotesk } from "@/lib/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${rubik.variable}
        ${dmSans.variable}
        ${playfairDisplay.variable}
        ${spaceGrotesk.variable}
        `}
    >
      <body className={`font-grotesk bg-light-primary-background`}>{children}</body>
    </html>
  );
}
