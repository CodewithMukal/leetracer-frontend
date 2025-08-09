import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Stats } from "./components/Stats";
import { DashboardNav } from "./components/Navbar";
import { toast, ToastContainer } from "react-toastify";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Search = () => {
  const params = useParams();
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
          setData(data2.data);

          const submissionCalendar = data2.data.submissionCalendar;
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
            (data2.data.submitStats.acSubmissionNum[0].submissions /
              data2.data.submitStats.totalSubmissionNum[0].submissions) *
            100
          ).toFixed(2);

          setAcceptanceRate(acceptanceRate);
          setToday(subToday);
          setSubmission(date.toLocaleDateString());
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
            await getData(data.leetcodeID);
          }
        } else {
          await getData(data.leetcodeID);
        }
      } else {
        navigate("/login");
      }
      setProfile(data);
    };

    getInfo();
  }, []);
  const handleSend = async ()=> 
    {
        const body = {UID: params.id}
        const response = await fetch(`${baseUrl}/friends/sendRequest`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await response.json();
        if(data.status==="success")
            {
                toast.success("Request Sent!")
            }
        else
        {
            toast.error(data.message)
        }
    }
  return (
    <div>
        <ToastContainer/>
      {
        data ? (
            <DashboardNav img={data.profile.userAvatar}/>
        )
        :
        (
            <DashboardNav/>
        )
      }
      <Stats UID={params.id} />
      <div className="flex justify-center items-center mt-6">
        <button onClick={handleSend} className="border-[1px] text-green-500 text-xl hover:scale-105 transition-all hover:bg-white/20 hover:font-bold font-medium px-2 py-1 rounded">Send Request</button>
      </div>
    </div>
  );
};
