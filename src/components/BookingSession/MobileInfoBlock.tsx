import Image from "next/image";

export default function MobileInfoBlock() {
  return (
    <div className="h-[200px] px-[20px] relative">
      <div className="text-white">
        <h1 className="text-3xl font-semibold">Cool session</h1>
        <p className="text-lg opacity-80 mt-1">Additional type</p>

        <div className="w-[90px] justify-center mt-4 bg-white/20 rounded-full gap-2 flex items-center backdrop-blur-sm">
          <span className="text-xl">⏱</span>
          <span className="text-white">30 min</span>
        </div>
      </div>

      <div className="absolute right-[-80px] top-[0px] w-[280px] h-[280px] rounded-full border-[4px] border-[#F6C16A] opacity-70 bg-[#AD5707]"></div>

      <div className="absolute right-[-20px] top-[-60px] h-[260px] w-[auto]">
        <div className="relative h-full w-[260px]">
          <Image
            src="/test-task-booking-session/girlMobile.png"
            alt="session"
            fill
            className="object-cover transform scale-130"
            sizes="260px"
          />
        </div>
      </div>
    </div>
  );
}
