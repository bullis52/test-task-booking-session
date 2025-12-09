import { useEffect, useState } from "react";

interface SelectableListProps {
  items: string[];
  activeValue: string;
  onChange: (value: string) => void;
}

export default function SelectableList({ items, activeValue, onChange }: SelectableListProps) {
  const [selected, setSelected] = useState(activeValue);

  useEffect(() => {
    setSelected(activeValue);
  }, [activeValue]);

  const handleSelect = (item: string) => {
    setSelected(item);
    onChange(item);
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
      {items.map((item) => {
        const isActive = item === selected;

        return (
          <button
            type="button"
            key={item}
            onClick={() => handleSelect(item)}
            className={`
              min-w-[70px] h-[60px] flex items-center justify-center 
              rounded-xl border text-sm font-medium transition
              ${
                isActive
                  ? "bg-[#F6EDF8] text-[#D8427A] border-[#EEC8DC]"
                  : "bg-white text-[#1C1C1E] border-[#E5E5EA]"
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
