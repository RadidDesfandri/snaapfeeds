export const getDimensionsByLayout = (selectedLayout: string) => {
  switch (selectedLayout) {
    case "Layout A": // Potrait 1:1
      return { width: 800, height: 800 };
    case "Layout C": // Landscape
    case "Layout D":
      return { width: 1000, height: 700 };
    case "Layout B": // 4:3
      return { width: 600, height: 800 };
    default:
      return { width: 800, height: 800 };
  }
};
