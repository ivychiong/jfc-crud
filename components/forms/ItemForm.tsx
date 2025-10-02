"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ItemFormProps {
  label: string;
  action: "ADD" | "EDIT";
  route: string;
}

const actionTitleMap: Record<string, string> = {
  ADD: "Add",
  EDIT: "Edit",
};

const ItemForm = ({ label, action }: ItemFormProps) => {
  const pathName = usePathname();
  const basePath = pathName.substring(0, pathName.lastIndexOf("/")) || "/";

  const actionTitle = actionTitleMap[action];
  return (
    <form>
      <p>{`${actionTitle} New ${label}`}</p>
      <div className="space-y-3 flex flex-col mt-6">
        <Label htmlFor={label.toLowerCase()}>{`${label} Name`}</Label>
        <Input
          required
          type="text"
          id={label.toLowerCase()}
          className="max-w-sm border border-gray-300 focus:border-2 focus:border-blue-800 !ring-0"
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button className="btn-secondary" asChild>
          <Link href={basePath}>Cancel</Link>
        </Button>
        <Button
          type="submit"
          className="btn-primary"
        >{`${actionTitle} ${label}`}</Button>
      </div>
    </form>
  );
};

export default ItemForm;
