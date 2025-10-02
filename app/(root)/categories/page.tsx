import React from "react";

import CategoriesPageClient from "./CategoriesPageClient";

const CategoriesPage = async () => {
  const categories = await fetch(`${process.env.BASE_URL}/api/categories`).then(
    (res) => res.json()
  );

  return <CategoriesPageClient categories={categories} />;
};

export default CategoriesPage;
