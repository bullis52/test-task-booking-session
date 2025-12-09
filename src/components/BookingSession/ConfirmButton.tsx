interface ConfirmButtonProps {
  selectedTime: string;
  handleClick: () => void;
}

export default function ConfirmButton({ selectedTime, handleClick }: ConfirmButtonProps) {
  return (
    <button
      type="button"
      disabled={!selectedTime}
      onClick={handleClick}
      className={`w-full py-4 rounded-full text-center text-lg font-medium transition text-white
                ${selectedTime ? "bg-black  hover:bg-gray-900" : "bg-gray-300  cursor-not-allowed"}
            `}
    >
      Confirm
    </button>
  );
}
