import React from "react";
import { cn } from "@/utils/cn";

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                index < currentStep
                  ? "bg-success border-success text-white"
                  : index === currentStep
                  ? "bg-primary border-primary text-white"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-xs mt-1 text-center",
              index <= currentStep ? "text-gray-900" : "text-gray-400"
            )}>
              {step}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 -translate-y-1/2"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;