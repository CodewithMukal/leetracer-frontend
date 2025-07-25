import React, { cache, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { DashboardNav } from "./components/Navbar";
import { UserInfo } from "./components/UserInfo";
import deco from "./assets/deco.svg";
import { Dailychallenge } from "./components/Dailychallenge";
import { AIRecommendation } from "./components/AIRecommendation";
import { GoogleGenAI } from "@google/genai";

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
  const [airesponse, setAiresponse] = useState();

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

        const getData = async (username) => {
          const body = { username };
          const response = await fetch(`${baseUrl}/auth/allData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
          });

          const data = await response.json();
          console.log("data is: ", data);
          setData(data.data);

          // Process submissionCalendar
          const submissionCalendar = data.data.submissionCalendar;
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
            (data.data.submitStats.acSubmissionNum[0].submissions /
              data.data.submitStats.totalSubmissionNum[0].submissions) *
            100
          ).toFixed(2);

          setAcceptanceRate(acceptanceRate);
          setToday(subToday);
          setSubmission(date.toLocaleDateString());
          console.log("data is: ", data);
          localStorage.setItem(
            "leetcodeData",
            JSON.stringify({ data: data.data, time: Date.now() })
          );
        };

        const cached = localStorage.getItem("leetcodeData");

        if (cached) {
          const stored = JSON.parse(cached);
          const thirtyMinutes = 30 * 60 * 1000;

          if (Date.now() - stored.time < thirtyMinutes) {
            console.log("⏳ Using cached data", stored.data);

            setData(stored.data);
            const submissionCalendar = stored.data.submissionCalendar;
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
              (stored.data.submitStats.acSubmissionNum[0].submissions /
                stored.data.submitStats.totalSubmissionNum[0].submissions) *
              100
            ).toFixed(2);

            setAcceptanceRate(acceptanceRate);
            setToday(subToday);
            setSubmission(date.toLocaleDateString());
          } else {
            console.log("♻️ Cache expired. Refetching...");
            await getData(data.leetcodeID);
          }
        } else {
          console.log("📭 No cache found. Fetching...");
          await getData(data.leetcodeID);
        }
      }
      else{
        navigate('/login')
      }
      setProfile(data);
    };

    getInfo();
  }, []);

  useEffect(() => {
    if (data) {
      const generateResponse = async (data) => {
        const response = await fetch(`${baseUrl}/ai/getRecomendations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const respData = await response.json();
        return respData.message;
      };
  
      const cached = localStorage.getItem("airesponse");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const timeDiff = Date.now() - parsed.time;
          const sixHours = 6 * 60 * 60 * 1000;
  
          if (timeDiff > sixHours) {
            (async () => {
              const response = await generateResponse(data);
              setAiresponse(response);
              localStorage.setItem(
                "airesponse",
                JSON.stringify({ airesponse: response, time: Date.now() })
              );
            })();
          } else {
            setAiresponse(parsed.airesponse);
          }
        } catch (err) {
          (async () => {
            const response = await generateResponse(data);
            setAiresponse(response);
            localStorage.setItem(
              "airesponse",
              JSON.stringify({ airesponse: response, time: Date.now() })
            );
          })();
        }
      } else {
        (async () => {
          const response = await generateResponse(data);
          setAiresponse(response);
          localStorage.setItem(
            "airesponse",
            JSON.stringify({ airesponse: response, time: Date.now() })
          );
        })();
      }
    }
  }, [data]);
  

  return (
    <div>
      {data ? (
        <DashboardNav img={data.profile.userAvatar} />
      ) : (
        <DashboardNav />
      )}
      <div className="flex relative px-12 my-6 justify-center gap-64">
        <div className="">
          <div className="flex flex-col gap-8">
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
        </div>
        <div className="flex gap-10 flex-col">
          {data ? (
            <Dailychallenge
              questionNumber={data.dailyChallenge.id}
              questionLink={data.dailyChallenge.link}
              questionDiff={data.dailyChallenge.difficulty}
              questionTitle={data.dailyChallenge.title}
            />
          ) : (
            <Dailychallenge />
          )}
          {airesponse ? (
            <AIRecommendation response={airesponse} />
          ) : (
            <AIRecommendation />
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 -z-10">
        <img src={deco} alt="" />
      </div>
    </div>
  );
};
