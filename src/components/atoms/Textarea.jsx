import React from "react";
import { cn } from "@/utils/cn";

const Textarea = React.forwardRef(({ 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 border rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical",
        error ? "border-error" : "border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;