import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import hero from "./assets/hero.svg";
import arrow from "./assets/arrow.svg";
import dash from "./assets/dash.svg";
import { Moon } from "./components/Moon";
import dash1 from "./assets/dash1.svg";
import dash2 from "./assets/dash2.svg";
import dash3 from "./assets/dash3.svg";
import { Lead } from "./components/Lead";
import lead1 from "./assets/lead1.svg";
import lead2 from "./assets/lead2.svg";
import lead3 from "./assets/lead3.svg";
import friends from "./assets/friends.svg";
import ellipse1 from './assets/ellipse1.svg'
import ellipse2 from './assets/ellipse2.svg'
import getstarted from "./assets/getstarted.svg";
import { useNavigate } from "react-router";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Home = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  

  return (
    <div>
      <Navbar />
      <div className="flex justify-center relative -z-10 bottom-20 items-center">
        <img src={hero} alt="" />
      </div>
      <div className="flex gap-10 flex-col text-center relative bottom-70 justify-center items-center">
        <h1 className="max-w-[450px] text-[#CAC5BB] font-[Geist] font-bold text-[40px]">
          Trace your Progress, Race with your Friends
        </h1>
        <p className="max-w-[530px] font-[Geist] text-subtext">
          AI-powered progress analysis for better performance along with
          graph’s, leaderboard’s and much more...
        </p>
        <div className="font-[Inter] justify-center items-center gap-20 flex">
          <div className="bg-gradient-to-bl graySpin from-borderFromWhite to-borderToWhite w-fit rounded-full p-[1px]">
            <button onClick={()=>navigate("/login")} className="bg-[#151515] hover:bg-[#595959] px-8 py-2 rounded-full ">
              Login
            </button>
          </div>
          <div className="bg-gradient-to-br from-[#996400] gradientSpin rounded-full to-[#986300]/50 flex justify-center items-center p-2">
            <button onClick={()=>navigate("/signup")} className="bg-gradient-to-b hover:from-transparent hover:to-transparent transition-all rounded-full font-medium text-black justify-center items-center gap-4 px-6 py-2 from-[#D9D9D9] to-[#737373] flex">
              <img src={arrow} alt="" />
              <p>Get Started</p>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center relative -mb-40 -top-40">
        <img src={dash} alt="" />
      </div>

      <section className="flex flex-col gap-2 justify-center items-center my-16 font-[Geist]">
        <div class="text-center justify-center text-zinc-300 text-4xl font-semibold font-['Geist']">
          Dashboard
        </div>
        <div class="text-center justify-center text-white text-base font-normal font-['Inter']">
          Your one stop solution to check your daily progress.
        </div>
        <div className="mt-20">
          <div className="flex justify-center gap-34 items-center">
            <Moon img={dash1} text={"Details directly fetched from Leetcode"} />
            <Moon img={dash2} text={"Details directly fetched from Leetcode"} />
            <Moon img={dash3} text={"Details directly fetched from Leetcode"} />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2 justify-center relative items-center my-16 font-[Geist]">
        <div className="absolute left-0">
          <img src={ellipse1} alt="" />
        </div>
        <div class="text-center justify-center text-zinc-300 text-4xl font-semibold font-['Geist']">
          Leaderboards
        </div>
        <div class="text-center justify-center text-white text-base font-normal font-['Inter']">
          Climb up the ranks and get rewarded in friendly or global leaderboard
        </div>
        <div className="mt-20">
          <div className="flex flex-col justify-center gap-34 items-center">
            <Lead
              img={lead1}
              head="Global Leaderboard"
              para="Compete with everyone who have registered on our platform."
            />
            <Lead
              img={lead2}
              head="Global Leaderboard"
              para="Compete with everyone who have registered on our platform."
              rev={true}
            />
            <Lead
              img={lead3}
              head="Global Leaderboard"
              para="Compete with everyone who have registered on our platform."
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2 justify-center items-center my-9 font-[Geist] relative">
        <div className="absolute right-0">
          <img src={ellipse2} alt="" />
        </div>
        <div class="text-center justify-center text-zinc-300 text-4xl font-semibold font-['Geist']">
          Friends
        </div>
        <div class="text-center justify-center max-w-[580px] text-white text-base font-normal font-['Inter']">
          Coding is better with friends. Easily search and send requests to new
          coders or your own friends.
        </div>
        <div className="my-10">
          <img src={friends} alt="" />
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="w-[1220px] p-[1px] h-[428px] max-w-[90%] rounded-4xl bg-gradient-to-br from-borderFromWhite to-borderToYellow">
          <div className="w-full gap-10 relative flex flex-col justify-center items-center bg-[#191715] rounded-4xl backdrop-blur-3xl h-full">
            <h1 className="text-[80px] font-bold text-[#CAC5BB] font-[Inter]">
              Grow Together
            </h1>
            <div className="flex justify-center items-center gap-8">
              <div className="whiteBorder flex w-fit">
                <input
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                  className="text-lg bg-[#2B2A28] px-10 py-[4px] focus:outline-0 font-[Geist] rounded-full"
                />
              </div>
              <div>
                <div className="whiteBorder">
                  <button onClick={()=>navigate(`/signup/${encodeURIComponent(email)}`)} className="bg-gradient-to-bl rounded-full px-4 py-1 text-lg font-[Geist] font-medium from-[#FFC75E] to-[#895900]">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center mt-20">
        <img src={getstarted} alt="" />
      </div>
    </div>
  );
};
