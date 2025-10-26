import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Header from "@/components/Header";
import TagsTable from "@/components/TagsTable";
import { getBaseUrl } from "@/lib/utils";

const TagsPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/tags`, {
    headers: { cookie: `token=${token}` },
  });

  if (!res.ok && res.status === 401) {
    console.error("Tags fetch failed:", await res.text());
    redirect("/login");
  }

  const tags = await res.json();

  return (
    <>
      <Header headerName="Tags" />
      <TagsTable tags={tags} />
    </>
  );
};

export default TagsPage;
