import React from "react";

import { CategoriesTable } from "./_components";

const CategoriesPage = async () => {
  const categories = await fetch(`${process.env.BASE_URL}/api/categories`).then(
    (res) => res.json()
  );

  return <CategoriesTable categories={categories} />;
};

export default CategoriesPage;
