"use client";
import React from "react";

import { Input } from "@/components/ui/input";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: TextInputProps) => (
  <div className="w-full md:w-1/2 px-2 mb-4">
    <label htmlFor={name} className="block mb-1 font-medium">
      {label}
    </label>
    <Input
      required={required}
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
