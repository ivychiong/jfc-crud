"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/utils";

const CategoriesTable = ({
  categories,
}: {
  categories: Record<string, string | number>[];
}) => {
  const router = useRouter();

  const handleDelete = async (id: string | number) => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const res = await fetch(`${getBaseUrl()}/api/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status === 401) {
      toast.error("Unauthorized. Redirectering to login page...");
      router.replace("/login");
      return;
    }

    toast.success("Category deleted successfully.");

    router.push("/categories");
    router.refresh();
  };

  const mappedCategories = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      "Category Name": category.name,
    }));
  }, [categories]);

  return (
    <Card>
      <div className="flex justify-end mb-4">
        <Button className="btn-primary" asChild>
          <Link href={`/categories/create`}>
            <p>Add Category</p>
          </Link>
        </Button>
      </div>

      <ListTable
        items={mappedCategories}
        route="/categories"
        onDelete={handleDelete}
        headers={["Category Name"]}
      />
    </Card>
  );
};

export default CategoriesTable;
