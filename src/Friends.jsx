import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DashboardNav } from "./components/Navbar";
import { Incoming } from "./components/Incoming";
import { FriendStats } from "./components/FriendStats";
import { Manage } from "./components/Manage";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Friends = () => {
  const [profile, setProfile] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

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

          const data2 = await response.json();
          console.log("data is: ", data2);
          setData(data2.data);
          console.log("data is: ", data2);
          localStorage.setItem(
            "leetcodeData",
            JSON.stringify({
              data: data2.data,
              time: Date.now(),
              user: data2.data.username,
            })
          );
        };

        const cached = localStorage.getItem("leetcodeData");

        if (cached) {
          const stored = JSON.parse(cached);
          const thirtyMinutes = 30 * 60 * 1000;

          if (
            Date.now() - stored.time < thirtyMinutes &&
            stored.user === data.leetcodeID
          ) {
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
          } else {
            console.log("♻️ Cache expired. Refetching...");
            await getData(data.leetcodeID);
          }
        } else {
          console.log("📭 No cache found. Fetching...");
          await getData(data.leetcodeID);
        }
      } else {
        navigate("/login");
      }
      setProfile(data);
    };

    getInfo();
  }, []);
  return (
    <div>
      {data ? (
        <DashboardNav img={data.profile.userAvatar} user={data.username} />
      ) : (
        <DashboardNav />
      )}
      <div className="flex flex-col-reverse gap-3 lg:flex-row lg:justify-between px-[10px] lg:px-[100px] mt-[50px]">
        <FriendStats />
        <div className="flex flex-col gap-5 mx-auto w-[600px] max-w-[99%]">
          <Incoming />
          <Manage/>
        </div>
      </div>
    </div>
  );
};
