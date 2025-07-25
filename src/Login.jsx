import React, { useEffect, useState } from "react";
import { Navbar2 } from "./components/Navbar";
import eyeopen from "./assets/eyeopen.svg";
import eyeclose from "./assets/eyeclose.svg";
import lower from "./assets/lower.svg";
import checkBoxEmpty from "./assets/checkBoxEmpty.svg";
import checkBoxFilled from "./assets/checkBoxFilled.svg";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Login = () => {
  const [showPass, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data)
      if (data.status==="success") {
        if(!data.leetcodeID)
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

  const getInfo = async () => {
    const response = await fetch(`${baseUrl}/auth/info`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    console.log("🧠 Session Check Result:", data);
    return data;
  };
  
  const handleLogin = async () => {
    const send = { email, password, rememberMe };
    setLoading(true);
  
    if (!email || !password) {
      setLoading(false);
      toast.error("Details Missing!");
      return;
    }
  
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(send),
      });
  
      const data = await response.json();
      console.log("🔐 Login response:", data);
  
      if (data.status === "success") {
        // 👇 Wait for cookie to be saved and validated
        const session = await getInfo();
  
        if (session?.status === "success") {
          if (!session.leetcodeID) {
            navigate("/addLeetcode");
          } else {
            navigate("/dashboard");
          }
        } else {
          console.warn("⚠️ Login success but session check failed");
          toast.error("Session check failed. Try again.");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex relative flex-col gap-20 justify-center items-center">
      <Navbar2 />
      <div className="fixed bottom-0 ">
        <img src={lower} alt="" />
      </div>
      <div className="flex border-[1px] max-w-[95%] rounded-xl border-borderFromWhite px-4 py-16 flex-col gap-8 justify-center">
        <h1 className="text-borderToYellow flex justify-center items-center font-bold font-[Geist] text-[32px]">
          Login
        </h1>
        <div className="flex flex-col mx-auto">
          <label className="text-[#B1B1B1] font-[Geist] text-xl" htmlFor="">
            Email
          </label>
          <div className="bg-gradient-to-br w-fit from-borderFromWhite to-borderToWhite p-[1px] rounded">
            <input
              onChange={(e) => setEmail(e.target.value)}
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
              type={showPass ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className="flex justify-between my-6 items-center">
          <div className="flex gap-1 justify-center items-center">
            <img
              className="flex justify-center items-center mt-2"
              onClick={(e) => setRememberMe(!rememberMe)}
              src={rememberMe ? checkBoxFilled : checkBoxEmpty}
              alt=""
            />
            <p className="text-sm font-medium">Remember Me</p>
          </div>
          <button className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#51CBFF] to-[#317A99] cursor-pointer hover:opacity-75">
            Forgot Password?
          </button>
        </div>
        <div className="flex justify-center items-center">
          {!loading ? (
            <button onClick={()=>handleLogin()} className="text-white hover:opacity-50 transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow to-[#895900]">
              Login
            </button>
          ) : (
            <button className="text-white transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow/20 to-[#895900]/20">
              <Spinner/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
