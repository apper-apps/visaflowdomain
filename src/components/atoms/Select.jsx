import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      className={cn(
        "w-full px-3 py-2 border rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors",
        error ? "border-error" : "border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;