"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: number;
  label: string;
  route: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    label: "Home",
    route: "/",
  },
  {
    id: 2,
    label: "Features",
    route: "/features",
  },
  {
    id: 3,
    label: "Pricing",
    route: "/pricing",
  },
  {
    id: 4,
    label: "Testimonials",
    route: "/testimonials",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center items-center gap-6 font-grotesk w-full">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.route}
          className={cn(
            "text-sm font-medium transition-colors hover:text-orange",
            "py-2 px-3 rounded-md",
            pathname === item.route
              ? "text-black font-semibold"
              : "text-gray-dark hover:text-orange"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}