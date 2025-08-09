export type StepType = "choose-layout" | "camera-capture" | "photo-editor";

export type FilterOption =
  | "normal"
  | "black-white"
  | "sepia"
  | "vintage"
  | "warm"
  | "blur"
  | "contrast"
  | "brightness";

export type LayoutType = "horizontal" | "vertical" | "grid";

export type VariantLayoutType =
  | "no-padding"
  | "small-padding"
  | "large-padding";

export interface SelectedLayoutValue {
  layoutType: LayoutType;
  variant: VariantLayoutType;
}
