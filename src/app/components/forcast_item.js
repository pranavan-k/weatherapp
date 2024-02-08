import React from 'react'
import Image from 'next/image'
const moment = require("moment");

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function ForcastItem({date, temp_high, temp_low, icon}) {
    const day = new Date(date);

    return (
        <div className='flex lg:flex-col flex-row w-full lg:p-5 p-0 rounded-md lg:border-x-2 lg:border-y-0 border-y-2 border-slate-700 lg:items-start items-center'>
            <h1 className='font-semibold lg:text-base text-sm'>{dayNames[day.getDay()]}</h1>
            <div className='flex w-full'>
                <div className='flex lg:gap-3 w-full items-center lg:justify-start'>
                    <Image alt="weather icon" src={`/icons/${icon}.png`} width={42} height={20}></Image>
                    <div className='flex lg:flex-col flex-row lg:justify-between justify-around w-full'>
                        <h1>{temp_high}°</h1>
                        <h1>{temp_low}°</h1>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForcastItem