import React from "react";

export const Moon = (props) => {
  return (
    <div className="flex gap-4 flex-col justify-center items-center">
        <img className="flex justify-center items-center  " src={props.img} alt="" />
        <div class="justify-center text-center text-white font-normal font-['Inter']">{props.text}</div>
    </div>
  );
};
