import React, { useEffect, useRef, useState } from "react";
import { useWorkLogs } from "../../../store/useWorkLogs";

interface Props {
  onSelect: (month: number) => void;
}

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const MonthsPicker: React.FC<Props> = ({ onSelect }) => {
  const { selectedMonth } = useWorkLogs();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(selectedMonth - 1);

  // 🎯 Scroll to selected (רק כשselected משתנה)
  useEffect(() => {
    const container = containerRef.current;
    const el = itemRefs.current[selectedMonth - 1];

    if (container && el) {
      const offset =
        el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

      container.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [selectedMonth]);

  // 🎯 רק highlight בזמן גלילה (לא משנה selected)
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(center - elCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <div className="relative w-full">
      {/* Center indicator */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-orange-400 opacity-30 -translate-x-1/2 z-10" />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto no-scrollbar px-[40%]"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-6 py-6 min-w-max">
          {months.map((month, index) => {
            const isSelected = index + 1 === selectedMonth;
            const isActive = index === activeIndex;

            return (
              <div
                key={month}
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                onClick={() => onSelect(index + 1)}
                className="flex flex-col items-center cursor-pointer select-none transition-all duration-300"
                style={{
                  scrollSnapAlign: "center",
                  transform: isSelected
                    ? "scale(1.2)"
                    : isActive
                    ? "scale(1.05)"
                    : "scale(0.85)",
                  opacity: isSelected ? 1 : isActive ? 0.7 : 0.4,
                }}
              >
                {/* Circle */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300
                  ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Month name */}
                <span
                  className={`text-xs mt-2 ${
                    isSelected
                      ? "text-orange-500 font-semibold"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthsPicker;