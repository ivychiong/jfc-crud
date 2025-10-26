import { cookies } from "next/headers";
import React from "react";

import Card from "@/components/Card";
import TaskForm from "@/components/forms/TaskForm";
import Header from "@/components/Header";
import Tag from "@/components/Tag";
import { getBaseUrl } from "@/lib/utils";

type Params = Promise<{ id: string }>;

const BusinessPage = async ({ params }: { params: Params }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  const tasksRes = await fetch(`${getBaseUrl()}/api/businesses/${id}/tasks`, {
    headers: { cookie: `token=${token}` },
  });

  const businessRes = await fetch(`${getBaseUrl()}/api/businesses/${id}`, {
    headers: { cookie: `token=${token}` },
  });

  if (!businessRes.ok || !tasksRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const business = await businessRes.json();
  const tasks = await tasksRes.json();

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
      value: (
        <div className="flex gap-1 flex-wrap">
          {business?.tags.length > 0
            ? business?.tags?.map((t: { name: string }) => (
                <Tag key={t.name}>{t.name}</Tag>
              ))
            : "-"}
        </div>
      ),
    },
  ];

  return (
    <>
      <Header headerName={`Profile: ${business.name}`} />
      <Card>
        <div className="flex">
          <div className="flex-1">
            <p className="mb-2 font-bold">Business Details</p>
            {businessData.map((data) => (
              <div key={data.label} className="flex gap-1 mb-2">
                <p className="font-medium">{data.label}</p>:<p>{data.value}</p>
              </div>
            ))}
          </div>
          <TaskForm tasks={tasks} type="business" />
        </div>
      </Card>
    </>
  );
};

export default BusinessPage;
