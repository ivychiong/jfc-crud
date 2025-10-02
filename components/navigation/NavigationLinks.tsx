"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/constants/links";
import { cn } from "@/lib/utils";

const NavigationLinks = () => {
  const pathName = usePathname();
  const mainLinks = navLinks.filter((link) => link.label !== "User");
  const userLink = navLinks.find((link) => link.label === "User");

  return (
    <div className="flex items-center gap-6 w-full max-sm:hidden h-18 font-medium text-md">
      <div className="flex items-center gap-10 h-full">
        {mainLinks.map((link) =>
          link.dropdown ? (
            <DropdownMenu key={link.label}>
              <DropdownMenuTrigger className="flex items-center h-full px-2 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition cursor-pointer">
                {link.label}
                <Image
                  src="/icons/chevron-down.svg"
                  alt="Dropdown Icon"
                  width={15}
                  height={15}
                  className="inline ml-1"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white shadow-md border border-gray-200 rounded-md">
                {link.dropdown.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "h-full px-2 flex items-center border-b-2 transition-colors",
                pathName === link.href
                  ? "border-blue-500"
                  : "border-transparent hover:border-gray-300 hover:text-gray-900"
              )}
            >
              {link.label}
            </Link>
          )
        )}
      </div>

      {userLink && (
        <div className="ml-auto h-full flex items-center">
          <DropdownMenu key={userLink.label}>
            <DropdownMenuTrigger className="flex items-center h-full px-2 text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition cursor-pointer">
              {userLink.label}
              <Image
                src="/icons/chevron-down.svg"
                alt="Dropdown Icon"
                width={15}
                height={15}
                className="inline ml-1"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white shadow-md border border-gray-200 rounded-md">
              {userLink?.dropdown?.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="cursor-pointer"
                >
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default NavigationLinks;
