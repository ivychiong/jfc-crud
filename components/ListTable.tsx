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
  onDelete: (id: string | number) => void;
  route?: string;
  headers: string[];
}

const ListTable = ({ items, onDelete, route, headers }: ListTableProps) => {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            {headers.map((header) => {
              if (
                (header.toLowerCase() === "name" ||
                  header.toLowerCase() === "business name") &&
                (route === "/people" || route === "/businesses")
              ) {
                return (
                  <TableCell key={header}>
                    <Link
                      href={`${route}/${item.id}/show`}
                      className="text-blue-600 hover:underline"
                    >
                      {item[header]}
                    </Link>
                  </TableCell>
                );
              }

              return <TableCell key={header}>{item[header]}</TableCell>;
            })}
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
