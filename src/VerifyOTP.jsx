import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import lower from "./assets/lower.svg";
import { Navbar3 } from "./components/Navbar";
import OTPInput from "./components/OTPInput";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { email } = location.state || {};
  const [otp,setOtp] = useState("");
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, []);
  const handleChange = (value)=> {
    setOtp(value);
  }
  const handleSubmit = async ()=> 
    {
        const send = {email,otp};
        if(!email || !otp)
            {
                toast.warn("Fill OTP!")
                return;
            }
        const response = await fetch(`${baseUrl}/auth/verify-otp`,{
            method:"POST",
            body: JSON.stringify(send),
            credentials: "include",
            headers: 
            {
                "Content-Type":"application/json"
            }
        })
        const data = await response.json();
        if(data.status==="success")
            {
                toast.success("User created successfully!");
                navigate('/dashboard')
            }
        else{
            toast.error(data.message)
        }
    }
  return (
    <div className="flex relative flex-col gap-20 justify-center items-center">
      <Navbar3 />
      <ToastContainer />
      <div className="fixed bottom-0 -z-10 ">
        <img src={lower} alt="" />
      </div>
      <div className="flex border-[1px] rounded-xl border-borderFromWhite px-4 py-16 flex-col gap-8 justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-borderToYellow flex justify-center items-center font-bold font-[Geist] text-[32px]">
            Verify OTP
          </h1>
          <p className="text-xs max-w-[80%] text-center">
            A 6 digit OTP has been sent to {email}. Enter it below
          </p>
        </div>
        <OTPInput onChange={handleChange}/>
        <div className="flex justify-center items-center">
          {!loading ? (
            <button
              onClick={() => handleSubmit()}
              className="text-white hover:opacity-50 cursor-pointer transition-opacity w-fit border-[1px] border-borderFromWhite text-lg px-6 py-1 rounded-full font-bold bg-gradient-to-br from-borderToYellow to-[#895900]"
            >
              Submit
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
