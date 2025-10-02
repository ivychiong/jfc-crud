import React from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ListTableProps {
  items: Record<string, string>[];
  label: string;
}

const ListTable = ({ items, label }: ListTableProps) => {
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListTable;
