import { LayoutData } from "@/types/global-type";

export const timerOptions = [
  { label: "3 Second", value: "3" },
  { label: "5 Second", value: "5" },
  { label: "10 Second", value: "10" },
];

export const sizeOptions = [
  { label: "Polaroid", value: "polaroid" },
  { label: "4R", value: "4R" },
  { label: "4R Portrait", value: "4R-Portrait" },
  { label: "4R Komposisi", value: "4R-composition" },
  { label: "2R", value: "2R" },
];

export const filters = {
  normal: "none",
  "black-white": "grayscale(100%)",
  sepia: "sepia(100%)",
  vintage: "sepia(50%) contrast(120%) brightness(110%) saturate(80%)",
  // Filter Y2K - memberikan efek film dengan grain dan warna kebiruan
  y2k: "contrast(110%) brightness(95%) saturate(120%) hue-rotate(10deg) sepia(20%) opacity(0.95)",
  "y2k-2":
    "contrast(120%) brightness(90%) saturate(140%) hue-rotate(15deg) sepia(30%) blur(0.3px)",

  // Filter Dreamy - memberikan efek soft dan ethereal
  dreamy:
    "blur(0.5px) brightness(115%) contrast(85%) saturate(130%) hue-rotate(-5deg) opacity(0.9)",
  "dreamy-2":
    "blur(1px) brightness(125%) contrast(80%) saturate(150%) hue-rotate(-10deg) opacity(0.85)",
  warm: "sepia(30%) saturate(120%) brightness(110%)",
  blur: "blur(2px)",
  contrast: "contrast(150%)",
  brightness: "brightness(120%)",
};


export const colorOptions = [
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

export const backgroundOptions = [
  { src: "/background-frame/1.png" },
  { src: "/background-frame/2.png" },
  { src: "/background-frame/3.png" },
  { src: "/background-frame/4.png" },
  // { src: "/background-frame/5.png" },
  { src: "/background-frame/6.png" },
  { src: "/background-frame/7.png" },
  // { src: "/background-frame/8.png" },
  // { src: "/background-frame/9.png" },
  // { src: "/background-frame/10.png" }
];

export const backgroundGradientOptions = [
  {
    id: "gradient1",
    name: "Sunset",
    gradient: "linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    colors: ["#ff9a9e", "#fecfef"],
  },
  {
    id: "gradient2",
    name: "Ocean",
    gradient: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    colors: ["#667eea", "#764ba2"],
  },
  {
    id: "gradient3",
    name: "Forest",
    gradient: "linear-gradient(45deg, #667db6 0%, #0082c8 100%)",
    colors: ["#667db6", "#0082c8"],
  },
  {
    id: "gradient4",
    name: "Purple",
    gradient: "linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)",
    colors: ["#a8edea", "#fed6e3"],
  },
  {
    id: "gradient5",
    name: "Fire",
    gradient: "linear-gradient(45deg, #ff6b6b 0%, #feca57 100%)",
    colors: ["#ff6b6b", "#feca57"],
  },
  {
    id: "gradient6",
    name: "Sky",
    gradient: "linear-gradient(180deg, #74b9ff 0%, #0984e3 100%)",
    colors: ["#74b9ff", "#0984e3"],
  },
];

export const backgroundTypeOptions = ["color", "gradient", "image"];

export const layoutData: LayoutData[] = [
  {
    name: "Feed Post",
    description: "One signature snap to highlight on your feed.",
    pose: 1,
    imageUrl: "/photo-layouts/feed-post.png",
  },
  {
    name: "Duo Feed",
    description: "Make a short story out of two exciting moments.",
    pose: 2,
    imageUrl: "/photo-layouts/duo-feed.png",
  },
  // {
  //   name: "Feed Reel",
  //   description: "Three expressions in one dynamic photo reel.",
  //   pose: 3,
  //   imageUrl: "/photo-layouts/layout-a2.png",
  // },
  {
    name: "Snap Grid",
    description: "A classic grid look that never goes out of style.",
    pose: 4,
    imageUrl: "/photo-layouts/snap-grid.png",
  },
  {
    name: "Snap Gallery",
    description: "Show off more moments in one mega feed.",
    pose: 6,
    imageUrl: "/photo-layouts/snap-gallery.png",
  },
  {
    name: "Snap in Motion",
    description: "Capture exciting moving moments! (Coming Soon)",
    pose: 5,
    coomingSoon: true,
    imageUrl: "/photo-layouts/snap-in-motion.gif",
  },
];
