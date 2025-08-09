import React, { useEffect, useState } from "react";
import { DashboardNav } from "./components/Navbar";
import { useNavigate } from "react-router";
import search1 from "./assets/search.svg";
import { Results } from "./components/Results";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const FindAll = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [username, setLeetcodeID] = useState("");
  const [profile, setProfile] = useState();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelect] = useState(false);
  const [user, setUser] = useState();
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
    setResults(data);
  };
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch(`${baseUrl}/auth/info`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      setLeetcodeID(data.leetcodeID);
      setUser(data.username)
      if (data.status === "success") {
        if (!data.leetcodeID) {
          navigate("/addLeetcode");
          return;
        }

        const getData = async (username) => {
          const body = { username };
          const response = await fetch(`${baseUrl}/auth/allData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
          });

          const data2 = await response.json();
          setData(data2.data);
          localStorage.setItem(
            "leetcodeData",
            JSON.stringify({
              data: data2.data,
              time: Date.now(),
              user: data2.data.username,
            })
          );
        };

        const cached = localStorage.getItem("leetcodeData");

        if (cached) {
          const stored = JSON.parse(cached);
          const thirtyMinutes = 30 * 60 * 1000;

          if (
            Date.now() - stored.time < thirtyMinutes &&
            stored.user === data.leetcodeID
          ) {
            console.log("⏳ Using cached data", stored.data);

            setData(stored.data);
          } else {
            console.log("♻️ Cache expired. Refetching...");
            await getData(data.leetcodeID);
          }
        } else {
          console.log("📭 No cache found. Fetching...");
          await getData(data.leetcodeID);
        }
      } else {
        navigate("/login");
      }
      setProfile(data);
    };

    getInfo();
  }, []);
  return (
    <div>
      {data ? (
        <DashboardNav img={data.profile.userAvatar} user={data.username} />
      ) : (
        <DashboardNav />
      )}
      <div>
        <div className="w-fit mx-auto relative bg-gradient-to-br z-30 from-borderFromWhite to-borderToWhite rounded-lg p-[1px]">
          <input
            className="bg-black w-[90vw] max-w-[600px] focus:outline-0 rounded-lg pr-10 font-[Geist] px-4 text-[20px]"
            placeholder="Search"
            onChange={(e) => {
              handleSearch(e.target.value);
              setSearch(e.target.value);
            }}
            type="text"
          />
          <div className="absolute top-[100%] w-full">
            {search && <Results results={results} all={true} />}
          </div>
          <img
            src={search1}
            className="absolute right-3 top-[50%] -translate-y-[50%]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
