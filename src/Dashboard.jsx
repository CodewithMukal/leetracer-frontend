import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { DashboardNav } from "./components/Navbar";
import { UserInfo } from "./components/UserInfo";
import deco from "./assets/deco.svg";
import { Dailychallenge } from "./components/Dailychallenge";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [username, setLeetcodeID] = useState("");
  const [profile, setProfile] = useState();
  const [acceptanceRate, setAcceptanceRate] = useState();
  const [latestSubmission, setSubmission] = useState();
  const [today, setToday] = useState();

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setLeetcodeID(data.leetcodeID);

      if (data.status === "success") {
        if (!data.leetcodeID) {
          navigate("/addLeetcode");
          return;
        }
        await getData(data.leetcodeID);
      } else {
        navigate("/login");
      }

      setProfile(data);
      console.log("User info is:", data);
    };

    const getData = async (username) => {
      const cache = localStorage.getItem("leetcodeStats");

      if (cache) {
        const parsed = JSON.parse(cache);
        const isFresh = Date.now() - parsed.timestamp < 1000 * 60 * 30; // 30 min

        if (isFresh && parsed.username === username) {
          console.log("🧠 Using cached LeetCode data");
          console.log("Leetcode Data is: ", parsed.data);
          setData(parsed.data);
          const time = Math.max(
            ...Object.keys(parsed.data.submissionCalendar).map(Number)
          );
          const date = new Date(time * 1000);
          const now = new Date();
          const startoffToday = new Date(
            now.getFullYear(),
            now.getMonth,
            now.getDate()
          );
          const timestamp = Math.floor(startoffToday.getTime() / 1000);
          setToday(parsed.data.submissionCalendar[timestamp.toString()] || 0);
          setSubmission(date.toLocaleDateString());
          setAcceptanceRate(parsed.acceptanceRate);
          return;
        }
      }

      console.log("🌐 Fetching fresh LeetCode data");
      const body = { username };

      const [res1, res2] = await Promise.all([
        fetch(`https://leetscan.vercel.app/${username}`),
        fetch(`https://leetcode-stats-api.herokuapp.com/${username}`),
      ]);

      const data = await res1.json();
      const data2 = await res2.json();

      setData(data);
      setAcceptanceRate(data2.acceptanceRate);
      const timestamp = Math.floor(startoffToday.getTime() / 1000);
      setToday(parsed.data.submissionCalendar[timestamp.toString()] || 0);
      setSubmission(date.toLocaleDateString());
      setAcceptanceRate(parsed.acceptanceRate);
      localStorage.setItem(
        "leetcodeStats",
        JSON.stringify({
          username,
          data,
          acceptanceRate: data2.acceptanceRate,
          timestamp: Date.now(),
        })
      );
    };

    getInfo();
  }, []);

  return (
    <div>
      {profile ? (
        <DashboardNav img={data.profile.userAvatar} />
      ) : (
        <DashboardNav />
      )}
      <div className="flex">
        <div className="relative">
          <div className="flex px-12 my-6 flex-col gap-8">
            <div className="flex justify-start items-center font-bold gap-2 font-[Geist] text-[32px]">
              <h1>Welcome Back,</h1>
              {profile ? (
                <h1 className="text-borderToYellow">{profile.fullName}</h1>
              ) : (
                <div className="w-40 rounded h-10 bg-gray-600 animate-pulse "></div>
              )}
            </div>
            {data ? (
              <UserInfo
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
              <UserInfo />
            )}
          </div>
          <div className="absolute top-20 -z-10">
            <img src={deco} alt="" />
          </div>
        </div>
        <div>
          <Dailychallenge />
        </div>
      </div>
    </div>
  );
};
