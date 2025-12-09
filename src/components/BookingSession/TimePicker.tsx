"use client";

import { useMemo, useRef } from "react";

interface Props {
  selectedDate: string;
  selectedTime: string;
  onChange: (value: string) => void;
}

export default function TimePicker({ selectedDate, selectedTime, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });

  const scrollRight = () => scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  const times = useMemo(() => {
    const slots: string[] = [];
    const now = new Date();
    const selected = new Date(selectedDate);

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const slot = new Date(selected);
        slot.setHours(h, m, 0, 0);

        if (selected.toDateString() === now.toDateString() && slot <= now) {
          continue;
        }

        const label = slot.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        slots.push(label);
      }
    }

    return slots;
  }, [selectedDate]);

  return (
    <div className="flex items-center gap-2 w-full overflow-hidden">
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
        className="
                    flex-1 flex gap-3
                    overflow-x-auto no-scrollbar
                    w-full
                "
      >
        {times.map((time) => {
          const active = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => onChange(time)}
              className={`
                                flex items-center justify-center
                                min-w-[90px] h-[55px]
                                rounded-full border transition
                                text-sm md:text-base
                                ${
                                  active
                                    ? "bg-[#F6EDF8] text-[#D8427A] border-[#F7F7FC]"
                                    : "bg-white text-[#000] border-[#F7F7FC]"
                                }
                            `}
            >
              {time}
            </button>
          );
        })}
      </div>
      <button onClick={scrollRight} className="items-center justify-center w-8 h-8 hidden md:flex">
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
  );
}
