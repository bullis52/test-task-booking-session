"use client";

import { useState } from "react";
import Header from "@/components/BookingSession/Header";
import ConfirmButton from "@/components/BookingSession/ConfirmButton";
import DatePicker from "@/components/BookingSession/DatePicker";
import { generateDates } from "@/utils/generateDates";
import TimePicker from "@/components/BookingSession/TimePicker";
import MobileInfoBlock from "@/components/BookingSession/MobileInfoBlock";

export default function BookingSessionBlock() {
  const [dates] = useState(() => {
    const grouped = generateDates(6);
    return grouped.flatMap((group) =>
      group.dates.map((d) => ({
        label: d.label,
        value: d.value,
        month: group.month,
      })),
    );
  });

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleClick = () => {
    if (!selectedDate || !selectedTime) return;

    const date = new Date(selectedDate);

    const timeParts = selectedTime.match(/(\d+):(\d+)\s?(AM|PM)/i);
    if (!timeParts) return console.error("Time parse error");

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[3].toUpperCase();

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    date.setHours(hours, minutes, 0, 0);

    const timestamp = Math.floor(date.getTime() / 1000);

    console.log({ timestamp });
  };

  return (
    <>
      <div
        className="
        fixed bottom-0 left-0 right-0
        md:hidden
        w-full
        z-0
    "
      >
        <div className="relative z-10">
          <MobileInfoBlock />
        </div>

        <div
          className="
        bg-white
        rounded-t-[40px]
        shadow-2xl
        w-full
        p-6
        relative
        z-50   /* NOW IT WORKS */
    "
        >
          <div className="relative md:hidden z-30 w-full">
            <Header />
          </div>

          <div className="mt-6">
            <DatePicker dates={dates} selectedDate={selectedDate} onChange={setSelectedDate} />
          </div>

          {selectedDate !== "" && (
            <div className="mt-6">
              <TimePicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onChange={setSelectedTime}
              />
            </div>
          )}

          <div className="mt-8 mb-4">
            <ConfirmButton selectedTime={selectedTime} handleClick={handleClick} />
          </div>
        </div>
      </div>

      <div
        className="
                    hidden md:block
                    w-full max-w-2xl
                    mx-auto
                    bg-white
                    rounded-3xl
                    shadow-xl
                    p-8
                    mt-8
                "
      >
        <Header />

        <div className="mt-6">
          <DatePicker dates={dates} selectedDate={selectedDate} onChange={setSelectedDate} />
        </div>

        {selectedDate !== "" && (
          <div className="mt-6">
            <TimePicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onChange={setSelectedTime}
            />
          </div>
        )}

        <div className="mt-8">
          <ConfirmButton selectedTime={selectedTime} handleClick={handleClick} />
        </div>
      </div>
    </>
  );
}
