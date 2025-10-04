"use client";

import Link from "next/link";
import React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatLabel } from "@/lib/utils";

interface AuthFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  defaultValues: T;
  formType: "LOGIN" | "REGISTER";
  loading?: boolean;
}

const AuthForm = <T extends FieldValues>({
  form,
  onSubmit,
  defaultValues,
  formType,
  loading = false,
}: AuthFormProps<T>) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((fieldName) => {
          if (fieldName === "rememberMe") return null;
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {formatLabel(field.name)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={
                        field.name === "password" ||
                        field.name === "confirmPassword"
                          ? "password"
                          : "text"
                      }
                      className="border border-gray-300 focus:border-2 focus:border-blue-800 !ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
          );
        })}

        {formType === "LOGIN" && (
          <div className="flex -mt-4">
            <FormField
              control={form.control}
              name={"rememberMe" as Path<T>}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="rememberMe"
                      checked={!!field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  </FormControl>
                  <Label htmlFor="rememberMe">Remember me</Label>
                </FormItem>
              )}
            />
            <Link href="/forgot-password" className="ml-auto underline text-sm">
              Forgot password?
            </Link>
          </div>
        )}

        <div className="flex justify-end gap-2 items-center">
          <Link
            href={formType === "LOGIN" ? "/register" : "/login"}
            className="text-sm underline"
          >
            {formType === "LOGIN"
              ? "Don't have an account?"
              : "Already registered?"}
          </Link>
          <Button
            className="bg-foreground text-white uppercase cursor-pointer"
            disabled={loading}
          >
            {formType === "LOGIN" ? "Log in" : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
