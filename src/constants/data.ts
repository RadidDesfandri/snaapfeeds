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
  { label: "Ratio 4:3", value: "4:3" },
  { label: "Ratio 1:1", value: "1:1" },
  { label: "Ratio 16:9", value: "16:9" },
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

export const layoutStyleOptions = [
  // Horizontal configuration
  {
    src: "", // for image
    layoutType: "horizontal",
    variant: "no-padding", // 0 padding
    forRatio: ["16:9"],
    forPoses: [2],
  },
  {
    src: "", // for image
    layoutType: "horizontal",
    variant: "small-padding", // 20 padding
    forRatio: ["16:9"],
    forPoses: [2],
  },
  {
    src: "", // for image
    layoutType: "horizontal",
    variant: "large-padding", // 20 padding
    forRatio: ["16:9"],
    forPoses: [2],
  },

  // Vertical configuration
  {
    src: "", // for image
    layoutType: "vertical",
    variant: "no-padding",
    forRatio: ["16:9", "4:3", "1:1"], // hanya ada jika user tidak memilih 4 pose dengan ratio 4:3
    forPoses: [2, 3, 4],
  },
  {
    src: "", // for image
    layoutType: "vertical",
    variant: "small-padding",
    forRatio: ["16:9", "4:3", "1:1"], // hanya ada jika user tidak memilih 4 pose dengan ratio 4:3
    forPoses: [2, 3, 4],
  },
  {
    src: "", // for image
    layoutType: "vertical",
    variant: "large-padding",
    forRatio: ["16:9", "4:3", "1:1"], // hanya ada jika user tidak memilih 4 pose dengan ratio 4:3
    forPoses: [2, 3, 4],
  },

  // Grid configuration
  {
    src: "", // for image
    layoutType: "grid",
    variant: "no-padding",
    forRatio: ["16:9", "4:3", "1:1"],
    forPoses: [4, 6],
  },
  {
    src: "", // for image
    layoutType: "grid",
    variant: "small-padding",
    forRatio: ["16:9", "4:3", "1:1"],
    forPoses: [4, 6],
  },
  {
    src: "", // for image
    layoutType: "grid",
    variant: "large-padding",
    forRatio: ["16:9", "4:3", "1:1"],
    forPoses: [4, 6],
  },
];

export const frameColors = [
  { color: "#B20000" },
  { color: "#FCF1F1" },
  { color: "#EEF1BC" },
  { color: "#8A90FC" },
  { color: "#B9F3B5" },
  { color: "#5E56F6" },
  { color: "#F6E3AD" },
  { color: "#CDDCBD" },
  { color: "#A5ECD7" },
  { color: "#F2899A" },
];
