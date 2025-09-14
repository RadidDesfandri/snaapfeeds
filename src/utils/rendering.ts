import {
  DateConfig,
  ImageLoadedType,
  LayoutConfig,
  LogoConfig,
  RenderOptions,
  SizeName,
} from "@/types/global-type";
import { getLayoutConfig, getSizeFoto } from "./fotoIntegration";
import { backgroundGradientOptions } from "@/constants/data";
import { formatDate } from "./formatDate";

export const renderPhotosToCanvas = ({
  layoutName,
  sizeName,
  loadedImages,
  canvas,
  logoImage,
  isPreview = false,
  backgroundType,
  color,
  backgroundImage,
  gradientId,
  showDate,
}: RenderOptions) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const config = getLayoutConfig(layoutName, sizeName);

  // Set canvas size
  // if (isPreview) {
  //   // Untuk preview, kita scale down
  //   const scale = 0.3; // Adjust sesuai kebutuhan
  //   canvas.width = config.finalCanvas.width * scale;
  //   canvas.height = config.finalCanvas.height * scale;
  // } else {
  //   // Untuk download, ukuran penuh
  //   canvas.width = config.finalCanvas.width;
  //   canvas.height = config.finalCanvas.height;
  // }

  if (isPreview) {
    canvas.width = config.finalCanvas.width; 
    canvas.height = config.finalCanvas.height; 
  } else {
    canvas.width = config.finalCanvas.width;
    canvas.height = config.finalCanvas.height;
  }

  if (backgroundType === "color" && color) {
    // Clear canvas dengan background putih
    ctx.fillStyle = color || "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (backgroundType === "image" && backgroundImage) {
    ctx.drawImage(
      backgroundImage,
      0,
      0,
      config.finalCanvas.width,
      config.finalCanvas.height,
    );
  } else if (backgroundType === "gradient" && gradientId) {
    const gradient = createGradient(
      ctx,
      config.finalCanvas.width,
      config.finalCanvas.height,
      gradientId,
    );
    if (gradient) {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, config.finalCanvas.width, config.finalCanvas.height);
    }
  }

  // Scale factor untuk preview
  // const scale = isPreview ? 0.3 : 1;
  const scale = isPreview ? 1 : 1;

  // Render berdasarkan layout
  switch (layoutName) {
    case "Feed Post":
      renderPolaroid(ctx, loadedImages, config, scale, logoImage, showDate);
      break;

    case "Duo Feed":
      renderDuoFeed(
        ctx,
        loadedImages,
        config,
        scale,
        sizeName,
        logoImage,
        showDate,
      );
      break;

    // case "Feed Reel":
    //   if (sizeName === "4R-composition") {
    //     renderReelComposition(ctx, loadedImages, config, scale);
    //   } else {
    //     renderReelVertical(ctx, loadedImages, config, scale);
    //   }
    //   break;

    case "Snap Grid":
      renderSnapGrid(ctx, loadedImages, config, scale, logoImage, showDate);
      break;

    case "Snap Gallery":
      renderSnapGallery(ctx, loadedImages, config, scale, logoImage, showDate);
      break;

    default:
      console.warn(`Layout ${layoutName} not implemented yet`);
  }
};

const renderPolaroid = (
  ctx: CanvasRenderingContext2D,
  images: ImageLoadedType[],
  config: LayoutConfig,
  scale: number,
  logoImage: HTMLImageElement,
  showDate: boolean,
) => {
  if (!images[0]?.image) return;

  const img = images[0].image;
  const pos = config.photoConfig.positions[0];
  const photoSize = getSizeFoto("polaroid");

  // Draw photo dengan aspect ratio preservation
  drawImageWithAspectRatio(
    ctx,
    img,
    pos.x * scale,
    pos.y * scale,
    photoSize.width * scale,
    photoSize.height * scale,
  );

  // Optional: Add polaroid border/shadow effects
  drawPolaroidBorder(
    ctx,
    pos.x * scale,
    pos.y * scale,
    photoSize.width * scale,
    photoSize.height * scale,
  );

  // Render logo
  renderLogo(ctx, logoImage, config.logoConfig!, scale);

  if (showDate && config.dateConfig) {
    renderDate(ctx, config.dateConfig, scale);
  }
};

// Render Duo Feed (2 photos vertical)
const renderDuoFeed = (
  ctx: CanvasRenderingContext2D,
  images: ImageLoadedType[],
  config: LayoutConfig,
  scale: number,
  sizeName: SizeName,
  logoImage: HTMLImageElement,
  showDate: boolean,
) => {
  const photoSize = getSizeFoto(sizeName);

  images.slice(0, 2).forEach((imgData, index) => {
    if (!imgData.image) return;

    const pos = config.photoConfig.positions[index];
    drawImageWithAspectRatio(
      ctx,
      imgData.image,
      pos.x * scale,
      pos.y * scale,
      photoSize.width * scale,
      photoSize.height * scale,
    );
  });

  renderLogo(ctx, logoImage, config.logoConfig!, scale);

  if (showDate && config.dateConfig) {
    renderDate(ctx, config.dateConfig, scale);
  }
};

