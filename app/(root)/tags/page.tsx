import React from "react";

import TagPageClient from "./TagPageClient";

const TagsPage = async () => {
  const tags = await fetch(`${process.env.BASE_URL}/api/tags`).then((res) =>
    res.json()
  );

  return <TagPageClient tags={tags} />;
};

export default TagsPage;
