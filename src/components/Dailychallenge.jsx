import React from "react";


export const Dailychallenge = (props) => {
  const truncate = (str,maxLength) => 
    {
      return str.length > maxLength ? str.slice(0,maxLength) + "..." : str;
    }
  return (
    <div className="border py-6 mx-auto flex flex-col gap-6 px-4 border-t-borderFromWhite border-x-borderToWhite border-b-borderToYellow/60 w-[98%] bg-[#373737]/10 backdrop-blur-[100px] rounded-xl">
      <h1 className="font-[Geist] font-semibold text-[#BBBBBB] text-xl">Start off Today with:</h1>
      <div>
        {
          props.questionNumber && props.questionTitle && props.questionLink && props.questionDiff ? 
          (
            <div className="text-xl flex justify-between items-center font-bold">
              <a target="_blank" href={props.questionLink}>{props.questionNumber}. {truncate(props.questionTitle,30)}</a>
              <p className={`${props.questionDiff==="Hard"?"text-red-500":props.questionDiff==="Medium"?"text-yellow-500":props.questionDiff==="Easy"?"text-green-500":""}`}>{props.questionDiff}</p>
            </div>
          )
          :
          (
            <div className="flex justify-center gap-16 items-center">
              <div className="flex justify-center gap-4 items-center">
                <div className="h-8 rounded w-10 bg-gray-600 animate-pulse">
                </div>
                <div className="h-8 w-60 rounded bg-gray-600 animate-pulse">
                </div>
              </div>
              <div className="h-8 w-16 rounded bg-gray-600 animate-pulse">
                
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
