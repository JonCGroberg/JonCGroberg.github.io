import { useState } from "react";
import type { Contribution } from "../../types/heatmap";

const shades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
interface HeatmapProps {
  contributions: Contribution[];
}

export default function Heatmap({ contributions }: HeatmapProps) {
  const [selectedDay, setSelectedDay] = useState<Contribution | null>(null);
  const [startYear, startMonth, startDay] = contributions[0].date.split("-");
  const [endYear, endMonth, endDay] =
    contributions[contributions.length - 1].date.split("-");
  const totalContributions = contributions.reduce(
    (acc, contribution) => Number(acc) + Number(contribution.intensity) * 2,
    0,
  );

  return (
    <div className=" flex-wrap">
      {/* Sub Header */}
      <div className="flex justify-between ">
        <h2 className="text-xl font-bold hidden sm:block py-0 my-0">{` ${startYear} -  ${endYear}`}</h2>
        <span className="sm:text-sm sm:text-gray-500 sm:font-normal text-base font-bold text mb-2 sm:mb-3  ">
          {selectedDay ? (
            <>
              <span className="underline font-bold">
                {selectedDay.intensity}
              </span>{" "}
              <span>Contributions on {selectedDay.date}</span>
            </>
          ) : (
            <>
              <span className="underline font-bold">{totalContributions}</span>{" "}
              <span> Contributions in 12 months</span>
            </>
          )}
        </span>
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-[0px] overflow-y-hidden -m-1 p-1">
        {/* Contribution Square Grid */}
        {contributions.map((contribution) => (
          <div
            key={contribution.date}
            className="relative *:hover:flex group cursor-pointer"
            onClick={() => location.replace("https://github.com/JonCGroberg")}
            onMouseOver={() => setSelectedDay(contribution)}
            onMouseOut={() => setSelectedDay(null)}
          >
            {/* Square */}
            <div
              className="p-[5px] rounded group-hover:outline group-hover:outline-2 group-hover:outline-green-400 group-hover:shadow m-[1px]"
              style={{ backgroundColor: shades[contribution.intensity] }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getDayOfWeek(date: string): string {
  const dayOfWeek = new Date(date).getDay(); // 0-6 -> 1-7
  return [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ][dayOfWeek];
}

function getMonth(date: string): string {
  const month = new Date(date).getMonth(); // 0-11
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];
}
