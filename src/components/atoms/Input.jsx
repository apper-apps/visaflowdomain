import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-3 py-2 border rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors",
        error ? "border-error" : "border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;