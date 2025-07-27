import React, { useEffect, useState } from "react";
import { DashboardNav } from "./components/Navbar";
import Spinner from "./components/Spinner";
import { useNavigate } from "react-router";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Profile = () => {
  const [profile, setProfile] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [leetcodeID, setLeetcodeID] = useState("");
  const [editable,setEditable] = useState(false);
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
      {data ? <DashboardNav img={data.profile.userAvatar} /> : <DashboardNav />}
      {profile ? (
        <div className="bg-gradient-to-b w-fit p-[1px] font-[Geist] mx-auto from-borderFromWhite to-borderToYellow ">
          <div className="bg-[#121212] flex flex-col gap-6 px-8 py-4">
            <h1 className="font-bold">Your Details</h1>
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-[#B1B1B1]" >Full Name</h1>
                <div className="bg-gradient-to-r rounded from-[#DEDEDE] w-fit mx-auto to-[#787878] p-[1px]">
                  <input type="text" value={profile.fullName} readOnly={!editable} className="bg-[#262626] rounded px-3 py-1"/>
                </div>
              </div>
              <div>
                <h1 className="text-[#B1B1B1]">Leetcode ID</h1>
                <div className="bg-gradient-to-r rounded from-[#DEDEDE] w-fit mx-auto to-[#787878] p-[1px]">
                  <input type="text" readOnly value={profile.leetcodeID} className="bg-[#262626] rounded px-3 py-1"/>
                </div>
              </div>
              <div>
                <h1 className="text-[#B1B1B1]">Email</h1>
                <div className="bg-gradient-to-r rounded from-[#DEDEDE] w-fit mx-auto to-[#787878] p-[1px]">
                  <input type="text" readOnly value={profile.email} className="bg-[#262626] rounded px-3 py-1"/>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button>Edit Details</button>
              <button>Change Password</button>
            </div>
            <div className="flex justify-center items-center bg-red-500 text-white font-bold rounded py-1 hover:bg-borderToYellow transition-all">
              <button>Logout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 min-h-[200px] justify-center items-center border-borderFromWhite border-[1px] rounded-xl">
          <Spinner />
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
};
