import React, { useEffect, useState } from "react";
import { Navbar4 } from "./components/Navbar";
import eyeopen from "./assets/eyeopen.svg";
import eyeclose from "./assets/eyeclose.svg";
import lower from "./assets/lower.svg";
import checkBoxEmpty from "./assets/checkBoxEmpty.svg";
import checkBoxFilled from "./assets/checkBoxFilled.svg";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Reset = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const { token } = useParams();
  const [newPass, setNew] = useState("");
  const [showPass2, setShow2] = useState(false);
  const [showPass3, setShow3] = useState(false);
  const [confPass, setConf] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#^()\-_=+]/.test(password)) strength++;

    if (strength >= 4) return "strong";
    if (strength >= 3) return "medium";
    return "weak";
  };
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
    setLoading(true);
    if (!newPass || !confPass) {
      toast.error("Enter all the fields!");
      return;
    }
    if (passwordStrength !== "strong") {
      toast.error("Enter strong password!");
      return;
    }
    if (newPass !== confPass) {
      toast.error("Enter same passwords!");
      return;
    }
    const body = { token, newPass };
    const response = await fetch(`${baseUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (data.status === "success") {
      toast.success("Password Reset Successfully!");
      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
      toast.error(`Error ${data.message}`);
    }
  };
  if (!token) {
    navigate("/");
  }
  return (
    <div className="flex relative flex-col gap-10 justify-center items-center">
      <Navbar4 />
      <ToastContainer />
      <div className="fixed -z-10 bottom-0 ">
        <img src={lower} alt="" />
      </div>
      <div className="flex border-[1px] max-w-[95%] rounded-xl border-borderFromWhite px-4 py-16 flex-col gap-8 justify-center">
        <h1 className="text-borderToYellow text-[20px] flex justify-center items-center font-bold font-[Geist] md:text-[32px]">
          Reset Password
        </h1>
        <div className="flex flex-col">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            New Password
          </label>
          <div className="bg-gradient-to-br w-fit relative from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              type={showPass2 ? "text" : "password"}
              onChange={(e) => {
                setNew(e.target.value);
                setPasswordStrength(getPasswordStrength(newPass));
              }}
              value={newPass}
              className="bg-[#252525] rounded lg:min-w-[400px] py-1 px-3"
            />
            <button
              onClick={() => setShow2(!showPass2)}
              className="cursor-pointer"
            >
              <img
                className="flex justify-center items-center right-1 absolute top-[50%] -translate-y-[50%]"
                src={showPass2 ? eyeopen : eyeclose}
                alt=""
              />
            </button>
          </div>
          <p
            className={`text-sm mt-1 font-bold ${
              passwordStrength === "strong"
                ? "text-green-400"
                : passwordStrength === "medium"
                ? "text-yellow-400"
                : passwordStrength === "weak" && newPass
                ? "text-red-400"
                : ""
            }`}
          >
            {newPass ? `Password is ${passwordStrength}` : ""}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            Confirm Password
          </label>
          <div className="bg-gradient-to-br w-fit relative from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              type={showPass3 ? "text" : "password"}
              onChange={(e) => setConf(e.target.value)}
              value={confPass}
              className="bg-[#252525] rounded  lg:min-w-[400px] py-1 px-3"
            />
            <button
              onClick={() => setShow3(!showPass3)}
              className="cursor-pointer"
            >
              <img
                className="flex justify-center items-center right-1 absolute top-[50%] -translate-y-[50%]"
                src={showPass3 ? eyeopen : eyeclose}
                alt=""
              />
            </button>
          </div>
          <div>
            {newPass != confPass && confPass && newPass && (
              <p className="text-sm mt-1 font-bold text-red-400">
                Enter same Password!
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          {!loading ? (
            <button
              onClick={() => handleChange()}
              className="text-white hover:opacity-50 transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow to-[#895900]"
            >
              Reset
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
