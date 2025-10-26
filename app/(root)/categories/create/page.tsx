import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";
import Header from "@/components/Header";

const CreateCategory = () => {
  return (
    <>
      <Header headerName="Add Category" />
      <Card>
        <ItemForm label="Category" action="ADD" route="/categories" />
      </Card>
    </>
  );
};

export default CreateCategory;
