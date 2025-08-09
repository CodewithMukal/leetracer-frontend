import React, { useEffect, useState } from "react";
import { FriendData } from "./FriendData";
import {useNavigate} from "react-router"

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Manage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate()
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
            {
               data && data.friends.length === 0 && 
              (
                <div className="font-[Geist] font-medium flex-col flex justify-center items-center">
                  <p>No friends right now, find them?</p>
                  <button onClick={()=> navigate("/search")} className="bg-[#614900] my-2 px-5 py-2 rounded-full hover:opacity-70 transition-opacity">
                    Search
                  </button>
                </div>
              )
            }
        </div>
      </div>
    </div>
  );
};
