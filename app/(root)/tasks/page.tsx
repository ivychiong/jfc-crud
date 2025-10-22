import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { getBaseUrl } from "@/lib/utils";

import { TasksTable } from "./_components";

const TasksPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${getBaseUrl()}/api/tasks`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok && res.status === 401) {
    console.error("Tasks fetch failed:", await res.text());
    redirect("/login");
  }

  const tasks = await res.json();
  return <TasksTable tasks={tasks} />;
};

export default TasksPage;
