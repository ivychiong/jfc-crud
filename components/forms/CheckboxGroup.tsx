"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}

const CheckboxGroup = ({
  label,
  name,
  options,
  value,
  onChange,
}: CheckboxGroupProps) => {
  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="w-full md:w-1/2 px-2 mb-4">
      <p className="block mb-2 font-medium">{label}</p>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id={`${name}-${opt.value}`}
              checked={value.includes(opt.value)}
              onCheckedChange={() => toggleValue(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
