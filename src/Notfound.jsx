import React from 'react'
import { useNavigate } from 'react-router'

export const Notfound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col mt-[100px] font-[Geist] text-white/50 justify-center items-center'>
      <p className='fixed text-[1000px] top-[50%] -translate-y-[50%] font-bold opacity-12 -z-20'>
        404
      </p>
        <p className='text-[100px] font-bold'>
            404
        </p>
        <p>The page you visted doesn't exist!</p>
        <button onClick={()=>navigate("/")} className='bg-yellow-600/60 opacity-80 hover:opacity-100 mt-[30px] text-white font-bold text-xl px-8 rounded-full py-2 '>
            Home
        </button>
    </div>
  )
}
