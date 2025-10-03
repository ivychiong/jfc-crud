"use client";

import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TasksTableProps {
  tasks: (Task & {
    person?: { first_name: string; last_name: string };
    business?: { name: string };
  })[];
}

const TasksTable = ({ tasks }: TasksTableProps) => {
  const router = useRouter();
  const openTasks = tasks?.filter((t) => !t.completed);
  const completedTasks = tasks?.filter((t) => t.completed);

  const handleToggleStatus = async (id: number, completed: boolean) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    if (!res.ok && res.status === 401) {
      toast.error("Unauthorized. Redirectering to login page...");
      router.replace("/login");
    }

    router.refresh();
  };

  const renderTasks = (list: TasksTableProps["tasks"]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task Name</TableHead>
          <TableHead>For</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>
              {task.person
                ? `${task.person.first_name} ${task.person.last_name}`
                : task.business?.name || "-"}
            </TableCell>
            <TableCell>{task.completed ? "Completed" : "Open"}</TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                className={cn(task.completed ? "btn-warning" : "btn-success")}
                onClick={() => handleToggleStatus(task.id, task.completed)}
              >
                {task.completed ? "Reopen" : "Mark Completed"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Open Tasks List</h2>
          {renderTasks(openTasks)}
        </div>
        <hr className="my-10 border-gray-200" />
        <div>
          <h2 className="text-xl font-bold mb-4">Completed Tasks List</h2>
          {renderTasks(completedTasks)}
        </div>
      </div>
    </Card>
  );
};

export default TasksTable;
