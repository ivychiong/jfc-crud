import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { getBaseUrl } from "@/lib/utils";

import { PeopleTable } from "./_components";

const PeoplePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/people`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok && res.status === 401) {
    console.error("People fetch failed:", await res.text());
    redirect("/login");
  }

  const people = await res.json();

  return <PeopleTable people={people} />;
};

export default PeoplePage;
