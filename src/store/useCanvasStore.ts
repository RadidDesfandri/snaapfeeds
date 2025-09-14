import { create } from "zustand";

export type BackgroundType = "color" | "gradient" | "image";

type CanvasStore = {
  backgroundType: BackgroundType;
  changeBackgroundType: (type: BackgroundType) => void;

  selectedColor: string | null;
  changeColor: (color: string) => void;

  selectedImage: string | null;
  changeImage: (path: string) => void;

  selectedGradient: string | null;
  changeGradient: (gradient: string) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  // Initial value
  backgroundType: "color",
  selectedColor: "#FFFFFF",
  selectedImage: null,
  selectedGradient: null,

  // Function
  changeBackgroundType: (type) => set({ backgroundType: type }),
  changeColor: (color) =>
    set({ selectedColor: color, selectedGradient: null, selectedImage: null }),
  changeImage: (path) =>
    set({ selectedImage: path, selectedColor: null, selectedGradient: null }),
  changeGradient: (gradient) =>
    set({
      selectedGradient: gradient,
      selectedColor: null,
      selectedImage: null,
    }),
}));
