import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  children,
  hover = false,
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        "bg-surface border border-gray-200 rounded transition-all duration-200",
        hover && "hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;