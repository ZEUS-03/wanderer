import React from "react";

const MainHeader = (props) => {
  return (
    <div className="p-3 text-lg flex justify-between bg-[#e1d1bf] shadow-md">
      {props.children}
    </div>
  );
};
export default MainHeader;
