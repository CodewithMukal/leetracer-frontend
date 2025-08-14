import React, { useEffect, useState } from "react";
import { Navbar4 } from "./components/Navbar";
import eyeopen from "./assets/eyeopen.svg";
import eyeclose from "./assets/eyeclose.svg";
import lower from "./assets/lower.svg";
import checkBoxEmpty from "./assets/checkBoxEmpty.svg";
import checkBoxFilled from "./assets/checkBoxFilled.svg";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const ForgotPass = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.status === "success") {
        if (!data.leetcodeID) {
          navigate("/addLeetcode");
        }
      }

      return data;
    };
    getInfo();
  }, []);

  const getInfo = async () => {
    const response = await fetch(`${baseUrl}/auth/info`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  };

  const handleChange = async () => {
    if (!email) {
      toast.error("Enter email!");
      return;
    }
    setLoading(true);
    const body = { email };
    const response = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const data = await response.json();
    if (data.status === "success") {
      setLoading(false);
      toast.success(`Mail sent to ${email}`);
    } else {
      setLoading(false);
      toast.error(`Error ${data.message}`);
    }
  };
  return (
    <div className="flex relative flex-col gap-10 justify-center items-center">
      <Navbar4 />
      <ToastContainer />
      <div className="fixed -z-10 bottom-0 ">
        <img src={lower} alt="" />
      </div>
      <div className="flex border-[1px] max-w-[95%] rounded-xl border-borderFromWhite px-4 py-16 flex-col gap-8 justify-center">
        <h1 className="text-borderToYellow text-[20px] flex justify-center items-center font-bold font-[Geist] md:text-[32px]">
          Forgot Password
        </h1>
        <div className="flex flex-col">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            Email
          </label>
          <div className="bg-gradient-to-br w-fit relative from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-[#252525] rounded  lg:min-w-[400px] py-1 px-3"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          {!loading ? (
            <button
              onClick={() => handleChange()}
              className="text-white hover:opacity-50 transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow to-[#895900]"
            >
              Send Email
            </button>
          ) : (
            <button className="text-white transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow/20 to-[#895900]/20">
              <Spinner />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
