import React from "react";

import { TasksTable } from "./_components";

const TasksPage = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/tasks`, {
    cache: "no-store",
  });
  const tasks = await res.json();
  return <TasksTable tasks={tasks} />;
};

export default TasksPage;
