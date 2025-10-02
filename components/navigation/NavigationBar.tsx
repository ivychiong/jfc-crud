import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import NavigationLinks from "./NavigationLinks";
import Header from "../Header";

const NavigationBar = () => {
  const routeName = usePathname();

  const title = routeName
    .split("/")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" > ");

  return (
    <nav>
      <div className="bg-white w-full px-25 border-b border-gray-200 flex items-center gap-8 h-18">
        <Link href="/tasks">
          <Image
            src="/images/jfc-logo.png"
            alt="Jollibee Logo"
            width={50}
            height={50}
          />
        </Link>
        <NavigationLinks />
      </div>
      {routeName && <Header headerName={title || ""} />}
    </nav>
  );
};

export default NavigationBar;
