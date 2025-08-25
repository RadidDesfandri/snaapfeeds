import { StepType } from "@/types/global-type";
import { Camera } from "lucide-react";
import { useState } from "react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import CardLayout from "./CardLayout";

const layoutData = [
  {
    name: "Layout A",
    description: "2 poses for photostrip",
    pose: 2,
    imageUrl: "/photo-layouts/layout-d2.png",
  },
  {
    name: "Layout B",
    description: "3 poses for photostrip",
    pose: 3,
    imageUrl: "/photo-layouts/layout-a2.png",
  },
  {
    name: "Layout C",
    description: "4 poses for photostrip",
    pose: 4,
    imageUrl: "/photo-layouts/layout-c2.png",
  },
  {
    name: "Layout D",
    description: "6 poses for photostrip",
    pose: 6,
    imageUrl: "/photo-layouts/6-pose.jpg",
  },
];

interface ChooseLayoutProps {
  isStep: StepType;
  handleChangeStep: (step: StepType) => void;
  handleMaxPose: (pose: number) => void;
}

const ChooseLayout: React.FC<ChooseLayoutProps> = ({
  handleChangeStep,
  isStep,
  handleMaxPose,
}) => {
  const [isSelectedLayout, setIsSelectedLayout] = useState<string | null>(null);

  const handleSelectLayout = (pose: number) => {
    handleMaxPose(pose);
    setIsSelectedLayout(String(pose));
  };

  if (isStep !== "choose-layout") return null;

  return (
    <LayoutProvider center className="flex-col pt-24 pb-9">
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
        {layoutData.map((data) => (
          <CardLayout
            key={data.name}
            descriprion={data.description}
            imageUrl={data.imageUrl}
            name={data.name}
            isSelected={isSelectedLayout == String(data.pose)}
            poses={data.pose}
            onSelected={() => handleSelectLayout(data.pose)}
          />
        ))}
      </div>

      <div className="mt-8 flex w-full justify-end">
        <Button
          disabled={!isSelectedLayout}
          onClick={() => handleChangeStep("camera-capture")}
        >
          <Camera /> Start Photo Session
        </Button>
      </div>
    </LayoutProvider>
  );
};

export default ChooseLayout;
