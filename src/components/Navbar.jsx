import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import user from "../assets/user.svg";
import Bell from "../assets/Bell.svg";
import search1 from "../assets/search.svg";
import { data, Link, NavLink, useLocation, useNavigate } from "react-router";
import { Results } from "./Results";
import ham from "../assets/ham.svg";
import { Sidebar } from "./Sidebar";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.loggedIn) {
        setLogin(true);
        props.setLogin(true);
      }
    };
    getInfo();
  }, []);
  return (
    <div className="goldBorder my-4 max-w-[95%] w-[1146px]">
      <div className="bg-black p-4 flex justify-between items-center rounded-full w-full">
        <button onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </button>
        <div className="font-[Geist] hidden md:flex justify-center items-center gap-4">
          <button className="hover:text-white transition-all">Home</button>
          <button className="hover:text-white transition-all">Dashboard</button>
          <button className="hover:text-white transition-all">
            Leaderboard
          </button>
          <button className="hover:text-white transition-all">Friend</button>
        </div>
        {!loggedIn ? (
          <div className="hidden gap-4 md:flex font-[Inter]">
            <div className="whiteBorder">
              <button
                onClick={() => navigate("/login")}
                className="bg-[#151515] hover:bg-[#595959] transition-colors text-[10px] md:text-xs rounded-full font-medium px-4 py-2"
              >
                Login
              </button>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="flex justify-center items-center px-4 py-2 bg-gradient-to-b from-55% from-[#D9D9D9] to-[#737373] hover:ring-[1px] ring-borderToYellow transition-all text-black font-medium text-[10px] lg:text-xs rounded-full"
            >
              <img src={user} alt="" />
              <p className="text-nowrap">Create Account</p>
            </button>
          </div>
        ) : (
          <div className="md:flex hidden gap-4 font-[Inter]">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex justify-center items-center px-4 py-2 bg-gradient-to-b from-55% from-[#D9D9D9] to-[#737373] hover:ring-[1px] ring-borderToYellow transition-all text-black font-medium text-xs rounded-full"
            >
              <p>Dashboard</p>
            </button>
          </div>
        )}
        <div className="flex md:hidden flex-col gap-1">
          <div className="flex w-[20px] h-[2px] bg-[#FFC75E]"></div>
          <div className="flex w-[20px] h-[2px] bg-[#FFC75E]"></div>
          <div className="flex w-[20px] h-[2px] bg-[#FFC75E]"></div>
        </div>
      </div>
    </div>
  );
};

export const Navbar2 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center mx-auto my-4 max-w-[90%] w-[1146px]">
      <div className="bg-black p-4 flex justify-between items-center rounded-full w-full">
        <button onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </button>
        <div className="flex gap-4 font-[Inter]">
          <button
            onClick={() => navigate("/signup")}
            className="flex justify-center items-center px-4 py-2 bg-gradient-to-b from-55% from-[#D9D9D9] to-[#737373] hover:ring-[1px] ring-borderToYellow transition-all text-black font-medium text-xs rounded-full"
          >
            <img src={user} alt="" />
            <p>Create Account</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export const Navbar3 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center mx-auto my-4 max-w-[90%] w-[1146px]">
      <div className="bg-black p-4 flex justify-between items-center rounded-full w-full">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </button>
        <div className="flex gap-4 font-[Inter]">
          <div onClick={() => navigate("/login")} className="whiteBorder">
            <button className="bg-[#151515] hover:bg-[#595959] transition-colors text-xs rounded-full font-medium px-4 py-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Navbar4 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start mx-auto max-w-[95%] my-4 w-[1146px]">
      <div className="bg-black p-4 flex justify-between items-center rounded-full w-full">
        <button className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </button>
      </div>
    </div>
  );
};

export const DashboardNav = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selected, setSelect] = useState(false);
  const [search, setSearch] = useState("");
  const user = props.user;
  const [hidden, setHidden] = useState(true);
  const handleSearch = async (query) => {
    const response = await fetch(`${baseUrl}/search?query=${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const data = await response.json();
    setData(data);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-[98%] py-6 flex justify-between items-center mx-auto">
        <div>
          <button onClick={() => navigate("/dashboard")} className="cursor-pointer">
            <img src={logo} alt="" />
          </button>
        </div>
        <div className="md:flex hidden justify-center gap-6 items-center">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive
                ? "text-white font-[Geist]"
                : "text-[#999999] font-[Geist]"
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
              isActive
                ? "text-white font-[Geist]"
                : "text-[#999999] font-[Geist]"
            }
          >
            Friends
          </NavLink>
          <button>
            <img src={Bell} alt="" />
          </button>
          <div className="w-fit relative bg-gradient-to-br z-30 from-borderFromWhite to-borderToWhite rounded-lg p-[1px]">
            <input
              className="bg-black max-w-[170px] focus:outline-0 rounded-lg pr-10 font-[Geist] px-4 text-[20px]"
              placeholder="Search"
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearch(e.target.value);
              }}
              type="text"
            />
            <div className="absolute top-[100%] w-full">
              {search && <Results results={data} />}
            </div>
            <img
              src={search1}
              className="absolute right-3 top-[50%] -translate-y-[50%]"
              alt=""
            />
          </div>
          {!props.img ? (
            <div className="w-10 h-10 bg-gray-400 rounded-full animate-pulse"></div>
          ) : (
            <div className="">
              <div
                onClick={() => navigate("/profile")}
                className="w-10 h-10 cursor-pointer rounded-full"
              >
                <img className="rounded-full" src={props.img} alt="" />
              </div>
            </div>
          )}
        </div>
        <div className="flex md:hidden justify-center items-center gap-6">
          <div onClick={() => navigate("/search")}>
            <img className="w-6 h-6" src={search1} alt="" />
          </div>
          <div onClick={() => setHidden(false)}>
            <img className="w-6 h-6" src={ham} alt="" />
          </div>
        </div>
        {!hidden && (
          <Sidebar setHidden={setHidden} img={props.img} name={props.user} />
        )}
      </div>
    </div>
  );
};
