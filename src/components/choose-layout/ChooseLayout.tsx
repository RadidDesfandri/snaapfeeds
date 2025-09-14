"use client";

import { layoutData } from "@/constants/data";
import useStep from "@/store/useStep";
import { Camera } from "lucide-react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import CardLayout from "./CardLayout";
import { LayoutName } from "@/types/global-type";

const ChooseLayout = () => {
  const { step, changeStep, selectLayout, payload } = useStep();

  const handleDoubleClick = (layoutName: LayoutName, maxPhoto: number) => {
    selectLayout({ layoutName, maxPhoto });
    changeStep("camera-capture");
  };

  if (step !== "choose-layout") return null;

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

      {/* grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-7 lg:grid-cols-4 */}
      <div className="scrollbar flex max-w-6xl flex-col gap-4 md:flex-row md:overflow-x-auto md:p-3">
        {layoutData.map((data) => (
          <CardLayout
            key={data.name}
            description={data.description}
            imageUrl={data.imageUrl}
            name={data.name}
            isSelected={payload.layoutName == data.name}
            poses={data.pose}
            // prettier-ignore
            onSelected={() => selectLayout({layoutName: data.name, maxPhoto: data.pose})}
            isCooming={data.coomingSoon ? data.coomingSoon : false}
            onDoubleClick={() => handleDoubleClick(data.name, data.pose)}
          />
        ))}
      </div>

      <div className="mt-8 flex w-full justify-end">
        <Button
          disabled={!payload.layoutName}
          onClick={() => changeStep("camera-capture")}
        >
          <Camera /> Start Photo Session
        </Button>
      </div>
    </LayoutProvider>
  );
};

export default ChooseLayout;
