import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

const EditCategory = async (props: { params: Params }) => {
  const params = await props.params;
  const { id } = params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!category) {
    return <p className="text-red-600">Category not found.</p>;
  }

  return (
    <>
      <Header headerName="Edit Category" />
      <Card>
        <ItemForm
          label="Category"
          action="EDIT"
          route="/categories"
          id={category.id}
          defaultValue={category.name}
        />
      </Card>
    </>
  );
};

export default EditCategory;
