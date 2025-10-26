import Image from "next/image";
import Link from "next/link";
import React from "react";

import MobileNavigation from "./MobileNavigation";
import NavigationLinks from "./NavigationLinks";

const NavigationBar = () => {
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
    </nav>
  );
};

export default NavigationBar;
