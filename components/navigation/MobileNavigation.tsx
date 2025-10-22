"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/constants/links";
import { getBaseUrl } from "@/lib/utils";
import { useUser } from "@/provider/UserProvider";

const NavigationLinksMobile = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const mainLinks = navLinks.filter((link) => link.label !== "User");
  const userLink = navLinks.find((link) => link.label === "User");

  const handleLogout = async () => {
    const res = await fetch(`${getBaseUrl()}/api/auth/logout`, {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      setUser(null);
      router.push("/login");
    } else {
      alert(data.error || "Logout failed");
    }
  };

  return (
    <div className="flex sm:hidden items-center ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 bg-white shadow-md border border-gray-200 rounded-md mr-5">
          {mainLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                {link.dropdown.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
            ) : (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            )
          )}

          <DropdownMenuSeparator />

          {userLink?.dropdown?.map((item) =>
            item.label === "Logout" ? (
              <DropdownMenuItem key={item.href} onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavigationLinksMobile;
