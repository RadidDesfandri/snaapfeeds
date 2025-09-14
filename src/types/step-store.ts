import { LayoutName, StepType } from "./global-type";

interface Payload {
  maxPhoto: number;
  layoutName: LayoutName | null;
}

export type StepStore = {
  step: StepType;
  payload: Payload;
  changeStep: (step: StepType) => void;
  selectLayout: (payload: Payload) => void;
};
