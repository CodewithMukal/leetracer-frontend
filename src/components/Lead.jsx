import React from 'react'

export const Lead = (props) => {
  return (
    <div className={`flex flex-col md:${props.rev?"flex-row-reverse":"flex-row"} gap-20 justify-center items-center`}>
        <div>
            <img src={props.img} alt="" />
        </div>
        <div className='flex flex-col gap-6 justify-center items-center md:items-start'>
            <h1 className='font-[Inter] text-center md:text-left text-white text-2xl font-bold'>{props.head}</h1>
            <p className='font-[Inter] max-w-[420px] text-center md:text-left text-xl '>{props.para}</p>
        </div>
    </div>
  )
}
