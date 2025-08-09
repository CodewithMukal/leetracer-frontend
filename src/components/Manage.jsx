import React, { useEffect, useState } from "react";
import { FriendData } from "./FriendData";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Manage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`${baseUrl}/friends/getFriends`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setData(data);
    };
    getFriends();
  }, []);
  return (
    <div>
      <div className="border-[1px] rounded-xl border-t-borderFromWhite border-x-borderFromWhite bg-[#373737]/10 border-b-borderToYellow w-[100%] px-4 py-2">
        <h1 className="font-bold text-xl font-[Geist] text-[#BBBBBB]">
          Manage Friends
        </h1>
        <div>
            {data && data.friends.map((d,key)=>(
                <div key={key}>
                    <FriendData UID={d}/>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
