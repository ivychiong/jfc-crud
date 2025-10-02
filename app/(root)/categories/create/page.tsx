import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";

const CreateCategory = () => {
  return (
    <Card>
      <ItemForm label="Category" action="ADD" route="/categories" />
    </Card>
  );
};

export default CreateCategory;
