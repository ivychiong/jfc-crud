import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import NavigationLinks from "./NavigationLinks";
import Header from "../Header";
import MobileNavigation from "./MobileNavigation";

const NavigationBar = () => {
  const routeName = usePathname();

  const routeTitleMap: Record<string, string> = {
    "/tasks": "Tasks",
    "/categories/create": "Add Category",
    "/categories": "Categories",
    "/tags/create": "Add Tag",
    "/tags": "Tags",
    "/people": "People",
    "/people/create": "Create Person",
    "/businesses": "Businesses",
    "/businesses/create": "Create Business",
  };

  const getRouteTitle = (pathname: string) => {
    if (pathname.startsWith("/people/") && pathname.endsWith("/edit")) {
      return "Edit Person";
    }

    if (pathname.startsWith("/businesses/") && pathname.endsWith("/edit")) {
      return "Edit Business";
    }

    if (pathname.startsWith("/categories/") && pathname.endsWith("/edit")) {
      return "Edit Category";
    }

    if (pathname.startsWith("/tags/") && pathname.endsWith("/edit")) {
      return "Edit Tag";
    }

    if (pathname.startsWith("/profile") || pathname.endsWith("/show")) {
      return `Profile`;
    }

    return routeTitleMap[pathname] || "Dashboard";
  };

  const title =
    getRouteTitle(routeName) ||
    routeName
      .split("/")
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");

  return (
    <nav>
      <div className="bg-white w-full  px-10 sm:px-25 border-b border-gray-200 flex items-center gap-8 h-18">
        <Link href="/tasks">
          <Image
            src="/images/jfc-logo.png"
            alt="Jollibee Logo"
            width={50}
            height={50}
          />
        </Link>
        <NavigationLinks />
        <MobileNavigation />
      </div>
      {routeName && <Header headerName={title || ""} />}
    </nav>
  );
};

export default NavigationBar;
