import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import leetcode from "../assets/leetcode.svg";
import { UserInfo, UserInfo2 } from "./UserInfo";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Stats = (props) => {
  const [data, setData] = useState();
  const [acceptanceRate, setAcceptanceRate] = useState();
  const [latestSubmission, setSubmission] = useState();
  const [today, setToday] = useState();
  useEffect(() => {
    const getData = async () => {
      const body = { UID: props.UID };
      const response = await fetch(`${baseUrl}/friends/getInfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await response.json();
      
      setData(data.data.data);
      
      const submissionCalendar = data.data.data.submissionCalendar;
      const today = new Date();
      const UTC = Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate()
      );
      
      const todayTime = Math.floor(UTC / 1000);
      const subToday = submissionCalendar[todayTime]
        ? submissionCalendar[todayTime]
        : 0;

      const keys = Object.keys(submissionCalendar).map(Number);
      const max = Math.max(...keys);
      const time = max * 1000;
      const date = new Date(time);

      const acceptanceRate = (
        (data.data.data.submitStats.acSubmissionNum[0].submissions /
        data.data.data.submitStats.totalSubmissionNum[0].submissions) *
        100
      ).toFixed(2);

      setAcceptanceRate(acceptanceRate);
      setToday(subToday);
      setSubmission(date.toLocaleDateString());
    };
    getData();
  }, []);
  return (
    <div className="">
      {data ? (
        <UserInfo2
          total={data.totalQuestions}
          totalComp={data.totalSolved}
          easyComp={data.easySolved}
          easy={data.totalEasy}
          med={data.totalMedium}
          medComp={data.mediumSolved}
          hard={data.totalHard}
          hardComp={data.hardSolved}
          username={data.username}
          link={"https://leetcode.com/u/" + data.username}
          acceptanceRate={acceptanceRate}
          rank={data.ranking}
          latestSubmission={latestSubmission}
          submissionToday={today}
        />
      ) : (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
