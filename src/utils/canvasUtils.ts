import { layoutStyleOptions } from "@/constants/data";
import { LayoutType, SizeName, VariantLayoutType } from "@/types/global-type";
import { getSizeFoto } from "./fotoIntegration";

export const getLayoutConfig = (
  poseCount: number,
  size: SizeName,
  selectedLayout: {
    layoutType: LayoutType;
    variant: VariantLayoutType;
  },
  logoImage?: HTMLImageElement | null,
) => {
  const sizeConfig = getSizeFoto(size);
  const padding = getPaddingByLayoutVariant(selectedLayout.variant);
  // Gunakan ukuran asli logo jika tersedia, fallback ke 90
  const logoHeight = logoImage?.naturalHeight || 90;
  const logoWidth = logoImage?.naturalWidth || 135; // Default size 1.5

  let canvasWidth, canvasHeight, positions, logoPosition, datePosition;

  if (selectedLayout.layoutType === "horizontal") {
    canvasWidth =
      sizeConfig.width * poseCount + padding * (poseCount - 1) + padding * 2;
    canvasHeight = sizeConfig.height + padding + logoHeight * 2;

    positions = Array.from({ length: poseCount }, (_, i) => ({
      x: padding + i * (sizeConfig.width + padding),
      y: padding,
      width: sizeConfig.width,
      height: sizeConfig.height,
    }));

    // Logo di bagian bawah kiri dengan ukuran asli
    logoPosition = {
      x: padding + 10,
      y: sizeConfig.height + padding + 40,
      width: logoWidth,
      height: logoHeight,
    };

    // Tanggal di sebelah kanan logo
    datePosition = {
      x: logoPosition.x + logoPosition.width + 20,
      y: logoPosition.y + logoHeight / 2 + 25, // Center vertikal dengan logo
    };
  } else if (selectedLayout.layoutType === "vertical") {
    canvasWidth = sizeConfig.width + padding * 2;
    canvasHeight =
      sizeConfig.height * poseCount +
      padding * (poseCount - 1) +
      padding * 2 +
      logoHeight * 1.5;

    positions = Array.from({ length: poseCount }, (_, i) => ({
      x: padding,
      y: padding + i * (sizeConfig.height + padding),
      width: sizeConfig.width,
      height: sizeConfig.height,
    }));

    const yVerticalPos = selectedLayout.variant === "large-padding" ? 43 : 20;

    // Logo di bagian bawah center
    logoPosition = {
      x: (canvasWidth - logoWidth) / 2,
      y:
        sizeConfig.height * poseCount +
        padding * (poseCount - 1) +
        padding +
        yVerticalPos,
      width: logoWidth,
      height: logoHeight,
    };

    // Tanggal di bawah logo
    datePosition = {
      x: canvasWidth / 2, // Center horizontal
      y: logoPosition.y + logoHeight + 18,
    };
  } else if (selectedLayout.layoutType === "grid") {
    // Grid layout (2x2, 2x3, 3x2, dll)
    const cols = Math.ceil(Math.sqrt(poseCount / 2));
    const rows = Math.ceil(poseCount / cols);

    canvasWidth = sizeConfig.width * cols + padding * (cols - 1) + padding * 2;
    canvasHeight =
      sizeConfig.height * rows +
      padding * (rows - 1) +
      padding * 2 +
      logoHeight;

    const yGridPos = selectedLayout.variant === "large-padding" ? 40 : 10;

    // Logo di bagian bawah kiri dengan ukuran asli
    logoPosition = {
      x: padding,
      y: sizeConfig.height * rows + padding * (rows - 1) + padding + yGridPos,
      width: logoWidth,
      height: logoHeight,
    };

    // Tanggal di sebelah kanan logo
    datePosition = {
      x: logoPosition.x + logoPosition.width + 20,
      y: logoPosition.y + logoHeight / 2 + 15,
    };

    positions = Array.from({ length: poseCount }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      return {
        x: padding + col * (sizeConfig.width + padding),
        y: padding + row * (sizeConfig.height + padding),
        width: sizeConfig.width,
        height: sizeConfig.height,
      };
    });
  }

  return {
    canvas: { width: canvasWidth, height: canvasHeight },
    positions,
    logoPosition,
    datePosition,
    preview: {
      width: Math.floor(canvasWidth! * 0.3), // Preview 30% dari ukuran asli
      height: Math.floor(canvasHeight! * 0.3),
    },
  };
};

const getPaddingByLayoutVariant = (variant: VariantLayoutType) => {
  switch (variant) {
    case "no-padding":
      return 0;
    case "small-padding":
      return 20;
    case "large-padding":
      return 80;
    default:
      return 20;
  }
};

export const getAvailableLayouts = (size: string, pose: number) => {
  return layoutStyleOptions.filter((item) => {
    const match = item.forPoses.includes(pose) && item.forRatio.includes(size);

    // prettier-ignore
    // const isExcluded = size === '' && pose === 4 && item.layoutType === 'vertical'

    // return match && !isExcluded;
    return match;
  });
};
