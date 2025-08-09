export const getRatioFoto = (ratio: string) => {
  switch (ratio) {
    case "16:9":
      return {
        width: 1280,
        height: 720,
        aspectRatio: "aspect-video",
        tailwindWidth: "w-full max-w-2xl",
        previewWidth: "w-40",
      };
    case "4:3":
      return {
        width: 600,
        height: 800,
        aspectRatio: "aspect-3/4",
        tailwindWidth: "w-full max-w-lg max-h-[90vh]",
        previewWidth: "w-36",
      };
    case "1:1":
      return {
        width: 800,
        height: 800,
        aspectRatio: "aspect-square",
        tailwindWidth: "w-full md:max-w-md",
        previewWidth: "w-28",
      };
    default:
      return {
        width: 1280,
        height: 720,
        aspectRatio: "aspect-video",
        tailwindWidth: "w-full max-w-2xl",
        previewWidth: "w-40",
      };
  }
};
