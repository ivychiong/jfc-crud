import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { TagsTable } from "./_components";

const TagsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.BASE_URL}/api/tags`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok && res.status === 401) {
    console.error("Tags fetch failed:", await res.text());
    redirect("/login");
  }

  const tags = await res.json();

  return <TagsTable tags={tags} />;
};

export default TagsPage;
