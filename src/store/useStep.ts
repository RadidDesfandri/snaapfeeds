import { StepStore } from "@/types/step-store";
import { create } from "zustand";

const useStep = create<StepStore>((set) => ({
  step: "choose-layout",
  payload: {
    maxPhoto: 0,
    layoutName: null,
  },
  changeStep: (step) => set({ step }),
  selectLayout: (payload) => set({ payload }),
}));

export default useStep;
