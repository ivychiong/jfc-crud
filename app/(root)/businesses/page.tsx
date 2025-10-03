import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { BusinessesTable } from "./_components";

const BusinessesPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/businesses`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok && res.status === 401) {
    console.error("People fetch failed:", await res.text());
    redirect("/login");
  }

  const businesses = await res.json();

  return <BusinessesTable businesses={businesses} />;
};

export default BusinessesPage;
