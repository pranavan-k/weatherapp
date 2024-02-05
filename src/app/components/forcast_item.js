import React from 'react'
import Image from 'next/image'

function ForcastItem({date, temp_high, temp_low, icon, temp_statement, rain_change}) {
  return (
    <div className='flex flex-col w-full bg-slate-900 p-5 rounded-md'>
        <h1 className='font-semibold p-2'>{date}</h1>
        <div className='flex'>
            <div className='flex gap-3'>
                <Image alt="weather icon" src={"https:" + icon} width={80} height={20}></Image>
                <div className='flex flex-col justify-between'>
                    <h1>{temp_high}°</h1>
                    <h1>{temp_low}°</h1>
                </div>
            </div>
            <div className='flex flex-col items-end w-full text-slate-400'>
                <h1>{temp_statement}</h1>
                <h1>rain: {rain_change}%</h1>
            </div>
        </div>
    </div>
  )
}

export default ForcastItem