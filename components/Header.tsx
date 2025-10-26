import React from "react";

const Header = ({ headerName }: { headerName: string }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-10 sm:px-25 py-4  shadow-md ">
      <h1>{headerName}</h1>
    </div>
  );
};

export default Header;
