import React from "react";

import { TagsTable } from "./_components";

const TagsPage = async () => {
  const tags = await fetch(`${process.env.BASE_URL}/api/tags`).then((res) =>
    res.json()
  );

  return <TagsTable tags={tags} />;
};

export default TagsPage;
