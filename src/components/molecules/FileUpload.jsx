import React, { useRef } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FileUpload = ({ 
  onFileSelect, 
  accept = "*/*", 
  multiple = false, 
  className,
  children 
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer",
        className
      )}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {children || (
        <div className="space-y-2">
          <ApperIcon name="Upload" className="h-8 w-8 text-gray-400 mx-auto" />
          <div>
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">Upload your documents here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;