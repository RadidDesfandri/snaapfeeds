import { sizeOptions } from "@/constants/data";
import {
  FinalCanvasConfig,
  LayoutConfig,
  LayoutName,
  SizeName,
} from "@/types/global-type";

export interface CanvasConfig {
  width: number;
  height: number;
  aspectRatio: string;
  tailwindWidth: string;
  previewWidth: string;
}

export const getSizeFoto = (sizeName: SizeName) => {
  switch (sizeName) {
    case "polaroid":
      return {
        width: 850,
        height: 850,
        aspectRatio: "aspect-square",
        tailwindWidth: "w-full md:max-w-md",
        previewWidth: "w-28",
      };
    case "4R":
      return {
        width: 1000,
        height: 750,
        aspectRatio: "aspect-4/3",
        tailwindWidth: "w-full max-w-2xl",
        previewWidth: "w-40",
      };
    case "2R":
      return {
        width: 540,
        height: 810,
        aspectRatio: "aspect-2/3",
        tailwindWidth: "w-full max-w-lg max-h-[90vh]",
        previewWidth: "w-36",
      };
    default:
      return {
        width: 1000,
        height: 750,
        aspectRatio: "aspect-4/3",
        tailwindWidth: "w-full max-w-2xl",
        previewWidth: "w-40",
      };
  }
};

export const getFinalCanvasSize = (
  layoutName: LayoutName,
  sizeName: SizeName,
): FinalCanvasConfig => {
  if (layoutName === "Feed Post") {
    return { width: 1050, height: 1260 };
  }

  if (layoutName === "Duo Feed") {
    if (sizeName === "2R") {
      return { width: 600, height: 1800 };
    }
    return { width: 1200, height: 1800 };
  }

  if (layoutName === "Feed Reel") {
    return { width: 1200, height: 1800 };
  }

  if (layoutName === "Snap Grid" || layoutName === "Snap Gallery") {
    return { width: 1200, height: 1800 };
  }

  return { width: 1200, height: 1800 };
};

