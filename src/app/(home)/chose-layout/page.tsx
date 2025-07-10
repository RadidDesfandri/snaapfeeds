"use client";

import PhotoBoothLayoutSelector from "@/components/chose-layout/PhotoBoothLayoutSelector";
import PhotoSection from "@/components/chose-layout/PhotoSection";
import { useState } from "react";

export interface LayoutOptions {
  layoutName: string;
  maxPhoto: number;
}

const ChoseLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [layoutSelected, setLayoutSelected] = useState<LayoutOptions>({
    maxPhoto: 0,
    layoutName: "",
  });

  const handleToggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLayout = ({ maxPhoto, layoutName }: LayoutOptions) => {
    setLayoutSelected({ maxPhoto, layoutName });
  };

  return (
    <main>
      <PhotoBoothLayoutSelector
        isOpen={isOpen}
        handleToggleSection={handleToggleSection}
        handleSelectLayout={handleSelectLayout}
      />
      <PhotoSection isOpen={isOpen} layoutOption={layoutSelected} />
    </main>
  );
};

export default ChoseLayout;
