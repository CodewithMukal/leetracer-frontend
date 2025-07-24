import React from "react";
import hole from "../assets/hole.svg";
import Spinner from "./Spinner";

export const AIRecommendation = (props) => {
  return (
    <div className="max-w-[550px] border h-[600px] py-6 flex flex-col gap-6 px-4 border-t-borderFromWhite border-x-borderToWhite border-b-borderToYellow/60 bg-[#373737]/10 backdrop-blur-[100px] rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-[Geist] font-bold text-xl">AI Recommendations</h1>
        <div className="flex gap-2">
          <img src={hole} alt="" />
          <img src={hole} alt="" />
          <img src={hole} alt="" />
        </div>
      </div>
      {props.response ? (
        <div className="space-y-3 scrollbar overflow-auto">
          {props.response
            .split(/\d+\.\s/)
            .filter(Boolean)
            .map((point, index) => (
              <div key={index} className=" font-[Geist] leading-relaxed">
                <span className="font-semibold ">{index + 1}.</span>{" "}
                {point.trim()}
              </div>
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
