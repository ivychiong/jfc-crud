"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import Tag from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/utils";

type Person = {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  business?: { name: string };
  tags: { name: string }[];
};

const PeopleTable = ({ people }: { people: Person[] }) => {
  const router = useRouter();

  const mappedPeople = useMemo(() => {
    return people.map((p) => ({
      id: p.id,
      Name: `${p.first_name} ${p.last_name}`,
      Email: p.email,
      Phone: p.phone || "-",
      Business: p?.business?.name || "-",
      Tags: (
        <div className="flex flex-wrap gap-1">
          {p?.tags.length > 0
            ? p.tags.map((t) => <Tag key={t.name}>{t.name}</Tag>)
            : "-"}
        </div>
      ),
    }));
  }, [people]);

  const handleDelete = async (id: string | number) => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const res = await fetch(`${getBaseUrl()}/api/people/${id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status === 401) {
      toast.error("Unauthorized. Redirectering to login page...");
      router.replace("/login");
      return;
    }

    toast.success("Person deleted successfully.");

    router.push("/people");
    router.refresh();
  };

  return (
    <Card>
      <div className="flex justify-end mb-4">
        <Button className="btn-primary" asChild>
          <Link href={`/people/create`}>Add Person</Link>
        </Button>
      </div>
      <ListTable
        items={mappedPeople}
        route={`/people`}
        onDelete={handleDelete}
        headers={["Name", "Email", "Phone", "Business", "Tags"]}
      />
    </Card>
  );
};

export default PeopleTable;
