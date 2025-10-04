import React from "react";

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-full bg-gray-200 text-gray-700 text-center w-fit py-1 px-4  text-sm font-semibold mb-2 mr-2">
      {children}
    </div>
  );
};

export default Tag;
