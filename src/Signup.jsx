import React, { useEffect, useState } from "react";
import { Navbar3 } from "./components/Navbar";
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

export const Signup = () => {
  const [showPass, setShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {paramEmail} = useParams();

  useEffect(()=>{
    if(paramEmail)
      {
        setEmail(decodeURIComponent(paramEmail));
      }
  },[])

  useEffect(() => {
      const getInfo = async () => {
        const response = await fetch(`${baseUrl}/auth/info`, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data)
        if (data.status==="success") {
          if(!data.leetcodeId)
            {
              navigate('/addLeetcode')
            }
          else{
            navigate('/dashboard')
          }
        }
        return data;
      };
      getInfo();
    }, []);

  const handleSubmit = async () => {
    const send = { fullName, email, password };
    setLoading(true);
    if (!fullName || !email || !password) {
      toast.error("Please enter all details!");
      setLoading(false);
      return;
    }
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(send),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("OTP sent to:", email);
      navigate("/verify-otp",
        {
          state: {email}
        }
      );
    } else {
      setLoading(false);
      toast.error(data.message)
    }
  };

  return (
    <div className="flex relative flex-col gap-10 justify-center items-center">
      <Navbar3 />
      <ToastContainer />
      <div className="md:fixed hidden bottom-0 -z-10 ">
        <img src={lower} alt="" />
      </div>
      <div className="flex border-[1px] max-w-[95%] rounded-xl border-borderFromWhite px-4 py-16 flex-col gap-8 justify-center">
        <h1 className="text-borderToYellow flex justify-center items-center font-bold font-[Geist] text-[32px]">
          Signup
        </h1>
        <div className="flex flex-col">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            Full Name
          </label>
          <div className="bg-gradient-to-br flex w-fit from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className="bg-[#252525] w-fit mx-auto md:min-w-[400px] rounded py-1 px-3"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            Email
          </label>
          <div className="bg-gradient-to-br w-fit from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="bg-[#252525] lg:min-w-[400px] rounded py-1 px-3"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            Password
          </label>
          <div className="bg-gradient-to-br w-fit relative from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPass ? "text" : "password"}
              className="bg-[#252525] rounded  lg:min-w-[400px] py-1 px-3"
            />
            <button
              onClick={() => setShow(!showPass)}
              className="cursor-pointer"
            >
              <img
                className="flex justify-center items-center right-1 absolute top-[50%] -translate-y-[50%]"
                src={showPass ? eyeopen : eyeclose}
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {!loading ? (
            <button
              onClick={() => handleSubmit()}
              className="text-white hover:opacity-50 cursor-pointer transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow to-[#895900]"
            >
              Signup
            </button>
          ) : (
            <button
              className="text-white transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow/20 to-[#895900]/20"
            >
              <Spinner/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
