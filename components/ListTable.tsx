"use client";

import Link from "next/link";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ListTableProps {
  items: Record<string, string | number>[];
  onDelete: (id: string | number) => void;
  route?: string;
  headers: string[];
  hideActions?: boolean;
}

const ListTable = ({
  items,
  onDelete,
  route,
  headers,
  hideActions = false,
}: ListTableProps) => {
  const hasItems = items && items.length > 0;

  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          {!hideActions && (
            <TableHead className="text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {hasItems ? (
          items.map((item) => {
            const id = item.id;

            return (
              <TableRow key={id}>
                {headers.map((header) => {
                  const headerKey = header.toLowerCase();
                  const cellValue = item[header] ?? "-";

                  if (
                    (headerKey === "name" || headerKey === "business name") &&
                    route &&
                    (route === "/people" || route === "/businesses")
                  ) {
                    return (
                      <TableCell key={header}>
                        <Link
                          href={`${route}/${id}/show`}
                          className="text-blue-600 hover:underline"
                        >
                          {cellValue}
                        </Link>
                      </TableCell>
                    );
                  }

                  return <TableCell key={header}>{cellValue}</TableCell>;
                })}

                {!hideActions && (
                  <TableCell className="text-right flex justify-end gap-2">
                    <Link href={`${route}/${id}/edit`}>
                      <Button
                        size="sm"
                        className={cn(buttonVariants({ variant: "outline" }))}
                      >
                        Edit
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      className={cn(buttonVariants({ variant: "outline" }))}
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={hideActions ? headers.length : headers.length + 1}
              className="h-24 text-center text-gray-500"
            >
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ListTable;
