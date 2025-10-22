import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

const EditCategory = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.slug;
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
