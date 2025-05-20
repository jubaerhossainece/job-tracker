import React from "react";

const FileInput = ({ id = "file", label = "Upload File", onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <label
        htmlFor={id}
        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md cursor-pointer text-sm"
      >
        <span>{label}</span>
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
};


export { FileInput };