// // Render Feed Reel - Vertical
// const renderReelVertical = (
//   ctx: CanvasRenderingContext2D,
//   images: ImageLoadedType[],
//   config: LayoutConfig,
//   scale: number,
// ) => {
//   const photoSize = getSizeFoto("4R");

//   images.slice(0, 3).forEach((imgData, index) => {
//     if (!imgData.image) return;

//     const pos = config.photoConfig.positions[index];
//     drawImageWithAspectRatio(
//       ctx,
//       imgData.image,
//       pos.x * scale,
//       pos.y * scale,
//       photoSize.width * scale,
//       photoSize.height * scale,
//     );
//   });
// };

// // Render Feed Reel - Composition
// const renderReelComposition = (
//   ctx: CanvasRenderingContext2D,
//   images: ImageLoadedType[],
//   config: LayoutConfig,
//   scale: number,
// ) => {
//   images.slice(0, 3).forEach((imgData, index) => {
//     if (!imgData.image) return;

//     const pos = config.photoConfig.positions[index];
//     let width, height;

//     if (index === 0) {
//       // Foto besar
//       width = 1000 * scale;
//       height = 750 * scale;
//     } else {
//       // Foto kecil
//       width = 490 * scale;
//       height = 367 * scale;
//     }

//     drawImageWithAspectRatio(
//       ctx,
//       imgData.image,
//       pos.x * scale,
//       pos.y * scale,
//       width,
//       height,
//     );
//   });
// };

// Render Snap Grid (4 photos in 2x2)
const renderSnapGrid = (
  ctx: CanvasRenderingContext2D,
  images: ImageLoadedType[],
  config: LayoutConfig,
  scale: number,
  logoImage: HTMLImageElement,
  showDate: boolean,
) => {
  images.slice(0, 4).forEach((imgData, index) => {
    if (!imgData.image) return;

    const pos = config.photoConfig.positions[index];
    drawImageWithAspectRatio(
      ctx,
      imgData.image,
      pos.x * scale,
      pos.y * scale,
      550 * scale, // Fixed size untuk grid
      825 * scale,
    );
  });

  renderLogo(ctx, logoImage, config.logoConfig!, scale);

  if (showDate && config.dateConfig) {
    renderDate(ctx, config.dateConfig, scale);
  }
};

// Render Snap Gallery (6 photos in 2x3)
const renderSnapGallery = (
  ctx: CanvasRenderingContext2D,
  images: ImageLoadedType[],
  config: LayoutConfig,
  scale: number,
  logoImage: HTMLImageElement,
  showDate: boolean,
) => {
  images.slice(0, 6).forEach((imgData, index) => {
    if (!imgData.image) return;

    const pos = config.photoConfig.positions[index];
    drawImageWithAspectRatio(
      ctx,
      imgData.image,
      pos.x * scale,
      pos.y * scale,
      550 * scale, // Square untuk gallery
      550 * scale,
    );
  });

  renderLogo(ctx, logoImage, config.logoConfig!, scale);

  if (showDate && config.dateConfig) {
    renderDate(ctx, config.dateConfig, scale);
  }
};

// Helper function untuk draw image dengan aspect ratio preservation
const drawImageWithAspectRatio = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const imgAspect = img.width / img.height;
  const targetAspect = width / height;

  let drawWidth = width;
  let drawHeight = height;
  let drawX = x;
  let drawY = y;

  if (imgAspect > targetAspect) {
    // Image is wider, fit to height and crop sides
    drawWidth = height * imgAspect;
    drawX = x - (drawWidth - width) / 2;
  } else {
    // Image is taller, fit to width and crop top/bottom
    drawHeight = width / imgAspect;
    drawY = y - (drawHeight - height) / 2;
  }

  // Clip to target area
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();

  // Draw image
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

  ctx.restore();

  // Optional: Add border
  // ctx.strokeStyle = "#e0e0e0";
  // ctx.lineWidth = 1;
  // ctx.strokeRect(x, y, width, height);
};

// Helper untuk Polaroid border
const drawPolaroidBorder = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  // Add subtle shadow/border effect untuk polaroid
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 1, y - 1, width + 2, height + 2);
};

const renderLogo = (
  ctx: CanvasRenderingContext2D,
  logoImage: HTMLImageElement,
  logoConfig: LogoConfig,
  scale: number,
) => {
  const x = logoConfig.x * scale;
  const y = logoConfig.y * scale;
  const width = logoConfig.width * scale;
  const height = logoConfig.height * scale;

  if (logoImage) {
    drawImageWithAspectRatio(ctx, logoImage, x, y, width, height);
  }
};

const createGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gradientId: string,
) => {
  const gradientOption = backgroundGradientOptions.find(
    (g) => g.id === gradientId,
  );

  if (!gradientOption) return null;

  const gradient = ctx.createLinearGradient(0, 0, width, height);

  gradientOption.colors.forEach((color, index) => {
    gradient.addColorStop(index / (gradientOption.colors.length - 1), color);
  });

  return gradient;
};

const renderDate = (
  ctx: CanvasRenderingContext2D,
  logoConfig: DateConfig,
  scale: number,
) => {
  const currentDate = formatDate(new Date());

  ctx.fillStyle = "#333";
  ctx.font = `32px Arial`;
  ctx.textAlign = "center";
  ctx.fillText(currentDate, logoConfig.x * scale, logoConfig.y * scale);
};
