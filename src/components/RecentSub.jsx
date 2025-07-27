import React from "react";

export const RecentSub = (props) => {
  const allTitles = [];
  const allstatus = [];
  const allmemory = [];
  const allruntime = [];
  const alltime = [];
  const allDate = [];
  for (const submission of props.submissions) {
    const d = new Date(submission.timestamp * 1000);
    const time = d.toLocaleTimeString();
    const date = d.toLocaleDateString();
    allTitles.push(
      <a
        href={`https://leetcode.com${submission.url}`}
        className="flex justify-between items-center"
      >
        <h1 className="font-bold text-lg">{submission.title}</h1>
      </a>
    );
    allstatus.push(
      <div>
        <h1 className={`${submission.statusDisplay==="Accepted"?"text-green-500":"text-red-500"} font-medium text-lg`}>{submission.statusDisplay}</h1>
      </div>
    );
    allmemory.push(
      <div>
        <h1 className="font-medium text-lg">{submission.memory}</h1>
      </div>
    );
    allruntime.push(
      <div>
        <h1 className="font-medium text-lg">{submission.runtime}</h1>
      </div>
    );
    alltime.push(
      <div>
        <h1 className="font-medium text-lg">{time}</h1>
      </div>
    );
    allDate.push(
      <div>
        <h1 className="font-medium text-lg">{date}</h1>
      </div>
    );
  }
  return (
    <div className="border py-3 flex justify-between gap-14 px-4 border-borderFromWhite bg-[#373737]/10    backdrop-blur-[100px] rounded-xl max-w-[100%]">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-xl">Question Title</h1>
        <div className="gap-2 flex flex-col">{allTitles}</div>
      </div>
      <div className="flex gap-14">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl">Status</h1>
          <div className="gap-2 flex flex-col">{allstatus}</div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl">Memory</h1>
          <div className="gap-2 flex justify-center items-center flex-col">{allmemory}</div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl">Runtime</h1>
          <div className="gap-2 flex justify-center items-center flex-col">{allruntime}</div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl">Submission Time</h1>
          <div className="gap-2 flex justify-center items-center flex-col">{alltime}</div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-xl">Submission Date</h1>
          <div className="gap-2 flex justify-center items-center flex-col">{allDate}</div>
        </div>
      </div>
    </div>
  );
};
