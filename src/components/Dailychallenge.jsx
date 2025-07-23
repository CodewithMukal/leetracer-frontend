import React from "react";

export const Dailychallenge = (props) => {
  return (
    <div className="border py-3 flex flex-col gap-14 px-4 border-borderFromWhite bg-[#373737]/10    backdrop-blur-[100px] rounded-xl">
      <h1>Start off Today with:</h1>
      <div>
        <p>
          {props.questionNumber}. {props.questionTitle}
        </p>
        (
            {props.difficulty === "easy"}
        )
      </div>
    </div>
  );
};
