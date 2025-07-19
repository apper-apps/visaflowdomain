import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:brightness-110 focus:ring-primary",
    secondary: "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    success: "bg-success text-white hover:brightness-110 focus:ring-success",
    warning: "bg-warning text-white hover:brightness-110 focus:ring-warning",
    error: "bg-error text-white hover:brightness-110 focus:ring-error",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded",
    default: "px-4 py-2 text-sm rounded",
    lg: "px-6 py-3 text-base rounded-md"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;