"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";

const TagsTable = ({ tags }: { tags: Record<string, string>[] }) => {
  const router = useRouter();

  const handleDelete = async (id: string | number) => {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    const res = await fetch(`/api/tags/${id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status === 401) {
      toast.error("Unauthorized. Redirectering to login page...");
      router.replace("/login");
      return;
    }

    toast.success("Tag deleted successfully.");

    router.push("/tags");
    router.refresh();
  };

  const mappedTags = useMemo(() => {
    return tags.map((tag) => ({
      id: tag.id,
      "Tag Name": tag.name,
    }));
  }, [tags]);

  return (
    <Card>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-blue-500 rounded-full text-white font-bold text-md"
          asChild
        >
          <Link href={`/tags/create`}>Add Tag</Link>
        </Button>
      </div>

      <ListTable
        items={mappedTags}
        route={`/tags`}
        onDelete={handleDelete}
        headers={["Tag Name"]}
      />
    </Card>
  );
};

export default TagsTable;
