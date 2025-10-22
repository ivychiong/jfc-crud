import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

const EditTag = async (props: { params: Params }) => {
  const params = await props.params;
  const id = params.slug;
  const tag = await prisma.tag.findUnique({
    where: { id: Number(id) },
  });

  if (!tag) {
    return <p className="text-red-600">Tag not found.</p>;
  }

  return (
    <Card>
      <ItemForm
        label="Tag"
        action="EDIT"
        route="/tags"
        id={tag.id}
        defaultValue={tag.name}
      />
    </Card>
  );
};

export default EditTag;
