import "./globals.css";

import type { ReactNode } from "react";
import { rubik, dmSans, playfairDisplay, spaceGrotesk } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/components/providers/query-provider";

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
      <body className={`bg-background text-foreground antialiased`} style={{fontFamily: 'var(--font-space-grotesk), sans-serif'}}>
        <NuqsAdapter>
          <QueryProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
