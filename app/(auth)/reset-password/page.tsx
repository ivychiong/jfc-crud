"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successful! Please login.");
        router.push("/login");
      } else {
        toast.error(data.error || "Failed to reset password.");
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
        Enter your new password below. Make sure it’s strong and something
        you’ll remember!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="password">New Password</Label>
          <Input
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 focus:border-2 focus:border-blue-800 !ring-0"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            required
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
