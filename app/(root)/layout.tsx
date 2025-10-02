"use client";
import React from "react";

import NavigationBar from "@/components/navigation/NavigationBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <NavigationBar />
      {children}
    </main>
  );
};

export default RootLayout;
