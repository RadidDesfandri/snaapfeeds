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
  onDoubleClick: () => void;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  name,
  poses,
  imageUrl,
  isSelected,
  onSelected,
  description,
  isCooming,
  onDoubleClick,
}) => {
  return (
    <div
      onClick={onSelected}
      onDoubleClick={onDoubleClick}
      className={cn(
        "font-poppins relative flex min-w-96 cursor-pointer flex-col items-center justify-around overflow-hidden rounded-2xl border p-3 transition-all duration-300 hover:shadow-md md:min-w-72",
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
      {imageUrl.endsWith(".gift") ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={name} className="w-40" />
      ) : (
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
          priority
          className="w-40"
        />
      )}
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
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
