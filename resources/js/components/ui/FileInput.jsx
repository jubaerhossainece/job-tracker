import React from "react";

const FileInput = React.forwardRef(({ id = "file", label = "Upload File", onChange, name, onBlur, className, ...props }, ref) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md cursor-pointer text-sm"
      >
        <span>{label}</span>
        <input
          type="file"
          id={id}
          name={name}
          className="hidden"
          onChange={(e) => {
            onChange && onChange(e);
          }}
          onBlur={onBlur}
          ref={ref}
          {...props}
        />
      </label>
    </div>
  );
});

FileInput.displayName = "FileInput";


export { FileInput };
