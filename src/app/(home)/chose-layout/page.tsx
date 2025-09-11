"use client";

import ChooseLayout from "@/components/choose-layout/ChooseLayout";
import CameraCapture from "@/components/choose-layout/CameraCapture";
import { StepType } from "@/types/global-type";
import { useState } from "react";

const MainApp = () => {
  const [isStep, setIsStep] = useState<StepType>("choose-layout");
  const [maxPose, setMaxPose] = useState<number>(1);

  const handleChangeStep = (step: StepType) => {
    setIsStep(step);
  };

  const handleMaxPose = (pose: number) => {
    setMaxPose(pose);
  };

  return (
    <main>
      <ChooseLayout
        isStep={isStep}
        handleMaxPose={handleMaxPose}
        handleChangeStep={handleChangeStep}
      />
      <CameraCapture
        isStep={isStep}
        maxPose={maxPose}
        handleChangeStep={handleChangeStep}
      />
    </main>
  );
};

export default MainApp;
