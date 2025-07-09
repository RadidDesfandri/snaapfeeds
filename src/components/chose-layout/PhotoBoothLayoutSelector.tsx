import Image from "next/image";
import LayoutProvider from "../LayoutProvider";
import { Camera } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import Button from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const dataLayout = [
  {
    name: "Layout A",
    description: "3 poses for photostrip",
    poses: 3,
    strip: 2,
    imageUrl: "/photo-layouts/layout-a.png",
  },
  {
    name: "Layout B",
    description: "4 poses for photostrip",
    poses: 4,
    strip: 2,
    imageUrl: "/photo-layouts/layout-b.png",
  },
  {
    name: "Layout C",
    description: "2 poses for photostrip",
    poses: 2,
    strip: 2,
    imageUrl: "/photo-layouts/layout-c.png",
  },
  {
    name: "Layout D",
    description: "2 poses for photostrip",
    poses: 2,
    strip: 1,
    imageUrl: "/photo-layouts/layout-d.png",
  },
];

interface PhotoBoothLayoutSelectorProps {
  isOpen: boolean;
  onSelectLayout: () => void;
}

const PhotoBoothLayoutSelector = ({
  isOpen,
  onSelectLayout,
}: PhotoBoothLayoutSelectorProps) => {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  if (isOpen) return null;

  return (
    <LayoutProvider center className="flex-col pt-20 pb-9 md:pt-14 md:pb-0">
      <div className="mb-8">
        <h1 className="font-poppins mb-4 text-center text-4xl font-bold text-black">
          Select the{" "}
          <span className="text-stroke bg-clip-text text-white">
            Perfect Frame
          </span>
        </h1>
        <p className="font-poppins mx-auto max-w-2xl text-center text-black/80">
          Choose your ideal photo booth layout and strike the perfect pose
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
        {dataLayout.map((item) => (
          <CardLayout
            onSelected={() => setSelectedLayout(item.name)}
            key={item.name}
            name={item.name}
            poses={item.poses}
            strip={item.poses}
            imageUrl={item.imageUrl}
            descriprion={item.description}
            isSelected={selectedLayout === item.name}
          />
        ))}
      </div>

      <div className="mt-8 flex w-full justify-end">
        <Button disabled={!selectedLayout} onClick={onSelectLayout}>
          <Camera /> Start Photo Session
        </Button>
      </div>
    </LayoutProvider>
  );
};

export default PhotoBoothLayoutSelector;

interface CardLayoutProps {
  name: string;
  descriprion: string;
  poses: number;
  strip: number;
  imageUrl: string;
  isSelected: boolean;
  onSelected: () => void;
}

const CardLayout: React.FC<CardLayoutProps> = ({
  descriprion,
  imageUrl,
  name,
  poses,
  strip,
  isSelected,
  onSelected,
}) => (
  <div
    onClick={onSelected}
    className={cn(
      "font-poppins flex cursor-pointer flex-col items-center gap-3 rounded-2xl border p-3 transition-all duration-300 hover:shadow-md",
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
      className="w-32"
    />
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
      <div className="flex items-center gap-1 text-neutral-700">
        <ImageIcon className="h-4 w-4" />
        <span>{strip} strip</span>
      </div>
    </div>
  </div>
);
