"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";

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
      Categories:
        b?.categories.length > 0
          ? b.categories.map((c) => c.name).join(", ")
          : "-",
      Tags: b?.tags.length > 0 ? b.tags.map((t) => t.name).join(", ") : "-",
    }));
  }, [businesses]);

  const handleDelete = async (id: string | number) => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const res = await fetch(`/api/businesses/${id}`, {
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
        <Button
          className="bg-blue-500 rounded-full text-white font-bold text-md"
          asChild
        >
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
