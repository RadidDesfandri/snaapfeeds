import { Camera } from "lucide-react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StepType } from "@/types/global-type";

const layoutData = [
  {
    pose: 1,
  },
  {
    pose: 2,
  },
  {
    pose: 3,
  },
  {
    pose: 4,
  },
  {
    pose: 5,
  },
  {
    pose: 6,
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

      <div className="scrollbar-none mx-auto flex max-w-6xl flex-col items-center gap-4 overflow-x-auto p-0 md:flex-row md:gap-6 md:p-1">
        {layoutData.map((data, idx) => (
          <div
            key={idx}
            onClick={() => handleSelectLayout(data.pose)}
            onDoubleClick={() => handleChangeStep("camera-capture")}
            className={cn(
              "cursor-pointer rounded-xl border p-5 transition-all duration-300 hover:shadow-md",
              isSelectedLayout == String(data.pose)
                ? "scale-[101%] border-2 border-neutral-800"
                : "border-gray-300",
            )}
          >
            Max Pose: {data.pose}
          </div>
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
