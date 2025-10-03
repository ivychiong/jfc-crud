"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";

const CategoriesTable = ({
  categories,
}: {
  categories: Record<string, string | number>[];
}) => {
  const router = useRouter();

  const handleDelete = async (id: string | number) => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Category deleted successfully.");

      router.push("/categories");
      router.refresh();
    } else {
      toast.error("Failed to delete");
    }
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
        <Button
          className="bg-blue-500 rounded-full text-white font-bold text-md"
          asChild
        >
          <Link href={`/categories/create`}>Add Category</Link>
        </Button>
      </div>

      <ListTable
        items={mappedCategories}
        label="Category"
        route="/categories"
        onDelete={handleDelete}
        headers={["Category Name"]}
      />
    </Card>
  );
};

export default CategoriesTable;
