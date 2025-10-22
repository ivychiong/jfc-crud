"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBaseUrl } from "@/lib/utils";

interface ItemFormProps {
  label: string;
  action: "ADD" | "EDIT";
  route: string;
  id?: number | string;
  defaultValue?: string;
}

const ItemForm = ({
  label,
  action,
  route,
  id,
  defaultValue = "",
}: ItemFormProps) => {
  const router = useRouter();
  const [name, setName] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error(`${label} name cannot be empty.`);

    setLoading(true);
    try {
      const url = action === "ADD" ? `/api${route}` : `/api${route}/${id}`;
      const method = action === "ADD" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
        cache: "no-store",
      });

      if (res.status === 401) {
        toast.error("Unauthorized. Redirecting to login page...");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      toast.success(
        `${label} ${action === "ADD" ? "created" : "updated"} successfully!`
      );
      setName("");
      router.refresh();
      router.push(route);
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as Error).message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete this ${label.toLowerCase()}?`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api${route}/${id}`, {
        method: "DELETE",
      });

      if (res.status === 401) {
        toast.error("Unauthorized. Redirecting to login page...");
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete item.");
      }

      toast.success(`${label} deleted successfully.`);
      router.push(route);
      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as Error).message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const actionTitle = action === "ADD" ? "Add New" : "Update";

  return (
    <>
      <p className="text-lg font-semibold">{`${actionTitle} ${label}`}</p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 flex flex-col mt-6">
          <Label htmlFor={label.toLowerCase()}>{`${label} Name`}</Label>
          <Input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id={label.toLowerCase()}
            className="max-w-sm border border-gray-300 focus:border-2 focus:border-blue-800 !ring-0"
            disabled={loading}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button className="btn-secondary" asChild disabled={loading}>
            <Link href={route}>Cancel</Link>
          </Button>

          <Button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Processing..." : `${actionTitle} ${label}`}
          </Button>
        </div>

        {action === "EDIT" && (
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleDelete}
              className={"btn-warning"}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ItemForm;
