import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import dots from "../assets/dots.svg";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const FriendData = (props) => {
  const [data, setData] = useState();
  useEffect(() => {
    const getInfo = async (UID) => {
      const body = { UID };
      const response = await fetch(`${baseUrl}/friends/getInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.status === "success") {
        setData(data);
      }
    };
    getInfo(props.UID);
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {data ? (
        <div className="flex justify-between my-4 items-center font-[Geist]">
          <div className="flex w-10 h-10 items-center gap-4">
            <img className="rounded-full" src={data.data.data.profile.userAvatar} alt="" />
            <p className="font-semibold">{data.fullName}</p>
          </div>
          <div className="flex justify-center items-center gap-6">
            <p>@{data.leetcodeID}</p>
            <button className=" w-10 h-10 flex justify-center items-center rounded-full hover:bg-white/10 cursor-pointer">
              <img src={dots} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center my-2 items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
