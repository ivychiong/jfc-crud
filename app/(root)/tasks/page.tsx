import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import Header from "@/components/Header";
import TasksTable from "@/components/TasksTable";
import { getBaseUrl } from "@/lib/utils";

const TasksPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/tasks`, {
    headers: { cookie: `token=${token}` },
  });

  if (!res.ok && res.status === 401) {
    console.error("Tasks fetch failed:", await res.text());
    redirect("/login");
  }

  const tasks = await res.json();

  return (
    <>
      <Header headerName="Tasks" />
      <TasksTable tasks={tasks} />
    </>
  );
};

export default TasksPage;
