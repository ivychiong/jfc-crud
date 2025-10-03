import React from "react";

import Card from "@/components/Card";
import TaskForm from "@/components/forms/TaskForm";

const BusinessPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const [businessRes, tasksRes] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/businesses/${id}`),
    fetch(`${process.env.BASE_URL}/api/businesses/${id}/tasks`),
  ]);

  if (!businessRes.ok || !tasksRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const business = await businessRes.json();
  const tasks = await tasksRes.json();

  console.log(business);
  console.log(tasks);

  const businessData = [
    {
      label: "Business Name",
      value: business.name,
    },
    {
      label: "Contact Email",
      value: business?.email || "",
    },
    {
      label: "Categories",
      value:
        business?.tags.length > 0
          ? business?.tags?.map((t: { name: string }) => t.name).join(", ")
          : "-",
    },
  ];

  return (
    <Card>
      <div className="flex">
        <div className="flex-1">
          <p className="mb-2 font-bold">Business Details</p>
          {businessData.map((data) => (
            <div key={data.label} className="flex gap-2">
              <p className="font-medium">{data.label}</p>:<p>{data.value}</p>
            </div>
          ))}
        </div>
        <TaskForm tasks={tasks} type="business" />
      </div>
    </Card>
  );
};

export default BusinessPage;
