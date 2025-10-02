"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPasswordPage = () => {
  return (
    <div>
      <p className="mb-6 max-w-md">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </p>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-3 ">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            type="email"
            id="email"
            className="w-full border border-gray-300 focus:border-2 focus:border-blue-800 !ring-0"
          />
        </div>
        <div className="flex justify-between">
          <Link href="/login" className="text-sm underline mr-4">
            Back to login
          </Link>
          <Button className="bg-foreground text-white uppercase">
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
