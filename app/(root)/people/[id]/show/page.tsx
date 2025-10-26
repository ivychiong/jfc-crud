import { cookies } from "next/headers";
import React from "react";

import Card from "@/components/Card";
import TaskForm from "@/components/forms/TaskForm";
import Header from "@/components/Header";
import { getBaseUrl } from "@/lib/utils";

type Params = Promise<{ id: string }>;

const PersonPage = async ({ params }: { params: Params }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  const tasksRes = await fetch(`${getBaseUrl()}/api/people/${id}/tasks`, {
    headers: { cookie: `token=${token}` },
  });

  const personRes = await fetch(`${getBaseUrl()}/api/people/${id}`, {
    headers: { cookie: `token=${token}` },
  });

  if (!personRes.ok || !tasksRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const person = await personRes.json();
  const tasks = await tasksRes.json();

  const personName = `${person.last_name}, ${person.first_name}`;
  const personData = [
    {
      label: "Name",
      value: personName,
    },
    {
      label: "Email",
      value: person?.email || "",
    },
    {
      label: "Phone",
      value: person?.phone || "",
    },
    {
      label: "Business",
      value: person?.business?.name || "",
    },
  ];

  return (
    <>
      <Header headerName={`Profile: ${personName}`} />
      <Card>
        <div className="flex">
          <div className="flex-1">
            <p className="mb-2 font-bold">Person Details</p>
            {personData.map((data) => (
              <div key={data.label} className="flex gap-2 mb-2">
                <p className="font-semibold">{data.label}: </p>
                <p>{data.value || "-"}</p>
              </div>
            ))}
          </div>
          <TaskForm type="person" tasks={tasks} />
        </div>
      </Card>
    </>
  );
};

export default PersonPage;
