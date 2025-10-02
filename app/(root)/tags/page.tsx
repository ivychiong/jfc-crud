import Link from "next/link";
import React from "react";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";

const TagsPage = async () => {
  const tags = await fetch(`${process.env.BASE_URL}/api/tags`).then((res) =>
    res.json()
  );

  return (
    <Card>
      <Button
        className="ml-auto bg-blue-500 rounded-full text-white font-bold text-md"
        asChild
      >
        <Link href={`/tags/create`}>Add Tags</Link>
      </Button>
      <ListTable items={tags} label="Category" />
    </Card>
  );
};

export default TagsPage;
