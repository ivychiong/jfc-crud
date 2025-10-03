"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Unauthorized. Redirectering to login page...");
          router.push("/login");
        }
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setName("");
      toast.success(
        `${label} ${action === "ADD" ? "created" : "updated"} successfully!`
      );

      router.refresh();
      router.push(route);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete this ${label.toLowerCase()}?`
    );
    if (!confirmed) return;

    const res = await fetch(`/api${route}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status === 401) {
      toast.error("Unauthorized. Redirectering to login page...");
      router.replace("/login");
      return;
    }

    toast.success(`${label} deleted successfully.`);
    router.push(route);
    router.refresh();
  };

  const actionTitle = action === "ADD" ? "Add New" : "Update";
  return (
    <>
      <p>{`${actionTitle} ${label}`}</p>
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
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button className="btn-secondary" asChild disabled={loading}>
            <Link href={route}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >{`${actionTitle} ${label}`}</Button>
        </div>
        {action === "EDIT" && (
          <div>
            <Button
              type="button"
              className="btn-warning"
              disabled={loading}
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ItemForm;
