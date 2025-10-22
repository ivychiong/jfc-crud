"use client";

import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBaseUrl } from "@/lib/utils";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset link sent! Please check your inbox.");
        setEmail("");
      } else {
        toast.error(data.error || "Failed to send reset link.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="mb-6 max-w-md">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 focus:border-2 focus:border-blue-800 !ring-0"
          />
        </div>

        <div className="flex justify-between">
          <Link href="/login" className="text-sm underline mr-4">
            Back to login
          </Link>
          <Button
            type="submit"
            className="bg-foreground text-white uppercase"
            disabled={loading}
          >
            {loading ? "Sending..." : "Email Password Reset Link"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
