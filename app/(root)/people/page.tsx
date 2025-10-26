import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Header from "@/components/Header";
import PeopleTable from "@/components/PeopleTable";
import { getBaseUrl } from "@/lib/utils";

const PeoplePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/people`, {
    headers: { cookie: `token=${token}` },
  });

  if (!res.ok && res.status === 401) {
    console.error("People fetch failed:", await res.text());
    redirect("/login");
  }

  const people = await res.json();

  return (
    <>
      <Header headerName="People" />
      <PeopleTable people={people} />
    </>
  );
};

export default PeoplePage;
