import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diplomate.ai",
  description: "Master Negotiation, Diplomacy and Influence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/*  TODO: IMPLEMENT HEADER */}
      <main>{children}</main>
    </>
  );
}
