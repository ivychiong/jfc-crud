"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import AuthForm from "@/components/forms/AuthForm";
import { getBaseUrl } from "@/lib/utils";
import { LoginSchema } from "@/lib/validation";
import { useUser } from "@/provider/UserProvider";

const defaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const res = await fetch(`${getBaseUrl()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data) {
        setUser({ name: data.user.name, email: data.user.email });
        toast.success("Login successful!");
        router.replace("/tasks");
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
