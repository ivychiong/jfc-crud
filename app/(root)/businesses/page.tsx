import React from "react";

import { BusinessesTable } from "./_components";

const BusinessesPage = async () => {
  const businesses = await fetch(`${process.env.BASE_URL}/api/businesses`).then(
    (res) => res.json()
  );

  return <BusinessesTable businesses={businesses} />;
};

export default BusinessesPage;
