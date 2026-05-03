import React, { useEffect, useRef } from "react";
import { useWorkLogs } from "../../../store/useWorkLogs";

interface Props {
  onSelect: (year: number) => void;
}

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 30 }, (_, i) => 2010 + i);

const YearsScroller: React.FC<Props> = ({ onSelect }) => {
  const { selectedYear } = useWorkLogs();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const el = itemRefs.current.find((_, i) => years[i] === selectedYear);

    if (container && el) {
      const offset =
        el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [selectedYear]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto no-scrollbar"
      style={{
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="flex gap-3 py-2 px-[20%] min-w-max">
        {years.map((year, index) => {
          const isActive = year === selectedYear;
          const isDisabled = year > currentYear; // 🔥 כאן הקסם

          return (
            <div
              key={year}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => {
                if (!isDisabled) onSelect(year);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium select-none transition-all duration-300
                ${
                  isDisabled
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed opacity-50"
                    : isActive
                    ? "bg-green-500 text-white shadow-md scale-105 cursor-pointer"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-green-400 hover:text-white cursor-pointer"
                }
              `}
              style={{
                scrollSnapAlign: "center",
              }}
            >
              {year}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearsScroller;