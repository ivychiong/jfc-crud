"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBaseUrl } from "@/lib/utils";

interface TaskFormProps {
  type: "person" | "business";
  tasks: Record<string, string>[];
}

const TaskForm = ({ type, tasks = [] }: TaskFormProps) => {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title,
        description,
        completed: status === "completed",
        ...(type === "person"
          ? { personId: Number(id) }
          : { businessId: Number(id) }),
      };

      const res = await fetch(`${getBaseUrl()}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok && res.status === 401) {
        toast.error("Unauthorized. Redirectering to login page...");
        router.push("/login");
      }

      setTitle("");
      setDescription("");
      setStatus("open");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <p className="text-xl font-semibold mb-2">Add Task</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Select value={status} onValueChange={(val) => setStatus(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="flex ml-auto btn-primary"
          disabled={loading}
        >
          Add Task
        </Button>
      </form>

      <div className="mt-4">
        <p className="text-xl font-semibold mb-2">Tasks</p>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks?.map((task, idx) => (
              <li key={task.id} className="mb-2">
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-gray-600">{task.description}</div>
                <div className="text-xs text-gray-500">
                  {task.completed ? "Completed" : "Open"}
                </div>
                {idx !== tasks.length - 1 && (
                  <hr className="my-2 border-gray-200" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
