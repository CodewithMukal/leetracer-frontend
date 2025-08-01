import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Request = (props) => {
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
  const addFriend = async () => {
    console.log(props.UID);
    const response = await fetch(`${baseUrl}/friends/acceptReq`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UID: props.UID }),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("Added to Friends");
    } else {
      toast.error(data.message);
    }
  };
  const reject = async () => {
    console.log(props.UID);
    const body = { UID: props.UID };
    const response = await fetch(`${baseUrl}/friends/rejectReq`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("Removed Request");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <ToastContainer/>
      {data ? (
        <div className="flex justify-between border-[1px] border-borderToWhite p-4 rounded hover:scale-101 transition-all items-center my-2">
          <div className="flex gap-2 justify-center items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={data.data.data.profile.userAvatar}
              alt=""
            />
            <h1 className="font-bold">{data.fullName}</h1>
            <p className="text-sm font-medium">@{data.leetcodeID}</p>
          </div>
          <div className="font-[Geist] space-x-2 font-bold">
            <button
              onClick={() => addFriend()}
              className="text-[#00B84D] hover:bg-[#00B84D] transition-colors hover:text-white border-[1px] px-[10px] py-[2px] rounded"
            >
              Add
            </button>
            <button
              onClick={() => reject()}
              className="text-[#E5070A] hover:bg-[#E5070A] transition-colors hover:text-white border-[1px] px-[10px] py-[2px] rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};
