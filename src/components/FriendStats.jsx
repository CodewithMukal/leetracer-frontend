import React, { useEffect, useState } from "react";
import leetcode from "../assets/leetcode.svg";
import { Stats } from "./Stats";
import Spinner from "./Spinner";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const FriendStats = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`${baseUrl}/friends/getFriends`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setData(data);
      console.log("Friends are:", data.friends);
    };
    getFriends();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      {data ? (
        data.friends.map((friend, index) => (
          <div key={index}>
            <Stats UID={friend} />
          </div>
        ))
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};
