import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";
import Header from "@/components/Header";

const CreateTag = () => {
  return (
    <>
      <Header headerName="Add Tag" />
      <Card>
        <ItemForm label="Tag" action="ADD" route="/tags" />
      </Card>
    </>
  );
};

export default CreateTag;
