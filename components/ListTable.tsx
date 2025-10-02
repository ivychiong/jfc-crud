"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ListTableProps {
  items: Record<string, string | number>[];
  label: string;
  onDelete: (id: string | number) => void;
  route?: string;
}

const ListTable = ({ items, label, onDelete, route }: ListTableProps) => {
  console.log(items);
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{`${label} Name`}</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right flex justify-end gap-2">
              <Link href={`${route}/${item.id}/edit`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>

              <Button onClick={() => onDelete(item.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListTable;
