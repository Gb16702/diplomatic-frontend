import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <footer className="w-full h-[550px] bg-black flex items-end justify-center">
      <div className="w-full h-full max-w-[1280px]">
        <div className="flex w-full h-1/2 items-end py-5">
          <Image
            src="/logo/logo-cream.svg"
            alt="Diplomate.ai"
            width={160}
            height={32}
          />
        </div>

        {/* Content Section - Bottom 50% */}
        <div className="flex flex-row w-full h-1/2 pb-[60px]">
          {/* Left Section - 50% width */}
          <div className="w-1/2 h-full flex flex-col items-start justify-between text-white">
            {/* Disclaimer Text */}
            <p className="text-sm">
              Diplomate.ai uses AI-generated content across the platform.
              <br />
              Remember, AI can make mistakes.
            </p>

            <div className="flex gap-[10px]">
              <button
                className="w-[34px] h-[34px] bg-cream rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook size={24} fill="black" stroke="none" className="text-black" />
              </button>
              <button
                className="w-[34px] h-[34px] bg-cream rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={24} fill="none" strokeWidth={2.5} className="text-black" />
              </button>
            </div>

            <p className="text-sm">
              © 2024 Diplomate.ai. All rights reserved.
            </p>
          </div>

          <div className="w-1/2 h-full flex items-start justify-between">
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-dark hover:text-gray-dark/80 transition-colors font-rubik text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}