import Image from "next/image";
import Toolbar from "./components/toolbar";
const moment = require("moment");
import ForcastItem from "./components/forcast_item";

async function getCurrentWeatherData(query) {
  /*
    The current weather data fetch
    query: string value
  */

  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${query}&days=3&aqi=yes`)
  return res.json()
}

async function handleSearch(term) {
  'use server'
  console.log(term);
}

export default async function Home({searchParams}) {
  const data = await getCurrentWeatherData(searchParams["search"]);
  console.log(data.forecast);
  const current_time = moment().format("HH:mm");

  return (
    <main className="w-screen h-dvh bg-gradient-to-b from-blue-950 to-slate-900 flex justify-center">
      <div className="w-5/6 flex flex-col h-screen">
        <Toolbar func={handleSearch}/>
        <div className="p-12 bg-slate-900 flex flex-col gap-10">
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="flex lg:justify-start justify-center flex-col">
              <h1 className="font-semibold">Current Weather</h1>
              <div className="flex gap-4">
                <h3 className="text-slate-400">{current_time}</h3>
                <h3 className="text-slate-400">{data.location.tz_id}</h3>
              </div>
              <h1 className="text-6xl">{data.location.name}</h1>
              <h2>{data.location.country}</h2>
            </div>
            <div className="flex w-full justify-end items-center">
              <Image alt="weather icon" src={"https:" + data.current.condition.icon} width={160} height={60}></Image>
              <div>
                <div className="flex items-center gap-4 lg:flex-row flex-col">
                  <h1 className="text-6xl">{data.current.temp_c}°C</h1>
                  <h1 className="text-xl">{data.current.condition.text}</h1>
                </div>
                <h2 className="font-thin text-lg lg:text-left text-center">Feels like {data.current.feelslike_c}°C</h2>
              </div>
            </div>
          </div>
          <div className="lg:justify-around grid grid-cols-2 lg:flex justify-center items-center gap-3 text-center">
            <div>
              <h1 className="text-slate-400 text-sm">Air Quality</h1>
              <h1>{data.current.air_quality.pm2_5}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Wind</h1>
              <h1>{data.current.wind_kph} km/h</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Humidity</h1>
              <h1>{data.current.humidity} %</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Visibility</h1>
              <h1>{data.current.vis_km} km</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Pressure</h1>
              <h1>{data.current.pressure_mb} mb</h1>
            </div>
          </div>
        </div>
        <h1 className=" pt-12 pl-12 text-4xl">3 day forecast</h1>
        <div className="p-12 flex lg:flex-row flex-col justify-around gap-10 mt-7 h-full">
          {data.forecast.forecastday.map((forcasted) => {
            console.log(forcasted.hour)
            return (
              <ForcastItem key={forcasted.date} date={forcasted.date} icon={forcasted.day.condition.icon} temp_high={forcasted.day.maxtemp_c} temp_low={forcasted.day.mintemp_c}
              temp_statement={forcasted.day.condition.text} rain_change={forcasted.day.daily_chance_of_rain}/>
            )
          })}
        </div>
      </div>
    </main>
  );
}
