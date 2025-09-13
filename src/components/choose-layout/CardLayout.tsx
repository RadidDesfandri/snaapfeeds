"use client";

import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";

interface CardLayoutProps {
  name: string;
  description: string;
  poses: number;
  imageUrl: string;
  isSelected: boolean;
  onSelected: () => void;
  isCooming: boolean;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  name,
  poses,
  imageUrl,
  isSelected,
  onSelected,
  description,
  isCooming,
}) => {
  return (
    <div
      onClick={onSelected}
      className={cn(
        "font-poppins relative flex min-w-96 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-2xl border p-3 transition-all duration-300 hover:shadow-md md:min-w-72",
        isSelected
          ? "scale-[102%] border-2 border-neutral-800"
          : "border-gray-300",
        isCooming && "pointer-events-none opacity-70",
      )}
    >
      {isCooming && (
        <div className="absolute top-0 right-0 rounded-bl-lg bg-purple-600 p-1 text-xs text-white">
          Cooming soon
        </div>
      )}
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
        <p className="text-center text-sm text-neutral-700">{description}</p>
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
