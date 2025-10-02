import React from "react";

import Card from "@/components/Card";
import ItemForm from "@/components/forms/ItemForm";

const CreateTag = () => {
  return (
    <Card>
      <ItemForm label="Tag" action="ADD" route="/tags" />
    </Card>
  );
};

export default CreateTag;
