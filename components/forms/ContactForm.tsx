"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { getBaseUrl } from "@/lib/utils";

import CheckboxGroup from "./CheckboxGroup";
import { Dropdown } from "./Dropdown";
import TextInput from "./TextInput";
import { Button } from "../ui/button";

export type FieldType = "text" | "email" | "checkbox" | "dropdown";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
}

interface ContactFormProps {
  label: string;
  items: Field[];
  route: string;
  action?: "ADD" | "EDIT";
  defaultValues?: Record<string, string | string[]>;
  id?: number | string;
}

const ContactForm = ({
  label,
  items,
  route,
  action = "ADD",
  id,
  defaultValues = {},
}: ContactFormProps) => {
  const router = useRouter();

  const [formData, setFormData] =
    useState<Record<string, string | string[]>>(defaultValues);

  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      let submitData: Record<string, unknown> = {};

      if (label === "Business") {
        submitData = {
          businessName: formData.businessName,
          contactEmail: formData.contactEmail || null,
          categories: formData.categories || [],
          tags: formData.tags || [],
        };
      } else if (label === "Person") {
        submitData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || null,
          phone: formData.phone || null,
          businessId:
            formData.business === "noValue" ? null : formData.business,
          tags: formData.tags || [],
        };
      }

      const url = action === "ADD" ? `/api${route}` : `/api${route}/${id}`;
      const method = action === "ADD" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Unauthorized. Redirectering to login page...");
          router.push("/login");
        }
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

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

    const res = await fetch(`${getBaseUrl()}/api${route}/${id}`, {
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

  const actionTitle = action === "ADD" ? "Add" : "Update";

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          {items.map((item) => {
            if (item.type === "text" || item.type === "email") {
              return (
                <TextInput
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  type={item.type}
                  value={(formData[item.name] as string) || ""}
                  onChange={(e) => handleChange(item.name, e.target.value)}
                />
              );
            }
            if (item.type === "checkbox" && item.options) {
              return (
                <CheckboxGroup
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  options={item.options}
                  value={(formData[item.name] as string[]) || []}
                  onChange={(val) => handleChange(item.name, val)}
                />
              );
            }
            if (item.type === "dropdown" && item.options) {
              return (
                <Dropdown
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  options={item.options}
                  value={(formData[item.name] as string) || ""}
                  onChange={(val) => handleChange(item.name, val)}
                />
              );
            }
            return null;
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button className="btn-secondary" asChild disabled={loading}>
            <Link href={route}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >{`${actionTitle}`}</Button>
        </div>
        {action === "EDIT" && (
          <div>
            <Button
              type="button"
              className="btn-warning"
              disabled={loading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;
