import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-10">
      <Image
        src={"/images/jfc-logo.png"}
        alt="Jollibee Logo"
        width={50}
        height={50}
      />
      <section className="mt-5 min-w-full sm:min-w-md rounded-xl shadow-md bg-white p-5  text-black">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
