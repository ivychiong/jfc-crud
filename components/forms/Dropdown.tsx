"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({
  label,
  name,
  options,
  value,
  onChange,
}: DropdownProps) => (
  <div className="w-full md:w-1/2 px-2 mb-4">
    <label htmlFor={name} className="block mb-1 font-medium">
      {label}
    </label>
    <Select value={value} onValueChange={(val) => onChange(val)}>
      <SelectTrigger id={name}>
        <SelectValue placeholder={`No ${label}`} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
