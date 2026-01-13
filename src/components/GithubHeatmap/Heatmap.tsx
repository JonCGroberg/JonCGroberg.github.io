import { useState, useEffect } from "react";
import type { Contribution } from "../../types/heatmap";

const lightShades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const darkShades = ["#171717", "#0e4429", "#006d32", "#26a641", "#39d353"];
interface HeatmapProps {
  contributions: Contribution[];
}

export default function Heatmap({ contributions }: HeatmapProps) {
  const [selectedDay, setSelectedDay] = useState<Contribution | null>(null);
  
  // Initialize dark mode state by checking the theme immediately
  const getInitialDarkMode = () => {
    if (typeof window === "undefined") return false;
    const dataTheme = document.documentElement.getAttribute("data-theme");
    if (dataTheme === "dark") return true;
    if (dataTheme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const totalContributions = contributions.reduce(
    (acc, contribution) => Number(acc) + Number(contribution.intensity) * 2,
    0,
  );

  useEffect(() => {
    // Check for dark mode on mount and when it changes
    const checkDarkMode = () => {
      const dataTheme = document.documentElement.getAttribute("data-theme");
      let isDark = false;
      if (dataTheme === "dark") {
        isDark = true;
      } else if (dataTheme === "light") {
        isDark = false;
      } else {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);

    // Also listen for theme changes via data-theme attribute
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      mediaQuery.removeEventListener("change", checkDarkMode);
      observer.disconnect();
    };
  }, []);

  const shades = isDarkMode ? darkShades : lightShades;

  return (
    <div className=" flex-wrap">
      {/* Sub Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg mb-0 dark:text-neutral-100">Github Contributions</h3>
        <span className="sm:text-sm sm:text-neutral-500 dark:sm:text-neutral-400 sm:font-normal text-base font-bold text sm:mb-0  ">
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
              className="h-[10px] w-[10px] rounded group-hover:outline group-hover:outline-2 group-hover:outline-green-400 group-hover:shadow m-[1px]"
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
