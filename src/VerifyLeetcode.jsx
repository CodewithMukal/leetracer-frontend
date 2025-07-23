import React, { useEffect, useState } from "react";
import { Navbar4 } from "./components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import lower from "./assets/lower.svg";
import { useNavigate } from "react-router";
import Spinner from "./components/Spinner";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const VerifyLeetcode = () => {
  const [uniqueID, setUniqueId] = useState("leetracer-");
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.status !== "success") {
        navigate("/login");
      } else if (data.leetcodeID) {
        toast.success("An ID is already linked to this account");
        navigate("/dashboard");
      }
      return data;
    };
    getInfo();
  }, []);
  const handleVerification = async () => {
    const send = { username };
    if (!username) {
      toast.error("Enter leetcode ID");
      return;
    }
    toast.info("Verifying Please Wait");
    setVerifying(true)
    const response = await fetch(`${baseUrl}/auth/linkLeetcode`, {
      method: "POST",
      body: JSON.stringify(send),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      setUniqueId(data.uniqueID);
      setVerified(true);
      toast.success("Verified!");
    } else {
      toast.error(data.message);
      setVerifying(false)
    }
  };
  const handleSubmit = async () => {
    if (!verified) {
      toast.error("Verify the ID first!");
      return;
    }
    setLoading(true);
    const send = { username, uniqueID };
    console.log(send);
    const response = await fetch(`${baseUrl}/auth/checkLeetcode`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send),
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("ID linked with your account!");
      navigate("/dashboard");
    } else {
        setLoading(false)
      toast.error(data.message);
    }
  };
  return (
    <div>
      <Navbar4 />
      <img className="-z-10 absolute bottom-0" src={lower} alt="" />
      <ToastContainer autoClose={2000} />
      <div className="w-fit bg-gradient-to-b p-[1px] mt-40 mx-auto rounded-2xl from-borderFromWhite to-borderToYellow">
        <div className="bg-[#121211] flex flex-col justify-center items-center px-20 py-10 rounded-2xl">
          <h1 className="font-[Geist] text-[32px] font-bold text-borderToYellow">
            Add Leetcode ID
          </h1>
          <div className="flex my-6 flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-[Geist] text-[#B1B1B1] text-xl" htmlFor="">
                Leetcode ID
              </label>
              <div className="w-fit bg-gradient-to-br relative rounded from-[#DEDEDE] to-[#787878] p-[1px]">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-xl font-[Geist] py-1 pl-2 bg-[#262625]"
                />
                {!verified && (
                  <div className="bg-gradient-to-br top-[50%] -translate-y-[50%] right-1 absolute rounded w-fit from-[#DEDEDE] to-[#787878] p-[1px]">
                    {!verifying ? (
                      <button
                        onClick={() => handleVerification()}
                        className="text-green-600 text-[14px] hover:scale-105 transition-transform font-bold py-0.5 px-2 bg-[#343433]"
                      >
                        Verify
                      </button>
                    ) : (
                      <button className="text-green-600 text-[14px] transition-transform font-bold py-0.5 px-2 bg-[#343433]">
                        <Spinner />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-[Geist] text-[#B1B1B1] text-xl" htmlFor="">
                Unique ID
              </label>
              <div className="w-fit relative bg-gradient-to-br rounded from-[#DEDEDE] to-[#787878] p-[1px]">
                <input
                  value={uniqueID}
                  type="text"
                  readOnly
                  className="text-xl font-[Geist] py-1 pl-2 bg-[#262625]"
                />
                <div className="bg-gradient-to-br top-[50%] -translate-y-[50%] right-1 absolute rounded w-fit from-[#DEDEDE] to-[#787878] p-[1px]">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(uniqueID);
                      toast.success("Copied!", {});
                    }}
                    className="text-[14px] hover:scale-105 transition-transform font-bold py-0.5 px-2 bg-[#343433]"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <p className="max-w-[280px] mt-2 text-xs font-[Geist] text-[#5E5E5E]">
                After verifying a unique code will be generated above in the
                format “leetracer-######”. Copy the code and paste it in your
                leetcode description so we can verify you own the account.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {!loading ? (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-br border-[#acacac] border-[1px] hover:opacity-50 transition-opacity from-borderToYellow to-[#895900] font-bold font-[Geist] px-6 py-2 rounded-full"
              >
                Submit
              </button>
            ) : (
              <button className="bg-gradient-to-br border-[#acacac] border-[1px] hover:opacity-50 transition-opacity from-borderToYellow/20 to-[#895900]/20 font-bold font-[Geist] px-6 py-2 rounded-full">
                <Spinner />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
