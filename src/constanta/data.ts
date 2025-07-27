export const photoLayout = [
  {
    name: "Layout A",
    description: "3 poses for photostrip",
    poses: 3,
    strip: 2,
    imageUrl: "/photo-layouts/layout-a2.png",
  },
  {
    name: "Layout B",
    description: "2 poses for photostrip",
    poses: 2,
    strip: 2,
    imageUrl: "/photo-layouts/layout-b2.png",
  },
  {
    name: "Layout C",
    description: "4 poses for photostrip",
    poses: 4,
    strip: 2,
    imageUrl: "/photo-layouts/layout-c2.png",
  },
  {
    name: "Layout D",
    description: "2 poses for photostrip",
    poses: 2,
    strip: 1,
    imageUrl: "/photo-layouts/layout-d2.png",
  },
];

export const backgroundImage = [
  { url: "/background-frame/1.png" },
  { url: "/background-frame/2.png" },
  { url: "/background-frame/3.png" },
  { url: "/background-frame/4.png" },
  { url: "/background-frame/5.png" },
  { url: "/background-frame/6.png" },
  { url: "/background-frame/7.png" },
  { url: "/background-frame/8.png" },
  { url: "/background-frame/10.png" },
];

export const ratioOptions = [
  { label: "Ratio 16:9", value: "16:9" },
  { label: "Ratio 4:3", value: "4:3" },
  { label: "Ratio 1:1", value: "1:1" },
];

export const timerOptions = [
  { label: "3 Second", value: "3" },
  { label: "5 Second", value: "5" },
  { label: "10 Second", value: "10" },
];

export const filters = {
  normal: "",
  "black-white": "grayscale(100%)",
  sepia: "sepia(100%)",
  vintage: "sepia(50%) contrast(120%) brightness(110%)",
  warm: "hue-rotate(20deg) saturate(120%) brightness(110%)",
  blur: "blur(2px)",
  contrast: "contrast(150%)",
  brightness: "brightness(130%)",
};
