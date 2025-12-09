import BookingSessionBlock from "@/components/BookingSession";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-main-gradient flex flex-col">
      <header
        className="
            hidden md:flex w-full h-[70px] pl-[10%] items-center px-6 text-lg shadow-md
            header-blur
        "
      >
        <h1 className="font-semibold">6037 Venture Partnership</h1>
      </header>

      <div className="flex-1 w-full flex justify-center items-center">
        <BookingSessionBlock />
      </div>
    </div>
  );
}
