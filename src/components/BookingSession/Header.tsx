import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center gap-4 justify-around z-20">
      <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden hidden sm:block">
        <Image
          src="/test-task-booking-session/girl.png"
          alt="Avatar"
          fill
          className="w-full h-full object-cover transform scale-110 object-[105%_center]"
          sizes="120px"
        />
      </div>

      <div>
        <h2 className="font-kaisei font-bold text-[28px] text-[#16171B]">Book a Session</h2>
        <p className="text-[#8F91A1] text-[14px]">
          Choose a date and time that is convenient for you to e-meet your stylist
        </p>
      </div>
    </div>
  );
}
