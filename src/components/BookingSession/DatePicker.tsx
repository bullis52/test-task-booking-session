"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface DateItem {
  label: string;
  value: string;
  month: string;
}

interface Props {
  dates: DateItem[];
  selectedDate: string;
  onChange: (value: string) => void;
}

export default function DatePicker({ dates, selectedDate, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dateRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [positionsArray, setPositionsArray] = useState<[string, number][]>([]);
  const [scrollX, setScrollX] = useState(0);
  const [ready, setReady] = useState(false);

  const measuredPositions = useRef<Record<string, number>>({});

  useLayoutEffect(() => {
    if (!dates.length) return;

    const positions: Record<string, number> = {};

    dates.forEach((d, index) => {
      const el = dateRefs.current[index];
      if (el && positions[d.month] === undefined) {
        positions[d.month] = el.offsetLeft;
      }
    });

    measuredPositions.current = positions;
  }, [dates]);

  useEffect(() => {
    setPositionsArray(Object.entries(measuredPositions.current));
    setReady(true);
  }, [dates]);

  const onScroll = () => {
    if (scrollRef.current) {
      setScrollX(scrollRef.current.scrollLeft);
    }
  };

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  return (
    <div className="relative w-full pt-5 overflow-hidden">
      {ready && (
        <div
          className="absolute left-0 w-full pointer-events-none text-gray-400 text-sm"
          style={{ top: 0, transform: `translateX(${-scrollX}px)` }}
        >
          {positionsArray.map(([month, x]) => (
            <span key={month} className="absolute" style={{ left: x }}>
              {month}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 w-full">
        <button onClick={scrollLeft} className="items-center justify-center w-8 h-8 hidden md:flex">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A0A3B1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-360"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar px-2 py-4"
        >
          {dates.map((d, index) => {
            const active = d.value === selectedDate;

            return (
              <div
                key={d.value}
                ref={(el) => {
                  dateRefs.current[index] = el;
                }}
                onClick={() => onChange(d.value)}
                className={`flex flex-col justify-center text-center cursor-pointer
                  rounded-xl border transition
                  min-w-[55px] h-[55px]
                  md:min-w-[70px] md:h-[70px]
                  ${
                    active
                      ? "bg-[#F7F7FC] text-[#D8427A] border-[#F7F7FC]"
                      : "bg-white text-[#1C1C1E] border-[#E5E5EA]"
                  }`}
              >
                <span className="text-[12px] md:text-[14px] leading-3">
                  {d.label.split(" ")[0]}
                </span>
                <span className="text-[16px] md:text-[18px]">{d.label.split(" ")[1]}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="items-center justify-center w-8 h-8 hidden md:flex"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#A0A3B1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
