import React from "react";
import leetcode from "../assets/leetcode.svg";
import { PieChart } from "react-minimal-pie-chart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import download from "../assets/download.svg"

export const UserInfo = (props) => {
  return (
    <div className="border py-3 flex flex-col gap-14 px-4 border-borderFromWhite bg-[#373737]/10    backdrop-blur-[100px] mx-auto rounded-xl w-[98%]">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <h1 className="font-bold lg:text-xl">Progress Report</h1>
          <button onClick={props.download}><img className="w-6 h-6 hover:scale-110 hover:opacity-60 transition-all" src={download} alt="" /></button>
        </div>
        <a
          href={props.link}
          target="_blank"
          className="flex font-bold lg:text-xl gap-1 justify-center items-center"
        >
          <img src={leetcode} alt="" />
          {props.username && props.link ? (
            <p className="text-[#999999]">{props.username}</p>
          ) : (
            <div className="w-30 h-5 rounded bg-gray-600 animate-pulse"></div>
          )}
        </a>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-8 ">
        <div className="flex flex-col w-fit mx-auto gap-2 font-[Geist] justify-center items-center">
          {props.total && props.totalComp ? (
            <div className="lg:w-32 w-32 h-32 font-bold flex flex-col justify-center items-center gap-2">
              <CircularProgressbar
                value={(props.totalComp / props.total) * 100}
                text={`${((props.totalComp / props.total) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#07A2E5",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold text-[10px] lg:text-sm">
                Total: {props.totalComp}/{props.total}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {(props.easyComp || props.easyComp === 0) && props.easy ? (
            <div className="lg:w-32 w-32 h-32 flex flex-col gap-2 justify-center items-center font-bold">
              <CircularProgressbar
                value={(props.easyComp / props.easy) * 100}
                text={`${((props.easyComp / props.easy) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#00B84D",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold   text-[10px] lg:text-sm">
                Easy: {props.easyComp}/{props.easy}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {(props.medComp || props.medComp === 0) && props.med ? (
            <div className="lg:w-32 w-32 h-32 font-bold flex flex-col gap-2 justify-center items-center">
              <CircularProgressbar
                value={(props.medComp / props.med) * 100}
                text={`${((props.medComp / props.med) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#FFC75E",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold text-nowrap text-[10px] lg:text-sm">
                Medium: {props.medComp}/{props.med}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {(props.hardComp || props.hardComp === 0) && props.hard ? (
            <div className="lg:w-32 w-32 h-32 font-bold flex-col flex justify-center items-center gap-2">
              <CircularProgressbar
                value={(props.hardComp / props.hard) * 100}
                text={`${((props.hardComp / props.hard) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#F50000",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold  text-[10px] lg:text-sm">
                Hard: {props.hardComp}/{props.hard}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between px-10 items-center">
        {props.easyComp >= 0 &&
        props.medComp >= 0 &&
        props.hardComp >= 0 &&
        props.totalComp >= 0 ? (
          <div className="w-32 flex flex-col justify-center items-center">
            <PieChart
              data={[
                {
                  title: "Easy Solved",
                  value: Math.round((props.easyComp / props.totalComp) * 100),
                  color: "#00B84D",
                },
                {
                  title: "Medium Solved",
                  value: Math.round((props.medComp / props.totalComp) * 100),
                  color: "#FFC75E",
                },
                {
                  title: "Hard Solved",
                  value: Math.round((props.hardComp / props.totalComp) * 100),
                  color: "#F50000",
                },
              ]}
              startAngle={90}
              animate
              animationEasing="ease-in-out"
            />
            <p className="text-white mt-4 font-bold">From Solved</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-40 h-40 animate-pulse rounded-full bg-gray-600 "></div>
            <div className="w-30 h-5 animate-pulse rounded bg-gray-600 "></div>
          </div>
        )}
        {props.easyComp >= 0 &&
        props.medComp >= 0 &&
        props.hardComp >= 0 &&
        props.totalComp >= 0 ? (
          <div className="flex gap-4 font-medium flex-col sm:flex-row lg:flex-col">
            <div className="flex gap-2 ">
              <p className="text-[#00B84D]">Easy Solved:</p>
              <p>{((props.easyComp / props.totalComp) * 100).toFixed(2)}%</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#FFC75E]">Medium Solved:</p>
              <p>{((props.medComp / props.totalComp) * 100).toFixed(2)}%</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#F50000]">Hard Solved:</p>
              <p>{((props.hardComp / props.totalComp) * 100).toFixed(2)}%</p>
            </div>
          </div>
        ) : (
          <div className="w-40 h-40 rounded bg-gray-600 animate-pulse"></div>
        )}
      </div>

      <div className="flex justify-between  md:text-[12px] text-[10px] lg:text-[14px] items-center">
        <div className="font-bold font-[Inter] text-white">
          <p>
            Acceptance Rate:{" "}
            {props.acceptanceRate ? props.acceptanceRate + "%" : "Loading..."}
          </p>
          <p>
            Global Ranking:{" "}
            {props.rank ? "#" + props.rank.toLocaleString() : "Loading..."}
          </p>
        </div>
        <div className="font-bold font-[Inter] text-white">
          <p>
            Submissions Today:{" "}
            {props.submissionToday >= 0 ? props.submissionToday : "Loading..."}
          </p>
          <p>
            Latest Submission:{" "}
            {props.latestSubmission ? props.latestSubmission : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export const UserInfo2 = (props) => {
  return (
    <div className="border mx-auto py-3 flex flex-col gap-14 px-4 border-borderFromWhite bg-[#373737]/10 backdrop-blur-[100px] rounded-xl w-[688px] max-w-[100%]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Progress Report</h1>
        <a
          href={props.link}
          target="_blank"
          className="flex font-bold text-xl gap-1 justify-center items-center"
        >
          <img src={leetcode} alt="" />
          {props.username && props.link ? (
            <p className="text-[#999999]">{props.username}</p>
          ) : (
            <div className="w-30 h-5 rounded bg-gray-600 animate-pulse"></div>
          )}
        </a>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 font-[Geist] justify-center items-center">
          {props.total && props.totalComp ? (
            <div className="w-full font-bold h-auto flex flex-col justify-center items-center gap-2">
              <CircularProgressbar
                value={(props.totalComp / props.total) * 100}
                text={`${((props.totalComp / props.total) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#07A2E5",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold  text-[10px] sm:text-sm">
                Total: {props.totalComp}/{props.total}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {(props.easyComp || props.easyComp === 0) && props.easy ? (
            <div className="w-full flex flex-col gap-2 justify-center items-center font-bold h-auto">
              <CircularProgressbar
                value={(props.easyComp / props.easy) * 100}
                text={`${((props.easyComp / props.easy) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#00B84D",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold   text-[10px] sm:text-sm">
                Easy: {props.easyComp}/{props.easy}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {(props.medComp || props.medComp === 0) && props.med ? (
            <div className="w-full font-bold h-auto flex flex-col gap-2 justify-center items-center">
              <CircularProgressbar
                value={(props.medComp / props.med) * 100}
                text={`${((props.medComp / props.med) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#FFC75E",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold text-[10px] sm:text-sm">
                Medium: {props.medComp}/{props.med}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          {(props.hardComp || props.hardComp === 0) && props.hard ? (
            <div className="w-full font-bold h-auto flex-col flex justify-center items-center gap-2">
              <CircularProgressbar
                value={(props.hardComp / props.hard) * 100}
                text={`${((props.hardComp / props.hard) * 100).toFixed(2)}%`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#F50000",
                  trailColor: "#373737",
                  textSize: "14px",
                })}
                strokeWidth={10}
              />
              <p className="font-bold  text-[10px] sm:text-sm">
                Hard: {props.hardComp}/{props.hard}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-30 h-30 rounded-full animate-pulse bg-gray-600"></div>
              <div className="w-30 h-5 rounded animate-pulse bg-gray-600"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-[30%] items-center">
        {props.easyComp >= 0 &&
        props.medComp >= 0 &&
        props.hardComp >= 0 &&
        props.totalComp >= 0 ? (
          <div className="w-40 flex flex-col justify-center items-center h-40">
            <PieChart
              data={[
                {
                  title: "Easy Solved",
                  value: Math.round((props.easyComp / props.totalComp) * 100),
                  color: "#00B84D",
                },
                {
                  title: "Medium Solved",
                  value: Math.round((props.medComp / props.totalComp) * 100),
                  color: "#FFC75E",
                },
                {
                  title: "Hard Solved",
                  value: Math.round((props.hardComp / props.totalComp) * 100),
                  color: "#F50000",
                },
              ]}
              startAngle={90}
              animate
              animationEasing="ease-in-out"
            />
            <p className="text-white font-bold">From Solved</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-40 h-40 animate-pulse rounded-full bg-gray-600 "></div>
            <div className="w-30 h-5 animate-pulse rounded bg-gray-600 "></div>
          </div>
        )}
        {props.easyComp >= 0 &&
        props.medComp >= 0 &&
        props.hardComp >= 0 &&
        props.totalComp >= 0 ? (
          <div className="flex gap-4 font-medium flex-col">
            <div className="flex gap-2 ">
              <p className="text-[#00B84D]">Easy Solved:</p>
              <p>{((props.easyComp / props.totalComp) * 100).toFixed(2)}%</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#FFC75E]">Medium Solved:</p>
              <p>{((props.medComp / props.totalComp) * 100).toFixed(2)}%</p>
            </div>
            <div className="flex gap-2">
              <p className="text-[#F50000]">Hard Solved:</p>
              <p>{((props.hardComp / props.totalComp) * 100).toFixed(2)}%</p>
            </div>
          </div>
        ) : (
          <div className="w-40 h-40 rounded bg-gray-600 animate-pulse"></div>
        )}
      </div>

      <div className="flex justify-between md:text-[12px] text-[10px] lg:text-[14px] items-center">
        <div className="font-bold font-[Inter] text-white">
          <p>
            Acceptance Rate:{" "}
            {props.acceptanceRate ? props.acceptanceRate + "%" : "Loading..."}
          </p>
          <p>
            Global Ranking:{" "}
            {props.rank ? "#" + props.rank.toLocaleString() : "Loading..."}
          </p>
        </div>
        <div className="font-bold font-[Inter] text-white">
          <p>
            Submissions Today:{" "}
            {props.submissionToday >= 0 ? props.submissionToday : "Loading..."}
          </p>
          <p>
            Latest Submission:{" "}
            {props.latestSubmission ? props.latestSubmission : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};
