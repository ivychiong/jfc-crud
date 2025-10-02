import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";
import { prisma } from "@/lib/prisma";

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!category) {
    return <p className="text-red-600">Category not found.</p>;
  }

  return (
    <Card>
      <ItemForm
        label="Category"
        action="EDIT"
        route="/categories"
        id={category.id}
        defaultValue={category.name}
      />
    </Card>
  );
};

export default EditCategory;
