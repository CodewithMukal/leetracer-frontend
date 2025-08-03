import React, { useEffect, useState } from "react";
import { DashboardNav } from "./components/Navbar";
import Spinner from "./components/Spinner";
import { useNavigate } from "react-router";
import { Logout } from "./components/Logout";
import { toast, ToastContainer } from "react-toastify";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Profile = () => {
  const [profile, setProfile] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [leetcodeID, setLeetcodeID] = useState("");
  const [editable, setEditable] = useState(false);
  const [fullName, setFullName] = useState("");
  const [changing, setChanging] = useState(false);
  const [unlinking, setUnlinking] = useState(false);
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
      setFullName(data.fullName);
      setProfile(data);
    };

    getInfo();
  }, []);

  const changeName = async () => {
    console.log(fullName);
    const body = { fullName };
    if (!fullName) {
      toast.error("Name cant be empty!");
    }
    setChanging(true);
    const response = await fetch(`${baseUrl}/auth/change-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.status === "success") {
      setChanging(false);
      toast.success(`Name changed successfully to ${fullName}`);
      setEditable(false);
    } else {
      setChanging(false);
      toast.error(data.message);
    }
  };
  const handleUnlink = async () => {
    setUnlinking(true);
    const response = await fetch(`${baseUrl}/auth/unlink-leetcode`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("ID unlinked from your Account");
      navigate("/dashboard");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      {data ? <DashboardNav img={data.profile.userAvatar} user={data.username} /> : <DashboardNav />}
      {profile ? (
        <div className="bg-gradient-to-b w-[400px] mt-20 rounded-xl max-w-[90%] p-[1px] font-[Geist] mx-auto from-borderFromWhite to-borderToYellow ">
          <ToastContainer />
          <div className="bg-[#121212] flex flex-col rounded-xl gap-6 px-8 py-4">
            <h1 className="font-bold">Your Details</h1>
            <div className="bg-gradient-to-br flex justify-center items-center mx-auto from-borderFromWhite to-borderToYellow rounded-full p-[2px] w-20 h-20">
              <img
                src={data.profile.userAvatar}
                className="rounded-full"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[#B1B1B1]">Full Name</h1>
                <div
                  className={`bg-gradient-to-r ${
                    !editable ? "text-white/40" : ""
                  } rounded from-[#DEDEDE] w-full to-[#787878] p-[1px]`}
                >
                  <input
                    type="text"
                    value={fullName}
                    readOnly={!editable}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#262626] w-full rounded px-3 py-1"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-[#B1B1B1]">Leetcode ID</h1>
                <div className="bg-gradient-to-r relative rounded from-[#DEDEDE] w-full to-[#787878] p-[1px]">
                  <input
                    type="text"
                    readOnly
                    value={profile.leetcodeID}
                    className="bg-[#262626] text-white/40 w-full rounded px-3 py-1"
                  />
                  <div className="bg-gradient-to-br top-[50%] -translate-y-[50%] right-1 absolute rounded w-fit from-[#DEDEDE] to-[#787878] p-[1px]">
                    {!unlinking ? (
                      <button
                        onClick={() => handleUnlink()}
                        className="text-red-600 text-[14px] hover:brightness-50 transition-all font-medium py-0.5 px-2 bg-[#343433]"
                      >
                        Unlink
                      </button>
                    ) : (
                      <button className="text-green-600 text-[14px] transition-transform font-bold py-0.5 px-2 bg-[#343433]">
                        <Spinner />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-[#B1B1B1]">UID</h1>
                <div className="bg-gradient-to-r relative rounded from-[#DEDEDE] w-full to-[#787878] p-[1px]">
                  <input
                    type="text"
                    readOnly
                    value={profile.uid}
                    className="bg-[#262626] text-white/40 w-full rounded px-3 py-1"
                  />
                  <div className="bg-gradient-to-br top-[50%] -translate-y-[50%] right-1 absolute rounded w-fit from-[#DEDEDE] to-[#787878] p-[1px]">
                    <button
                      onClick={() => {navigator.clipboard.writeText(profile.uid);toast.success(`Copied: ${profile.uid}`)}}
                      className="text-[14px] hover:brightness-50 transition-all font-medium py-0.5 px-2 bg-[#343433]"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-[#B1B1B1]">Email</h1>
                <div className="bg-gradient-to-r rounded from-[#DEDEDE] w-full to-[#787878] p-[1px]">
                  <input
                    type="text"
                    readOnly
                    value={profile.email}
                    className="bg-[#262626] w-full  text-white/40 rounded px-3 py-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              {!editable ? (
                <button
                  onClick={() => setEditable(true)}
                  className="bg-[#895900] hover:opacity-50 transition-opacity font-bold px-2 py-1 rounded-full text-white"
                >
                  Edit Details
                </button>
              ) : (
                <div>
                  {!changing ? (
                    <button
                      onClick={() => changeName()}
                      className="bg-[#895900] hover:opacity-50 transition-opacity font-bold px-2 py-1 rounded-full text-white"
                    >
                      Save Details
                    </button>
                  ) : (
                    <button className="bg-[#895900] opacity-50 transition-opacity font-bold px-1 py-1 rounded-full text-white">
                      <Spinner />
                    </button>
                  )}
                </div>
              )}
              <button className="bg-[#895900] hover:opacity-50 transition-opacity font-bold px-2 py-1 rounded-full text-white">
                Change Password
              </button>
            </div>
            <div className="flex justify-center items-center">
              <Logout />
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
