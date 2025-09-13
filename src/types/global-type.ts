export type StepType =
  | "choose-layout"
  | "camera-capture"
  | "photo-editor"
  | "share-download";

export type FilterOption =
  | "normal"
  | "black-white"
  | "sepia"
  | "vintage"
  | "warm"
  | "blur"
  | "contrast"
  | "brightness"
  | "y2k"
  | "y2k-2"
  | "dreamy"
  | "dreamy-2";

export type LayoutType = "horizontal" | "vertical" | "grid";

export type VariantLayoutType =
  | "no-padding"
  | "small-padding"
  | "large-padding";

export interface SelectedLayoutValue {
  layoutType: LayoutType;
  variant: VariantLayoutType;
}

export type LayoutName =
  | "Feed Post"
  | "Duo Feed"
  | "Feed Reel"
  | "Snap Grid"
  | "Snap Gallery"
  | "Snap in Motion";

export interface LayoutData {
  name: LayoutName;
  description: string;
  pose: number;
  imageUrl: string;
  coomingSoon?: boolean;
}
