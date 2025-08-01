import React, { useEffect, useState } from "react";
import { Request } from "./Request";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Incoming = () => {
  const [incoming, setIncoming] = useState([]);
  const requests = [];

  useEffect(() => {
    const getIncoming = async () => {
      const response = await fetch(`${baseUrl}/friends/incoming-req`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setIncoming(data.requests);
      console.log(data.requests);
    };
    getIncoming();
  }, []);

  return (
    <div className="border-[1px] rounded-xl border-t-borderFromWhite border-x-borderFromWhite bg-[#373737]/10 border-b-borderToYellow max-w-[90%] w-[600px] px-4 py-2">
      <h1 className="font-bold text-xl font-[Geist] text-[#BBBBBB]">
        Incoming Requests
      </h1>
      <div>
        {incoming.length > 0 ? (
          incoming.map((req, index) => (
            <div key={index}>
              <Request UID={req} />
            </div>
          ))
        
        ) : (
          <p className="text-center my-2 font-[Geist] font-medium text-border">No requests yet. They might be busy coding.</p>
        )}
      </div>
      <div className="text-center select-none font-[Geist] font-medium text-xl ">
        ...
      </div>
    </div>
  );
};
