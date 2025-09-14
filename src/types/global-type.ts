import { BackgroundType } from "@/store/useCanvasStore";

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

export type SizeName =
  | "polaroid"
  | "4R"
  | "2R"
  | "4R-composition"
  | "4R-Portrait";

export interface ImageLoadedType {
  image: HTMLImageElement;
  index: number;
  loaded: boolean;
  src: string;
}

export interface RenderOptions {
  layoutName: LayoutName;
  sizeName: SizeName;
  loadedImages: ImageLoadedType[];
  canvas: HTMLCanvasElement;
  logoImage: HTMLImageElement;
  isPreview?: boolean;
  backgroundType: BackgroundType;
  color: string | null;
  backgroundImage: HTMLImageElement | null;
  gradientId: string | null;
  showDate: boolean;
}

export interface PhotoPosition {
  x: number;
  y: number;
}

export interface PhotoConfig {
  count: number;
  arrangement: "single" | "vertical" | "composition" | "grid-2x2" | "grid-2x3";
  positions: PhotoPosition[];
}

export interface FinalCanvasConfig {
  width: number;
  height: number;
}

export interface LayoutConfig {
  finalCanvas: FinalCanvasConfig;
  photoConfig: PhotoConfig;
  logoConfig?: LogoConfig;
  dateConfig?: DateConfig;
}

export interface LogoConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "bottom-center";
}

export interface DateConfig {
  x: number;
  y: number;
}
