import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    new: "bg-blue-100 text-blue-800",
    review: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
    ready: "bg-success/10 text-success",
    submitted: "bg-green-100 text-green-800",
    error: "bg-error/10 text-error"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;