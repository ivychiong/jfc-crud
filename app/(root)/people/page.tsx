import React from "react";

import { PeopleTable } from "./_components";

const PeoplePage = async () => {
  const people = await fetch(`${process.env.BASE_URL}/api/people`).then((res) =>
    res.json()
  );

  console.log(people);

  return <PeopleTable people={people} />;
};

export default PeoplePage;
