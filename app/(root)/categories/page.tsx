import Link from "next/link";
import React from "react";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";

const CategoriesPage = async () => {
  const categories = await fetch(`${process.env.BASE_URL}/api/categories`).then(
    (res) => res.json()
  );

  return (
    <Card>
      <Button
        className="ml-auto bg-blue-500 rounded-full text-white font-bold text-md"
        asChild
      >
        <Link href={`/categories/create`}>Add Category</Link>
      </Button>
      <ListTable items={categories} label="Category" />
    </Card>
  );
};

export default CategoriesPage;
