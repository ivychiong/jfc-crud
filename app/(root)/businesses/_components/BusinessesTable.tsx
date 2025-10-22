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

interface Business {
  id: string;
  name: string;
  email: string;
  categories: { name: string }[];
  tags: { name: string }[];
}

const BusinessesTable = ({ businesses }: { businesses: Business[] }) => {
  const router = useRouter();

  const mappedBusinesses = useMemo(() => {
    return businesses.map((b) => ({
      id: b.id,
      "Business Name": b.name,
      Email: b.email,
      Categories: (
        <div className="flex flex-wrap gap-1">
          {" "}
          {b?.categories.length > 0
            ? b.categories.map((b) => <Tag key={b.name}>{b.name}</Tag>)
            : "-"}
        </div>
      ),
      Tags: (
        <div className="flex flex-wrap gap-1">
          {b?.tags.length > 0
            ? b.tags.map((b) => <Tag key={b.name}>{b.name}</Tag>)
            : "-"}
        </div>
      ),
    }));
  }, [businesses]);

  const handleDelete = async (id: string | number) => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const res = await fetch(`${getBaseUrl()}/api/businesses/${id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status === 401) {
      toast.error("Unauthorized. Redirectering to login page...");
      router.replace("/login");
      return;
    }

    toast.success("Business deleted successfully.");

    router.push("/businesses");
    router.refresh();
  };

  return (
    <Card>
      <div className="flex justify-end mb-4">
        <Button className="btn-primary" asChild>
          <Link href={`/businesses/create`}>Add Business</Link>
        </Button>
      </div>
      <ListTable
        items={mappedBusinesses}
        route={`/businesses`}
        onDelete={handleDelete}
        headers={["Business Name", "Email", "Categories", "Tags"]}
      />
    </Card>
  );
};

export default BusinessesTable;
