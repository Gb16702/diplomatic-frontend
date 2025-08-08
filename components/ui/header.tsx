"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";

export function Header() {
  return (
    <header className="w-full max-w-[1280px] h-20 bg-transparent flex items-center justify-between px-10">
      <div className="w-[30%] h-full flex justify-start items-center">
        <Link href="/">
          <Image
            src="/logo/logo-black.svg"
            alt="Diplomate.ai"
            width={160}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <div className="w-[40%] h-full flex justify-center items-center">
        <Navigation />
      </div>

      <div className="w-[30%] h-full flex justify-end items-center gap-2">
        <Link href="/sign-in">
          <Button variant="text-secondary">Sign in</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="outlined-secondary">Sign up</Button>
        </Link>
      </div>
    </header>
  );
}