'use client';
import { useEffect, useState } from "react";
const moment = require("moment");


function Time() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const currentTime = moment().format("hh:mm");
        setTime(currentTime);
    }, [])

    return (
        <h3 className="text-slate-400">{time}</h3>
    )
}

export default Time