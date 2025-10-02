"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import AuthForm from "@/components/forms/AuthForm";
import { LoginSchema } from "@/lib/validation";

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        router.push("/task");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      formType="LOGIN"
    />
  );
};

export default LoginPage;
