import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import BusinessesTable from "@/components/BusinessesTable";
import Header from "@/components/Header";
import { getBaseUrl } from "@/lib/utils";

const BusinessesPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/businesses`, {
    headers: { cookie: `token=${token}` },
  });

  if (!res.ok && res.status === 401) {
    console.error("People fetch failed:", await res.text());
    redirect("/login");
  }

  const businesses = await res.json();

  return (
    <>
      <Header headerName="Business" />
      <BusinessesTable businesses={businesses} />
    </>
  );
};

export default BusinessesPage;
