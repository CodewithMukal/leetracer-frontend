import React from "react";
import { NavLink } from "react-router";
import { Logout } from "./Logout";
import cross from "../assets/cross.svg"
export const Sidebar = (props) => {
  return (
    <div className="fixed animate-slide h-[100vh] flex py-6 justify-between flex-col top-0 w-[60%] sm:w-[40%] backdrop-blur-2xl right-0 bg-black/20 border-l-[1px] border-borderToWhite z-100 font-[Inter]">
        <div onClick={()=> props.setHidden(true)} className="fixed font-bold w-8 h-8 p-2 backdrop-blur-2xl hover:opacity-40 transition-opacity right-2 bg-white/20 rounded-full flex justify-center items-center">
            <img src={cross} alt="" />
        </div>
      <div className="flex justify-center items-center mt-8 gap-2 flex-col">
        <img className="w-20 rounded-full h-20" src={props.img} alt="" />
        <p className="font-bold">@{props.name}</p>
      </div>
      <div className="flex flex-col mx-auto w-fit">
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive ? "text-white font-[Geist]" : "text-[#999999] font-[Geist]"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            isActive ? "text-white font-[Geist]" : "text-[#999999] font-[Geist]"
          }
        >
          Search
        </NavLink>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive ? "text-white font-[Geist]" : "text-[#999999] font-[Geist]"
          }
        >
          Dashboard
        </NavLink>
        {/* <NavLink
          to={"/leaderboard"}
          className={({ isActive }) =>
            isActive ? "text-white font-[Geist]" : "text-[#999999] font-[Geist]"
          }
        >
          Leaderboard
        </NavLink> */}
        <NavLink
          to={"/friends"}
          className={({ isActive }) =>
            isActive ? "text-white font-[Geist]" : "text-[#999999] font-[Geist]"
          }
        >
          Friends
        </NavLink>
      </div>
      <div className="flex justify-center items-center">
        <Logout />
      </div>
    </div>
  );
};
