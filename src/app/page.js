import Image from "next/image";
import Toolbar from "./components/toolbar";
import ForcastItem from "./components/forcast_item";
import Time from "./components/time";

const weatherKit = async () => {
  const res = fetch(``)
}

const currentWeatherData = async (query) => {
  /*
    The current weather data fetch
    query: string value
  */
  const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${process.env.WEATHER_API}&contentType=json`, {
    cache: "no-store",
    method: "GET"
  })
  return res.json()
}

async function handleSearch(term) {
  'use server'
  console.log(term);
}

export default async function Home({searchParams}) {
  // sets the search param to deault when page is loaded to prevent api call with undefined value
  const search = searchParams["search"] != undefined ? searchParams["search"] : "Toronto";
  const data = await currentWeatherData(search);

  console.log(data);

  return (
    <main className="w-screen h-dvh bg-gradient-to-b from-blue-950 to-slate-900 flex justify-center text-white overflow-y-scroll">
      <div className="lg:w-5/6 w-11/12 flex flex-col h-screen">
        <Toolbar func={handleSearch}/>
        <div className="p-12 bg-slate-900 flex flex-col gap-10 lg:h-2/5 h-full">
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="flex lg:justify-start justify-center flex-col">
              <h1 className="font-semibold">Current Weather</h1>
              <div className="flex gap-4">
                <Time />
              </div>
              <h1 className=";g:text-6xl text-4xl">{data.address}</h1>
              <h2>{data.resolvedAddress}</h2>
            </div>
            <div className="flex w-full lg:justify-end items-center justify-between">
              <Image alt="weather icon" src={`/icons/${data.currentConditions.icon}.png`} width={100} height={60}></Image>
              <div>
                <div className="flex items-center gap-4 lg:flex-row flex-col">
                  <h1 className="text-6xl">{Math.round(data.currentConditions.temp)}°C</h1>
                  <h1 className="lg:text-xl text-lg text-center">{data.currentConditions.conditions}</h1>
                </div>
                <h2 className="font-thin text-lg lg:text-left text-center">Feels like {data.currentConditions.feelslike}°C</h2>
              </div>
            </div>
          </div>
          <div className="lg:justify-around grid grid-cols-2 lg:flex justify-center items-center gap-3 text-center">
            <div>
              <h1 className="text-slate-400 text-sm">Dew point</h1>
              <h1>{data.currentConditions.dew}°C</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Wind</h1>
              <h1>{data.currentConditions.windspeed} km/h</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Humidity</h1>
              <h1>{data.currentConditions.humidity} %</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Visibility</h1>
              <h1>{data.currentConditions.visibility} km</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Pressure</h1>
              <h1>{data.currentConditions.pressure} mb</h1>
            </div>
          </div>
        </div>
        <div className="p-12 flex flex-col justify-around mt-7 lg:h-1/3 bg-slate-900 lg:gap-0 gap-5 h-full mb-12">
          <h1 className="lg:text-2xl text-base text-slate-400">10 day forecast</h1>
          <div className="flex lg:flex-row flex-col w-full lg:overflow-y-hidden">
            {data.days.slice(1, 11).map((forcasted) => {
              return (
                <ForcastItem key={forcasted.datetime} date={forcasted.datetime} icon={forcasted.icon} temp_high={forcasted.tempmax} temp_low={forcasted.tempmin}/>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  );
}