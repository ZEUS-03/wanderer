import React from "react";

const Card = (props) => {
  return (
    <div className="flex flex-col justify-center items-center bg-orange-200 my-3 w-[40%] mx-auto p-3 rounded-lg ">
      {props.children}
    </div>
  );
};
export default Card;
