import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import dots from "../assets/dots.svg";
import { toast, ToastContainer } from "react-toastify";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const FriendData = (props) => {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [removing, setRemoving] = useState(false);
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
  const removeFriend = async (UID) => {
    const body = { UID };
    setRemoving(true);
    const response = await fetch(`${baseUrl}/friends/removeFriend`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const d = await response.json();
    if (d.status === "success") {
      setRemoving(false);
      toast.success(`Removed ${data.fullName} from Friends!`);
    } else {
      setRemoving(false);
      toast.error(`Error: ${d.message}`);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <ToastContainer />
      {data ? (
        <div className="flex justify-between my-4 items-center font-[Geist]">
          <div className="flex w-10 h-10 items-center gap-4">
            <img
              className="rounded-full"
              src={data.data.data.profile.userAvatar}
              alt=""
            />
            <p className="font-semibold">{data.fullName}</p>
          </div>
          <div
            className="flex justify-center items-center gap-6"
          >
            <p>@{data.leetcodeID}</p>
            <div className="relative group">
              <button onClick={()=> setShow(!show)} className={`w-10 h-10 flex justify-center items-center rounded-full hover:bg-white/10 cursor-pointer transition-all ${show ? "rotate-90" : ""}`}>
                <img src={dots} alt="" />
              </button>
              {show && (
                <div className="absolute text-nowrap right-0 md:-right-24 top-[110%] -translate-y-[50%] bg-black border-white/30 border-[1px] rounded-b rounded-tr px-2 py-1">
                  {!removing ? (
                    <button
                      onClick={() => removeFriend(props.UID)}
                      className="text-red-500 text-sm hover:opacity-50 transition-opacity"
                    >
                      Remove Friend
                    </button>
                  ) : (
                    <button className="text-red-500 opacity-50 text-sm hover:opacity-50 transition-opacity">
                      <Spinner />
                    </button>
                  )}
                </div>
              )}
            </div>
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
