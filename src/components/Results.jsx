import React from "react";
import { useNavigate } from "react-router";

export const Results = (props) => {
  const navigate = useNavigate();
  return (
    <div className="border-white/20 bg-black font-bold border-2 border-t-0 rounded-b-xl px-2 py-2">
      {props.results ? (
        props.results.slice(0, !props.all ? 6 : props.results.length).map((data, key) => (
          <div
            className="border-y-[1px] group flex flex-col gap-4 text-[11px] border-white/20 py-2"
            key={key}
          >
            <div
              onClick={() => navigate(`/search/${data.UID}`)}
              className="flex cursor-pointer py-2 hover:bg-white/20 rounded justify-between"
            >
              <p>{data.fullName}</p>
              <p>@{data.leetcodeID}</p>
            </div>
          </div>
        ))
      ) : (
        <div>Loading..</div>
      )}
      {props.results.length > 6 && !props.all && (
        <div onClick={()=> navigate("/search")} className="hover:bg-white/20 cursor-pointer">See more</div>
      )}
    </div>
  );
};
