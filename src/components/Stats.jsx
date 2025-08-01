import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const baseUrl =
  import.meta.env.VITE_ENV === "production"
    ? "https://leetracer-backend.onrender.com"
    : "http://localhost:8000";

export const Stats = (props) => {
    const [data,setData] = useState();
    useEffect(()=>{
        const getData = async () => 
            {
                const body = {UID: props.UID}
                const response  = await fetch(`${baseUrl}/friends/getInfo`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    credentials:"include",
                    body: JSON.stringify(body)
                })
                const data = await response.json()
                setData(data)
                console.log(data)
            }
            getData();
    },[])
  return (
    <div className="border-[1px] rounded-xl border-t-borderFromWhite border-x-borderFromWhite bg-[#373737]/10 border-b-borderToYellow max-w-[90%] w-[600px] px-4 py-2">
        {
            data ? 
            (
                <div>
                    {data.leetcodeID}
                </div>
            )
            :
            <div>
                <Spinner/>
            </div>
        }
    </div>
  );
};
