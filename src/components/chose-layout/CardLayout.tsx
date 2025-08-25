"use client";

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";

interface CardLayoutProps {
  name: string;
  descriprion: string;
  poses: number;
  imageUrl: string;
  isSelected: boolean;
  onSelected: () => void;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  name,
  poses,
  imageUrl,
  isSelected,
  onSelected,
  descriprion,
}) => {
  return (
    <div
      onClick={onSelected}
      className={cn(
        "font-poppins flex cursor-pointer flex-col items-center justify-between rounded-2xl border p-3 transition-all duration-300 hover:shadow-md",
        isSelected
          ? "scale-[102%] border-2 border-neutral-800"
          : "border-gray-300",
      )}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={400}
        priority
        className="w-32"
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <Camera />
          <p className="font-semibold">{name}</p>
        </div>
        <p className="text-sm text-neutral-700">{descriprion}</p>
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-neutral-700">
            <Camera className="h-4 w-4" />
            <span>{poses} poses</span>
          </div>
          {/* <div className="flex items-center gap-1 text-neutral-700">
            <ImageIcon className="h-4 w-4" />
            <span>{strip} strip</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
