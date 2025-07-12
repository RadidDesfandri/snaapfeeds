export const getPhotoSizeByLayout = (selectedLayout: string) => {
  switch (selectedLayout) {
    case "Layout A":
      return { width: "w-28", aspect: "aspect-square" };
    case "Layout C":
    case "Layout D":
      return { width: "w-40", aspect: "aspect-video" };
    case "Layout B":
      return { width: "w-36", aspect: "aspect-[3/4]" };
    default:
      return { width: "w-28", aspect: "aspect-square" };
  }
};
