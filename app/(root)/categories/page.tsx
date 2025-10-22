import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { getBaseUrl } from "@/lib/utils";

import { CategoriesTable } from "./_components";

const CategoriesPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/categories`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok && res.status === 401) {
    console.error("Categories fetch failed:", await res.text());
    redirect("/login");
  }

  const categories = await res.json();
  return <CategoriesTable categories={categories} />;
};

export default CategoriesPage;
