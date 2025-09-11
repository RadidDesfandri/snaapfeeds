"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const CardColor = ({
  isActive,
  onClick,
  children,
  backgroundColor,
  background,
}: {
  isActive?: boolean;
  onClick: () => void;
  children?: ReactNode;
  background?: string;
  backgroundColor?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        `flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border`,
        isActive ? "border-2 border-black" : "border-gray-300",
      )}
      style={{ background, backgroundColor }}
    >
      {children}
    </div>
  );
};

export default CardColor;