export const getLayoutConfig = (
  layoutName: LayoutName,
  sizeName: SizeName,
): LayoutConfig => {
  const finalCanvas = getFinalCanvasSize(layoutName, sizeName);
  const photoSize = getSizeFoto(sizeName);

  const logoWidth = 500;
  const logoHeight = 210;

  switch (layoutName) {
    case "Feed Post":
      return {
        finalCanvas,
        photoConfig: {
          count: 1,
          arrangement: "single",
          positions: [{ x: (finalCanvas.width - photoSize.width) / 2, y: 100 }],
        },
        logoConfig: {
          x: (finalCanvas.width - 500) / 2,
          y: finalCanvas.height - 270,
          width: logoWidth,
          height: logoHeight,
          position: "bottom-center",
        },
        dateConfig: {
          x: finalCanvas.width / 2,
          y: finalCanvas.height - 90,
        },
      };

    case "Duo Feed":
      if (sizeName === "2R") {
        return {
          finalCanvas,
          photoConfig: {
            count: 2,
            arrangement: "vertical",
            positions: [
              { x: (finalCanvas.width - photoSize.width) / 2, y: 25 },
              { x: (finalCanvas.width - photoSize.width) / 2, y: 860 },
            ],
          },
          logoConfig: {
            x: (finalCanvas.width - 500) / 2,
            y: finalCanvas.height - 190,
            width: logoWidth,
            height: logoHeight,
            position: "bottom-center",
          },
          dateConfig: {
            x: finalCanvas.width / 2,
            y: finalCanvas.height - 20,
          },
        };
      }
      return {
        finalCanvas,
        photoConfig: {
          count: 2,
          arrangement: "vertical",
          positions: [
            { x: (finalCanvas.width - photoSize.width) / 2, y: 80 },
            { x: (finalCanvas.width - photoSize.width) / 2, y: 850 },
          ],
        },
        logoConfig: {
          x: (finalCanvas.width - 500) / 2,
          y: finalCanvas.height - 230,
          width: logoWidth,
          height: logoHeight,
          position: "bottom-center",
        },
        dateConfig: {
          x: finalCanvas.width / 2,
          y: finalCanvas.height - 50,
        },
      };

    // case "Feed Reel":
    //   if (sizeName === "4R-composition") {
    //     // Tambahkan opsi ini nanti
    //     return {
    //       finalCanvas,
    //       photoConfig: {
    //         count: 3,
    //         arrangement: "composition",
    //         positions: [
    //           { x: 100, y: 100 }, // Foto besar
    //           { x: 100, y: 950 }, // Foto kecil kiri
    //           { x: 610, y: 950 }, // Foto kecil kanan
    //         ],
    //       },
    //     };
    //   }
    //   return {
    //     finalCanvas,
    //     photoConfig: {
    //       count: 3,
    //       arrangement: "vertical",
    //       positions: [
    //         { x: (finalCanvas.width - photoSize.width) / 2, y: 50 }, // -> { x: (finalCanvas.width - photoSize.width) / 2, y: 75 },
    //         { x: (finalCanvas.width - photoSize.width) / 2, y: 570 }, // -> { x: (finalCanvas.width - photoSize.width) / 2, y: 600 },
    //         { x: (finalCanvas.width - photoSize.width) / 2, y: 1100 }, // -> { x: (finalCanvas.width - photoSize.width) / 2, y: 1125 },
    //       ],
    //     },
    //   };

    case "Snap Grid":
      return {
        finalCanvas,
        photoConfig: {
          count: 4,
          arrangement: "grid-2x2",
          positions: [
            { x: 40, y: 25 }, // Top left -> { x: 75, y: 75 },
            { x: 610, y: 25 }, // Top right -> { x: 625, y: 75 },
            { x: 40, y: 870 }, // Bottom left -> { x: 75, y: 975 },
            { x: 610, y: 870 }, // Bottom right -> { x: 625, y: 975 },
          ],
        },
        logoConfig: {
          x: (finalCanvas.width - 500) / 2,
          y: finalCanvas.height - 180,
          width: logoWidth,
          height: logoHeight,
          position: "bottom-center",
        },
        dateConfig: {
          x: finalCanvas.width / 2,
          y: finalCanvas.height - 10,
        },
      };

    case "Snap Gallery":
      return {
        finalCanvas,
        photoConfig: {
          count: 6,
          arrangement: "grid-2x3",
          positions: [
            { x: 45, y: 20 }, // Row 1 left -> { x: 75, y: 75 },
            { x: 605, y: 20 }, // Row 1 right -> { x: 625, y: 75 },
            { x: 45, y: 580 }, // Row 2 left -> { x: 75, y: 625 },
            { x: 605, y: 580 }, // Row 2 right -> { x: 625, y: 625 },
            { x: 45, y: 1140 }, // Row 3 left -> { x: 75, y: 1175 },
            { x: 605, y: 1140 }, // Row 3 right -> { x: 625, y: 1175 },
          ],
        },
        logoConfig: {
          x: (finalCanvas.width - 500) / 2,
          y: finalCanvas.height - 180,
          width: logoWidth,
          height: logoHeight,
          position: "bottom-center",
        },
        dateConfig: {
          x: finalCanvas.width / 2,
          y: finalCanvas.height - 10,
        },
      };

    default:
      return {
        finalCanvas,
        photoConfig: {
          count: 1,
          arrangement: "single",
          positions: [{ x: 0, y: 0 }],
        },
        logoConfig: {
          x: (finalCanvas.width - 500) / 2,
          y: finalCanvas.height - 230,
          width: 500,
          height: 210,
          position: "bottom-center",
        },
        dateConfig: {
          x: finalCanvas.width / 2,
          y: finalCanvas.height - 90,
        },
      };
  }
};

// Update mapping layout ke options
const layoutToOptions: Record<LayoutName, string[]> = {
  "Feed Post": ["polaroid"],
  "Duo Feed": ["4R", "2R"],
  "Feed Reel": ["4R-Portrait", "4R-composition"],
  "Snap Grid": ["4R"],
  "Snap Gallery": ["4R"],
  "Snap in Motion": [],
};

export function getSizeOptions(layoutName: LayoutName) {
  const allowedValues = layoutToOptions[layoutName] || [];
  return sizeOptions.filter((opt) => allowedValues.includes(opt.value));
}

export const getDefaultSize = (layoutName: LayoutName) => {
  switch (layoutName) {
    case "Feed Post":
      return "polaroid";

    case "Snap Gallery":
    case "Snap Grid":
    case "Duo Feed":
      return "4R";

    case "Feed Reel":
      return "4R-Portrait";

    default:
      return "polaroid";
  }
};
