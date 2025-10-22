"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import AuthForm from "@/components/forms/AuthForm";
import { getBaseUrl } from "@/lib/utils";
import { RegisterSchema } from "@/lib/validation";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setLoading(true);
    try {
      const res = await fetch(`${getBaseUrl()}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      } else {
        const err = await res.json();
        toast.error(err.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      formType="REGISTER"
      loading={loading}
    />
  );
};

export default RegisterPage;
