"use client";

import PhotoBoothLayoutSelector from "@/components/chose-layout/PhotoBoothLayoutSelector";
import PhotoSection from "@/components/chose-layout/PhotoSection";
import { useState } from "react";

const ChoseLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <PhotoBoothLayoutSelector
        isOpen={isOpen}
        onSelectLayout={handleToggleSection}
      />
      <PhotoSection isOpen={isOpen} />
    </main>
  );
};

export default ChoseLayout;
