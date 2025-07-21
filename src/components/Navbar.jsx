import React from "react";
import logo from "../assets/logo.svg";
import user from "../assets/user.svg";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="goldBorder my-4 w-[1146px]">
      <div className="bg-black p-4 flex justify-between items-center rounded-full w-full">
        <button>
          <img src={logo} alt="" />
        </button>
        <div className="flex font-[Geist] justify-center items-center gap-4">
          <button className="hover:text-white transition-all">Home</button>
          <button className="hover:text-white transition-all">Dashboard</button>
          <button className="hover:text-white transition-all">
            Leaderboard
          </button>
          <button className="hover:text-white transition-all">Friend</button>
        </div>
        <div className="flex gap-4 font-[Inter]">
          <div className="whiteBorder">
            <button className="bg-[#151515] hover:bg-[#595959] transition-colors text-xs rounded-full font-medium px-4 py-2">
              Login
            </button>
          </div>
          <button className="flex justify-center items-center px-4 py-2 bg-gradient-to-b from-55% from-[#D9D9D9] to-[#737373] hover:ring-[1px] ring-borderToYellow transition-all text-black font-medium text-xs rounded-full">
            <img src={user} alt="" />
            <p>Create Account</p>
          </button>
        </div>
      </div>
    </div>
  );
};
