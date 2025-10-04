"use client";

import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import Card from "@/components/Card";
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

const successButton = cn(
  buttonVariants({ variant: "default" }),
  "bg-green-500 hover:bg-green-600 text-white"
);
const warningButton = cn(
  buttonVariants({ variant: "default" }),
  "bg-yellow-500 hover:bg-yellow-600 text-white"
);

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

    if (res.status === 401) {
      toast.error("Unauthorized. Redirecting to login page...");
      router.replace("/login");
      return;
    }

    if (!res.ok) {
      toast.error("Something went wrong while updating the task.");
      return;
    }

    toast.success(
      `Task ${completed ? "reopened" : "marked completed"} successfully.`
    );
    router.refresh();
  };

  const TaskRow = ({
    task,
  }: {
    task: Task & {
      person?: { first_name: string; last_name: string };
      business?: { name: string };
    };
  }) => (
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
          className={cn(task.completed ? warningButton : successButton)}
          onClick={() => handleToggleStatus(task.id, task.completed)}
        >
          {task.completed ? "Reopen" : "Mark Completed"}
        </Button>
      </TableCell>
    </TableRow>
  );

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
        {list?.length ? (
          list.map((task) => <TaskRow key={task.id} task={task} />)
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center text-gray-500">
              No results.
            </TableCell>
          </TableRow>
        )}
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
