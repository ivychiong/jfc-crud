import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded-md p-6 mx-40 my-14">
      {children}
    </div>
  );
};

export default Card;
