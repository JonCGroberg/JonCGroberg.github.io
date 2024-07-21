import type { Contribution, Year } from "../../types/heatmap";

const shades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
interface HeatmapProps {
  contributions: Contribution[];
  // years: Year[];
}

export default function Heatmap({ contributions }: HeatmapProps) {
  return (
    <div className=" flex-wrap">
      <div className="grid grid-rows-7 grid-flow-col gap-[0px]">
        {/* Contribution Square Grid */}
        {contributions.map((contribution) => (
          <div key={contribution.date} className="relative *:hover:flex group">
            {/* Square */}
            <div
              className="p-[5px] rounded group-hover:outline group-hover:outline-2 group-hover:outline-green-400 group-hover:shadow m-[1px]"
              style={{ backgroundColor: shades[contribution.intensity] }}
            ></div>
            {/* Toolhip Hover Message */}
            <div className="absolute bottom-0 left-0 hidden bg-white px-3 mb-[15px] text-sm rounded-sm shadow outline outline-gray-200 z-10 flex-nowrap text-nowrap">
              {contribution.intensity == 1
                ? `${contribution.intensity} Contribution on ${contribution.date}`
                : `${contribution.intensity} Contributions on ${contribution.date}`}
              <br />
              {getDayOfWeek(contribution.date)}
            </div>
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
