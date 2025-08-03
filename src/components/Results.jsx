import React from "react";
import { useNavigate } from "react-router";

export const Results = (props) => {
    const navigate = useNavigate();
  return (
    <div className="border-white/20 bg-black font-bold border-2 border-t-0 rounded-b-xl px-2 py-2">
      {props.results ? (
        props.results.map((data, key) => (
          <div
            className="border-y-[1px] group flex flex-col gap-4 text-[12px] border-white/20 py-2"
            key={key}
          >
            <div onClick={()=> navigate(`/search/${data.UID}`)} className="flex cursor-pointer py-2 hover:bg-white/20 rounded justify-between">
              <p>{data.fullName}</p>
              <p>@{data.leetcodeID}</p>
            </div>
          </div>
        ))
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
};
