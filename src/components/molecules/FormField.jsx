import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import { cn } from "@/utils/cn";

const FormField = ({ 
  type = "text",
  label, 
  error, 
  required, 
  className, 
  children,
  options,
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select error={error} {...props}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {children}
          </Select>
        );
      case "textarea":
        return <Textarea error={error} {...props} />;
      default:
        return <Input type={type} error={error} {...props} />;
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label required={required}>{label}</Label>}
      {renderInput()}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormField;