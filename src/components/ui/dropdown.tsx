"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

interface DropdownProps {
  options: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  variant?: "primary" | "secondary";
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function Dropdown({
  options,
  label,
  placeholder = "Select an option",
  variant = "primary",
  onChange,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(options[0].label);

  useClickOutside([ref], () => setIsOpen(false), isOpen);

  const variants = {
    primary: "bg-black w-full rounded-lg md:px-4 px-2 py-1 md:py-2 text-xs md:text-sm",
    secondary: "border-gray-500 border focus:ring-gray-300",
  };

  const handleSelect = (value: string, label: string) => {
    onChange(value);
    setSelected(label!);
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (disabled) {
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <div
        onClick={handleOpen}
        className={clsx(
          "font-poppins flex items-center justify-between gap-3 rounded-md p-2 text-white transition-all duration-300 focus:ring-2 focus:outline-none",
          disabled ? "cursor-default opacity-55" : "cursor-pointer",
          placeholder && "text-gray-500",
          variants[variant],
        )}
      >
        <span>{selected || placeholder}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <motion.ul
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -5 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "font-poppins absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white text-sm shadow-lg",
          isOpen ? "block" : "hidden",
        )}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className={cn(
              "cursor-pointer rounded-md p-2",
              selected === option.label
                ? "bg-gray-100"
                : "hover:bg-gray-100/60",
            )}
            onClick={() => handleSelect(option.value, option.label)}
          >
            {option.label}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
