import React, { useState } from "react";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl =
    import.meta.env.VITE_ENV === "production"
      ? "https://leetracer-backend.onrender.com"
      : "http://localhost:8000";
  const handleLogout = async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/auth/logout`,
        {
            method:"POST",
            credentials:"include",
        })
    const data = await response.json()
    if(data.status==="success")
        {
            toast.success("Logged Out")
            navigate("/")
        }
    else
    {
        toast.error("Error:",data.message)
        setLoading(false)
    }
  };
  return (
    <div>
        <ToastContainer/>
      <div className="bg-gradient-to-br from-borderFromWhite p-[1px] rounded-full to-borderToWhite w-fit">
        {!loading ? (
          <button onClick={handleLogout} className="bg-[#151515] hover:bg-gray-700 rounded-full font-[Geist] font-medium px-6 py-2 cursor-pointer">
            Logout
          </button>
        ) : (
          <button className="bg-[#151515] rounded-full font-[Geist] font-medium px-6 py-2 cursor-pointer">
            <Spinner/>
          </button>
        )}
      </div>
    </div>
  );
};
